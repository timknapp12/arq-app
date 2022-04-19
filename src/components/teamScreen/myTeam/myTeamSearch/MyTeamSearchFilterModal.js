import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Modal } from 'react-native';
import {
  ScreenContainer,
  H4Secondary,
  NativeTouchableRadioButton,
  Flexbox,
  Picker,
  H5Black,
  Gap,
} from '../../../common';
import LoginContext from '../../../../contexts/LoginContext';
import statusList from './statusList';
import { Localized } from '../../../../translations/Localized';

const MyTeamSearchFilterModal = ({
  selectedStatus,
  setSelectedStatus,
  selectedDropdownStatus,
  setSelectedDropdownStatus,
  selectedType,
  setSelectedType,
  selectedRank,
  setSelectedRank,
  onClose,
  setHasUserSubmittedNewFilter,
  setHasSearchCompleted,
  visible,
  ...props
}) => {
  const { ranks } = useContext(LoginContext);

  const [status, setStatus] = useState(selectedStatus);
  const [dropdownStatus, setDropdownStatus] = useState(selectedDropdownStatus);
  const [type, setType] = useState(selectedType);
  const [rank, setRank] = useState(selectedRank);

  const reshapedRanks = ranks?.map((item) => ({
    id: item?.rankId,
    label: item?.rankName,
    value: item?.rankName,
  }));

  reshapedRanks?.unshift({ label: Localized('All'), value: 'ALL' });

  const statusSelectedFromPicker = status !== 'ALL' && status !== 'ACTIVE';

  const statusPickerOpacity = statusSelectedFromPicker ? 1 : 0.5;
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
    setHasUserSubmittedNewFilter(true);
    setHasSearchCompleted(false);
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      {...props}
    >
      <ScreenContainer style={{ justifyContent: 'flex-start' }}>
        <Flexbox align="flex-start" padding={40}>
          <H4Secondary>{Localized('Status')}</H4Secondary>
          <Flexbox align="flex-start" padding={8}>
            <NativeTouchableRadioButton
              label={Localized('All')}
              onPress={() => setStatus('ALL')}
              isSelected={status === 'ALL'}
            />
            <Gap height="4px" />
            <NativeTouchableRadioButton
              label={Localized('Active')}
              onPress={() => setStatus('ACTIVE')}
              isSelected={status === 'ACTIVE'}
            />
            <Gap height="4px" />
            <Flexbox
              direction="row"
              justify="flex-start"
              align="center"
              width="94%"
              style={{ marginTop: -6 }}
            >
              <NativeTouchableRadioButton
                label=""
                isSelected={statusSelectedFromPicker}
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
            <NativeTouchableRadioButton
              label={Localized('All')}
              onPress={() => setType('ALL')}
              isSelected={type === 'ALL'}
            />
            <Gap height="4px" />
            <NativeTouchableRadioButton
              label={Localized('Ambassador')}
              onPress={() => setType('AMBASSADOR')}
              isSelected={type === 'AMBASSADOR'}
            />
            <Gap height="4px" />
            <NativeTouchableRadioButton
              label="PC"
              onPress={() => setType('PREFERRED')}
              isSelected={type === 'PREFERRED'}
            />
            <Gap height="4px" />
            <NativeTouchableRadioButton
              label={Localized('Retail')}
              onPress={() => setType('RETAIL')}
              isSelected={type === 'RETAIL'}
            />
          </Flexbox>

          <H4Secondary>{Localized('Rank')}</H4Secondary>
          <Flexbox
            align="flex-start"
            style={{ paddingStart: 8, marginTop: -8 }}
          >
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
      </ScreenContainer>
    </Modal>
  );
};

MyTeamSearchFilterModal.propTypes = {
  selectedStatus: PropTypes.string.isRequired,
  setSelectedStatus: PropTypes.func.isRequired,
  selectedDropdownStatus: PropTypes.string.isRequired,
  setSelectedDropdownStatus: PropTypes.func.isRequired,
  selectedType: PropTypes.string.isRequired,
  setSelectedType: PropTypes.func.isRequired,
  selectedRank: PropTypes.string.isRequired,
  setSelectedRank: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  setHasUserSubmittedNewFilter: PropTypes.func.isRequired,
  setHasSearchCompleted: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default MyTeamSearchFilterModal;
