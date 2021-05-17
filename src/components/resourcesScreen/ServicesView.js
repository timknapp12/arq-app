import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { View, TouchableOpacity, Linking } from 'react-native';
import BackOfficeIcon from '../../../assets/icons/back-office-icon.svg';
import EnrollmentIcon from '../../../assets/icons/enrollment-icon.svg';
import { H4Book, H6Book, MainScrollView } from '../common';
import AppContext from '../../contexts/AppContext';
import { Localized, initLanguage } from '../../translations/Localized';

const Card = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const ServicesView = () => {
  initLanguage();
  const { theme } = useContext(AppContext);
  return (
    <MainScrollView>
      <View style={{ width: '100%' }}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://office2.myqsciences.com/#/Login')
          }>
          <Card>
            <Row>
              <BackOfficeIcon
                style={{
                  height: 48,
                  width: 48,
                  color: theme.primaryTextColor,
                  alignSelf: 'center',
                }}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginStart: 8,
                }}>
                <H4Book>{Localized('Back Office')}</H4Book>
                <H6Book>
                  {Localized(
                    'Access everything you need to build your business on the go.',
                  )}
                </H6Book>
              </View>
            </Row>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://office2.myqsciences.com/#/Login')
          }>
          <Card>
            <Row>
              <EnrollmentIcon
                style={{
                  height: 48,
                  width: 48,
                  color: theme.primaryTextColor,
                  alignSelf: 'center',
                }}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginStart: 8,
                }}>
                <H4Book>{Localized('Enroll')}</H4Book>
                <H6Book>
                  {Localized('Help people enroll with Q Sciences today.')}
                </H6Book>
              </View>
            </Row>
          </Card>
        </TouchableOpacity>
      </View>
    </MainScrollView>
  );
};

export default ServicesView;
