import { Localized } from '../../translations/Localized';

export const mockUser = {
  lastMonthPV: 150,
  thisMonthPV: 305,
  lastMonthQOV: 200000,
  thisMonthQOV: 350000,
  OV: 2224731,
  lastMonthPA: 1,
  thisMonthPA: 2,
  thisMonthCV: 256,
  leg1OV: 1190000,
  leg2OV: 115500,
  leg3OV: 115500,
  currentRank: {
    legMaxPerc: 40,
    legMaxOV: 140000,
    id: 10,
    requiredPV: 200,
    requiredPA: 2,
    requiredQOV: 350000,
    name: Localized('Emerald'),
  },
  personalInfo: {
    image: {
      imageName: 'Sloane.Taylor.34903f19-d0c7-41b6-b4d2-2eed0ad1ef6c',
      url:
        'https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/profile_images%2FSloane.Taylor.94f93ae8-9b3d-4cf3-a7ee-3f213707ebc6?alt=media&token=52c072d4-62e1-4ab0-b4c4-3090fcb0d4e5',
    },
    firstName: 'Sloane',
    lastName: 'Taylor',
    displayName: 'sloanet',
    username: 'sloaniejoanie',
    email: 'sloanetaylor@gmail.com',
    phone: '801-435-9064',
    associateId: '12340987',
    address1: '1234 S 5600 W',
    address2: '',
    city: 'Lehi',
    state: 'UT',
    zipcode: '84043',
    country: 'us',
  },
};
