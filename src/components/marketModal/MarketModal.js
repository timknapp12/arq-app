import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Modal, TouchableOpacity, Alert } from 'react-native';
import {
  H4,
  Picker,
  ScreenContainer,
  H5Heavy,
  Flexbox,
  Gap,
  H5Secondary,
} from '../common';
import { Localized } from '../../translations/Localized';

const Container = styled.View`
  height: 40%;
  width: 100%;
  padding: 100px 12px 0 12px;
  justify-content: space-between;
  align-items: center;
`;

const MarketModal = ({
  visible,
  onClose,
  context,
  items,
  value,
  onValueChange,
  // the following props are used for CorporateView.js but not NewsScreen.js
  onSave = () => {},
  showLanguages = false,
  selectedLanguage = '',
  onLanguageValueChange = () => {},
}) => {
  const ref = useRef(value);
  const languageRef = useRef(selectedLanguage);
  const closeModal = () => {
    if (!value) {
      return Alert.alert(Localized('Please select a market'));
    }
    onSave();
    return onClose();
  };

  const onCancel = () => {
    onValueChange(ref?.current);
    onLanguageValueChange(languageRef?.current);
    onClose();
  };

  // we need to restructure the markets from the database into a structure that fits the dropdown picker
  const reshapedItems = items?.map((item) => ({
    id: item?.countryId,
    label: item?.countryName,
    value: item?.countryCode,
    pictureUrl: item?.pictureUrl,
  }));

  const languages = [
    { id: 0, label: Localized('English'), value: 'en' },
    { id: 1, label: Localized('Spanish'), value: 'es' },
    { id: 2, label: Localized('German'), value: 'de' },
    { id: 3, label: Localized('French'), value: 'fr' },
    { id: 4, label: Localized('Italian'), value: 'it' },
    { id: 5, label: Localized('Norwegian'), value: 'nb' },
    { id: 6, label: Localized('Czech'), value: 'cs' },
    { id: 7, label: Localized('Dutch'), value: 'nl' },
    { id: 8, label: Localized('Japanese'), value: 'ja' },
  ];

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onCancel}>
      <ScreenContainer style={{ justifyContent: 'flex-start' }}>
        <Container>
          <H4
            style={{
              width: '80%',
              textAlign: 'center',
            }}
          >
            {context === 'resources' &&
              Localized(
                `Select a market to see corresponding resources from Corporate`,
              )}
            {context === 'news' &&
              Localized(
                `Select a market to see corresponding news from Corporate`,
              )}
          </H4>
          <Flexbox>
            <Picker
              label={Localized('Market')}
              items={reshapedItems}
              value={value}
              onValueChange={onValueChange}
              placeholder={{}}
            />
            {showLanguages && (
              <Flexbox>
                <Gap size="16px" />
                <H4
                  style={{
                    width: '80%',
                    textAlign: 'center',
                  }}
                >
                  {Localized(
                    'View, share and download resources in the following language',
                  )}
                </H4>
                <Gap size="16px" />
                <Picker
                  label={Localized('Language')}
                  items={languages}
                  value={selectedLanguage}
                  onValueChange={onLanguageValueChange}
                  placeholder={{}}
                />
                <Flexbox align="flex-start">
                  <H5Secondary>{`*${Localized(
                    'If not available in the selected language, the resource will be shown in English',
                  )}`}</H5Secondary>
                </Flexbox>
              </Flexbox>
            )}
            <Gap size="16px" />
            <Flexbox direction="row" justify="flex-end">
              <TouchableOpacity
                testID="cancel-button-in-market-modal"
                onPress={onCancel}
              >
                <H5Heavy>{Localized('Cancel').toUpperCase()}</H5Heavy>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginStart: 16 }}
                testID="save-button-in-market-modal"
                onPress={closeModal}
              >
                <H5Heavy>{Localized('Save').toUpperCase()}</H5Heavy>
              </TouchableOpacity>
            </Flexbox>
          </Flexbox>
        </Container>
      </ScreenContainer>
    </Modal>
  );
};

MarketModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  context: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  onSave: PropTypes.func,
  showLanguages: PropTypes.bool,
  selectedLanguage: PropTypes.string,
  onLanguageValueChange: PropTypes.func,
};

export default MarketModal;
