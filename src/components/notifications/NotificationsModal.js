import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Modal, View } from 'react-native';
import { useMutation } from '@apollo/client';
import {
  ScreenContainer,
  Header,
  H3,
  CloseIcon,
  LoadingSpinner,
  PrimaryButton,
  Flexbox,
  H5Black,
  Gap,
  MainScrollView,
} from '../common';
import NotificationCard from './notificationCard/NotificationCard';
import { checkForPinnedNotifications } from '../../utils/notifications/checkForPinnedNotifications';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import { Localized } from '../../translations/Localized';
import { CLEAR_ALL_PROPSECT_NOTIFICATIONS } from '../../graphql/mutations';

const NotificationsModal = ({ visible, onClose }) => {
  const { associateId } = useContext(AppContext);
  const { prospectNotifications, refetchProspectsNotifications } =
    useContext(LoginContext);

  const areTherePinnedNotifications = checkForPinnedNotifications(
    prospectNotifications,
  );

  const [isLoading, setIsLoading] = useState(false);

  const [clearAll] = useMutation(CLEAR_ALL_PROPSECT_NOTIFICATIONS, {
    variables: { associateId, deletePinned: false },
    onCompleted: async () => {
      await refetchProspectsNotifications();
      setIsLoading(false);
      //  if there are no more pinned notifications then close the notification column
      !areTherePinnedNotifications && onClose();
    },
    onError: (error) => console.log(`error in clear all:`, error),
  });

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <ScreenContainer style={{ justifyContent: 'flex-start' }}>
        <Header>
          <TouchableOpacity
            style={{ padding: 8 }}
            testID="my-info-close-modal-button"
            onPress={onClose}
          >
            <CloseIcon />
          </TouchableOpacity>
          <H3>{Localized('Notifications').toUpperCase()}</H3>
          <View style={{ width: 30 }} />
        </Header>
        {isLoading ? (
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
              <Flexbox height="90%">
                <MainScrollView paddingBottom={0}>
                  {prospectNotifications?.map((item) => (
                    <NotificationCard
                      key={item?.viewId}
                      data={item}
                      onClose={onClose}
                    />
                  ))}
                </MainScrollView>
                <Flexbox width="85%" padding={12}>
                  <PrimaryButton
                    onPress={() => {
                      setIsLoading(true);
                      clearAll();
                    }}
                  >
                    {Localized('Clear All').toUpperCase()}
                  </PrimaryButton>
                </Flexbox>
              </Flexbox>
            )}
          </>
        )}
      </ScreenContainer>
    </Modal>
  );
};

NotificationsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationsModal;
