import axios from 'axios';
import { API_URL } from './_env';
import { MetaData } from '../types/metadata';

// Get clients
export function getAuthorizations(PageSize: number, PageNumber: number, clientId: number): Promise<AuthorizationsResponse> {
    return axios.get<AuthorizationsResponse>(`${API_URL}/api/Client/${clientId}/Authorization`, {
        params: {
            PageSize,
            PageNumber
        }
    })
    .then(response => response.data)
    .catch(error => {
        throw new Error(`Failed to fetch Authorizations: ${error}`);
    });
}

// Create Authorization
export function createAuthorization(Authorization: AuthorizationType, clientId: number) {
    return axios.post(`${API_URL}/api/Client/${clientId}/Authorization`, Authorization);
}

// Update Authorization
export function updateAuthorization(Authorization: AuthorizationRow, clientId: number) {
    return axios.put(`${API_URL}/api/Client/${clientId}/Authorization`, Authorization);
}

// Delete Authorization
export function deleteAuthorization(id:number, clientId: number) {
    return axios.delete(`${API_URL}/api/Client/${clientId}/Authorization/${id}`);
}

// types and interface

    // Create and update type
    export type AuthorizationType = {
        authorizationNum: string,
        dateAuthorization: string,
        principal: string,
        principalType: string,
        attached: string,
    }

    export interface AuthorizationRow {
        authorizationNum: string,
        dateAuthorization: string,
        principal: string,
        principalType: string,
        attached: string,
        id: number
    }

    interface AuthorizationsResponse {
        data: {
            metaData: MetaData;
            data: AuthorizationRow[];
        },
        isSuccess: boolean,
        errorMessage: string[],
        successMessage: string
    }

