export enum AuthorizationCookies {
  ClientId = '__foxy__uuid',
  AccessToken = '__foxy__access_token',
  /**
   * This is needed because the `refresh` method takes
   * a refresh token and also the last access token
   */
  TokenValidity = '__foxy__token_validity',
  RefreshToken = '__foxy__refresh_token',
}
