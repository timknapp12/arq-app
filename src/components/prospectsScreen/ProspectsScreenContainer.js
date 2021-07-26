import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Platform, Linking } from 'react-native';
import { ADD_UPDATE_PROSPECT, DELETE_PROSPECT } from '../../graphql/mutations';
import {
  GET_PROSPECTS_BY_FIRSTNAME,
  GET_PROSPECTS_BY_LASTNAME,
} from '../../graphql/queries';
import ProspectsContext from '../../contexts/ProspectsContext';
import AppContext from '../../contexts/AppContext';

const ProspectsScreenContainer = ({ children }) => {
  const { associateId } = useContext(AppContext);

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

  const [deleteProspect] = useMutation(DELETE_PROSPECT, {
    refetchQueries: [
      {
        query:
          sortBy === 'firstName'
            ? GET_PROSPECTS_BY_FIRSTNAME
            : GET_PROSPECTS_BY_LASTNAME,
        variables: { associateId },
      },
    ],
    onError: (error) => console.log(`error`, error),
  });

  const subject = 'This is a test subject';
  const message = 'this is test body and should be updated';
  const separator = Platform.OS === 'ios' ? '&' : '?';

  const onEmail = (email) =>
    Linking.openURL(`mailto:${email}?subject=${subject}&body=${message}`);
  const onMessage = (phone) =>
    Linking.openURL(`sms:${phone}${separator}body=${message}`);
  return (
    <ProspectsContext.Provider
      value={{
        sortBy,
        setSortBy,
        onEmail,
        onMessage,
        addUpdateProspect,
        deleteProspect,
      }}>
      {children}
    </ProspectsContext.Provider>
  );
};

ProspectsScreenContainer.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ProspectsScreenContainer;
