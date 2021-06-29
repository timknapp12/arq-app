import { gql } from '@apollo/client';

export const GET_USER = gql`
  query TreeNodeFor($legacyAssociateId: Int!) {
    treeNodeFor(legacyAssociateId: $legacyAssociateId) {
      associateId
      uplineAssociateId
      orders {
        orderId
      }
      cv
      pv
      ov
      qoV
      pa
      canSee
      associate {
        associateId
        legacyAssociateId
        profileUrl
        profileImageFileName
        firstName
        lastName
        displayName
        emailAddress
        primaryPhoneNumber
        associateType
        languageCode
        associateStatus
        country {
          countryId
          countryCode
          countryName
        }
        address {
          address1
          address2
          city
          state
          zip
          countryCode
        }
      }
      rank {
        rankId
      }
      leg1
      leg2
      leg3
      totalOv
      rank {
        rankId
        minimumQoV
        maximumPerLeg
        legMaxPercentage
        rankName
        commission
        requiredPv
        requiredPa
      }
      previousAmbassadorMonthlyRecord {
        personalVolume
        personallySponsoredActiveAmbassadorCount
        qov
      }
      currentAmbassadorMonthlyRecord {
        highestRank {
          rankId
          rankName
        }
      }
    }
  }
`;

export const GET_RANKS = gql`
  query {
    ranks {
      rankId
      rankName
      minimumQoV
      maximumPerLeg
      legMaxPercentage
      requiredPv
      requiredPa
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
      isWideLayout
      pictureUrl
      displayOrder
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
        isWideLayout
        pictureUrl
        displayOrder
        childFolders {
          folderId
          folderName
          folderId
          isWideLayout
          pictureUrl
          displayOrder
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

export const SEARCH_RESOURCES = gql`
  query SearchResources(
    $countries: [Int!]
    $teams: [String!]
    $searchList: [String!]
  ) {
    searchResources(
      countries: $countries
      teams: $teams
      searchList: $searchList
    ) {
      folderId
      folderName
      folderDescription
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
`;
