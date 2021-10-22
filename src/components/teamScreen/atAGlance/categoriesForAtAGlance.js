import { Localized } from '../../../translations/Localized';

export const reshapeAtAGlanceCategories = (autoShip, glance, pieColorMap) => {
  return [
    {
      id: 0,
      title: Localized('Autoships'),
      data: [
        {
          value: autoShip?.leg1Total?.processedPv ?? 0,
          color: pieColorMap?.autoships0,
        },
        {
          value: autoShip?.leg2Total?.processedPv ?? 0,
          color: pieColorMap?.autoships1,
        },
        {
          value: autoShip?.leg3Total?.processedPv ?? 0,
          color: pieColorMap?.autoships2,
        },
      ],
      firstTotal: autoShip?.entireLineTotal?.processedPv ?? 0,
      secondTotal: autoShip?.entireLineTotal?.projectedPv ?? 0,
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
      title: Localized('Preferred Customer Enrollments'),
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
    {
      id: 3,
      title: Localized('Event Tickets'),
      data: [
        {
          value: glance?.leg1Total?.eventMonthCount ?? 0,
          color: pieColorMap?.eventTickets0,
        },
        {
          value: glance?.leg2Total?.eventMonthCount ?? 0,
          color: pieColorMap?.eventTickets1,
        },
        {
          value: glance?.leg3Total?.eventMonthCount ?? 0,
          color: pieColorMap?.eventTickets2,
        },
      ],
      firstTotal: glance?.entireLineTotal?.eventMonthCount ?? 0,
    },
  ];
};
