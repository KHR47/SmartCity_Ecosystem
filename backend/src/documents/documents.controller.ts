import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { multerConfig } from './multer.config';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { RequestWithUser } from '../common/types/request-with-user.type';

@UseGuards(JwtAuthGuard)
@Controller('reports/:id/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  uploadDocument(
    @Param('id', ParseIntPipe) reportId: number,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: RequestWithUser,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.documentsService.uploadDocument(reportId, file, req.user);
  }
}
