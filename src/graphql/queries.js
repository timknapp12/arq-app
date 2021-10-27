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
      autoShip {
        leg1Total {
          processedPv
        }
        leg2Total {
          processedPv
        }
        leg3Total {
          processedPv
        }
        entireLineTotal {
          processedPv
          projectedPv
        }
      }
      glance {
        entireLineTotal {
          ambassadorMonthCount
          eventMonthCount
          preferedMonthCount
        }
        leg1Total {
          ambassadorMonthCount
          eventMonthCount
          preferedMonthCount
        }
        leg2Total {
          ambassadorMonthCount
          eventMonthCount
          preferedMonthCount
        }
        leg3Total {
          ambassadorMonthCount
          eventMonthCount
          preferedMonthCount
        }
      }
      childTreeNodes {
        associate {
          associateId
          legacyAssociateId
          firstName
          lastName
          profileUrl
          associateType
          associateStatus
        }
        rank {
          rankId
          rankName
        }
        pv
        qoV
        pa
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
      associateStatus
      defaultCountry
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
  query ActiveCountries($language: String) {
    activeCountries(language: $language) {
      countryId
      countryCode
      countryName
      pictureUrl
    }
  }
`;

export const GET_CORPORATE_RESOURCES = gql`
  query CorporateResoures($countries: [Int!], $languageCode: String) {
    corporateResources(
      countries: $countries
      languageCode: $languageCode
      order: { displayOrder: ASC }
    ) {
      originalFolderName
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
    $language: String
  ) {
    searchResources(
      countries: $countries
      teams: $teams
      searchList: $searchList
      language: $language
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
        folderId
        displayOrder
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
    links(
      where: { folderId: { eq: $folderId } }
      order: { displayOrder: ASC }
    ) {
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

export const GET_PROSPECTS_BY_FIRSTNAME = gql`
  query Prospects($associateId: Int!) {
    prospects(
      where: { associateId: { eq: $associateId } }
      order: { firstName: ASC }
    ) {
      prospectId
      thumbnailUrl
      firstName
      lastName
      displayName
      emailAddress
      primaryPhone
      notes
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

export const GET_PROSPECTS_BY_LASTNAME = gql`
  query Prospects($associateId: Int!) {
    prospects(
      where: { associateId: { eq: $associateId } }
      order: { lastName: ASC }
    ) {
      prospectId
      thumbnailUrl
      firstName
      lastName
      displayName
      emailAddress
      primaryPhone
      notes
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

export const GET_NEWS = gql`
  query NewsResources(
    $associateId: Int!
    $countries: [Int!]
    $languageCode: String
  ) {
    newsResources(
      associateId: $associateId
      countries: $countries
      languageCode: $languageCode
      order: { displayOrder: ASC }
    ) {
      folderId
      folderName
      links {
        linkId
        linkUrl
        linkTitle
        linkDescription
        dateStart
        dateCreated
        imageUrl
        isViewedByAssociate
      }
    }
  }
`;

export const GET_PROSPECT_NOTIFICATIONS = gql`
  query ProspectViewsByAssociate($associateId: Int!) {
    prospectViewsByAssociate(associateId: $associateId) {
      viewId
      isSaved
      isReadByAssociate
      dateViewUtc
      prospect {
        firstName
        lastName
        prospectId
      }
      sentLinks {
        displayName
        sentLinkId
      }
    }
  }
`;
