import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($usernameIn: String!, $passwordIn: String!) {
    addUser(input: { usernameIn: $usernameIn, passwordIn: $passwordIn }) {
      user {
        userId
        birthDate
        companyName
        emailAddress
      }
    }
  }
`;

// possible values returned for loginStatus: "VERIFICATION_NEEDED", "NOT_AN_AMBASSADOR", "SUCCESS"
export const LOGIN_USER = gql`
  mutation LoginUser($ambassaderOnly: Boolean!) {
    loginUser(ambassaderOnly: $ambassaderOnly) {
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
  mutation DirectScaleInfo($ambassaderOnly: Boolean!, $userName: String!) {
    directScaleInfo(ambassaderOnly: $ambassaderOnly, userName: $userName) {
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
    )
  }
`;
