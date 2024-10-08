import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useQuery,
  useLazyQuery,
  useMutation,
  useSubscription,
} from '@apollo/client';
import * as Analytics from 'expo-firebase-analytics';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { useNotifications } from '../notifications/useNotifications';
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
import { findRankId } from '../../utils/findRankInSlider';

const LoginDataContainer = ({ children }) => {
  const { associateId, legacyId, deviceLanguage } = useContext(AppContext);

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

  const [expoPushToken, isPushNotificationPermsGranted] = useNotifications();

  Analytics.setAnalyticsCollectionEnabled(false);
  useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      if (status === 'granted') {
        Analytics.setAnalyticsCollectionEnabled(true);
      }
    })();
  }, []);

  const clearFields = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  const [userMarket, setUserMarket] = useState({
    countryId: 88,
    countryCode: 'us',
  });

  const { data: ranksData } = useQuery(GET_RANKS);

  const { data: marketsData } = useQuery(GET_MARKETS, {
    variables: { language: deviceLanguage },
    onError: (e) => console.log(`error in get markets`, e),
  });

  const [hasPermissionsToWrite, setHasPermissionsToWrite] = useState(false);

  const pollIntervalForGetUser = 1000 * 60 * 10;
  const [getUser, { loading: loadingUserData, data: userData }] = useLazyQuery(
    GET_USER,
    {
      variables: { legacyAssociateId: legacyId },
      onError: (e) => console.log(`error in get user`, e),
      pollInterval: pollIntervalForGetUser,
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => {
    if (legacyId) {
      getUser();
    }
  }, [legacyId]);

  useEffect(() => {
    if (!userData) return;
    const platinumRankId = findRankId(ranksData.ranks, 'Platinum');
    const value =
      userData?.treeNodeFor?.currentAmbassadorMonthlyRecord?.highestRank
        ?.rankId > platinumRankId;
    setHasPermissionsToWrite(value);
  }, [userData]);

  const [getProfile, { data: profileData }] = useLazyQuery(GET_PROFILE, {
    variables: { associateId },
    fetchPolicy: 'cache-and-network',
    onError: (e) => console.log(`error in get profile`, e),
  });

  const [updateProfile] = useMutation(UPDATE_USER, {
    onError: (e) => console.log(`error in update profile`, e),
    refetchQueries: [
      {
        query: GET_PROFILE,
        variables: { associateId },
      },
    ],
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

  const [
    getNews,
    { loading: loadingNews, data: newsData, refetch: refetchNews },
  ] = useLazyQuery(GET_NEWS, {
    variables: {
      associateId,
      countries: marketId,
      languageCode: deviceLanguage || 'en',
    },
    onError: (e) => console.log(`error in get news`, e),
  });

  useEffect(() => {
    if (associateId && marketId && deviceLanguage) {
      getNews();
    }
  }, [associateId, marketId, deviceLanguage]);

  const news = newsData?.newsResources ?? [];

  const enabledMarket = userMarket?.countryCode !== 'jp';

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
    { loading: loadingProspectNotifications, data: prospectNotificationData },
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
      getProspectNotifications();
    }
  }, [subscriptionData]);

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
  const { data: userAccessCodesData, refetch: refetchUserAccessCodes } =
    useQuery(GET_USERS_ACCESS_CODES, {
      variables: { associateId },
    });

  const alreadyHasTeam = findIfUserHasATeam(
    associateId,
    userAccessCodesData?.accesses ?? '',
  );

  const usersTeamInfo =
    alreadyHasTeam &&
    findUsersOwnTeamInfo(associateId, userAccessCodesData?.accesses ?? '');

  const shopQUrl = 'https://qsciences.com/store/';
  const slug = profileData?.associates?.[0]?.associateSlugs?.[0]?.slug;

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
        clearFields,
        userMarket,
        ranks: ranksData?.ranks,
        markets: marketsData?.activeCountries,
        user: userData?.treeNodeFor,
        hasPermissionsToWrite,
        loadingUserData,
        userProfile: profileData?.associates?.[0],
        updateProfile,
        setMarketId,
        loadingNews,
        news,
        newsNotificationCount,
        refetchNews,
        loadingProspectNotifications,
        prospectNotifications:
          prospectNotificationData?.prospectViewsByAssociate,
        prospectNotificationCount,
        sortBy,
        setSortBy,
        addUpdateProspect,
        showAddOptions,
        setShowAddOptions,
        alreadyHasTeam,
        usersTeamInfo,
        refetchUserAccessCodes,
        shopQUrl,
        slug,
        expoPushToken,
        isPushNotificationPermsGranted,
        enabledMarket,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

LoginDataContainer.propTypes = {
  children: PropTypes.any.isRequired,
};

export default LoginDataContainer;
