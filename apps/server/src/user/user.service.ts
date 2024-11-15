import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity, UserUniqueEmailIndex } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { MongoServerError } from 'mongodb';
import * as bcrypt from 'bcrypt';

@Injectable()
/**
 * Service responsible for managing user-related operations.
 * @remarks
 * This service handles user creation, retrieval, update, and deletion.
 */
export class UserService {
  /**
   * Constructs a new instance of the UserService class.
   * @param userModel The User model.
   * @param cloudinary The Cloudinary service.
   * @param companyService The Company service.
   */
  constructor(
    @InjectModel('User') public readonly userModel: Model<UserEntity>,
    private cloudinary: CloudinaryService,
  ) {}

  /**
   * Creates a new user.
   * @param createUserDto The DTO containing the user details.
   * @param image The optional image file for the user.
   * @returns The created user.
   * @throws HttpException if there is an error creating the user.
   */
  public async createUser(
    createUserDto: CreateUserDto,
    image?: Express.Multer.File,
  ): Promise<UserEntity> {
    const {
      email,
      password,
      name,
      phone,
      description,
      Drinking,
      Smoking,
      PetFriendly,
      Gym,
      Walking,
      Football,
      Reading,
      Cooking,
      Gaming,
      Nature,
      age,
    } = createUserDto;

    const { imageUrl, imageId } = await this.uploadProfileImage(image);

    // Create user
    const newUser = new this.userModel({
      email,
      password,
      name,
      imageUrl,
      imageId,
      phone,
      description,
      Drinking,
      Smoking,
      PetFriendly,
      Gym,
      Walking,
      Football,
      Reading,
      Cooking,
      Gaming,
      Nature,
      age,
    });

    const session = await this.userModel.db.startSession();
    session.startTransaction();

    try {
      const createdUser = await newUser.save({ session });

      await session.commitTransaction();

      return createdUser;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      )
        throw error;

      throw new BadRequestException({
        error: error?.message,
        message: this.getUserCreateErrorDescription(error),
      });
    } finally {
      session.endSession();
    }
  }

  /**
   * Finds a user by email.
   * @param email The email of the user to find.
   * @returns The found user, or undefined if not found.
   */
  public async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userModel.findOne({ email }).exec();
  }

  /**
   * Finds a user by ID.
   * @param id The ID of the user to find.
   * @returns The found user, or undefined if not found.
   */
  public async findUserById(id): Promise<UserEntity | null> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  // public async findUserByIdtrial(id: string): Promise<UserEntity | null> {
  //   return this.userModel.findById(id)
  // }

  /**
   * Updates a user's information.
   * @param id The ID of the user to update.
   * @param updateUserDto The DTO containing the updated user details.
   * @param image The optional image file for the user.
   * @returns The updated user.
   * @throws HttpException if there is an error updating the user.
   */
  public async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
    image?: Express.Multer.File,
  ): Promise<UserEntity> {
    const {
      name,
      email,
      newPassword,
      age,
      phone,
      description,
      Drinking,
      Smoking,
      PetFriendly,
      Gym,
      Walking,
      Football,
      Reading,
      Cooking,
      Gaming,
      Nature,
    } = updateUserDto;

    // Find the user by id
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found');

    if (user.email != email) {
      const isUserAlreadyExist = await this.userModel.exists({ email: email });
      if (!!isUserAlreadyExist)
        throw new BadRequestException({
          message: 'Email in use by another user.',
        });
    }

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }

    const { imageUrl: newUrl, imageId: newId } =
      await this.uploadProfileImage(image);
    user.imageUrl = newUrl;
    user.imageId = newId;
    user.age = age;
    user.Drinking = Drinking;
    user.Smoking = Smoking;
    user.PetFriendly = PetFriendly;
    user.Gym = Gym;
    user.Walking = Walking;
    user.Football = Football;
    user.Reading = Reading;
    user.Cooking = Cooking;
    user.Gaming = Gaming;
    user.Nature = Nature;
    user.phone = phone;
    user.description = description;

    user.name = name;
    user.email = email;

    try {
      const entity = await this.userModel.findByIdAndUpdate(user._id, user);

      if (!entity) throw new NotFoundException('User not found');

      return entity;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException({
        message: 'Something went wrong while updating user account.',
        error: error?.message,
      });
    }
  }

  private getUserCreateErrorDescription(error: any): string {
    let errorDescription = 'User couldnt be created';

    if (error instanceof MongoServerError && error.code === 11000) {
      if (error?.message.includes(UserUniqueEmailIndex))
        errorDescription = 'A user with the same email exists';
    }

    return errorDescription;
  }

  private async uploadProfileImage(image: Express.Multer.File | undefined) {
    if (!image) {
      return {
        imageUrl:
          'https://res.cloudinary.com/dzu5t20lr/image/upload/v1706910325/m9ijj0xc1d2yzclssyzc.png',
        imageId: 'default_user',
      };
    }
    const { secure_url: imageUrl, public_id: imageId } =
      await this.cloudinary.uploadFile(image);

    return { imageUrl, imageId };
  }
}
