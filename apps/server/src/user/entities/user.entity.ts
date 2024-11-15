import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { isEmail } from 'class-validator';

export interface UserEntity extends Document {
  _id: any;
  email: string;
  password: string;
  name: string;
  imageUrl: string;
  imageId: string;
  phone: string;
  description: string
  age: number;
  Drinking: boolean;
  Smoking: boolean;
  PetFriendly: boolean;
  Gym: boolean;
  Walking: boolean;
  Football: boolean;
  Reading: boolean;
  Cooking: boolean;
  Gaming: boolean;
  Nature: boolean;
}

interface UserModel extends mongoose.Model<UserEntity> {}

/**
 * Defines the schema for the User entity.
 */
export const UserSchema = new mongoose.Schema<UserEntity, UserModel>(
  {
    email: {
      type: String,
      required: true,
      index: { unique: true },
      validate: [isEmail, 'invalid email'],
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imageId: { type: String, required: true },
    age: { type: Number },
    phone: { type: String },
    description: { type: String, required: false },
    Drinking: { type: Boolean, default: false },
    Smoking: { type: Boolean, default: false },
    PetFriendly: { type: Boolean, default: false },
    Gym: { type: Boolean, default: false },
    Walking: { type: Boolean, default: false },
    Football: { type: Boolean, default: false },
    Reading: { type: Boolean, default: false },
    Cooking: { type: Boolean, default: false },
    Gaming: { type: Boolean, default: false },
    Nature: { type: Boolean, default: false },
  },
  {
    timestamps: true, // This enables automatic createdAt and updatedAt fields
  },
);

/**
 * Indices for uniqeness
 */

export const UserUniqueEmailIndex = 'email_1';

UserSchema.index({ email: 1 }, { unique: true });

/**
 * Middleware function that automatically hashes the password before saving it to the database.
 */
UserSchema.pre('save', async function (next) {
  const user: any = this; // 'this' refers to the user document

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
export default mongoose.model('User', new mongoose.Schema(UserSchema as any));
