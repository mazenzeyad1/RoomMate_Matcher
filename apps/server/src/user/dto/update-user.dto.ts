import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data transfer object for updating a user.
 */
export class UpdateUserDto {
  /**
   * The new password for the user.
   */
  @IsNotEmpty()
  @ApiProperty()
  newPassword: string;

  /**
   * The email address of the user.
   */
  @IsEmail()
  @ApiProperty()
  email: string;

  /**
   * The name of the user.
   */
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  Drinking: boolean;
  @ApiProperty()
  Smoking: boolean;
  @ApiProperty()
  PetFriendly: boolean;
  @ApiProperty()
  Gym: boolean;
  @ApiProperty()
  Walking: boolean;
  @ApiProperty()
  Football: boolean;
  @ApiProperty()
  Reading: boolean;
  @ApiProperty()
  Cooking: boolean;
  @ApiProperty()
  Gaming: boolean;
  @ApiProperty()
  Nature: boolean;
}
