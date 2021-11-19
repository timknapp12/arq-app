import React, { useState, useContext } from 'react';
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

  const [status, setStatus] = useState(selectedStatus);
  const [dropdownStatus, setDropdownStatus] = useState(selectedDropdownStatus);
  const [type, setType] = useState(selectedType);
  const [rank, setRank] = useState(selectedRank);

  const reshapedRanks = ranks?.map((item) => ({
    label: item?.rankName,
    value: item?.rankId.toString(),
  }));

  reshapedRanks?.unshift({ label: Localized('All'), value: 'ALL' });

  const statusPickerOpacity = status !== 'ALL' && status !== 'ACTIVE' ? 1 : 0.5;
  const rankPickerOpacity = type === 'AMBASSADOR' ? 1 : 0.5;

  const onSubmit = () => {
    if (type !== 'AMBASSADOR') {
      setSelectedRank('ALL');
    } else {
      setSelectedRank(rank);
    }
    setSelectedStatus(status);
    setSelectedDropdownStatus(dropdownStatus);
    setSelectedType(type);
    onClose();
  };

  return (
    <AnimatedMenu {...props}>
      <Flexbox align="flex-start" width="250px">
        <H4Secondary>{Localized('Status')}</H4Secondary>
        <Flexbox align="flex-start" padding={8}>
          <RadioButton
            label={Localized('All')}
            onPress={() => setStatus('ALL')}
            isSelected={status === 'ALL'}
          />
          <RadioButton
            label={Localized('Active')}
            onPress={() => setStatus('ACTIVE')}
            isSelected={status === 'ACTIVE'}
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
              isSelected={status !== 'ALL' && status !== 'ACTIVE'}
              onPress={() => setStatus(dropdownStatus)}
            />
            <Flexbox direction="row" justify="flex-start" width="100%">
              <Picker
                style={{
                  width: '100%',
                  marginStart: -10,
                  marginTop: -6,
                  opacity: statusPickerOpacity,
                }}
                items={statusList}
                fontFamily="Avenir-Light"
                fontSize={18}
                placeholder={{}}
                value={dropdownStatus}
                onValueChange={(value) => {
                  setDropdownStatus(value);
                  setStatus(value);
                }}
              />
            </Flexbox>
          </Flexbox>
        </Flexbox>

        <H4Secondary>{Localized('Type')}</H4Secondary>
        <Flexbox align="flex-start" padding={8}>
          <RadioButton
            label={Localized('All')}
            onPress={() => setType('ALL')}
            isSelected={type === 'ALL'}
          />
          <RadioButton
            label={Localized('Ambassador')}
            onPress={() => setType('AMBASSADOR')}
            isSelected={type === 'AMBASSADOR'}
          />
          <RadioButton
            label="PC"
            onPress={() => setType('PREFERRED')}
            isSelected={type === 'PREFERRED'}
          />
          <RadioButton
            label={Localized('Retail')}
            onPress={() => setType('RETAIL')}
            isSelected={type === 'RETAIL'}
          />
        </Flexbox>

        <H4Secondary>{Localized('Rank')}</H4Secondary>
        <Flexbox align="flex-start" style={{ paddingStart: 8, marginTop: -8 }}>
          <Picker
            style={{ width: '100%', opacity: rankPickerOpacity }}
            items={reshapedRanks}
            placeholder={{}}
            value={rank}
            onValueChange={(value) => {
              setRank(value);
              setType('AMBASSADOR');
            }}
            fontFamily="Avenir-Light"
            fontSize={18}
            // disabled={true}
          />

          <Flexbox
            direction="row"
            width="auto"
            style={{ alignSelf: 'flex-end', marginTop: 12 }}
          >
            <TouchableOpacity onPress={onClose} style={{ marginEnd: 4 }}>
              <H5Black>{Localized('Cancel').toUpperCase()}</H5Black>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSubmit} style={{ marginStart: 4 }}>
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
