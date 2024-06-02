import axios from 'axios';
import { API_URL } from './_env';
import { MetaData } from '../types/metadata';

// Get clients
export function getBranches(PageSize: number, PageNumber: number, clientId: number): Promise<getBranchesResponse> {
    return axios.get<getBranchesResponse>(`${API_URL}/api/Client/${clientId}/Branch/GetBranchesForClient`, {
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

// Create branch
export function createBranch(branch: BranchType, clientId: number) {
    return axios.post(`${API_URL}/api/Client/${clientId}/Branch/CreateBranchForClient`, branch);
}

// types and interface

    // Create and update type
    export type BranchType = {
        dateRentalContract: string,
        address: string,
        manager: string,
        phoneNumber: string,
        email: string,
        isMain: boolean
    }

    export interface BranchRow {
        dateRentalContract: string,
        address: string,
        manager: string,
        phoneNumber: string,
        email: string,
        isMain: boolean,
        id: number
    }

    interface getBranchesResponse {
        data: {
            metaData: MetaData;
            data: BranchRow[];
        },
        isSuccess: boolean,
        errorMessage: string[],
        successMessage: string
    }

