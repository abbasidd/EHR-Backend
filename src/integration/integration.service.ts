import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from 'ethers';
import { BlockchainService } from 'src/blockchain/blockchain.service';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { IpfsService } from 'src/ipfs/ipfs.service';
// import { blockchain.makeHash, blockchain.makeSignature } from './utils';



@Injectable()
export class IntegrationService {
  constructor(
    private usersService: UserService,
    private blockchain: BlockchainService,
    private ipfsService: IpfsService,
  ) { }


  async addDiagnosis(ICD10Code: string, description: string, patientID: string): Promise<void> {
    try {
      const user = await this.usersService.findByPatientID(patientID);
      if (!user) {
        throw new Error('Invalid Patient ID')
      }
      let currentTimestamp = (await this.blockchain.provider.getBlock('latest')).timestamp
      // var currentTimestamp: number = 1694532758 + 30 // should be same 
      // const patientId = ethers.utils.hashMessage("0x123");
      const signatures = await this.blockchain.makeSignatures(this.blockchain.adminsigner, patientID, currentTimestamp)
      const diagnosisPayload = {
        date: currentTimestamp,
        ICD10Code: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(ICD10Code)),
        description: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(description)),
      };
      await this.blockchain.contract.addMedicalDiagnosis(patientID, diagnosisPayload, currentTimestamp, signatures);
    }
    catch (error) {
      console.log(error);
      throw new Error('Error adding Diagnoses')
    }
  }

  async getdiagnosis(patientID: string) {
    try {
      const diagnoses = await this.blockchain.contract.getMedicalDiagnoses(patientID);
      const formattedDiagnoses = diagnoses.map(diagnosis => ({
        ICD10Code: ethers.utils.toUtf8String(diagnosis[0]),
        description: ethers.utils.toUtf8String(diagnosis[1]),
        date: diagnosis[2].toNumber()
      }));
      return formattedDiagnoses;
    } catch (error) {
      console.log(error);
      throw new Error("An Error occurred while fetching diagnoses")
    }
  }
  //    set Physical Examination
  async addphysicalExamination(date: number, time: number, height: number, weight: number, pulseRate: number, bloodPressure: number, bodySurfaceArea: number, patientID: string): Promise<void> {
    try {
      const user = await this.usersService.findByPatientID(patientID);
      if (!user) {
        throw new Error('Invalid Patient ID')
      }
      let currentTimestamp = (await this.blockchain.provider.getBlock('latest')).timestamp
      const signatures = await this.blockchain.makeSignatures(this.blockchain.adminsigner, patientID, currentTimestamp)
      const physicalExamination = { date, time, height, weight, pulseRate, bloodPressure, bodySurfaceArea }
      await this.blockchain.contract.setPhysicalExamination(patientID, currentTimestamp, physicalExamination, signatures);
      // await this.blockchain.contract.setPhysicalFinding()
    } catch (error) {
      console.log(error);
      throw new Error("Error Setting physical finding")
    }
  };

  async getphysicalExamination(patientID: string) {
    try {
      const diagnosis = await this.blockchain.contract.getPhysicalExamination(patientID);
      const formattedDiagnoses = {
        date: diagnosis[0].toNumber(),
        time: diagnosis[1].toNumber(),
        height: diagnosis[2].toNumber(),
        weight: diagnosis[3].toNumber(),
        pulseRate: diagnosis[4].toNumber(),
        bloodPressure: diagnosis[5].toNumber(),
        bodySurfaceArea: diagnosis[6].toNumber()
      };
      return formattedDiagnoses;
    } catch (error) {
      console.log(error);
      throw new Error("An Error occurred while fetching diagnoses")
    }
  }

  //    set Physical Examination
  async addSurgicalOperation(operationDate: number, operationCodeICD9CM: string, techniqueName: string, bleedingVolume: number, bloodTransfusionVolume: number, urineVolume: number, operationNotes: string, patientID: string): Promise<void> {
    // try {
    const user = await this.usersService.findByPatientID(patientID);
    if (!user) {
      throw new Error('Invalid Patient ID')
    }
    let currentTimestamp = (await this.blockchain.provider.getBlock('latest')).timestamp
    const signatures = await this.blockchain.makeSignatures(this.blockchain.adminsigner, patientID, currentTimestamp)
    operationCodeICD9CM = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(operationCodeICD9CM));
    techniqueName = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(techniqueName));
    operationNotes = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(operationNotes));
    const operation = {
      operationDate,
      operationCodeICD9CM,
      techniqueName,
      bleedingVolume,
      bloodTransfusionVolume,
      urineVolume,
      operationNotes
    };
    // const physicalExamination = { date, time, height, weight, pulseRate, bloodPressure, bodySurfaceArea }
    await this.blockchain.contract.addSurgicalOperation(patientID, currentTimestamp, operation, signatures);
    // await this.blockchain.contract.setPhysicalFinding()
    // } catch (error) {
    //   console.log(error);
    //   throw new Error("Error Setting physical finding")
    // }
  }

  async getSurgicalOperation(patientID: string) {
    try {
      const surguries = await this.blockchain.contract.getSurgicalOperations(patientID);
      //   {
      //     uint256 operationDate;
      //     bytes operationCodeICD9CM;
      //     bytes techniqueName;
      //     uint256 bleedingVolume;
      //     uint256 bloodTransfusionVolume;
      //     uint256 urineVolume;
      //     bytes operationNotes;
      // }
      const formattedSurguries = surguries.map(surgery => ({
        operationDate: surgery[0].toNumber(),
        operationCodeICD9CM: ethers.utils.toUtf8String(surgery[1]),
        techniqueName: ethers.utils.toUtf8String(surgery[2]),
        bleedingVolume: surgery[3].toNumber(),
        bloodTransfusionVolume: surgery[4].toNumber(),
        urineVolume: surgery[5].toNumber(),
        operationNotes: ethers.utils.toUtf8String(surgery[6])
      }));
      return formattedSurguries;
    } catch (error) {
      console.log(error);
      throw new Error("An Error occurred while fetching diagnoses")
    }
  }



  async addLabTestResult(testDate: number, labTestCode: string, labTestName: string, patientID: string): Promise<void> {
    // try {
    const user = await this.usersService.findByPatientID(patientID);
    if (!user) {
      throw new Error('Invalid Patient ID')
    }
    let currentTimestamp = (await this.blockchain.provider.getBlock('latest')).timestamp
    const signatures = await this.blockchain.makeSignatures(this.blockchain.adminsigner, patientID, currentTimestamp)
    labTestCode = ethers.utils.formatBytes32String(labTestCode)
    labTestName = ethers.utils.formatBytes32String(labTestName)
    const labTestResult = {
      testDate,
      labTestCode,
      labTestName,
    };
    await this.blockchain.contract.addLabTestResult(patientID, labTestResult, currentTimestamp, signatures);
    // } catch (error) {
    //   console.log(error);
    //   throw new Error("Error Setting physical finding")
    // }
  }

  async getLabTestResult(patientID: string) {
    try {
      const labTestResults = await this.blockchain.contract.getLabTestResults(patientID);
      const formattedLabTestResults = labTestResults.map(labTestResult => ({
        testDate: labTestResult[0].toNumber(),
        labTestCode: ethers.utils.toUtf8String(labTestResult[1]),
        labTestName: labTestResult[0].toNumber(),
      }));
      return formattedLabTestResults;
    } catch (error) {
      console.log(error);
      throw new Error("An Error occurred while fetching diagnoses")
    }
  }

  async addOtherTreatmentRecord(orderNumber: number, category: string, date: number, patientID: string): Promise<void> {
    // try {
    const user = await this.usersService.findByPatientID(patientID);
    if (!user) {
      throw new Error('Invalid Patient ID')
    }
    let currentTimestamp = (await this.blockchain.provider.getBlock('latest')).timestamp
    const signatures = await this.blockchain.makeSignatures(this.blockchain.adminsigner, patientID, currentTimestamp)
    category = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(category))
    //   const OtherTreatmentRecord = {
    //     orderNumber,
    //     category,
    //     date
    // }
    await this.blockchain.contract.addOtherTreatmentRecord(patientID, orderNumber, category, date, currentTimestamp, signatures);
    // } catch (error) {
    //   console.log(error);
    //   throw new Error("Error Setting physical finding")
    // }
  }

  async getOtherTreatmentRecord(patientID: string) {
    try {
      const otherTreatments = await this.blockchain.contract.getOtherTreatmentRecords(patientID);
      const formattedTreatment = otherTreatments.map(otherTreatment => ({
        orderNumber: otherTreatment[0].toNumber(),
        category: ethers.utils.toUtf8String(otherTreatment[1]),
        date: otherTreatment[0].toNumber(),
      }));
      return formattedTreatment;
    } catch (error) {
      console.log(error);
      throw new Error("An Error occurred while fetching diagnoses")
    }
  }
  async addFileToIPFS(patientID: string, ipfsHash: string, reportType: string,): Promise<void> {
    // try {
    const user = await this.usersService.findByPatientID(patientID);
    if (!user) {
      throw new Error('Invalid Patient ID')
    }
    let currentTimestamp = (await this.blockchain.provider.getBlock('latest')).timestamp
    const signatures = await this.blockchain.makeSignatures(this.blockchain.adminsigner, patientID, currentTimestamp)
    const tx = await this.blockchain.contract.addIPFSReport(
      patientID,
      ethers.utils.hexlify(ethers.utils.toUtf8Bytes(ipfsHash)),
      ethers.utils.hexlify(ethers.utils.toUtf8Bytes(reportType)),
      currentTimestamp,
      signatures
    );
    // await this.blockchain.contract.addOtherTreatmentRecord(patientID, orderNumber, category, date, currentTimestamp, signatures);
    // } catch (error) {
    //   console.log(error);
    //   throw new Error("Error Setting physical finding")
    // }
  }


}

