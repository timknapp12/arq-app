import { gql } from '@apollo/client';

export const GET_USER = gql`
  query TreeNodeFor($legacyAssociateId: Int!) {
    treeNodeFor(legacyAssociateId: $legacyAssociateId) {
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
        country {
          countryId
          countryCode
          countryName
        }
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

export const GET_RANKS = gql`
  query {
    ranks {
      rankId
      rankName
    }
  }
`;

export const GET_MARKETS = gql`
  query {
    activeCountries {
      countryId
      countryCode
      countryName
      pictureUrl
    }
  }
`;

export const GET_CORPORATE_RESOURCES = gql`
  query CorporateResoures($countries: [Int!]) {
    corporateResources(countries: $countries) {
      folderName
      folderId
      folderDescription
      isWideLayout
      pictureUrl
      displayOrder
      changedBy
      links {
        linkId
        linkTitle
        linkDescription
        linkUrl
        contentType
        extension
      }
      childFolders {
        folderName
        folderId
        folderDescription
        isWideLayout
        pictureUrl
        displayOrder
        changedBy
        childFolders {
          folderId
          folderName
          folderId
          folderDescription
          isWideLayout
          pictureUrl
          displayOrder
          changedBy
          links {
            linkId
            linkTitle
            linkDescription
            linkUrl
            contentType
            extension
          }
        }
      }
    }
  }
`;
