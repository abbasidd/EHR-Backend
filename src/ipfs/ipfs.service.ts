import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { BlockchainService } from 'src/blockchain/blockchain.service';
import { Web3Storage, File } from 'web3.storage';


@Injectable()
export class IpfsService {
    private client: Web3Storage;
    private blockchain: BlockchainService;
    constructor() {
        this.client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGMwNTk1NjdGQTUwOEIxRjkzMkMwOGRCQTZmOTJiNDk3RUU5MDZmMzQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTQ3NTU3MzY0NzUsIm5hbWUiOiJFSFIifQ.vplI71gyHoXEtlVBc5voz5ugWx-lNONJQJywr91O7O4' });
    }

    // https://bafybeid54e2c5y3fycgjx7blblmkhkafeskwd3a35dd6kyzmpxbdheb5hm.ipfs.w3s.link/
    async uploadFile(fileBuffer: Buffer, originalFilename: string): Promise<string | null> {
        try {
            const cid = await this.client.put([new File([fileBuffer], originalFilename)]);
            return cid;
        } catch (error) {
            console.error('Error uploading to Web3.Storage:', error);
            return null;
        }
    }


    // Define your function to add IPFS report data
    async addIPFSReport(patientId: string, ipfsHash: string, reportType: string, currentTimestamp: number, signatures: string[]) {
        try {
            // Call the addIPFSReport function on the contract
            const tx = await this.blockchain.contract.addIPFSReport(
                patientId,
                ethers.utils.formatBytes32String(ipfsHash),
                ethers.utils.formatBytes32String(reportType),
                currentTimestamp,
                signatures
            );

            // Wait for the transaction to be mined
            await tx.wait();

            console.log('IPFS report added successfully!');
        } catch (error) {
            console.error('Error adding IPFS report:', error);
        }
    }
}
