/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRsvp = /* GraphQL */ `
  mutation CreateRsvp(
    $input: CreateRsvpInput!
    $condition: ModelRsvpConditionInput
  ) {
    createRsvp(input: $input, condition: $condition) {
      id
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const updateRsvp = /* GraphQL */ `
  mutation UpdateRsvp(
    $input: UpdateRsvpInput!
    $condition: ModelRsvpConditionInput
  ) {
    updateRsvp(input: $input, condition: $condition) {
      id
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const deleteRsvp = /* GraphQL */ `
  mutation DeleteRsvp(
    $input: DeleteRsvpInput!
    $condition: ModelRsvpConditionInput
  ) {
    deleteRsvp(input: $input, condition: $condition) {
      id
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
