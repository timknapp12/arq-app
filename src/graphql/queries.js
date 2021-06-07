import { gql } from '@apollo/client';

export const GET_USER = gql`
  query TreeNodeFor($associateId: Int!) {
    treeNodeFor(associateId: $associateId) {
      associateId
      uplineId
      orders {
        orderId
      }
      childAssociates {
        associateId
      }
      cv
      pv
      ov
      isActive
      associate {
        associateId
        lastModified
        companyName
        emailAddress
        firstName
        lastName
        primaryPhone
        signupDate
        associateType
        languageCode
        statusId
      }
      associateType
      qoV
      leg1
      leg2
      leg3
      totalOv
      rank {
        rankId
        qoV
        maxOv
        rankName
        commission
      }
      pa
    }
  }
`;
