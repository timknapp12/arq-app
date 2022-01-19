import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import PieChart from './PieChart';
import CardForAtAGlance from './CardForAtAGlance';
import { Gap, H4Black } from '../../common';
import { reshapeAtAGlanceCategories } from './categoriesForAtAGlance';
import AppContext from '../../../contexts/AppContext';
import LoginContext from '../../../contexts/LoginContext';
import { maxWidth } from '../../../styles/constants';

const AtAGlanceView = ({ closeMenus, ...props }) => {
  const { theme } = useContext(AppContext);
  const { user } = useContext(LoginContext);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  const pieColorMap = {
    autoships0: theme.autoshipPie1,
    autoships1: theme.autoshipPie2,
    autoships2: theme.autoshipPie3,
    ambassadorEnrollments0: theme.ambassadorEnrollmentsPie1,
    ambassadorEnrollments1: theme.ambassadorEnrollmentsPie2,
    ambassadorEnrollments2: theme.ambassadorEnrollmentsPie3,
    pcEnrollments0: theme.pcEnrollmentsPie1,
    pcEnrollments1: theme.pcEnrollmentsPie2,
    pcEnrollments2: theme.pcEnrollmentsPie3,
    // eventTickets feature is not ready yet to implelment
    eventTickets0: theme.eventTicketsPie1,
    eventTickets1: theme.eventTicketsPie2,
    eventTickets2: theme.eventTicketsPie3,
    // payouts feature is not ready yet to implelment
    payouts0: theme.payoutsPie1,
    payouts1: theme.payoutsPie2,
    payouts2: theme.payoutsPie3,
  };

  // TODO - delete the mock data
  const mockGlance = {
    entireLineTotal: {
      ambassadorMonthCount: 8,
      eventMonthCount: 14,
      preferedMonthCount: 4,
    },
    leg1Total: {
      ambassadorMonthCount: 5,
      eventMonthCount: 8,
      preferedMonthCount: 2,
    },
    leg2Total: {
      ambassadorMonthCount: 2,
      eventMonthCount: 4,
      preferedMonthCount: 1,
    },
    leg3Total: {
      ambassadorMonthCount: 1,
      eventMonthCount: 2,
      preferedMonthCount: 1,
    },
  };

  useEffect(() => {
    const reshapedCategories = reshapeAtAGlanceCategories(
      user?.statsAtAGlance,
      user?.glance ?? mockGlance,
      pieColorMap,
    );
    setCategories(reshapedCategories);
    setSelectedCategory(reshapedCategories?.[0]);
  }, []);

  return (
    <View {...props} style={{ width: '100%', padding: 12, maxWidth }}>
      <H4Black style={{ textAlign: 'center' }}>
        {selectedCategory?.title ?? ''}
      </H4Black>
      <PieChart
        data={selectedCategory?.data || []}
        accessor="value"
        firstTotal={selectedCategory?.firstTotal ?? 0}
        secondTotal={selectedCategory?.secondTotal ?? 0}
        closeMenus={closeMenus}
      />
      {categories.map((item) => (
        <View key={item?.id}>
          <Gap height="8px" />
          <CardForAtAGlance
            title={item?.title}
            value={item?.firstTotal ?? 0}
            onPress={() => {
              setSelectedCategory(item);
              closeMenus();
            }}
            selected={selectedCategory?.title === item?.title}
          />
        </View>
      ))}
    </View>
  );
};

AtAGlanceView.propTypes = {
  closeMenus: PropTypes.func.isRequired,
};

export default AtAGlanceView;
