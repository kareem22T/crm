import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_URL } from '../../_env';
import { api } from '../../API';

export type PortalType = {
    portalType: string;
    email: string;
    passwordEmail: string;
    username: string;
    passwordWebsite: string;
    salariesTaxPassWord: string;
    accountantCode: string;
    portalSubscriptionExpiry: boolean;
};

interface GetPortalResponse {
    data: PortalRow;
    isSuccess: boolean;
    errorMessage: string[];
    successMessage: string;
}

export interface PortalRow extends PortalType {
    id: number;
}

export const getPortal = createAsyncThunk<GetPortalResponse, { clientId: number }>(
    'portal/getPortal',
    async ({ clientId }, { rejectWithValue }) => {
        try {
            const response = await api.get<GetPortalResponse>(`${API_URL}/api/Client/${clientId}/Portal/GetPortal`);
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch portal: ${error}`);
        }
    }
);

export const createPortal = createAsyncThunk<void, { portal: PortalType, clientId: number }>(
    'portal/createPortal',
    async ({ portal, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.post(`${API_URL}/api/Client/${clientId}/Portal/CreatePortal`, portal);
            await dispatch(getPortal({ clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to create portal: ${error}`);
        }
    }
);

export const updatePortal = createAsyncThunk<void, { portal: PortalRow, clientId: number }>(
    'portal/updatePortal',
    async ({ portal, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.put(`${API_URL}/api/Client/${clientId}/Portal/UpdatePortal`, portal);
            await dispatch(getPortal({ clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to update portal: ${error}`);
        }
    }
);

interface PortalState {
    portal: PortalRow | null;
    loading: boolean;
    selectedPortal: PortalRow | null;
    formToShow: number;
    successMsg: string;
    error: string | null;
}

const initialState: PortalState = {
    portal: null,
    loading: false,
    selectedPortal: null,
    formToShow: 3, // Initial value
    successMsg: '',
    error: null
};

const portalSlice = createSlice({
    name: 'portal',
    initialState,
    reducers: {
        setFormToShow: (state, action: PayloadAction<number>) => {
            state.formToShow = action.payload;
        },
        setSelectedPortal: (state, action: PayloadAction<PortalRow | null>) => {
            state.selectedPortal = action.payload;
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
            .addCase(getPortal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPortal.fulfilled, (state, action) => {
                state.loading = false;
                state.portal = action.payload.data;                
                state.formToShow = state.portal ? 3 : 2;
            })
            .addCase(getPortal.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
            .addCase(createPortal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPortal.fulfilled, (state) => {
                state.loading = false;
                state.formToShow = 1;
                state.successMsg = "تم اضافة البوابة بنجاح";
            })
            .addCase(createPortal.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
            .addCase(updatePortal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePortal.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم تعديل البوابة بنجاح";
            })
            .addCase(updatePortal.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
    }
});

export const { setFormToShow, setSelectedPortal, setError, setSuccess } = portalSlice.actions;

export default portalSlice.reducer;
