import { IsEmail, IsNotEmpty } from 'class-validator';
import { Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data transfer object for creating a user.
 */
export class CreateUserDto {
  /**
   * The email of the user.
   */
  @ApiProperty()
  @IsEmail()
  email: string;

  /**
   * The password of the user.
   */
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  /**
   * The name of the user.
   */
  @ApiProperty()
  @IsNotEmpty()
  name: string;

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
