import axios from 'axios';
import { API_URL } from './_env';
import { MetaData } from '../types/metadata';

// Get clients
export function getVats(PageSize: number, PageNumber: number, clientId: number): Promise<getVatesResponse> {
    return axios.get<getVatesResponse>(`${API_URL}/api/Client/${clientId}/VAT`, {
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

// Create Vat
export function createVat(vat: VatType, clientId: number) {
    return axios.post(`${API_URL}/api/Client/${clientId}/VAT`, vat);
}

// types and interface

    // Create and update type
    export type VatType = {
        status: string,
        vatNumber: string,
        jurisdiction: string,
        registrationDate: string,
        expiryDate: string,
    }

    export interface VatRow {
        status: string,
        vatNumber: string,
        jurisdiction: string,
        registrationDate: string,
        expiryDate: string,
        id: number
    }

    interface getVatesResponse {
        data: {
            metaData: MetaData;
            data: VatRow[];
        },
        isSuccess: boolean,
        errorMessage: string[],
        successMessage: string
    }

