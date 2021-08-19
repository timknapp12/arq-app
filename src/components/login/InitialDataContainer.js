import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import {
  GET_RANKS,
  GET_MARKETS,
  GET_USER,
  GET_PROFILE,
  GET_NEWS,
  GET_PROSPECT_NOTIFICATIONS,
} from '../../graphql/queries';
import { UPDATE_USER } from '../../graphql/mutations';
import { findMarketId } from '../../utils/markets/findMarketId';
import { calculateUnreadNews } from '../../utils/news/calculateUnreadNews';
import { calculateNewProspectNotifications } from '../../utils/notifications/calculateNewProspectNotifications';

const InitialDataContainer = ({ children }) => {
  const {
    associateId,
    legacyId,
    setHasPermissions,
    userMarket,
    deviceLanguage,
  } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [directScaleUser, setDirectScaleUser] = useState({
    associateId: null,
    emailAddress: '',
    primaryPhoneNumber: '',
    secondaryPhoneNumber: '',
  });

  const [isFirstAppLoad, setIsFirstAppLoad] = useState(true);
  const [displayNotifications, setDisplayNotifications] = useState(false);
  const clearFields = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };
  const [useBiometrics, setUseBiometrics] = useState(false);

  const storeBiometrics = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@biometrics', jsonValue);
      return setUseBiometrics(value);
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const getBiometrics = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@biometrics');
      const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : null;
      // if there is nothing saved in storage then set to false
      return setUseBiometrics(parsedValue ? parsedValue : false);
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const { data: ranksData } = useQuery(GET_RANKS);

  const { data: marketsData } = useQuery(GET_MARKETS);

  const [getUser, { data: userData }] = useLazyQuery(GET_USER, {
    variables: { legacyAssociateId: legacyId },
    onCompleted: (data) => {
      if (
        data?.treeNodeFor?.currentAmbassadorMonthlyRecord?.highestRank?.rankId >
        10
      ) {
        setHasPermissions(true);
      } else {
        setHasPermissions(false);
      }
    },
  });

  const [getProfile, { data: profileData, refetch: refetchProfile }] =
    useLazyQuery(GET_PROFILE, {
      variables: { associateId },
      fetchPolicy: 'cache-and-network',
    });

  const [updateProfile] = useMutation(UPDATE_USER);

  // get news by market
  const [marketId, setMarketId] = useState(userMarket.countryId);
  const [newsNotificationCount, setNewsNotificationCount] = useState(0);
  const [prospectNotificationCount, setProspectNotificationCount] = useState(0);

  useEffect(() => {
    if (userMarket?.countryCode && marketsData?.activeCountries)
      setMarketId(
        findMarketId(userMarket?.countryCode, marketsData?.activeCountries),
      );
  }, [userMarket?.countryCode, marketsData?.activeCountries]);

  const {
    loading: loadingNews,
    data: newsData,
    refetch: refetchNews,
  } = useQuery(GET_NEWS, {
    variables: {
      associateId,
      countries: marketId,
      languageCode: deviceLanguage,
    },
  });

  const news = newsData?.newsResources ?? [];

  useEffect(() => {
    const count = calculateUnreadNews(news);
    setNewsNotificationCount(count);
    return () => {
      setNewsNotificationCount(0);
    };
  }, [news]);

  // get notifications
  // TODO consider removing the refetch and just using `getProspectNotifications`
  const [
    getProspectNotifications,
    {
      loading: loadingProspectNotifications,
      data: prospectNotificationData,
      refetch: refetchProspectsNotifications,
    },
  ] = useLazyQuery(GET_PROSPECT_NOTIFICATIONS, {
    variables: { associateId },
    onError: (error) =>
      console.log(`error in getProspectNotifications:`, error),
  });

  useEffect(() => {
    const count = calculateNewProspectNotifications(
      prospectNotificationData?.prospectViewsByAssociate,
    );
    setProspectNotificationCount(count);
  }, [prospectNotificationData]);

  useEffect(() => {
    getUser();
  }, [legacyId]);

  useEffect(() => {
    if (associateId) {
      getProfile();
      getProspectNotifications();
    }
  }, [associateId]);

  return (
    <LoginContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        errorMessage,
        setErrorMessage,
        directScaleUser,
        setDirectScaleUser,
        isFirstAppLoad,
        useBiometrics,
        storeBiometrics,
        getBiometrics,
        setIsFirstAppLoad,
        clearFields,
        ranks: ranksData?.ranks,
        markets: marketsData?.activeCountries,
        user: userData?.treeNodeFor,
        userProfile: profileData?.associates?.[0],
        updateProfile,
        refetchProfile,
        marketId,
        setMarketId,
        loadingNews,
        news,
        newsNotificationCount,
        refetchNews,
        displayNotifications,
        setDisplayNotifications,
        loadingProspectNotifications,
        prospectNotifications:
          prospectNotificationData?.prospectViewsByAssociate,
        refetchProspectsNotifications,
        prospectNotificationCount,
        setProspectNotificationCount,
      }}>
      {children}
    </LoginContext.Provider>
  );
};

InitialDataContainer.propTypes = {
  children: PropTypes.any.isRequired,
};

export default InitialDataContainer;
