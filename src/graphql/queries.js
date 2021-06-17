import { gql } from '@apollo/client';

export const GET_USER = gql`
  query TreeNodeFor($associateId: Int!) {
    treeNodeFor(associateId: $associateId) {
      associateId
      uplineAssociateId
      orders {
        orderId
      }
      childAssociates {
        associateId
      }
      cv
      pv
      ov
      canSee
      associate {
        associateId
        dateModified
        companyName
        emailAddress
        firstName
        lastName
        primaryPhoneNumber
        dateSignedUp
        associateType
        languageCode
        associateStatus
      }
      qoV
      leg1
      leg2
      leg3
      totalOv
      rank {
        rankId
        minimumQoV
        maximumPerLeg
        rankName
        commission
      }
      pa
    }
  }
`;

export const GET_FOLDERS = gql``;
