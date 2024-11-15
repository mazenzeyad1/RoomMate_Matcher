import { Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema } from './entities/listing.entity';
import { UserModel } from 'src/user/models/user.model';
import { UserModule } from 'src/user/user.module';

@Module({
  imports :[
    UserModule,
    MongooseModule.forFeature([{ name: 'Listing', schema: CatSchema }]),
    CloudinaryModule
  ],
  controllers: [ListingController],
  providers: [ListingService],
})
export class ListingModule {}
