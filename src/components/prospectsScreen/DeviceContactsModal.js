import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Modal, FlatList, TouchableOpacity } from 'react-native';
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
  max-height: 80%;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 20px 20px 0px 20px;
  box-shadow: 0px 24px 12px rgba(0, 0, 0, 0.5);
`;

const DeviceContactsModal = ({ data, visible, onClose }) => {
  const { theme } = useContext(AppContext);
  //   console.log(`data`, data);
  const renderItem = ({ item }) => <DeciveContactCard contact={item} />;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <Container>
        <Inner>
          <TouchableOpacity onPress={onClose}>
            <CloseIcon />
          </TouchableOpacity>
          <Flexbox height="50px" direction="row">
            <Input autoFocus />
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
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </Inner>
      </Container>
    </Modal>
  );
};

DeviceContactsModal.propTypes = {
  data: PropTypes.array,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeviceContactsModal;
