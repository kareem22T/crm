import axios from 'axios';
import { API_URL } from './_env';
import { MetaData } from '../types/metadata';

// Get clients
export function getGeneralTaxs(PageSize: number, PageNumber: number, clientId: number): Promise<getGeneralTaxesResponse> {
    return axios.get<getGeneralTaxesResponse>(`${API_URL}/api/Client/${clientId}/GeneralTax`, {
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

// Create GeneralTax
export function createGeneralTax(generalTax: GeneralTaxType, clientId: number) {
    return axios.post(`${API_URL}/api/Client/${clientId}/GeneralTax`, generalTax);
}

// Update GeneralTax
export function updateGeneralTax(generalTax: GeneralTaxRow, clientId: number) {
    return axios.put(`${API_URL}/api/Client/${clientId}/GeneralTax`, generalTax);
}

// Delete GeneralTax
export function deleteGeneralTax(id:number, clientId: number) {
    return axios.delete(`${API_URL}/api/Client/${clientId}/GeneralTax/${id}`);
}

// types and interface

    // Create and update type
    export type GeneralTaxType = {
        jurisdiction: string,
        activityStartDate: string,
        taxCardIssueDate: string,
        taxCardExpiryDate: string,
        subjectAdvancePayments: string,
        periodSubjectAdvancePayments: string,
    }

    export interface GeneralTaxRow {
        jurisdiction: string,
        activityStartDate: string,
        taxCardIssueDate: string,
        taxCardExpiryDate: string,
        subjectAdvancePayments: string,
        periodSubjectAdvancePayments: string,
        id: number
    }

    interface getGeneralTaxesResponse {
        data: {
            metaData: MetaData;
            data: GeneralTaxRow[];
        },
        isSuccess: boolean,
        errorMessage: string[],
        successMessage: string
    }

