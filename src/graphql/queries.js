import { gql } from '@apollo/client';

export const GET_USER = gql`
  query TreeNodeFor($legacyAssociateId: Int!) {
    treeNodeFor(legacyAssociateId: $legacyAssociateId) {
      associateId
      uplineTreeNode {
        associate {
          associateId
          legacyAssociateId
        }
        uplineEnrollmentTreeNode {
          associate {
            associateId
            legacyAssociateId
          }
        }
        associate {
          associateId
          legacyAssociateId
          firstName
          lastName
          associateType
          associateStatus
        }
        rank {
          rankId
          rankName
        }
        customerSalesRank {
          customerSalesRankId
          rankName
        }
        cv
        qoV
      }
      associate {
        associateId
        legacyAssociateId
        firstName
        lastName
        associateType
        associateStatus
      }
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
      teamAutoshipVolume
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
      customerSalesRank {
        customerSalesRankId
        rankName
        minimumCv
        requiredPv
      }
      previousAmbassadorMonthlyRecord {
        personalVolume
        personallySponsoredActiveAmbassadorCount
        qov
        leg1
        leg2
        leg3
        preferredCustomerVolume
        retailCustomerVolume
        teamAutoshipVolume
      }
      currentAmbassadorMonthlyRecord {
        highestRank {
          rankId
          rankName
        }
      }
      statsAtAGlance {
        downlineAutoShip {
          processedAutoShipPv
          beginningAutoShipPv
        }
        leg1 {
          processedAutoShipPv
        }
        leg2 {
          processedAutoShipPv
        }
        leg3 {
          processedAutoShipPv
        }
        monthlyAmbComCount {
          downlineCount
          downlineLeg1
          downlineLeg2
          downlineLeg3
        }
        monthlyPreferredCount {
          downlineCount
          downlineLeg1
          downlineLeg2
          downlineLeg3
        }
        eventTickets {
          leg1EventTicketsSold
          leg2EventTicketsSold
          leg3EventTicketsSold
          totalDownlineEventTicketsSold
        }
      }
      enrollmentChildTreeNodes {
        associate {
          associateId
          legacyAssociateId
          associateType
          firstName
          lastName
          associateType
          dateSignedUp
        }
      }
      childTreeNodes {
        uplineTreeNode {
          associate {
            associateId
            legacyAssociateId
          }
        }
        uplineEnrollmentTreeNode {
          associate {
            associateId
            legacyAssociateId
          }
        }
        associate {
          associateId
          legacyAssociateId
          firstName
          lastName
          profileUrl
          associateType
          associateStatus
          dateSignedUp
        }
        rank {
          rankId
          rankName
        }
        pv
        qoV
        pa
        cv
        ov
        teamAutoshipVolume
        customerSalesRank {
          customerSalesRankId
          rankName
          minimumCv
          requiredPv
        }
        previousAmbassadorMonthlyRecord {
          personalVolume
          personallySponsoredActiveAmbassadorCount
          qov
          rankId
          preferredCustomerVolume
          retailCustomerVolume
          teamAutoshipVolume
        }
        childTreeNodes {
          uplineTreeNode {
            associate {
              associateId
              legacyAssociateId
            }
          }
          uplineEnrollmentTreeNode {
            associate {
              associateId
              legacyAssociateId
            }
          }
          associate {
            associateId
            legacyAssociateId
            firstName
            lastName
            profileUrl
            associateType
            associateStatus
            dateSignedUp
          }
          rank {
            rankId
            rankName
          }
          pv
          qoV
          pa
          cv
          ov
          teamAutoshipVolume
          customerSalesRank {
            customerSalesRankId
            rankName
            minimumCv
            requiredPv
          }
          previousAmbassadorMonthlyRecord {
            personalVolume
            personallySponsoredActiveAmbassadorCount
            qov
            rankId
            preferredCustomerVolume
            retailCustomerVolume
            teamAutoshipVolume
          }
          childTreeNodes {
            associate {
              associateId
              associateType
            }
          }
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
      associateStatus
      defaultCountry
      associateSlugs {
        associateSlugId
        slug
      }
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
  query CorporateResouresV2($countryId: Int!, $languageCode: String!) {
    corporateResourcesV2(countryId: $countryId, languageCode: $languageCode) {
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

export const GET_ORDERS = gql`
  query Orders($associateId: Int!) {
    orders(associateId: $associateId) {
      orderId
      dateOrder
      totalCost
      pv
      type
      orderDetails {
        orderDetailId
        amount
        productName
        quantity
        pv
      }
    }
  }
`;

export const SEARCH_TREE = gql`
  query SearchTree(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $name: String!
    $status: AssociateStatus
    $type: AssociateTypeEnum
    $rankName: String
  ) {
    searchTree(
      first: $first
      after: $after
      last: $last
      before: $before
      name: $name
      status: $status
      type: $type
      rankName: $rankName
    ) {
      nodes {
        uplineTreeNode {
          associateId
          legacyAssociateId
        }
        uplineEnrollmentTreeNode {
          associate {
            associateId
            legacyAssociateId
          }
        }
        associateId
        legacyAssociateId
        firstName
        lastName
        profileUrl
        associateType
        associateStatus
        depth
        rank {
          rankId
          rankName
        }
        customerSalesRank {
          customerSalesRankId
          rankName
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          associateId
        }
      }
    }
  }
`;

export const CALCULATE_QOV = gql`
  query QoVFor(
    $hypotheticalRank: String!
    $leg1: Decimal!
    $leg2: Decimal!
    $leg3: Decimal!
  ) {
    qoVFor(
      hypotheticalRank: $hypotheticalRank
      leg1: $leg1
      leg2: $leg2
      leg3: $leg3
    ) {
      qoV
    }
  }
`;

export const LEADERBOARD = gql`
  query Leaderboard(
    $leaderboardMonth: LeaderboardMonth! # Either 'CURRENT' or 'PREVIOUS'
    $leaderboardScope: LeaderboardScope! # Either 'ENTIRE_COMPANY' or 'MY_TEAM'
    $leaderboardType: LeaderboardType! # Either 'AMBASSADOR_ENROLLMENT' or 'PC_ENROLLMENT' or 'EVENT_SALES'
    $rankId: Int! # results will show only rank greater or equal to the rankId
  ) {
    leaderboard(
      input: {
        leaderboardMonth: $leaderboardMonth
        leaderboardScope: $leaderboardScope
        leaderboardType: $leaderboardType
        rankId: $rankId
      }
    ) {
      leaderboardType
      items {
        associate {
          associateId
          firstName
          lastName
          profileUrl
        }
        count
        place
        displayOrder
        rank {
          rankId
          rankName
        }
        customerSalesRank {
          customerSalesRankId
          rankName
        }
      }
    }
  }
`;
