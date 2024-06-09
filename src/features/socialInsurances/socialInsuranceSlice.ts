import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../_env';
import { MetaData } from '../../types/metadata';

// Define types for social insurance
export type SocialInsuranceType = {
    insuranceStatus: string;
    socialInsuranceNum: string;
    associatedInsurance: string;
    attached: string;
};

export interface SocialInsuranceRow extends SocialInsuranceType {
    id: number;
}

interface getSocialInsuranceesResponse {
    data: {
        metaData: MetaData;
        data: SocialInsuranceRow[];
    };
    isSuccess: boolean;
    errorMessage: string[];
    successMessage: string;
}

// Async actions
export const getSocialInsurances = createAsyncThunk<getSocialInsuranceesResponse, { PageSize: number, PageNumber: number, clientId: number }>(
    'socialInsurances/getSocialInsurances',
    async ({ PageSize, PageNumber, clientId }, { rejectWithValue }) => {
        try {
            const response = await axios.get<getSocialInsuranceesResponse>(`${API_URL}/api/Client/${clientId}/SocialInsurance`, {
                params: { PageSize, PageNumber }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch social insurances: ${error}`);
        }
    }
);

export const createSocialInsurance = createAsyncThunk<void, { socialInsurance: SocialInsuranceType, clientId: number }>(
    'socialInsurances/createSocialInsurance',
    async ({ socialInsurance, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await axios.post(`${API_URL}/api/Client/${clientId}/SocialInsurance`, socialInsurance);
            await dispatch(getSocialInsurances({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to create social insurance: ${error}`);
        }
    }
);

export const updateSocialInsurance = createAsyncThunk<void, { socialInsurance: SocialInsuranceRow, clientId: number }>(
    'socialInsurances/updateSocialInsurance',
    async ({ socialInsurance, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await axios.put(`${API_URL}/api/Client/${clientId}/SocialInsurance`, socialInsurance);
            await dispatch(getSocialInsurances({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to update social insurance: ${error}`);
        }
    }
);

export const deleteSocialInsurance = createAsyncThunk<void, { id: number, clientId: number }>(
    'socialInsurances/deleteSocialInsurance',
    async ({ id, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/api/Client/${clientId}/SocialInsurance/${id}`);
            await dispatch(getSocialInsurances({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to delete social insurance: ${error}`);
        }
    }
);

// Initial state
interface SocialInsurancesState {
    socialInsurances: SocialInsuranceRow[];
    loading: boolean;
    selectedSocialInsurance: SocialInsuranceRow | null;
    formToShow: number;
    successMsg: string;
    metaData: MetaData | null;
    error: string | null;
}

const initialState: SocialInsurancesState = {
    socialInsurances: [],
    loading: false,
    selectedSocialInsurance: null,
    successMsg: '',
    metaData: null,
    formToShow: 1, // Initial value
    error: null
};

// Social insurances slice
const socialInsurancesSlice = createSlice({
    name: 'socialInsurances',
    initialState,
    reducers: {
        setFormToShow: (state, action: PayloadAction<number>) => {
            state.formToShow = action.payload;
        },
        setSelectedSocialInsurance: (state, action: PayloadAction<SocialInsuranceRow | null>) => {
            state.selectedSocialInsurance = action.payload;
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
            .addCase(getSocialInsurances.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSocialInsurances.fulfilled, (state, action) => {
                state.loading = false;
                state.socialInsurances = action.payload.data.data;
                state.metaData = action.payload.data.metaData;
            })
            .addCase(getSocialInsurances.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
                setTimeout(() => {
                    state.error = null;
                }, 200);
            })
            .addCase(createSocialInsurance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSocialInsurance.fulfilled, (state) => {
                state.loading = false;
                state.formToShow = 1;
                state.successMsg = "تم اضافة التأمين الاجتماعي بنجاح";
                setTimeout(() => {
                    state.successMsg = '';
                }, 200);
            })
            .addCase(createSocialInsurance.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
                setTimeout(() => {
                    state.error = null;
                }, 200);
            })
            .addCase(updateSocialInsurance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSocialInsurance.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم تعديل التأمين الاجتماعي بنجاح";
                setTimeout(() => {
                    state.successMsg = '';
                }, 200);
            })
            .addCase(updateSocialInsurance.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
                setTimeout(() => {
                    state.error = null;
                }, 200);
            })
            .addCase(deleteSocialInsurance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSocialInsurance.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم حذف التأمين الاجتماعي بنجاح";
                setTimeout(() => {
                    state.successMsg = '';
                }, 200);
            })
            .addCase(deleteSocialInsurance.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
                setTimeout(() => {
                    state.error = null;
                }, 200);
            });
    }
});

export const { setFormToShow, setSelectedSocialInsurance, setError, setSuccess } = socialInsurancesSlice.actions;

export default socialInsurancesSlice.reducer;
