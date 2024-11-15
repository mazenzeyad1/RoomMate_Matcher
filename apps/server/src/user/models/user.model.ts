import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class UserModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  imageId: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  description: string;

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

  constructor(entity: UserEntity) {
    this.id = entity._id;
    this.email = entity.email;
    this.name = entity.name;
    this.imageUrl = entity.imageUrl;
    this.imageId = entity.imageId;
    this.phone = entity.phone;
    this.Drinking = entity.Drinking;
    this.Smoking = entity.Smoking;
    this.PetFriendly = entity.PetFriendly;
    this.Gym = entity.Gym;
    this.Walking = entity.Walking;
    this.Football = entity.Football;
    this.Reading = entity.Reading;
    this.Cooking = entity.Cooking;
    this.Gaming = entity.Gaming;
    this.Nature = entity.Nature;
    this.phone = entity.phone;
    this.age = entity.age;
    this.description=entity.description
  }
}
