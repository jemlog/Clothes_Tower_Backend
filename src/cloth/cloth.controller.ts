import { UpdateClothDto } from './dto/updateCloth.dto';
import { CreateClothDto } from './dto/createCloth.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  Res,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClothService } from './cloth.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { Cloth } from 'src/cloth/domain/cloth.entity';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { request } from 'http';
import * as dotenv from 'dotenv';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
dotenv.config();

@ApiTags('cloth')
@Controller('cloth')
export class ClothController {
  constructor(private readonly clothService: ClothService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Clothes are successfully found',
  })
  @ApiOperation({
    summary: '전체 옷 조회',
    description: '보유하고 있는 모든 옷을 조회한다',
  })
  getAllClothes() {
    return this.clothService.getAllClothes();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: `cloth is successfully found`,
  })
  @ApiOperation({
    summary: '특정 id로 옷 조회',
    description: 'id를 입력하면 해당 아이디로 옷을 조회한다.',
  })
  getClothById(@Param('id') id: string) {
    return this.clothService.getClothById(id);
  }

  @ApiCreatedResponse({ description: 'success' })
  @Post('/search')
  @ApiOperation({
    summary: '조건에 맞는 옷 검색',
    description: '조건들을 json으로 받아와서 필터링후 조회',
  })
  getMatchClothes(@Body() createClothDto: CreateClothDto): Promise<Cloth[]> {
    return this.clothService.getMatchClothes(createClothDto);
  }

  // @Post('/upload')
  // async uploadFile(@Req() request, @Res() response) {
  //   try {
  //     await this.clothService.uploadFile(request, response);
  //   } catch (error) {
  //     return response.status(500).json({ message: 'fail' });
  //   }
  // }

  @ApiCreatedResponse({
    description: 'cloth is successfully created',
    type: [Cloth],
  })
  @ApiOperation({
    summary: '새 옷 추가',
    description: '새로운 옷을 옷장에 집어넣는다.',
  })
  @Post()
  @UsePipes(ValidationPipe)
  createCloth(@Body() createClothDto: CreateClothDto) {
    return this.clothService.createCloth(createClothDto);
  }

  @ApiOperation({ summary: '옷 정보 수정' })
  @Put(':id')
  updateCloth(@Param('id') id: string, @Body() updateClothDto: UpdateClothDto) {
    return this.clothService.updateCloth(id, updateClothDto);
  }

  @ApiOperation({ summary: '옷 정보 삭제' })
  @Delete(':id')
  deleteCloth(@Param('id') id: string) {
    return this.clothService.deleteCloth(id);
  }
}
