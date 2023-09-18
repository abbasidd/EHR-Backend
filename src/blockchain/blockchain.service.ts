import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import configService from 'src/config/config.service';

@Injectable()
export class BlockchainService {
    // constructor(private configService: ConfigService) { }
    private providerUrl = "http://127.0.0.1:8545";
    private privatekey = configService().privateKey;//"0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    public provider = new ethers.providers.JsonRpcProvider(this.providerUrl);
    private wallet = new ethers.Wallet(this.privatekey, this.provider)
    private contractAddress = "5FbDB2315678afecb367f032d93F642f64180aa3"
    private abi = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_expirationTimestamp",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "role",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "previousAdminRole",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "newAdminRole",
                    "type": "bytes32"
                }
            ],
            "name": "RoleAdminChanged",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "role",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "RoleGranted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "role",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "RoleRevoked",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "DEFAULT_ADMIN_ROLE",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "DOCTOR_ROLE",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "PATIENT_ROLE",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_patientId",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes",
                    "name": "_ipfsHash",
                    "type": "bytes"
                },
                {
                    "internalType": "bytes",
                    "name": "_reportType",
                    "type": "bytes"
                },
                {
                    "internalType": "uint256",
                    "name": "currentTimestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes[]",
                    "name": "signatures",
                    "type": "bytes[]"
                }
            ],
            "name": "addIPFSReport",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_patientId",
                    "type": "bytes32"
                },
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "testDate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "labTestCode",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes",
                            "name": "labTestName",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct ElectronicHealthRecord.LabTestResult",
                    "name": "_labTestResult",
                    "type": "tuple"
                },
                {
                    "internalType": "uint256",
                    "name": "currentTimestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes[]",
                    "name": "signatures",
                    "type": "bytes[]"
                }
            ],
            "name": "addLabTestResult",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_patientId",
                    "type": "bytes32"
                },
                {
                    "components": [
                        {
                            "internalType": "bytes",
                            "name": "ICD10Code",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes",
                            "name": "description",
                            "type": "bytes"
                        },
                        {
                            "internalType": "uint256",
                            "name": "date",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct ElectronicHealthRecord.MedicalDiagnosis",
                    "name": "_diagnosis",
                    "type": "tuple"
                },
                {
                    "internalType": "uint256",
                    "name": "currentTimestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes[]",
                    "name": "signatures",
                    "type": "bytes[]"
                }
            ],
            "name": "addMedicalDiagnosis",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "bytes",
                            "name": "drugName",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes",
                            "name": "drugCode",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bool",
                            "name": "isMedication",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "dosageUnit",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "dosage",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "prescriptionPeriod",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "usageInstructions",
                            "type": "bytes"
                        },
                        {
                            "internalType": "uint256",
                            "name": "date",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct ElectronicHealthRecord.MedicationRecord",
                    "name": "_medicationRecord",
                    "type": "tuple"
                },
                {
                    "internalType": "bytes32",
                    "name": "_patientId",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "currentTimestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes[]",
                    "name": "signatures",
                    "type": "bytes[]"
                }
            ],
            "name": "addMedicationRecord",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_patientId",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "_orderNumber",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "_category",
                    "type": "bytes"
                },
                {
                    "internalType": "uint256",
                    "name": "_date",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "currentTimestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes[]",
                    "name": "signatures",
                    "type": "bytes[]"
                }
            ],
            "name": "addOtherTreatmentRecord",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_patientId",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "currentTimestamp",
                    "type": "uint256"
                },
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "operationDate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "operationCodeICD9CM",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes",
                            "name": "techniqueName",
                            "type": "bytes"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bleedingVolume",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bloodTransfusionVolume",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "urineVolume",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "operationNotes",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct ElectronicHealthRecord.SurgicalOperation",
                    "name": "_operation",
                    "type": "tuple"
                },
                {
                    "internalType": "bytes[]",
                    "name": "signatures",
                    "type": "bytes[]"
                }
            ],
            "name": "addSurgicalOperation",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "expirationTimestamp",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_patientId",
                    "type": "bytes32"
                }
            ],
            "name": "getIPFSReports",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "bytes",
                            "name": "ipfsHash",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes",
                            "name": "reportType",
                            "type": "bytes"
                        },
                        {
                            "internalType": "uint256",
                            "name": "uploadTimestamp",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct ElectronicHealthRecord.IPFSReport[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_patientId",
                    "type": "bytes32"
                }
            ],
            "name": "getLabTestResults",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "testDate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "labTestCode",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes",
                            "name": "labTestName",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct ElectronicHealthRecord.LabTestResult[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_patientId",
                    "type": "bytes32"
                }
            ],
            "name": "getMedicalDiagnoses",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "bytes",
                            "name": "ICD10Code",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes",
                            "name": "description",
                            "type": "bytes"
                        },
                        {
                            "internalType": "uint256",
                            "name": "date",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct ElectronicHealthRecord.MedicalDiagnosis[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_patientId",
                    "type": "bytes32"
                }
            ],
            "name": "getMedicationRecords",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "bytes",
                            "name": "drugName",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes",
                            "name": "drugCode",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bool",
                            "name": "isMedication",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "dosageUnit",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "dosage",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "prescriptionPeriod",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "usageInstructions",
                            "type": "bytes"
                        },
                        {
                            "internalType": "uint256",
                            "name": "date",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct ElectronicHealthRecord.MedicationRecord[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_patientId",
                    "type": "bytes32"
                }
            ],
            "name": "getOtherTreatmentRecords",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "orderNumber",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "category",
                            "type": "bytes"
                        },
                        {
                            "internalType": "uint256",
                            "name": "date",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct ElectronicHealthRecord.OtherTreatmentRecord[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_patientId",
                    "type": "bytes32"
                }
            ],
            "name": "getPhysicalExamination",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "date",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "time",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "height",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "weight",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "pulseRate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bloodPressure",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bodySurfaceArea",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct ElectronicHealthRecord.PhysicalExamination",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "role",
                    "type": "bytes32"
                }
            ],
            "name": "getRoleAdmin",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_patientId",
                    "type": "bytes32"
                }
            ],
            "name": "getSurgicalOperations",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "operationDate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "operationCodeICD9CM",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes",
                            "name": "techniqueName",
                            "type": "bytes"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bleedingVolume",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bloodTransfusionVolume",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "urineVolume",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "operationNotes",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct ElectronicHealthRecord.SurgicalOperation[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "role",
                    "type": "bytes32"
                },
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "grantRole",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "role",
                    "type": "bytes32"
                },
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "hasRole",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "labTestResults",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "testDate",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "labTestCode",
                    "type": "bytes"
                },
                {
                    "internalType": "bytes",
                    "name": "labTestName",
                    "type": "bytes"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "medicalDiagnoses",
            "outputs": [
                {
                    "internalType": "bytes",
                    "name": "ICD10Code",
                    "type": "bytes"
                },
                {
                    "internalType": "bytes",
                    "name": "description",
                    "type": "bytes"
                },
                {
                    "internalType": "uint256",
                    "name": "date",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "medicationRecords",
            "outputs": [
                {
                    "internalType": "bytes",
                    "name": "drugName",
                    "type": "bytes"
                },
                {
                    "internalType": "bytes",
                    "name": "drugCode",
                    "type": "bytes"
                },
                {
                    "internalType": "bool",
                    "name": "isMedication",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "dosageUnit",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "dosage",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "prescriptionPeriod",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "usageInstructions",
                    "type": "bytes"
                },
                {
                    "internalType": "uint256",
                    "name": "date",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "otherTreatmentRecords",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "orderNumber",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "category",
                    "type": "bytes"
                },
                {
                    "internalType": "uint256",
                    "name": "date",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "patientIPFSReports",
            "outputs": [
                {
                    "internalType": "bytes",
                    "name": "ipfsHash",
                    "type": "bytes"
                },
                {
                    "internalType": "bytes",
                    "name": "reportType",
                    "type": "bytes"
                },
                {
                    "internalType": "uint256",
                    "name": "uploadTimestamp",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "physicalExaminations",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "date",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "time",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "height",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "weight",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "pulseRate",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "bloodPressure",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "bodySurfaceArea",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "quorum",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "role",
                    "type": "bytes32"
                },
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "renounceRole",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "role",
                    "type": "bytes32"
                },
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "revokeRole",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_patientId",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "currentTimestamp",
                    "type": "uint256"
                },
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "date",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "time",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "height",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "weight",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "pulseRate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bloodPressure",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bodySurfaceArea",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct ElectronicHealthRecord.PhysicalExamination",
                    "name": "_physicalExamination",
                    "type": "tuple"
                },
                {
                    "internalType": "bytes[]",
                    "name": "signatures",
                    "type": "bytes[]"
                }
            ],
            "name": "setPhysicalExamination",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "quorum_",
                    "type": "uint256"
                }
            ],
            "name": "setQuorum",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "surgicalOperations",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "operationDate",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "operationCodeICD9CM",
                    "type": "bytes"
                },
                {
                    "internalType": "bytes",
                    "name": "techniqueName",
                    "type": "bytes"
                },
                {
                    "internalType": "uint256",
                    "name": "bleedingVolume",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "bloodTransfusionVolume",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "urineVolume",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "operationNotes",
                    "type": "bytes"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes",
                    "name": "",
                    "type": "bytes"
                }
            ],
            "name": "usedSignatures",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "whitelist",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    public contract = new ethers.Contract(this.contractAddress, JSON.stringify(this.abi), this.wallet);
    public adminsigner = new ethers.Wallet(this.privatekey, this.provider)
    public makeHash(recipient: string, patientID: string, timestamp: number): string {
        let concatenatedArgs = ethers.utils.solidityPack(["address", "bytes32", "uint256"], [
            recipient,
            patientID,
            timestamp
        ])
        const messageHash = ethers.utils.keccak256(concatenatedArgs);
        return messageHash;
    }

    public async makeSignature(signers: ethers.Wallet[], messageHash: string): Promise<string[]> {
        const signatures: any[] = await Promise.all(signers.map(async (wallet: ethers.Wallet) => {
            const bytesMessageHash = messageHash;
            let signature = wallet.signMessage(ethers.utils.arrayify(bytesMessageHash));
            return signature;
        }));
        return signatures;
    }

    public async makeSignatures(signers: ethers.Wallet, patientID: string, timestamp: number) {
        const hash = this.makeHash(signers.address, patientID, timestamp);
        const signatures = await this.makeSignature([signers], hash)
        return signatures;
    }
}
