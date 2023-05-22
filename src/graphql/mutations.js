import { gql } from '@apollo/client';

// possible values returned for loginStatus: "VERIFICATION_NEEDED", "NOT_AN_AMBASSADOR", "SUCCESS"
export const LOGIN_USER = gql`
  mutation LoginArqAmbassador {
    loginArqAmbassador {
      success
      loginResults
      message
      associate {
        associateId
        legacyAssociateId
        emailAddress
        primaryPhoneNumber
      }
    }
  }
`;

// possible values returned for status: "NOT_FOUND", "NOT_AN_AMBASSADOR", 'CALL_SUPPORT', "SUCCESS"
export const DIRECT_SCALE_INFO = gql`
  mutation DirectScaleInfo($ambassadorOnly: Boolean!, $userName: String!) {
    directScaleInfo(ambassadorOnly: $ambassadorOnly, userName: $userName) {
      status
      associate {
        associateId
        legacyAssociateId
        uniqueEmailAddress
        emailAddress
        primaryPhoneNumber
        secondaryPhoneNumber
      }
    }
  }
`;

// possible values returned for status: 'VERIFICATION_COMPLETE', 'MESSAGE_SENT', 'FAILURE'
export const LOGIN_VALIDATION_PROCESS = gql`
  mutation LoginValidationProcess(
    $method: ValidationMethod!
    $loginName: String!
    $verificationInfo: String!
    $language: String
  ) {
    loginValidationProcess(
      input: {
        method: $method
        loginName: $loginName
        verificationInfo: $verificationInfo
        language: $language
      }
    ) {
      status
      associate {
        associateId
        legacyAssociateId
      }
    }
  }
`;

// possible values returned for status: 'VERIFICATION_COMPLETE', 'CAN_NOT_FIND_TOKEN'
export const CONFIRM_ACCESS_CODE = gql`
  mutation LoginValidationToken($loginName: String!, $accessCode: String!) {
    loginValidationToken(
      input: { loginName: $loginName, accessCode: $accessCode }
    ) {
      status
      associate {
        associateId
        legacyAssociateId
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateAssociateV2(
    $associateId: Int!
    $profileUrl: String
    $profileImageFileName: String
    $firstName: String
    $lastName: String
    $displayName: String
    $emailAddress: String
    $primaryPhoneNumber: String
    $address: InputAddressInput
    $defaultCountry: Int
  ) {
    updateAssociateV2(
      input: {
        associateId: $associateId
        profileUrl: $profileUrl
        profileImageFileName: $profileImageFileName
        firstName: $firstName
        lastName: $lastName
        displayName: $displayName
        emailAddress: $emailAddress
        primaryPhoneNumber: $primaryPhoneNumber
        address: $address
        defaultCountry: $defaultCountry
      }
    ) {
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

export const ADD_TEAM_ACCESS_CODE = gql`
  mutation AddUpdateTeamAccess(
    $associateId: Int!
    $teamName: String!
    $accessCode: String!
    $teamAccessId: Int!
  ) {
    addUpdateTeamAccess(
      input: {
        associateId: $associateId
        teamName: $teamName
        accessCode: $accessCode
        teamAccessId: $teamAccessId
      }
    ) {
      accessCode
      teamName
    }
  }
`;

export const ADD_UPDATE_FOLDER = gql`
  mutation AddUpateFolder(
    $folderId: Int!
    $teamAssociateId: Int!
    $folderName: String!
    $folderDescription: String!
    $isWideLayout: Boolean!
    $pictureUrl: String!
    $teamName: String!
    $teamAccessCode: String!
    $changedBy: String!
    $displayOrder: Int!
    $folderType: FolderTypeEnum!
    $fileName: String!
    $comments: String!
  ) {
    addUpdateFolder(
      input: {
        folderId: $folderId
        teamAssociateId: $teamAssociateId
        folderName: $folderName
        folderDescription: $folderDescription
        isWideLayout: $isWideLayout
        pictureUrl: $pictureUrl
        teamName: $teamName
        teamAccessCode: $teamAccessCode
        changedBy: $changedBy
        displayOrder: $displayOrder
        folderType: $folderType
        fileName: $fileName
        comments: $comments
      }
    ) {
      folderName
    }
  }
`;

// this will automatically create a folder for the user under the team name
// it will return with a 200 BUT false if the team name is not unique
export const CREATE_TEAM = gql`
  mutation NewTeamAccess(
    $associateId: Int!
    $teamName: String!
    $accessCode: String!
    $folderName: String!
  ) {
    newTeamAccess(
      input: {
        associateId: $associateId
        teamName: $teamName
        accessCode: $accessCode
        folderName: $folderName
      }
    )
  }
`;

export const ADD_UPDATE_ASSET = gql`
  mutation AddUpdateLink(
    $folderId: Int!
    $linkId: Int!
    $linkTitle: String!
    $linkUrl: String!
    $linkDescription: String!
    $contentType: String!
    $extension: String
    $comments: String
    $displayOrder: Int! # $fileName: String!
    $fileName: String!
    $imageUrl: String
    $dateStart: DateTime
    $dateEnd: DateTime
    $changedBy: String!
  ) {
    addUpdateLink(
      input: {
        folderId: $folderId
        linkId: $linkId
        linkTitle: $linkTitle
        linkUrl: $linkUrl
        linkDescription: $linkDescription
        contentType: $contentType
        extension: $extension
        comments: $comments
        displayOrder: $displayOrder
        fileName: $fileName
        imageUrl: $imageUrl
        dateStart: $dateStart
        dateEnd: $dateEnd
        changedBy: $changedBy
      }
    ) {
      linkTitle
    }
  }
`;

export const DELETE_FOLDER = gql`
  mutation DeleteFolder($folderId: Int!) {
    deleteFolder(folderId: $folderId)
  }
`;

export const DELETE_ASSET = gql`
  mutation DeleteLink($linkId: Int!) {
    deleteLink(linkId: $linkId)
  }
`;

export const ADD_UPDATE_PROSPECT = gql`
  mutation AddUpdateProspectV2(
    $associateId: Int!
    $prospectId: String!
    $thumbnailUrl: String
    $firstName: String!
    $lastName: String!
    $displayName: String
    $emailAddress: String
    $primaryPhone: String
    $address: InputAddressInput
    $notes: String
  ) {
    addUpdateProspectV2(
      input: {
        associateId: $associateId
        prospectId: $prospectId
        thumbnailUrl: $thumbnailUrl
        firstName: $firstName
        lastName: $lastName
        displayName: $displayName
        emailAddress: $emailAddress
        primaryPhone: $primaryPhone
        address: $address
        notes: $notes
      }
    ) {
      associateId
      prospectId
      thumbnailUrl
      firstName
      lastName
      displayName
      emailAddress
      primaryPhone
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

export const DELETE_PROSPECT = gql`
  mutation DeleteProspect($prospectId: String!) {
    deleteProspect(prospectId: $prospectId)
  }
`;

export const NEWS_STORY_HAS_BEEN_VIEWED = gql`
  mutation AddUpdateLinkView(
    $associateId: Int!
    $linkId: Int!
    $linkViewId: Int!
  ) {
    addUpdateLinkView(
      input: {
        associateId: $associateId
        linkId: $linkId
        linkViewId: $linkViewId
      }
    ) {
      linkId
    }
  }
`;

export const CLEAR_ALL_PROPSECT_NOTIFICATIONS = gql`
  mutation DeleteLinkViewAssociate(
    $associateId: Int!
    $deletePinned: Boolean!
  ) {
    deleteLinkViewAssociate(
      associateId: $associateId
      deletePinned: $deletePinned
    )
  }
`;

export const CLEAR_PROSPECT_NOTIFICATION = gql`
  mutation deleteProspectLinkView($viewId: Int!) {
    deleteProspectLinkView(viewId: $viewId)
  }
`;

export const GET_PROSPECT_URL = gql`
  mutation AddUpdateProspectLink(
    $associateId: Int!
    $description: String!
    $displayName: String!
    $redirectUrl: String!
    $sentLinkId: String!
    $prospectId: String
  ) {
    addUpdateProspectLink(
      input: {
        associateId: $associateId
        description: $description
        displayName: $displayName
        redirectUrl: $redirectUrl
        sentLinkId: $sentLinkId
        prospectId: $prospectId
      }
    ) {
      sentLinkId
      prospectUrl
    }
  }
`;

export const PIN_PROSPECT_NOTIFICATION = gql`
  mutation SaveLinkViewed($viewId: Int!, $pin: Boolean!) {
    saveLinkViewed(viewId: $viewId, pin: $pin) {
      viewId
    }
  }
`;

export const PROSPECT_NOTIFICATION_HAS_BEEN_VIEWED = gql`
  mutation RecordLinkViewedBySender($viewId: Int!) {
    recordLinkViewedBySender(viewId: $viewId) {
      prospectId
    }
  }
`;

export const UPDATE_COMMISSION_TREE_NODE = gql`
  mutation UpdateCommissionTreeNode(
    $associateId: Int!
    $newUplineAssociateId: Int!
  ) {
    updateCommissionTreeNode(
      input: {
        associateId: $associateId
        newUplineAssociateId: $newUplineAssociateId
      }
    ) {
      associateId
    }
  }
`;
