import { Localized } from '../../../translations/Localized';

export const reshapeAtAGlanceCategories = (
  statsAtAGlance,
  glance,
  pieColorMap,
) => {
  return [
    {
      id: 0,
      title: Localized('Autoships'),
      data: [
        {
          value: statsAtAGlance?.leg1?.processedAutoShipPv ?? 0,
          color: pieColorMap?.autoships0,
        },
        {
          value: statsAtAGlance?.leg2?.processedAutoShipPv ?? 0,
          color: pieColorMap?.autoships1,
        },
        {
          value: statsAtAGlance?.leg3?.processedAutoShipPv ?? 0,
          color: pieColorMap?.autoships2,
        },
      ],
      firstTotal: statsAtAGlance?.downlineAutoShip?.processedAutoShipPv ?? 0,
      secondTotal: statsAtAGlance?.downlineAutoShip?.beginningAutoShipPv ?? 0,
    },
    {
      id: 1,
      title: Localized('Ambassador Enrollments'),
      data: [
        {
          value: glance?.leg1Total?.ambassadorMonthCount ?? 0,
          color: pieColorMap?.ambassadorEnrollments0,
        },
        {
          value: glance?.leg2Total?.ambassadorMonthCount ?? 0,
          color: pieColorMap?.ambassadorEnrollments1,
        },
        {
          value: glance?.leg3Total?.ambassadorMonthCount ?? 0,
          color: pieColorMap?.ambassadorEnrollments2,
        },
      ],
      firstTotal: glance?.entireLineTotal?.ambassadorMonthCount ?? 0,
    },
    {
      id: 2,
      title: Localized('PC Enrollments'),
      data: [
        {
          value: glance?.leg1Total?.preferedMonthCount ?? 0,
          color: pieColorMap?.pcEnrollments0,
        },
        {
          value: glance?.leg2Total?.preferedMonthCount ?? 0,
          color: pieColorMap?.pcEnrollments1,
        },
        {
          value: glance?.leg3Total?.preferedMonthCount ?? 0,
          color: pieColorMap?.pcEnrollments2,
        },
      ],
      firstTotal: glance?.entireLineTotal?.preferedMonthCount ?? 0,
    },
    // TODO integrate stats for event tickets when they are ready
    // {
    //   id: 3,
    //   title: Localized('Event Tickets'),
    //   data: [
    //     {
    //       value: glance?.leg1Total?.eventMonthCount ?? 0,
    //       color: pieColorMap?.eventTickets0,
    //     },
    //     {
    //       value: glance?.leg2Total?.eventMonthCount ?? 0,
    //       color: pieColorMap?.eventTickets1,
    //     },
    //     {
    //       value: glance?.leg3Total?.eventMonthCount ?? 0,
    //       color: pieColorMap?.eventTickets2,
    //     },
    //   ],
    //   firstTotal: glance?.entireLineTotal?.eventMonthCount ?? 0,
    // },
  ];
};
