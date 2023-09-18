import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IpfsService } from './ipfs.service';

@Controller('ipfs')
export class UploadController {
    constructor(private readonly ipfsService: IpfsService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) {
        if (!file) {
            return { message: 'No file uploaded' };
        }
        console.log(file.originalname);

        const ipfsHash = await this.ipfsService.uploadFile(file.buffer, file.originalFilename);

        if (ipfsHash) {
            return { ipfsHash };
        } else {
            return { message: 'Error uploading to Web3.Storage' };
        }
    }
}
