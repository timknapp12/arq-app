import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableOpacity } from 'react-native';
import {
  SideMenu,
  H4Secondary,
  RadioButton,
  Flexbox,
  Picker,
  H5Black,
} from '../../../common';
import LoginContext from '../../../../contexts/LoginContext';
import statusList from './statusList';
import { Localized } from '../../../../translations/Localized';

const AnimatedMenu = Animated.createAnimatedComponent(SideMenu);

const MyTeamSearchFilterMenu = ({
  selectedStatus,
  setSelectedStatus,
  selectedDropdownStatus,
  setSelectedDropdownStatus,
  selectedType,
  setSelectedType,
  selectedRank,
  setSelectedRank,
  onClose,
  ...props
}) => {
  const { ranks } = useContext(LoginContext);

  const reshapedRanks = ranks?.map((item) => ({
    label: item?.rankName,
    value: item?.rankId,
  }));

  reshapedRanks?.unshift({ label: Localized('All'), value: 'ALL' });

  const pickerOpacity =
    selectedStatus !== 'ALL' && selectedStatus !== 'ACTIVE' ? 1 : 0.5;

  return (
    <AnimatedMenu {...props}>
      <Flexbox align="flex-start" width="250px">
        <H4Secondary>{Localized('Status')}</H4Secondary>
        <Flexbox align="flex-start" padding={8}>
          <RadioButton
            label={Localized('All')}
            onPress={() => setSelectedStatus('ALL')}
            isSelected={selectedStatus === 'ALL'}
          />
          <RadioButton
            label={Localized('Active')}
            onPress={() => setSelectedStatus('ACTIVE')}
            isSelected={selectedStatus === 'ACTIVE'}
          />
          <Flexbox
            direction="row"
            justify="flex-start"
            align="center"
            width="94%"
            style={{ marginTop: -6 }}
          >
            <RadioButton
              label=""
              isSelected={
                selectedStatus !== 'ALL' && selectedStatus !== 'ACTIVE'
              }
              onPress={() => setSelectedStatus(selectedDropdownStatus)}
            />
            <Flexbox direction="row" justify="flex-start" width="100%">
              <Picker
                style={{
                  width: '100%',
                  marginStart: -10,
                  marginTop: -6,
                  opacity: pickerOpacity,
                }}
                items={statusList}
                fontFamily="Avenir-Light"
                fontSize={18}
                placeholder={{}}
                value={selectedDropdownStatus}
                onValueChange={(value) => {
                  setSelectedDropdownStatus(value);
                  setSelectedStatus(value);
                }}
              />
            </Flexbox>
          </Flexbox>
        </Flexbox>

        <H4Secondary>{Localized('Type')}</H4Secondary>
        <Flexbox align="flex-start" padding={8}>
          <RadioButton
            label={Localized('All')}
            onPress={() => setSelectedType('ALL')}
            isSelected={selectedType === 'ALL'}
          />
          <RadioButton
            label={Localized('Ambassador')}
            onPress={() => setSelectedType('AMBASSADOR')}
            isSelected={selectedType === 'AMBASSADOR'}
          />
          <RadioButton
            label="PC"
            onPress={() => setSelectedType('PREFERRED')}
            isSelected={selectedType === 'PREFERRED'}
          />
          <RadioButton
            label={Localized('Retail')}
            onPress={() => setSelectedType('RETAIL')}
            isSelected={selectedType === 'RETAIL'}
          />
        </Flexbox>

        <H4Secondary>{Localized('Rank')}</H4Secondary>
        <Flexbox align="flex-start" style={{ paddingStart: 8, marginTop: -8 }}>
          <Picker
            style={{ width: '100%' }}
            items={reshapedRanks}
            placeholder={{}}
            value={selectedRank}
            onValueChange={(value) => setSelectedRank(value)}
            fontFamily="Avenir-Light"
            fontSize={18}
            disabled={true}
          />

          <Flexbox
            direction="row"
            width="auto"
            style={{ alignSelf: 'flex-end', marginTop: 12 }}
          >
            <TouchableOpacity onPress={onClose} style={{ marginEnd: 4 }}>
              <H5Black>{Localized('Cancel').toUpperCase()}</H5Black>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginStart: 4 }}>
              <H5Black>{Localized('OK').toUpperCase()}</H5Black>
            </TouchableOpacity>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </AnimatedMenu>
  );
};

MyTeamSearchFilterMenu.propTypes = {
  selectedStatus: PropTypes.string.isRequired,
  setSelectedStatus: PropTypes.func.isRequired,
  selectedDropdownStatus: PropTypes.string.isRequired,
  setSelectedDropdownStatus: PropTypes.func.isRequired,
  selectedType: PropTypes.string.isRequired,
  setSelectedType: PropTypes.func.isRequired,
  selectedRank: PropTypes.string.isRequired,
  setSelectedRank: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MyTeamSearchFilterMenu;
