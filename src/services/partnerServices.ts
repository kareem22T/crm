import axios from 'axios';
import { API_URL } from './_env';
import { MetaData } from '../types/metadata';

// Get clients
export function getPartners(PageSize: number, PageNumber: number, clientId: number): Promise<getPartneresResponse> {
    return axios.get<getPartneresResponse>(`${API_URL}/api/Client/${clientId}/Partner`, {
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

// Create Partner
export function createPartner(partner: PartnerType, clientId: number) {
    return axios.post(`${API_URL}/api/Client/${clientId}/Partner`, partner)
}

// Update Partner
export function updatePartner(partner: PartnerRow, clientId: number) {
    return axios.put(`${API_URL}/api/Client/${clientId}/Partner`, partner);
}

// Delete partner
export function deletePartner(id:number, clientId: number) {
    return axios.delete(`${API_URL}/api/Client/${clientId}/Partner/${id}`);
}

// types and interface

    // Create and update type
    export type PartnerType = {
        name: string,
        contributionRatio: number,
        contributionValue: number,
        nationalId: string,
    }

    export interface PartnerRow {
        name: string,
        contributionRatio: number,
        contributionValue: number,
        nationalId: string,
        id: number
    }

    interface getPartneresResponse {
        data: {
            metaData: MetaData;
            data: PartnerRow[];
        },
        isSuccess: boolean,
        errorMessage: string[],
        successMessage: string
    }

