import axios from 'axios';
import { API_URL } from './_env';
import { MetaData } from '../types/metadata';

// Get clients
export function getClients(PageSize: number, PageNumber: number): Promise<getClientsResponse> {
    return axios.get<getClientsResponse>(`${API_URL}/api/Client/Index`, {
        params: {
            PageSize,
            PageNumber
        }
    })
    .then(response => response.data)
    .catch(error => {
        throw new Error(`Failed to fetch clients: ${error}`);
    });
}

// Create client
export function creteClient(client:ClientType) {
    return axios.post(`${API_URL}/api/Client/Create`, client);
}

// Update client
export function updateClient(client:ClientType) {
    return axios.post(`${API_URL}/api/Client/Update`, client);
}

// Delete Client
export function deleteClient(id:number) {
    return axios.delete(`${API_URL}/api/Client/Delete?dtoId=${id}`);
}

// types and interface

    // Create and update type
    export type ClientType = {
        code: string,
        fileStatus: string,
        companyName: string,
        tradeName: string,
        activity: string,
        legalEntity: string,
        entryDate: string,
        issuingAuthority: string,
        commercialRegisterNum: string,
        releaseDate: string,
        dateLastRenewal: string,
        dateLastRecord: string,
        investedCapital: string,
        licensed: string,
        source: string,
        paid: string,
    }

    export interface clientRow {
        code: string;
        fileStatus: string;
        companyName: string;
        tradeName: string;
        activity: string;
        legalEntity: string;
        entryDate: string;
        issuingAuthority: string;
        commercialRegisterNum: string;
        releaseDate: string;
        dateLastRenewal: string;
        dateLastRecord: string;
        investedCapital: string;
        licensed: string;
        source: string;
        paid: string;
        id: number;
    }

    interface getClientsResponse {
        data: {
            metaData: MetaData;
            data: clientRow[];
        },
        isSuccess: boolean,
        errorMessage: string[],
        successMessage: string
    }
    

