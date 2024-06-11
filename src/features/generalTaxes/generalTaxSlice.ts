import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {api} from '../../API';
import { API_URL } from '../../_env';
import { MetaData } from '../../types/metadata';

// Define types for general tax
export type GeneralTaxType = {
    jurisdiction: string;
    activityStartDate: string;
    taxCardIssueDate: string;
    taxCardExpiryDate: string;
    subjectAdvancePayments: string;
    periodSubjectAdvancePayments: string;
};

export interface GeneralTaxRow extends GeneralTaxType {
    id: number;
}

interface getGeneralTaxesResponse {
    data: {
        metaData: MetaData;
        data: GeneralTaxRow[];
    };
    isSuccess: boolean;
    errorMessage: string[];
    successMessage: string;
}

// Async actions
export const getGeneralTaxes = createAsyncThunk<getGeneralTaxesResponse, { PageSize: number, PageNumber: number, clientId: number }>(
    'generalTaxes/getGeneralTaxes',
    async ({ PageSize, PageNumber, clientId }, { rejectWithValue }) => {
        try {
            const response = await api.get<getGeneralTaxesResponse>(`${API_URL}/api/Client/${clientId}/GeneralTax`, {
                params: { PageSize, PageNumber }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch general taxes: ${error}`);
        }
    }
);

export const createGeneralTax = createAsyncThunk<void, { generalTax: GeneralTaxType, clientId: number }>(
    'generalTaxes/createGeneralTax',
    async ({ generalTax, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.post(`${API_URL}/api/Client/${clientId}/GeneralTax`, generalTax);
            await dispatch(getGeneralTaxes({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to create general tax: ${error}`);
        }
    }
);

export const updateGeneralTax = createAsyncThunk<void, { generalTax: GeneralTaxRow, clientId: number }>(
    'generalTaxes/updateGeneralTax',
    async ({ generalTax, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.put(`${API_URL}/api/Client/${clientId}/GeneralTax`, generalTax);
            await dispatch(getGeneralTaxes({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to update general tax: ${error}`);
        }
    }
);

export const deleteGeneralTax = createAsyncThunk<void, { id: number, clientId: number }>(
    'generalTaxes/deleteGeneralTax',
    async ({ id, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.delete(`${API_URL}/api/Client/${clientId}/GeneralTax/${id}`);
            await dispatch(getGeneralTaxes({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to delete general tax: ${error}`);
        }
    }
);

// Initial state
interface GeneralTaxesState {
    generalTaxes: GeneralTaxRow[];
    loading: boolean;
    selectedGeneralTax: GeneralTaxRow | null;
    formToShow: number;
    successMsg: string;
    metaData: MetaData | null;
    error: string | null;
}

const initialState: GeneralTaxesState = {
    generalTaxes: [],
    loading: false,
    selectedGeneralTax: null,
    successMsg: '',
    metaData: null,
    formToShow: 1, // Initial value
    error: null
};

// General taxes slice
const generalTaxesSlice = createSlice({
    name: 'generalTaxes',
    initialState,
    reducers: {
        setFormToShow: (state, action: PayloadAction<number>) => {
            state.formToShow = action.payload;
        },
        setSelectedGeneralTax: (state, action: PayloadAction<GeneralTaxRow | null>) => {
            state.selectedGeneralTax = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setSuccess: (state, action: PayloadAction<string>) => {
            state.successMsg = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGeneralTaxes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGeneralTaxes.fulfilled, (state, action) => {
                state.loading = false;
                state.generalTaxes = action.payload.data.data;
                state.metaData = action.payload.data.metaData;
            })
            .addCase(getGeneralTaxes.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
            .addCase(createGeneralTax.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createGeneralTax.fulfilled, (state) => {
                state.loading = false;
                state.formToShow = 1;
                state.successMsg = "تم اضافة الضريبة العامة بنجاح";
            })
            .addCase(createGeneralTax.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
            .addCase(updateGeneralTax.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateGeneralTax.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم تعديل الضريبة العامة بنجاح";
            })
            .addCase(updateGeneralTax.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
            .addCase(deleteGeneralTax.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteGeneralTax.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم حذف الضريبة العامة بنجاح";
            })
            .addCase(deleteGeneralTax.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            });
    }
});

export const { setFormToShow, setSelectedGeneralTax, setError, setSuccess } = generalTaxesSlice.actions;

export default generalTaxesSlice.reducer;
