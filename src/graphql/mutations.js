import { gql } from '@apollo/client';

// possible values returned for loginStatus: "VERIFICATION_NEEDED", "NOT_AN_AMBASSADOR", "SUCCESS"
export const LOGIN_USER = gql`
  mutation LoginUser($ambassadorOnly: Boolean!) {
    loginUser(ambassadorOnly: $ambassadorOnly) {
      loginStatus
      associate {
        associateId
        legacyAssociateId
        firstName
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
  ) {
    loginValidationProcess(
      input: {
        method: $method
        loginName: $loginName
        verificationInfo: $verificationInfo
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
  mutation UpdateAssociate(
    $associateId: Int!
    $profileUrl: String
    $profileImageFileName: String
    $firstName: String
    $lastName: String
    $displayName: String
    $emailAddress: String
    $primaryPhoneNumber: String
    $address1: String
    $address2: String
    $city: String
    $state: String
    $zip: String
    $countryCode: String
  ) {
    updateAssociate(
      input: {
        associateId: $associateId
        profileUrl: $profileUrl
        profileImageFileName: $profileImageFileName
        firstName: $firstName
        lastName: $lastName
        displayName: $displayName
        emailAddress: $emailAddress
        primaryPhoneNumber: $primaryPhoneNumber
        address1: $address1
        address2: $address2
        city: $city
        state: $state
        zip: $zip
        countryCode: $countryCode
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
  mutation AddUpdateProspect(
    $associateId: Int!
    $prospectId: String!
    $thumbnailUrl: String
    $firstName: String!
    $lastName: String!
    $displayName: String
    $emailAddress: String
    $primaryPhone: String
    $address1: String
    $address2: String
    $city: String
    $state: String
    $zip: String
    $countryCode: String
    $notes: String
  ) {
    addUpdateProspect(
      input: {
        associateId: $associateId
        prospectId: $prospectId
        thumbnailUrl: $thumbnailUrl
        firstName: $firstName
        lastName: $lastName
        displayName: $displayName
        emailAddress: $emailAddress
        primaryPhone: $primaryPhone
        address1: $address1
        address2: $address2
        city: $city
        state: $state
        zip: $zip
        countryCode: $countryCode
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
