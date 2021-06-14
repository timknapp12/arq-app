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
        firstName
      }
    }
  }
`;

// possible values returned for status: NotFound, NotAnAmbassador, CallSupport, Success
export const DIRECT_SCALE_INFO = gql`
  mutation DirectScaleInfo($ambassaderOnly: Boolean!, $userName: String!) {
    directScaleInfo(ambassaderOnly: $ambassaderOnly, userName: $userName) {
      status
      associate {
        associateId
        uniqueEmailAddress
        emailAddress
        primaryPhoneNumber
        secondaryPhoneNumber
      }
    }
  }
`;

// TODO - make into apollo format
export const LOGIN_VALIDATION_PROCESS = gql`
  mutation {
    loginValidationProcess(
      input: {
        method: DIRECT_SCALE
        loginName: "whyde"
        verificationInfo: "password" # directscale=password, sms=phone number email=email
      }
    )
  }
`;

export const CONFIRM_ACCESS_CODE = gql`
  mutation {
    loginValidationToken(input: { loginName: "whyde", accessCode: "123456" })
  }
`;
