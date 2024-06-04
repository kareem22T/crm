import axios from 'axios';
import { API_URL } from './_env';
import { MetaData } from '../types/metadata';

// Get clients
export function getSocialInsurances(PageSize: number, PageNumber: number, clientId: number): Promise<getSocialInsuranceesResponse> {
    return axios.get<getSocialInsuranceesResponse>(`${API_URL}/api/Client/${clientId}/SocialInsurance`, {
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

// Create SocialInsurance
export function createSocialInsurance(socialInsurance: SocialInsuranceType, clientId: number) {
    return axios.post(`${API_URL}/api/Client/${clientId}/SocialInsurance`, socialInsurance);
}

// Update SocialInsurance
export function updateSocialInsurance(socialInsurance: SocialInsuranceRow, clientId: number) {
    return axios.put(`${API_URL}/api/Client/${clientId}/SocialInsurance`, socialInsurance);
}

// Delete socialInsurance
export function deleteSocialInsurance(id:number, clientId: number) {
    return axios.delete(`${API_URL}/api/Client/${clientId}/SocialInsurance/${id}`);
}

// types and interface

    // Create and update type
    export type SocialInsuranceType = {
        insuranceStatus: string,
        socialInsuranceNum: string,
        associatedInsurance: string,
        attached: string,
    }

    export interface SocialInsuranceRow {
        insuranceStatus: string,
        socialInsuranceNum: string,
        associatedInsurance: string,
        attached: string,
        id: number
    }

    interface getSocialInsuranceesResponse {
        data: {
            metaData: MetaData;
            data: SocialInsuranceRow[];
        },
        isSuccess: boolean,
        errorMessage: string[],
        successMessage: string
    }

