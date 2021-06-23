import { Localized } from '../../translations/Localized';

export const mockUser = {
  lastMonthPV: 150,
  thisMonthPV: 305,
  lastMonthQOV: 200000,
  thisMonthQOV: 350000,
  totalOv: 2224731,
  lastMonthPA: 1,
  thisMonthPA: 2,
  thisMonthCV: 256,
  leg1: 1190000,
  leg2: 115500,
  leg3: 115500,
  rank: {
    rankId: 10,
    minimumQoV: 350000,
    maximumPerLeg: 140000,
    legMaxPercentage: 40,
    requiredPv: 200,
    requiredPa: 2,
    rankName: Localized('Emerald'),
  },
  associate: {
    profileImageFileName: 'Sloane.Taylor.2f79ef5f-58d1-4358-b12b-2ab05e3e4dc8',
    profileUrl:
      'https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/profile_images%2FSloane.Taylor.94f93ae8-9b3d-4cf3-a7ee-3f213707ebc6?alt=media&token=52c072d4-62e1-4ab0-b4c4-3090fcb0d4e5',
    firstName: 'Sloane',
    lastName: 'Taylor',
    displayName: 'sloanet',
    username: 'sloaniejoanie',
    email: 'sloanetaylor@gmail.com',
    primaryPhoneNumber: '801-435-9064',
    associateId: '12340987',
    address: {
      address1: '1234 S 5600 W',
      address2: '',
      city: 'Lehi',
      state: 'UT',
      zip: '84043',
      countryCode: 'us',
    },
  },
};
