import axios from 'axios';
import { API_URL } from '../_env';
import { MetaData } from '../types/metadata';

// Get clients
export function getContracts(PageSize: number, PageNumber: number, clientId: number): Promise<getContractesResponse> {
    return axios.get<getContractesResponse>(`${API_URL}/api/Client/${clientId}/Contract`, {
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

// Create Contract
export function createContract(contract: ContractType, clientId: number) {
    return axios.post(`${API_URL}/api/Client/${clientId}/Contract`, contract);
}

// Update Contract
export function updateContract(contract: ContractRow, clientId: number) {
    return axios.put(`${API_URL}/api/Client/${clientId}/Contract`, contract);
}

// Delete contract
export function deleteContract(id:number, clientId: number) {
    return axios.delete(`${API_URL}/api/Client/${clientId}/Contract/${id}`);
}

// types and interface

    // Create and update type
    export type ContractType = {
        establishmentNewspaper: string,
        editedNewspaper: string,
        establishmentAttach: string,
        editedAttach: string,
    }

    export interface ContractRow {
        establishmentNewspaper: string,
        editedNewspaper: string,
        establishmentAttach: string,
        editedAttach: string,
        id: number
    }

    interface getContractesResponse {
        data: {
            metaData: MetaData;
            data: ContractRow[];
        },
        isSuccess: boolean,
        errorMessage: string[],
        successMessage: string
    }

