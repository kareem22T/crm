import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_URL } from '../../_env';
import { api } from '../../API';

export type InvoiceType = {
    id: number;
    username: string;
    password: string;
    passToken: string;
    subscriptionDate: string;
    renewalDate: string;
    portalActivation: boolean;
    eInvoiceRegistration: string;
};

interface GetInvoiceResponse {
    data: InvoiceType;
    isSuccess: boolean;
    errorMessage: string[];
    successMessage: string;
}

export const getInvoice = createAsyncThunk<GetInvoiceResponse, { clientId: number }>(
    'invoice/getInvoice',
    async ({ clientId }, { rejectWithValue }) => {
        try {
            const response = await api.get<GetInvoiceResponse>(`${API_URL}/api/Client/${clientId}/Portal/GetEInvoice`);
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch invoice: ${error}`);
        }
    }
);

export const createInvoice = createAsyncThunk<void, { invoice: InvoiceType, clientId: number }>(
    'invoice/createInvoice',
    async ({ invoice, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.post(`${API_URL}/api/Client/${clientId}/Portal/CreateEInvoice`, invoice);
            await dispatch(getInvoice({ clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to create invoice: ${error}`);
        }
    }
);

export const updateInvoice = createAsyncThunk<void, { invoice: InvoiceType, clientId: number }>(
    'invoice/updateInvoice',
    async ({ invoice, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.put(`${API_URL}/api/Client/${clientId}/Portal/UpdateEInvoice`, invoice);
            await dispatch(getInvoice({ clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to update invoice: ${error}`);
        }
    }
);

interface InvoiceState {
    invoice: InvoiceType | null;
    loading: boolean;
    selectedInvoice: InvoiceType | null;
    formToShow: number;
    successMsg: string;
    error: string | null;
}

const initialState: InvoiceState = {
    invoice: null,
    loading: false,
    selectedInvoice: null,
    formToShow: 3, // Initial value
    successMsg: '',
    error: null
};

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setFormToShow: (state, action: PayloadAction<number>) => {
            state.formToShow = action.payload;
        },
        setSelectedInvoice: (state, action: PayloadAction<InvoiceType | null>) => {
            state.selectedInvoice = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setSuccess: (state, action: PayloadAction<string>) => {
            state.successMsg = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInvoice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getInvoice.fulfilled, (state, action) => {
                state.loading = false;
                state.invoice = action.payload.data;                
                state.formToShow = state.invoice ? 3 : 2;
            })
            .addCase(getInvoice.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
            .addCase(createInvoice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createInvoice.fulfilled, (state) => {
                state.loading = false;
                state.formToShow = 1;
                state.successMsg = "تم حفظ بيانات الفاتورة بنجاح";
            })
            .addCase(createInvoice.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
            .addCase(updateInvoice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateInvoice.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم تعديل بيانات الفاتورة بنجاح";
            })
            .addCase(updateInvoice.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
    }
});

export const { setFormToShow, setSelectedInvoice, setError, setSuccess } = invoiceSlice.actions;

export default invoiceSlice.reducer;
