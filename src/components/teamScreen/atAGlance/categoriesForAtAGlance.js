import { Localized } from '../../../translations/Localized';

export const reshapeAtAGlanceCategories = (statsAtAGlance, pieColorMap) => {
  return [
    {
      id: 0,
      title: Localized('Subscriptions'),
      name: 'subscriptions',
      data: [
        {
          value: statsAtAGlance?.leg1?.processedAutoShipPv ?? 0,
          color: pieColorMap?.subscriptions0,
        },
        {
          value: statsAtAGlance?.leg2?.processedAutoShipPv ?? 0,
          color: pieColorMap?.subscriptions1,
        },
        {
          value: statsAtAGlance?.leg3?.processedAutoShipPv ?? 0,
          color: pieColorMap?.subscriptions2,
        },
      ],
      firstTotal: statsAtAGlance?.downlineAutoShip?.processedAutoShipPv ?? 0,
      secondTotal: statsAtAGlance?.downlineAutoShip?.beginningAutoShipPv ?? 0,
    },
    {
      id: 1,
      title: Localized('Ambassador Enrollments'),
      name: 'ambassador_enrollments',
      data: [
        {
          value: statsAtAGlance?.monthlyAmbComCount?.downlineCount ?? 0,
          color: pieColorMap?.ambassadorEnrollments0,
        },
        {
          value: 0,
          color: pieColorMap?.ambassadorEnrollments1,
        },
        {
          value: 0,
          color: pieColorMap?.ambassadorEnrollments2,
        },
      ],
      firstTotal: statsAtAGlance?.monthlyAmbComCount?.downlineCount ?? 0,
    },
    {
      id: 2,
      title: Localized('PC Enrollments'),
      name: 'pc_enrollments',
      data: [
        {
          value: statsAtAGlance?.monthlyPreferredCount?.downlineCount ?? 0,
          color: pieColorMap?.pcEnrollments0,
        },
        {
          value: 0,
          color: pieColorMap?.pcEnrollments1,
        },
        {
          value: 0,
          color: pieColorMap?.pcEnrollments2,
        },
      ],
      firstTotal: statsAtAGlance?.monthlyPreferredCount?.downlineCount ?? 0,
    },
    {
      id: 3,
      title: Localized('Event Tickets'),
      name: 'event_tickets',
      data: [
        {
          value: statsAtAGlance?.eventTickets?.leg1EventTicketsSold ?? 0,
          color: pieColorMap?.eventTickets0,
        },
        {
          value: statsAtAGlance?.eventTickets?.leg2EventTicketsSold ?? 0,
          color: pieColorMap?.eventTickets1,
        },
        {
          value: statsAtAGlance?.eventTickets?.leg3EventTicketsSold ?? 0,
          color: pieColorMap?.eventTickets2,
        },
      ],
      firstTotal:
        statsAtAGlance?.eventTickets?.totalDownlineEventTicketsSold ?? 0,
    },
  ];
};
