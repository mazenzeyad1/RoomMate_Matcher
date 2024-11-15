import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserModel } from './models/user.model';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiCreatedResponse({ description: 'User created', type: UserModel })
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<UserModel> {
    console.log('yarab');
    return new UserModel(
      await this.userService.createUser(createUserDto, image),
    );
  }

  /**
   * Get the profile of the authenticated user.
   * @param req - The request object.
   * @returns The profile of the authenticated user.
   */
  @Get('profile')
  async getProfile(@Request() req: any): Promise<UserModel> {
    const userEntity = await this.userService.findUserById(req.user.sub);

    if (!userEntity) throw new NotFoundException('User not found');

    return new UserModel(userEntity);
  }

  /**
   * Get the profile of the authenticated user.
   * @param req - The request object.
   * @returns The profile of the authenticated user.
   */
  @Get(':id')
  async getProfileA7a(@Param('id') req: any) {
    const userEntity = await this.userService.findUserById(req);

    if (!userEntity) throw new NotFoundException('User not foundhvyv');

    return userEntity;
  }

  /**
   * Update a user by ID.
   * @param id - The ID of the user to update.
   * @param updateUserDto - The data for updating the user.
   * @param image - The uploaded image file.
   * @returns The updated user.
   */
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOkResponse({ description: 'User updated', type: UserModel })
  @ApiNotFoundResponse({ description: 'User not found' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log(image);
    return new UserModel(
      await this.userService.updateUser(id, updateUserDto, image),
    );
  }
}
