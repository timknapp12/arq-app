import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import {
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { ScreenContainer, Flexbox, Input } from '../common';
import AppContext from '../../contexts/AppContext';
import ContactCard from './contactCard/ContactCard';
import { GET_PROSPECTS_BY_LASTNAME } from '../../graphql/queries';

const ProspectsSearchScreen = ({ route }) => {
  const { theme, associateId } = useContext(AppContext);
  const newSearchTerm = route?.params?.searchTermFromNotifications ?? '';
  const [searchTerm, setSearchTerm] = useState('');

  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  const [isTouchDisabled, setIsTouchDisabled] = useState(false);

  const { loading, data } = useQuery(GET_PROSPECTS_BY_LASTNAME, {
    variables: { associateId },
  });

  const filterData = data?.prospects?.filter((item) => {
    const bothNames =
      `${item?.firstName} ${item?.lastName}`.toLocaleLowerCase();
    return bothNames?.includes(searchTerm.toLocaleLowerCase());
  });

  useEffect(() => {
    if (newSearchTerm) {
      setSearchTerm(newSearchTerm);
    }
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => setIsCalloutOpenFromParent(false)}
      style={{ flex: 1 }}>
      <ScreenContainer
        style={{
          justifyContent: 'flex-start',
          paddingTop: 0,
          paddingBottom: 0,
          height: '100%',
        }}>
        <Flexbox width="85%" style={{ marginTop: 18 }} padding={4}>
          <Input
            autoFocus
            testID="propsect-search-input"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            returnKeyType="done"
          />
        </Flexbox>
        {loading && searchTerm.length > 0 ? (
          <ActivityIndicator
            style={{ marginTop: 30 }}
            size="large"
            color={theme.disabledBackgroundColor}
          />
        ) : (
          <ScrollView
            style={{ flex: 1, width: '100%', height: '100%' }}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 120,
              marginTop: 8,
            }}>
            <TouchableWithoutFeedback
              onPress={() => setIsCalloutOpenFromParent(false)}>
              <Flexbox
                justify="flex-start"
                padding={10}
                onStartShouldSetResponder={() => true}
                height="100%">
                {searchTerm.length > 0 &&
                  filterData?.map((item, index) => (
                    <ContactCard
                      key={item?.prospectId}
                      style={{ zIndex: -index }}
                      data={item}
                      isCalloutOpenFromParent={isCalloutOpenFromParent}
                      setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                      isTouchDisabled={isTouchDisabled}
                      setIsTouchDisabled={setIsTouchDisabled}
                    />
                  ))}
              </Flexbox>
            </TouchableWithoutFeedback>
          </ScrollView>
        )}
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

ProspectsSearchScreen.propTypes = {
  route: PropTypes.object,
};

export default ProspectsSearchScreen;
