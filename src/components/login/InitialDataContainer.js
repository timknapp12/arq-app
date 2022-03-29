import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useQuery,
  useLazyQuery,
  useMutation,
  useSubscription,
} from '@apollo/client';
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
  GET_PROSPECTS_BY_FIRSTNAME,
  GET_PROSPECTS_BY_LASTNAME,
  GET_USERS_ACCESS_CODES,
} from '../../graphql/queries';
import { UPDATE_USER, ADD_UPDATE_PROSPECT } from '../../graphql/mutations';
import { PROSPECT_VIEWED_LINK_NOTIFICATION } from '../../graphql/subscriptions';
import { findMarketId, findMarketCode } from '../../utils/markets/findMarketId';
import { calculateUnreadNews } from '../../utils/news/calculateUnreadNews';
import { calculateNewProspectNotifications } from '../../utils/notifications/calculateNewProspectNotifications';
import {
  findIfUserHasATeam,
  findUsersOwnTeamInfo,
} from '../../utils/teamResources/findTeamResourceData';

const InitialDataContainer = ({ children }) => {
  const { associateId, legacyId, setHasPermissionsToWrite, deviceLanguage } =
    useContext(AppContext);

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

  const [userMarket, setUserMarket] = useState({
    countryId: 88,
    countryCode: 'us',
  });

  const { data: ranksData } = useQuery(GET_RANKS, {
    onError: (e) => console.log(`error in get ranks`, e),
  });

  const { data: marketsData } = useQuery(GET_MARKETS, {
    variables: { language: deviceLanguage },
    onError: (e) => console.log(`error in get markets`, e),
  });

  const [getUser, { data: userData }] = useLazyQuery(GET_USER, {
    variables: { legacyAssociateId: legacyId },
    onError: (e) => console.log(`error in get user`, e),
    onCompleted: (data) => {
      if (
        data?.treeNodeFor?.currentAmbassadorMonthlyRecord?.highestRank?.rankId >
        10
      ) {
        setHasPermissionsToWrite(true);
      } else {
        setHasPermissionsToWrite(false);
      }
    },
  });

  const [getProfile, { data: profileData, refetch: refetchProfile }] =
    useLazyQuery(GET_PROFILE, {
      variables: { associateId },
      fetchPolicy: 'cache-and-network',
      onError: (e) => console.log(`error in get profile`, e),
    });

  const [updateProfile] = useMutation(UPDATE_USER, {
    onError: (e) => console.log(`error in update profile`, e),
  });

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
      languageCode: deviceLanguage || 'en',
    },
    onError: (e) => console.log(`error in get news`, e),
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

  const { data: subscriptionData } = useSubscription(
    PROSPECT_VIEWED_LINK_NOTIFICATION,
    {
      variables: { associateId },
      fetchPolicy: 'cache-and-network',
      onError: (e) => console.log(`error in prospect subscription`, e),
    },
  );

  useEffect(() => {
    const count = calculateNewProspectNotifications(
      prospectNotificationData?.prospectViewsByAssociate,
    );
    setProspectNotificationCount(count);
  }, [prospectNotificationData]);

  useEffect(() => {
    if (subscriptionData) {
      refetchProspectsNotifications();
    }
  }, [subscriptionData]);

  useEffect(() => {
    getUser();
  }, [legacyId]);

  useEffect(() => {
    if (associateId) {
      getProfile();
      getProspectNotifications();
    }
  }, [associateId]);

  // set user market
  useEffect(() => {
    if (marketsData?.activeCountries && profileData?.associates?.[0]) {
      const defaultCountryId =
        profileData?.associates?.[0]?.defaultCountry ?? 88;
      const defaultCountryCode =
        findMarketCode(defaultCountryId, marketsData?.activeCountries) || 'us';
      setUserMarket({
        countryId: defaultCountryId,
        countryCode: defaultCountryCode,
      });
    }
  }, [marketsData?.activeCountries, profileData?.associates?.[0]]);

  // add or update prospect
  const [sortBy, setSortBy] = useState('lastName');

  const [addUpdateProspect] = useMutation(ADD_UPDATE_PROSPECT, {
    refetchQueries: [
      {
        query:
          sortBy === 'firstName'
            ? GET_PROSPECTS_BY_FIRSTNAME
            : GET_PROSPECTS_BY_LASTNAME,
        variables: { associateId },
      },
    ],
    onError: (error) => console.log(`error in update contact:`, error),
  });

  // options and animations for the add button in center of navbar
  const [showAddOptions, setShowAddOptions] = useState(false);

  // team resources
  const {
    loading: loadingAccessCodes,
    data: userAccessCodesData,
    refetch: refetchUserAccessCodes,
  } = useQuery(GET_USERS_ACCESS_CODES, {
    variables: { associateId },
  });

  const alreadyHasTeam = findIfUserHasATeam(
    associateId,
    userAccessCodesData?.accesses ?? '',
  );

  const usersTeamInfo =
    alreadyHasTeam &&
    findUsersOwnTeamInfo(associateId, userAccessCodesData?.accesses ?? '');

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
        userMarket,
        ranks: ranksData?.ranks,
        markets: marketsData?.activeCountries,
        user: userData?.treeNodeFor,
        userProfile: profileData?.associates?.[0],
        updateProfile,
        refetchProfile,
        setMarketId,
        loadingNews,
        news,
        newsNotificationCount,
        refetchNews,
        loadingProspectNotifications,
        prospectNotifications:
          prospectNotificationData?.prospectViewsByAssociate,
        refetchProspectsNotifications,
        prospectNotificationCount,
        setProspectNotificationCount,
        sortBy,
        setSortBy,
        addUpdateProspect,
        showAddOptions,
        setShowAddOptions,
        alreadyHasTeam,
        loadingAccessCodes,
        usersTeamInfo,
        refetchUserAccessCodes,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

InitialDataContainer.propTypes = {
  children: PropTypes.any.isRequired,
};

export default InitialDataContainer;
