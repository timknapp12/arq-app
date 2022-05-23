import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Modal, View } from 'react-native';
import {
  ScreenContainer,
  H4Secondary,
  NativeTouchableRadioButton,
  Flexbox,
  Picker,
  H5Black,
  Gap,
} from '../../common';
import LoginContext from '../../../contexts/LoginContext';
import { Localized } from '../../../translations/Localized';

const LeaderboardFilterModal = ({
  selectedLeaderboardMonth,
  setSelectedLeaderboardMonth,
  selectedLeaderboardType,
  setSelectedLeaderboardType,
  selectedRankId,
  setSelectedRankId,
  onClose,
  visible,
  ...props
}) => {
  const { ranks } = useContext(LoginContext);

  const [month, setMonth] = useState(selectedLeaderboardMonth);
  const [type, setType] = useState(selectedLeaderboardType);
  const [rankId, setRankId] = useState(selectedRankId);

  const reshapedRanks = ranks?.map((item) => ({
    id: item?.rankId,
    label: item?.rankName,
    value: item?.rankId.toString(),
  }));

  reshapedRanks?.unshift({ label: Localized('All'), value: '0' });

  const onSubmit = () => {
    setSelectedLeaderboardMonth(month);
    setSelectedLeaderboardType(type);
    setSelectedRankId(rankId);
    onClose();
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
          <H4Secondary>{Localized('Time Period')}</H4Secondary>
          <Flexbox align="flex-start" padding={8}>
            <NativeTouchableRadioButton
              label={Localized('This month')}
              onPress={() => setMonth('CURRENT')}
              isSelected={month === 'CURRENT'}
            />
            <Gap height="4px" />
            <NativeTouchableRadioButton
              label={Localized('Last month')}
              onPress={() => setMonth('PREVIOUS')}
              isSelected={month === 'PREVIOUS'}
            />
            <Gap height="4px" />
          </Flexbox>

          <H4Secondary>{Localized('Leaderboard')}</H4Secondary>
          <Flexbox align="flex-start" padding={8}>
            <NativeTouchableRadioButton
              label={Localized('Ambassador Enrollments')}
              onPress={() => setType('AMBASSADOR_ENROLLMENT')}
              isSelected={type === 'AMBASSADOR_ENROLLMENT'}
            />
            <Gap height="4px" />
            <NativeTouchableRadioButton
              label={Localized('PC Enrollments')}
              onPress={() => setType('PC_ENROLLMENT')}
              isSelected={type === 'PC_ENROLLMENT'}
            />
            <Gap height="4px" />
            <NativeTouchableRadioButton
              label={Localized('Event Tickets')}
              onPress={() => setType('EVENT_SALES')}
              isSelected={type === 'EVENT_SALES'}
            />
            <Gap height="4px" />
          </Flexbox>

          {type !== 'EVENT_SALES' ? (
            <View style={{ height: 60, width: '100%' }}>
              <H4Secondary>
                {type === 'PC_ENROLLMENT'
                  ? Localized('CV Rank')
                  : Localized('OV Rank')}
              </H4Secondary>
              <Flexbox
                align="flex-start"
                style={{ paddingStart: 8, marginTop: -8 }}
              >
                <Picker
                  style={{ width: '100%' }}
                  items={reshapedRanks}
                  placeholder={{}}
                  value={rankId}
                  onValueChange={(value) => {
                    setRankId(value);
                  }}
                  fontFamily="Avenir-Light"
                  fontSize={18}
                />
              </Flexbox>
            </View>
          ) : (
            <Gap height="60px" />
          )}

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
      </ScreenContainer>
    </Modal>
  );
};

LeaderboardFilterModal.propTypes = {
  selectedLeaderboardMonth: PropTypes.string.isRequired,
  setSelectedLeaderboardMonth: PropTypes.func.isRequired,
  selectedLeaderboardType: PropTypes.string.isRequired,
  setSelectedLeaderboardType: PropTypes.func.isRequired,
  selectedRankId: PropTypes.string.isRequired,
  setSelectedRankId: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default LeaderboardFilterModal;
