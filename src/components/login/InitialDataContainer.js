import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import {
  GET_RANKS,
  GET_MARKETS,
  GET_USER,
  GET_PROFILE,
  GET_NEWS,
} from '../../graphql/queries';
import { UPDATE_USER } from '../../graphql/mutations';
import { findMarketId } from '../../utils/markets/findMarketId';
import { calculateUnreadNews } from '../../utils/news/calculateUnreadNews';

const InitialDataContainer = ({ children }) => {
  const { associateId, legacyId, setHasPermissions, userMarket } =
    useContext(AppContext);

  const [email, setEmail] = useState('tim@test.com');
  const [password, setPassword] = useState('test123');
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

  useEffect(() => {
    if (userMarket?.countryCode && marketsData?.activeCountries)
      setMarketId(
        findMarketId(userMarket?.countryCode, marketsData?.activeCountries),
      );
  }, [userMarket?.countryCode, marketsData?.activeCountries]);

  const { loading: loadingNews, data: newsData } = useQuery(GET_NEWS, {
    variables: { associateId, countries: marketId },
  });

  const news = newsData?.newsResources ?? [];

  useEffect(() => {
    const count = calculateUnreadNews(news);
    setNewsNotificationCount(count);
    return () => {
      setNewsNotificationCount(0);
    };
  }, [news]);

  useEffect(() => {
    getUser();
  }, [legacyId]);

  useEffect(() => {
    getProfile();
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
      }}>
      {children}
    </LoginContext.Provider>
  );
};

InitialDataContainer.propTypes = {
  children: PropTypes.any.isRequired,
};

export default InitialDataContainer;
