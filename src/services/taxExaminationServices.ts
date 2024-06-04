import axios from 'axios';
import { API_URL } from './_env';
import { MetaData } from '../types/metadata';

// Get clients
export function getTaxExaminations(PageSize: number, PageNumber: number, clientId: number): Promise<getTaxExaminationesResponse> {
    return axios.get<getTaxExaminationesResponse>(`${API_URL}/api/Client/${clientId}/TaxExamination`, {
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

// Create TaxExamination
export function createTaxExamination(taxExamination: TaxExaminationType, clientId: number) {
    return axios.post(`${API_URL}/api/Client/${clientId}/TaxExamination`, taxExamination);
}

// Update TaxExamination
export function updateTaxExamination(taxExamination: TaxExaminationRow, clientId: number) {
    return axios.put(`${API_URL}/api/Client/${clientId}/TaxExamination`, taxExamination);
}

// Delete taxExamination
export function deleteTaxExamination(id:number, clientId: number) {
    return axios.delete(`${API_URL}/api/Client/${clientId}/TaxExamination/${id}`);
}

// types and interface

    // Create and update type
    export type TaxExaminationType = {
        status: string,
        industrialProfits: number,
        salaryTax: number,
        stampDuty: number,
        year: string,
    }

    export interface TaxExaminationRow {
        status: string,
        industrialProfits: number,
        salaryTax: number,
        stampDuty: number,
        year: string,
        id: number
    }

    interface getTaxExaminationesResponse {
        data: {
            metaData: MetaData;
            data: TaxExaminationRow[];
        },
        isSuccess: boolean,
        errorMessage: string[],
        successMessage: string
    }

