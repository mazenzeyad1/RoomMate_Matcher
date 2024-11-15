/**
 * Token type representing the structure of a token.
 */
export type Token = { sub: string; iat: number; exp: number };

/**
 * Interface representing the profile of a user.
 */
export interface UserProfile {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  imageUrl: string;
  imageId: string;
}
