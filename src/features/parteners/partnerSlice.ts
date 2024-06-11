import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {api} from '../../API';
import { API_URL } from '../../_env';
import { MetaData } from '../../types/metadata';

// Define types for the partner
export type PartnerType = {
    name: string;
    contributionRatio: number;
    contributionValue: number;
    nationalId: string;
};

export interface PartnerRow extends PartnerType {
    id: number;
}

interface GetPartnersResponse {
    data: {
        metaData: MetaData;
        data: PartnerRow[];
    };
    isSuccess: boolean;
    errorMessage: string[];
    successMessage: string;
}

// Async actions
export const getPartners = createAsyncThunk<GetPartnersResponse, { PageSize: number, PageNumber: number, clientId: number }>(
    'partners/getPartners',
    async ({ PageSize, PageNumber, clientId }, { rejectWithValue }) => {
        try {
            const response = await api.get<GetPartnersResponse>(`${API_URL}/api/Client/${clientId}/Partner`, {
                params: { PageSize, PageNumber }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch partners: ${error}`);
        }
    }
);

export const createPartner = createAsyncThunk<void, { partner: PartnerType, clientId: number }>(
    'partners/createPartner',
    async ({ partner, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.post(`${API_URL}/api/Client/${clientId}/Partner`, partner);
            await dispatch(getPartners({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to create partner: ${error}`);
        }
    }
);

export const updatePartner = createAsyncThunk<void, { partner: PartnerRow, clientId: number }>(
    'partners/updatePartner',
    async ({ partner, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.put(`${API_URL}/api/Client/${clientId}/Partner`, partner);
            await dispatch(getPartners({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to update partner: ${error}`);
        }
    }
);

export const deletePartner = createAsyncThunk<void, { id: number, clientId: number }>(
    'partners/deletePartner',
    async ({ id, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.delete(`${API_URL}/api/Client/${clientId}/Partner/${id}`);
            await dispatch(getPartners({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to delete partner: ${error}`);
        }
    }
);

// Initial state
interface PartnersState {
    partners: PartnerRow[];
    loading: boolean;
    selectedPartner: PartnerRow | null;
    formToShow: number;
    successMsg: string;
    metaData: MetaData | null;
    error: string | null;
}

const initialState: PartnersState = {
    partners: [],
    loading: false,
    selectedPartner: null,
    successMsg: '',
    metaData: null,
    formToShow: 1, // Initial value
    error: null
};

// Partners slice
const partnersSlice = createSlice({
    name: 'partners',
    initialState,
    reducers: {
        setFormToShow: (state, action: PayloadAction<number>) => {
            state.formToShow = action.payload;
        },
        setSelectedPartner: (state, action: PayloadAction<PartnerRow | null>) => {
            state.selectedPartner = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            setTimeout(() => {
                state.error = null;
            }, 200);
        },
        setSuccess: (state, action: PayloadAction<string>) => {
            state.successMsg = action.payload;
            setTimeout(() => {
                state.successMsg = '';
            }, 200);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPartners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPartners.fulfilled, (state, action) => {
                state.loading = false;
                state.partners = action.payload.data.data;
                state.metaData = action.payload.data.metaData;
            })
            .addCase(getPartners.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
                setTimeout(() => {
                    state.error = null;
                }, 200);
            })
            .addCase(createPartner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPartner.fulfilled, (state) => {
                state.loading = false;
                state.formToShow = 1;
                state.successMsg = "تم اضافة الشريك بنجاح";
                setTimeout(() => {
                    state.successMsg = '';
                }, 200);
            })
            .addCase(createPartner.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
                setTimeout(() => {
                    state.error = null;
                }, 200);
            })
            .addCase(updatePartner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePartner.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم تعديل الشريك بنجاح";
                setTimeout(() => {
                    state.successMsg = '';
                }, 200);
            })
            .addCase(updatePartner.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
                setTimeout(() => {
                    state.error = null;
                }, 200);
            })
            .addCase(deletePartner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePartner.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم حذف الشريك بنجاح";
                setTimeout(() => {
                    state.successMsg = '';
                }, 200);
            })
            .addCase(deletePartner.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
                setTimeout(() => {
                    state.error = null;
                }, 200);
            });
    }
});

export const { setFormToShow, setSelectedPartner, setError, setSuccess } = partnersSlice.actions;

export default partnersSlice.reducer;
