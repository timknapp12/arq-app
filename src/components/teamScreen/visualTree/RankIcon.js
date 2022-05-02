import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Builder from '../../../../assets/icons/RankIcon-Builder.svg';
import Pro from '../../../../assets/icons/RankIcon-Pro.svg';
import Executive from '../../../../assets/icons/RankIcon-Executive.svg';
import Elite from '../../../../assets/icons/RankIcon-Elite.svg';
import Bronze from '../../../../assets/icons/RankIcon-Bronze.svg';
import Silver from '../../../../assets/icons/RankIcon-Silver.svg';
import Gold from '../../../../assets/icons/RankIcon-Gold.svg';
import Platinum from '../../../../assets/icons/RankIcon-Platinum.svg';
import Ruby from '../../../../assets/icons/RankIcon-Ruby.svg';
import Emerald from '../../../../assets/icons/RankIcon-Emerald.svg';
import Diamond from '../../../../assets/icons/RankIcon-Diamond.svg';
import BlueDiamond from '../../../../assets/icons/RankIcon-BlueDiamond.svg';
import BlackDiamond from '../../../../assets/icons/RankIcon-BlackDiamond.svg';
import RoyalDiamond from '../../../../assets/icons/RankIcon-RoyalDiamond.svg';
import PresidentialDiamond from '../../../../assets/icons/RankIcon-PresidentialDiamond.svg';
import CrownDiamond from '../../../../assets/icons/RankIcon-CrownDiamond.svg';

const rankIconMap = {
  Ambassador: () => <View />,
  Builder: Builder,
  Pro: Pro,
  Executive: Executive,
  Elite: Elite,
  Bronze: Bronze,
  Silver: Silver,
  Gold: Gold,
  Platinum: Platinum,
  Ruby: Ruby,
  Emerald: Emerald,
  Diamond: Diamond,
  'Blue Diamond': BlueDiamond,
  'Black Diamond': BlackDiamond,
  'Royal Diamond': RoyalDiamond,
  'Presidential Diamond': PresidentialDiamond,
  'Crown Diamond': CrownDiamond,
};

const RankIcon = ({ rankName }) => {
  const IconComponent = rankIconMap[rankName] ?? <View />;
  return <IconComponent />;
};

RankIcon.propTypes = {
  rankName: PropTypes.string,
};

export default RankIcon;
