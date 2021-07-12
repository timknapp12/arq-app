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

export const GET_PROFILE = gql`
  query ($associateId: Int!) {
    associates(where: { associateId: { eq: $associateId } }) {
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
    corporateResources(countries: $countries, order: { displayOrder: ASC }) {
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
          folderDescription
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
      productFolders {
        folderId
        folderName
        folderDescription
        pictureUrl
        links {
          linkId
          linkTitle
          linkDescription
          linkUrl
          contentType
          extension
        }
      }
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

export const GET_USERS_ACCESS_CODES = gql`
  query Accesses($associateId: Int!) {
    accesses(where: { associateId: { eq: $associateId } }) {
      associateId
      teamAccessId
      teamName
      accessCode
      teamOwnerAssociateId
    }
  }
`;

export const GET_TEAM_RESOURCES = gql`
  query TeamResources($teams: [String!]!) {
    teamResources(teams: $teams) {
      folderId
      folderName
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
        displayOrder
      }
    }
  }
`;

export const GET_ASSETS = gql`
  query Links($folderId: Int!) {
    links(where: { folderId: { eq: $folderId } }) {
      folderId
      linkId
      linkTitle
      linkDescription
      linkUrl
      contentType
      extension
      displayOrder
    }
  }
`;
