import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ListingModule } from './listing/listing.module';
 
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv:'
    ),
    UserModule,
    AuthModule,
    ListingModule,
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService],
})
export class AppModule {}
