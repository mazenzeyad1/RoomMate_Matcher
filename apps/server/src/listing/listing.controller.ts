import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Listing } from './entities/listing.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createListingDto: Listing,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.listingService.create(createListingDto, image);
  }

  @Get()
  getAllListings() {
    return this.listingService.getAll();
  }

  @Get(':listingId')
  getAListing(@Param('listingId') listingId: string) {
    return this.listingService.getListing(listingId);
  }

  @Get('user/:userId/applied')
  findAllListingsUserAppliedTo(@Param('userId') userId: string) {
    return this.listingService.findAllListingsUserAppliedTo(userId);
  }
 
  @Put(':listingId/user/:userId/apply')
  @HttpCode(204) // No Content status code if successful
  async applyToListing(
    @Param('listingId') listingId: string,
    @Param('userId') userId: string,
  ) {
     console.log("a78a")
    return this.listingService.applyToListing(listingId, userId);
  }

  @Get('user/:userId/owner')
  findAllListingForOwner(@Param('userId') userId: string) {
    return this.listingService.findAllListingsOfOwner(userId);
  }

  @Put(':listingId/user/:userId/match')
  @HttpCode(204) // No Content status code if successful
  async matchListing(
    @Param('listingId') listingId: string,
    @Param('userId') userId: string,
  ) {
    return this.listingService.MatchedRoom(listingId,userId);
  }

  @Delete(':listingId')
  deleteListing(@Param('listingId') listingId: string) {
    return this.listingService.deleteListing(listingId);
  }

  @Get(':listingId/applicants')
  getAllAplicants(@Param('listingId') listingId: string) {
    return this.listingService.getAllApplicants(listingId);
  }

  @Delete('/:listingId/applicant/:applicantId')
  deleteApplicant(@Param('listingId') listingId, @Param('applicantId') applicantId ){
   return this.listingService.deleteApplicant(listingId,applicantId)
  }

}
