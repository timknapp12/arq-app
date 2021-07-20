import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  Modal,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Flexbox, Input, CloseIcon } from '../common';
import SearchIcon from '../../../assets/icons/search-icon.svg';
import DeciveContactCard from './DeciveContactCard';
import AppContext from '../../contexts/AppContext';

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.modalBackgroundColor};
  flex: 1;
`;
const Inner = styled.KeyboardAvoidingView`
  width: 90%;
  height: 70%;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 20px 20px 0px 20px;
  box-shadow: 0px 24px 12px rgba(0, 0, 0, 0.5);
`;

const DeviceContactsModal = ({
  data = [{ firstName: '', lastName: '' }],
  visible,
  onClose,
  setContactInfo,
}) => {
  const { theme } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState('');

  const filterData = data.filter((item) => {
    const bothNames =
      `${item?.firstName} ${item?.lastName}`.toLocaleLowerCase();
    return bothNames?.includes(searchTerm.toLocaleLowerCase());
  });

  const renderItem = ({ item }) => (
    <DeciveContactCard
      contact={item}
      setContactInfo={setContactInfo}
      onClose={onClose}
    />
  );
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Inner>
            <TouchableOpacity
              onPress={onClose}
              style={{ padding: 4, width: 20 }}>
              <CloseIcon />
            </TouchableOpacity>
            <Flexbox height="50px" direction="row">
              <Input
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
              />
              <SearchIcon
                style={{
                  height: 36,
                  width: 36,
                  color: theme.primaryTextColor,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
              />
            </Flexbox>
            <FlatList
              data={filterData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </Inner>
        </Container>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

DeviceContactsModal.propTypes = {
  data: PropTypes.array,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setContactInfo: PropTypes.func.isRequired,
};

export default DeviceContactsModal;
