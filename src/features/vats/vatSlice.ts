import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {api} from '../../API';
import { API_URL } from '../../_env';
import { MetaData } from '../../types/metadata';

// Define types for VAT
export type VatType = {
    status: string;
    vatNumber: string;
    jurisdiction: string;
    registrationDate: string;
    expiryDate: string;
};

export interface VatRow extends VatType {
    id: number;
}

interface getVatesResponse {
    data: {
        metaData: MetaData;
        data: VatRow[];
    };
    isSuccess: boolean;
    errorMessage: string[];
    successMessage: string;
}

// Async actions
export const getVats = createAsyncThunk<getVatesResponse, { PageSize: number, PageNumber: number, clientId: number }>(
    'vats/getVats',
    async ({ PageSize, PageNumber, clientId }, { rejectWithValue }) => {
        try {
            const response = await api.get<getVatesResponse>(`${API_URL}/api/Client/${clientId}/VAT`, {
                params: { PageSize, PageNumber }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch VATs: ${error}`);
        }
    }
);

export const createVat = createAsyncThunk<void, { vat: VatType, clientId: number }>(
    'vats/createVat',
    async ({ vat, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.post(`${API_URL}/api/Client/${clientId}/VAT`, vat);
            await dispatch(getVats({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to create VAT: ${error}`);
        }
    }
);

export const updateVat = createAsyncThunk<void, { vat: VatRow, clientId: number }>(
    'vats/updateVat',
    async ({ vat, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.put(`${API_URL}/api/Client/${clientId}/VAT`, vat);
            await dispatch(getVats({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to update VAT: ${error}`);
        }
    }
);

export const deleteVat = createAsyncThunk<void, { id: number, clientId: number }>(
    'vats/deleteVat',
    async ({ id, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.delete(`${API_URL}/api/Client/${clientId}/VAT/${id}`);
            await dispatch(getVats({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to delete VAT: ${error}`);
        }
    }
);

// Initial state
interface VatsState {
    vats: VatRow[];
    loading: boolean;
    selectedVat: VatRow | null;
    formToShow: number;
    successMsg: string;
    metaData: MetaData | null;
    error: string | null;
}

const initialState: VatsState = {
    vats: [],
    loading: false,
    selectedVat: null,
    successMsg: '',
    metaData: null,
    formToShow: 1, // Initial value
    error: null
};

// VATs slice
const vatsSlice = createSlice({
    name: 'vats',
    initialState,
    reducers: {
        setFormToShow: (state, action: PayloadAction<number>) => {
            state.formToShow = action.payload;
        },
        setSelectedVat: (state, action: PayloadAction<VatRow | null>) => {
            state.selectedVat = action.payload;
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
            .addCase(getVats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getVats.fulfilled, (state, action) => {
                state.loading = false;
                state.vats = action.payload.data.data;
                state.metaData = action.payload.data.metaData;
            })
            .addCase(getVats.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";

            })
            .addCase(createVat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createVat.fulfilled, (state) => {
                state.loading = false;
                state.formToShow = 1;
                state.successMsg = "تم اضافة القيمة المضافة بنجاح";

            })
            .addCase(createVat.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";

            })
            .addCase(updateVat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateVat.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم تعديل القيمة المضافة بنجاح";

            })
            .addCase(updateVat.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";

            })
            .addCase(deleteVat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteVat.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم حذف القيمة المضافة بنجاح";

            })
            .addCase(deleteVat.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";

            });
    }
});

export const { setFormToShow, setSelectedVat, setError, setSuccess } = vatsSlice.actions;

export default vatsSlice.reducer;
