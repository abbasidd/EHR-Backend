import { Body, Controller, Get, NotFoundException, Param, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { LocalAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { AddDiagnosis } from './dto/integration.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { IpfsService } from 'src/ipfs/ipfs.service';
import { ethers } from 'ethers';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/user-roles.enum';

@Controller('EHR')
export class IntegrationController {

    constructor(private readonly integrationService: IntegrationService,
        private readonly ipfsService: IpfsService) { }

    @UseGuards(LocalAuthGuard, RoleGuard)
    @Roles(UserRole.Admin)
    @Post('add-diagnosis/:patientID')
    @UsePipes(new ValidationPipe({ transform: true }))
    async addDiagnoses(@Body() requestBody: AddDiagnosis, @Param('patientID') patientID: string) {
        const { code, description } = requestBody;
        try {
            await this.integrationService.addDiagnosis(code, description, patientID)
        }
        catch (error) {
            throw new NotFoundException(`Item with ID not found`);
        }
        return { message: 'Dianosis added successfilly' };
    }

    @UseGuards(LocalAuthGuard, RoleGuard)
    @Roles(UserRole.Admin)
    @Get('get-diagnosis/:patientID')
    async getDiagnoses(@Param('patientID') patientID: string) {
        try {
            const diagnoses = await this.integrationService.getdiagnosis(patientID)
            return diagnoses;
        }
        catch (error) {
            throw new NotFoundException(`Item with ID not found`);
        }
    }

    @UseGuards(LocalAuthGuard, RoleGuard)
    @Roles(UserRole.Admin)
    @Post('add-physical-examination/:patientID')
    async setPhysicalFinding(@Body() requestBody: any, @Param('patientID') patientID: string) {
        try {
            const { date, time, height, weight, pulseRate, bloodPressure, bodySurfaceArea } = requestBody;
            await this.integrationService.addphysicalExamination(date, time, height, weight, pulseRate, bloodPressure, bodySurfaceArea, patientID);
            return { message: 'Physical finding set successfully' };
        } catch (error) {
            console.log(error);
            throw new Error("Error setting physical finding");
        }
    }

    @UseGuards(LocalAuthGuard, RoleGuard)
    @Roles(UserRole.Admin)
    @Get('get-physical-examination/:patientID')
    async getPhysicalExamination(@Param('patientID') patientID: string) {
        try {
            const diagnoses = await this.integrationService.getphysicalExamination(patientID)
            return diagnoses;
        }
        catch (error) {
            throw new NotFoundException(`Item with ID not found`);
        }
    }

    @UseGuards(LocalAuthGuard, RoleGuard)
    @Roles(UserRole.Admin)
    @Post('add-surgical-operation/:patientID')
    async addOperationRecord(@Body() requestBody: any, @Param('patientID') patientID: string) {
        // async addOperationRecord(@Body() requestBody: any) {
        // try {
        const { operationDate, operationCodeICD9CM, techniqueName, bleedingVolume, bloodTransfusionVolume, urineVolume, operationNotes } = requestBody;
        console.log(operationDate, operationCodeICD9CM, techniqueName, bleedingVolume, bloodTransfusionVolume, urineVolume, operationNotes, patientID);

        await this.integrationService.addSurgicalOperation(operationDate, operationCodeICD9CM, techniqueName, bleedingVolume, bloodTransfusionVolume, urineVolume, operationNotes, patientID);
        return { message: 'Operation record added successfully' }
        // } catch (error) {
        //     console.log(error);
        //     throw new Error('Error adding Operation Record')
        // }
    }

    @UseGuards(LocalAuthGuard, RoleGuard)
    @Roles(UserRole.Admin)
    @Get('get-surgical-operation/:patientID')
    async getSurgicalOperation(@Param('patientID') patientID: string) {
        // try {
        const surgicalOperations = await this.integrationService.getSurgicalOperation(patientID)
        return surgicalOperations;
        // }
        // catch (error) {
        //     throw new NotFoundException(`Item with ID not found`);
        // }
    }

    @UseGuards(LocalAuthGuard, RoleGuard)
    @Roles(UserRole.Admin)
    @Post('add-lab-test/:patientID')
    async addLabRecord(@Body() requestBody: any, @Param('patientID') patientID: string) {
        // async addOperationRecord(@Body() requestBody: any) {
        // try { ,testDate ,labTestCode ,labTestName
        const { testDate, labTestCode, labTestName } = requestBody;
        // console.log(operationDate, operationCodeICD9CM, techniqueName, bleedingVolume, bloodTransfusionVolume, urineVolume, operationNotes, patientID);

        await this.integrationService.addLabTestResult(testDate, labTestCode, labTestName, patientID);
        return { message: 'Operation record added successfully' }
        // } catch (error) {
        //     console.log(error);
        //     throw new Error('Error adding Operation Record')
        // }
    }

    @UseGuards(LocalAuthGuard, RoleGuard)
    @Roles(UserRole.Admin)
    @Get('get-lab-test/:patientID')
    async getLabRecord(@Param('patientID') patientID: string) {
        // try { ,testDate ,labTestCode ,labTestName,orderNumber,category,date
        const surgicalOperations = await this.integrationService.getLabTestResult(patientID)
        // await this.integrationService.addOtherTreatmentRecord(orderNumber, category, date, patientID);
        return surgicalOperations;
        // } catch (error) {
        //     console.log(error);
        //     throw new Error('Error adding Operation Record')
        // }
    }

    @UseGuards(LocalAuthGuard, RoleGuard)
    @Roles(UserRole.Admin)
    @Post('add-other-treatment/:patientID')
    async addOtherTreatment(@Body() requestBody: any, @Param('patientID') patientID: string) {
        // try { ,testDate ,labTestCode ,labTestName,orderNumber,category,date
        const { orderNumber, category, date } = requestBody;
        await this.integrationService.addOtherTreatmentRecord(orderNumber, category, date, patientID);
        return { message: 'Operation record added successfully' }
        // } catch (error) {
        //     console.log(error);
        //     throw new Error('Error adding Operation Record')
        // }
    }

    @UseGuards(LocalAuthGuard, RoleGuard)
    @Roles(UserRole.Admin)
    @Get('get-other-treatment/:patientID')
    async getOtherTreatment(@Param('patientID') patientID: string) {
        // try { ,testDate ,labTestCode ,labTestName,orderNumber,category,date
        const surgicalOperations = await this.integrationService.getOtherTreatmentRecord(patientID)
        // await this.integrationService.addOtherTreatmentRecord(orderNumber, category, date, patientID);
        return surgicalOperations;
        // } catch (error) {
        //     console.log(error);
        //     throw new Error('Error adding Operation Record')
        // }
    }


    @UseGuards(LocalAuthGuard, RoleGuard)
    @Roles(UserRole.Admin)
    @UseInterceptors(FileInterceptor('file'))
    @Post('add-reports-ipfs/:patientID')
    async addReportsIpfs(@Body() requestBody: any, @Param('patientID') patientID: string, @UploadedFile() file) {

        if (!file) {
            return { message: 'No file uploaded' };
        }
        console.log(file, "file");

        // try { ,testDate ,labTestCode ,labTestName,orderNumber,category,date
        const { type } = requestBody;
        const ipfsHash = await this.ipfsService.uploadFile(file.buffer, file.originalname);

        await this.integrationService.addFileToIPFS(patientID, ipfsHash, type);
        return { message: 'Operation record added successfully', ipfsHash: ipfsHash }
        // } catch (error) {
        //     console.log(error);
        //     throw new Error('Error adding Operation Record')
        // }
    }
}
