import * as mv from 'mv';

export class PictureUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
  tempFilePath?: string;

  constructor(file: Express.Multer.File) {
    this.fieldname = file.fieldname;
    this.originalname = file.originalname;
    this.encoding = file.encoding;
    this.mimetype = file.mimetype;
    this.buffer = file.buffer;
    this.size = file.size;
    this.tempFilePath = file.path;
  }

  async move(destinationPath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.tempFilePath) {
        reject(new Error('Temporary file path is not available.'));
      }

      mv(this.tempFilePath, destinationPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
