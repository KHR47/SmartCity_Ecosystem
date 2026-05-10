import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = uuidv4();
      const ext = extname(file.originalname);
      cb(null, `${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf|doc|docx)$/)) {
      cb(null, true);
    } else {
      cb(new HttpException('Unsupported file type', HttpStatus.BAD_REQUEST), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
};
