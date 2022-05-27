import React, { useState, useContext } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useMutation } from '@apollo/client';
import { CommonActions, useNavigation } from '@react-navigation/native';
import {
  ScreenContainer,
  Header,
  H4Heavy,
  H3,
  CloseIcon,
  LoadingSpinner,
  Flexbox,
  H5Black,
  Gap,
  MainScrollView,
} from '../common';
import NotificationCard from './notificationCard/NotificationCard';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import { Localized } from '../../translations/Localized';
import { CLEAR_ALL_PROPSECT_NOTIFICATIONS } from '../../graphql/mutations';
import { GET_PROSPECT_NOTIFICATIONS } from '../../graphql/queries';
import { Divider } from './notificationCard/notificationCard.styles';

const NotificationsScreen = () => {
  const { associateId } = useContext(AppContext);
  const { prospectNotifications, loadingProspectNotifications } =
    useContext(LoginContext);

  const [idOfExpandedCard, setIdOfExpandedCard] = useState(0);
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(true);

  const navigation = useNavigation();
  const onClose = () => navigation.dispatch(CommonActions.goBack());

  const [clearAll] = useMutation(CLEAR_ALL_PROPSECT_NOTIFICATIONS, {
    variables: { associateId, deletePinned: false },
    refetchQueries: [
      { query: GET_PROSPECT_NOTIFICATIONS, variables: { associateId } },
    ],
    onError: (error) => console.log(`error in clear all:`, error),
  });

  const onTapOutsideBoundary = () => {
    setIsCalloutOpenFromParent(false);
    setTimeout(() => {
      setIsCalloutOpenFromParent(true);
    }, 500);
  };

  return (
    <ScreenContainer
      style={{ justifyContent: 'flex-start', paddingBottom: 40 }}
    >
      <Header>
        <TouchableOpacity
          style={{ padding: 8, width: 80 }}
          testID="my-info-close-modal-button"
          onPress={onClose}
        >
          <CloseIcon />
        </TouchableOpacity>
        <H3>{Localized('Notifications').toUpperCase()}</H3>
        {prospectNotifications?.length > 0 ? (
          <TouchableOpacity onPress={clearAll}>
            <H4Heavy style={{ width: 80, textAlign: 'right' }}>
              {Localized('Clear').toUpperCase()}
            </H4Heavy>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 80 }} />
        )}
      </Header>
      <Divider />
      {loadingProspectNotifications ? (
        <Flexbox padding={12}>
          <H5Black>{Localized('Loading Notifications')}</H5Black>
          <Gap height="12px" />
          <LoadingSpinner size="large" />
        </Flexbox>
      ) : (
        <>
          {prospectNotifications?.length < 1 ? (
            <H5Black style={{ marginTop: 10 }}>
              {Localized('No notifications')}
            </H5Black>
          ) : (
            <TouchableWithoutFeedback onPress={onTapOutsideBoundary}>
              <Flexbox height="92%">
                <MainScrollView paddingBottom={120}>
                  {prospectNotifications?.map((item, index) => (
                    <NotificationCard
                      style={{ zIndex: -index }}
                      key={item?.viewId}
                      data={item}
                      idOfExpandedCard={idOfExpandedCard}
                      setIdOfExpandedCard={setIdOfExpandedCard}
                      isCalloutOpenFromParent={isCalloutOpenFromParent}
                    />
                  ))}
                </MainScrollView>
              </Flexbox>
            </TouchableWithoutFeedback>
          )}
        </>
      )}
    </ScreenContainer>
  );
};

export default NotificationsScreen;
