import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {api} from '../../API';
import { API_URL } from '../../_env';
import { MetaData } from '../../types/metadata';

// Define types for the authorization
export type AuthorizationType = {
    authorizationNum: string;
    dateAuthorization: string;
    principal: string;
    principalType: string;
    attached: string;
};

export interface AuthorizationRow extends AuthorizationType {
    id: number;
}

interface AuthorizationsResponse {
    data: {
        metaData: MetaData;
        data: AuthorizationRow[];
    };
    isSuccess: boolean;
    errorMessage: string[];
    successMessage: string;
}

// Async actions
export const getAuthorizations = createAsyncThunk<AuthorizationsResponse, { PageSize: number, PageNumber: number, clientId: number }>(
    'authorizations/getAuthorizations',
    async ({ PageSize, PageNumber, clientId }, { rejectWithValue }) => {
        try {
            const response = await api.get<AuthorizationsResponse>(`${API_URL}/api/Client/${clientId}/Authorization`, {
                params: { PageSize, PageNumber }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch authorizations: ${error}`);
        }
    }
);

export const createAuthorization = createAsyncThunk<void, { authorization: AuthorizationType, clientId: number }>(
    'authorizations/createAuthorization',
    async ({ authorization, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.post(`${API_URL}/api/Client/${clientId}/Authorization`, authorization);
            await dispatch(getAuthorizations({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to create authorization: ${error}`);
        }
    }
);

export const updateAuthorization = createAsyncThunk<void, { authorization: AuthorizationRow, clientId: number }>(
    'authorizations/updateAuthorization',
    async ({ authorization, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.put(`${API_URL}/api/Client/${clientId}/Authorization`, authorization);
            await dispatch(getAuthorizations({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to update authorization: ${error}`);
        }
    }
);

export const deleteAuthorization = createAsyncThunk<void, { id: number, clientId: number }>(
    'authorizations/deleteAuthorization',
    async ({ id, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.delete(`${API_URL}/api/Client/${clientId}/Authorization/${id}`);
            await dispatch(getAuthorizations({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to delete authorization: ${error}`);
        }
    }
);

// Initial state
interface AuthorizationsState {
    authorizations: AuthorizationRow[];
    loading: boolean;
    selectedAuthorization: AuthorizationRow | null;
    formToShow: number;
    successMsg: string;
    error: string | null;
    metaData: MetaData | null;
    pageSize: number;
    pageNumber: number;
}

const initialState: AuthorizationsState = {
    authorizations: [],
    loading: false,
    selectedAuthorization: null,
    successMsg: '',
    formToShow: 1, // Initial value
    error: null,
    metaData: null,
    pageSize: 10, // Initial page size
    pageNumber: 1 // Initial page number
};

// Authorizations slice
const authorizationsSlice = createSlice({
    name: 'authorizations',
    initialState,
    reducers: {
        setFormToShow: (state, action: PayloadAction<number>) => {
            state.formToShow = action.payload;
        },
        setSelectedAuthorization: (state, action: PayloadAction<AuthorizationRow | null>) => {
            state.selectedAuthorization = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setSuccess: (state, action: PayloadAction<string>) => {
            state.successMsg = action.payload;
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload;
        },
        setPageNumber: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAuthorizations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAuthorizations.fulfilled, (state, action) => {
                state.loading = false;
                state.authorizations = action.payload.data.data;
                state.metaData = action.payload.data.metaData;
            })
            .addCase(getAuthorizations.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
            .addCase(createAuthorization.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAuthorization.fulfilled, (state) => {
                state.loading = false;
                state.formToShow = 1;
                state.successMsg = "تم اضافة التوكيل بنجاح";
            })
            .addCase(createAuthorization.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
            .addCase(updateAuthorization.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAuthorization.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم تعديل التوكيل بنجاح";
            })
            .addCase(updateAuthorization.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
            .addCase(deleteAuthorization.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAuthorization.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم حذف التوكيل بنجاح";
            })
            .addCase(deleteAuthorization.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            });
    }
});

export const { setFormToShow, setSelectedAuthorization, setError, setSuccess, setPageSize, setPageNumber } = authorizationsSlice.actions;

export default authorizationsSlice.reducer;
