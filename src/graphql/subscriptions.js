import { gql } from '@apollo/client';

export const PROSPECT_VIEWED_LINK_NOTIFICATION = gql`
  subscription SubscribeToProspectViews($associateId: Int!) {
    subscribeToProspectViews(associateId: $associateId) {
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
