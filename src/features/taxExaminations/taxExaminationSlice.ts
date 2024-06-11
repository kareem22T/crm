import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {api} from '../../API';
import { API_URL } from '../../_env';
import { MetaData } from '../../types/metadata';

// Define types for tax examination
export type TaxExaminationType = {
    status: string;
    industrialProfits: number;
    salaryTax: number;
    stampDuty: number;
    year: string;
};

export interface TaxExaminationRow extends TaxExaminationType {
    id: number;
}

interface getTaxExaminationsResponse {
    data: {
        metaData: MetaData;
        data: TaxExaminationRow[];
    };
    isSuccess: boolean;
    errorMessage: string[];
    successMessage: string;
}

// Async actions
export const getTaxExaminations = createAsyncThunk<getTaxExaminationsResponse, { PageSize: number, PageNumber: number, clientId: number }>(
    'taxExaminations/getTaxExaminations',
    async ({ PageSize, PageNumber, clientId }, { rejectWithValue }) => {
        try {
            const response = await api.get<getTaxExaminationsResponse>(`${API_URL}/api/Client/${clientId}/TaxExamination`, {
                params: { PageSize, PageNumber }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch tax examinations: ${error}`);
        }
    }
);

export const createTaxExamination = createAsyncThunk<void, { taxExamination: TaxExaminationType, clientId: number }>(
    'taxExaminations/createTaxExamination',
    async ({ taxExamination, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.post(`${API_URL}/api/Client/${clientId}/TaxExamination`, taxExamination);
            await dispatch(getTaxExaminations({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to create tax examination: ${error}`);
        }
    }
);

export const updateTaxExamination = createAsyncThunk<void, { taxExamination: TaxExaminationRow, clientId: number }>(
    'taxExaminations/updateTaxExamination',
    async ({ taxExamination, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.put(`${API_URL}/api/Client/${clientId}/TaxExamination`, taxExamination);
            await dispatch(getTaxExaminations({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to update tax examination: ${error}`);
        }
    }
);

export const deleteTaxExamination = createAsyncThunk<void, { id: number, clientId: number }>(
    'taxExaminations/deleteTaxExamination',
    async ({ id, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.delete(`${API_URL}/api/Client/${clientId}/TaxExamination/${id}`);
            await dispatch(getTaxExaminations({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to delete tax examination: ${error}`);
        }
    }
);

// Initial state
interface TaxExaminationsState {
    taxExaminations: TaxExaminationRow[];
    loading: boolean;
    selectedTaxExamination: TaxExaminationRow | null;
    formToShow: number;
    successMsg: string;
    metaData: MetaData | null;
    error: string | null;
}

const initialState: TaxExaminationsState = {
    taxExaminations: [],
    loading: false,
    selectedTaxExamination: null,
    successMsg: '',
    metaData: null,
    formToShow: 1, // Initial value
    error: null
};

// Tax examinations slice
const taxExaminationsSlice = createSlice({
    name: 'taxExaminations',
    initialState,
    reducers: {
        setFormToShow: (state, action: PayloadAction<number>) => {
            state.formToShow = action.payload;
        },
        setSelectedTaxExamination: (state, action: PayloadAction<TaxExaminationRow | null>) => {
            state.selectedTaxExamination = action.payload;
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
            .addCase(getTaxExaminations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTaxExaminations.fulfilled, (state, action) => {
                state.loading = false;
                state.taxExaminations = action.payload.data.data;
                state.metaData = action.payload.data.metaData;
            })
            .addCase(getTaxExaminations.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";

            })
            .addCase(createTaxExamination.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTaxExamination.fulfilled, (state) => {
                state.loading = false;
                state.formToShow = 1;
                state.successMsg = "تم اضافة الفحص الضريبي بنجاح";

            })
            .addCase(createTaxExamination.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";

            })
            .addCase(updateTaxExamination.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTaxExamination.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم تعديل الفحص الضريبي بنجاح";

            })
            .addCase(updateTaxExamination.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";

            })
            .addCase(deleteTaxExamination.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTaxExamination.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم حذف الفحص الضريبي بنجاح";
            })
            .addCase(deleteTaxExamination.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            });
    }
});

export const { setFormToShow, setSelectedTaxExamination, setError, setSuccess } = taxExaminationsSlice.actions;

export default taxExaminationsSlice.reducer;
