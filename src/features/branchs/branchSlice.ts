import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {api} from '../../API';
import { API_URL } from '../../_env';
import { MetaData } from '../../types/metadata';

// Define types for the branch
export type BranchType = {
    dateRentalContract: string;
    address: string;
    manager: string;
    phoneNumber: string;
    email: string;
    isMain: boolean;
};

export interface BranchRow extends BranchType {
    id: number;
}

interface GetBranchesResponse {
    data: {
        metaData: MetaData;
        data: BranchRow[];
    };
    isSuccess: boolean;
    errorMessage: string[];
    successMessage: string;
}

// Async actions
export const getBranches = createAsyncThunk<GetBranchesResponse, { PageSize: number, PageNumber: number, clientId: number }>(
    'branches/getBranches',
    async ({ PageSize, PageNumber, clientId }, { rejectWithValue }) => {
        try {
            const response = await api.get<GetBranchesResponse>(`${API_URL}/api/Client/${clientId}/Branch`, {
                params: { PageSize, PageNumber }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch branches: ${error}`);
        }
    }
);

export const createBranch = createAsyncThunk<void, { branch: BranchType, clientId: number }>(
    'branches/createBranch',
    async ({ branch, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.post(`${API_URL}/api/Client/${clientId}/Branch`, branch);
            await dispatch(getBranches({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to create branch: ${error}`);
        }
    }
);

export const updateBranch = createAsyncThunk<void, { branch: BranchRow, clientId: number }>(
    'branches/updateBranch',
    async ({ branch, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.put(`${API_URL}/api/Client/${clientId}/Branch`, branch);
            await dispatch(getBranches({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to update branch: ${error}`);
        }
    }
);

export const deleteBranch = createAsyncThunk<void, { id: number, clientId: number }>(
    'branches/deleteBranch',
    async ({ id, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await api.delete(`${API_URL}/api/Client/${clientId}/Branch/${id}`);
            await dispatch(getBranches({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to delete branch: ${error}`);
        }
    }
);

// Initial state
interface BranchesState {
    branches: BranchRow[];
    loading: boolean;
    selectedBranch: BranchRow | null;
    formToShow: number;
    successMsg: string;
    error: string | null;
    metaData: MetaData | null;
    pageSize: number;
    pageNumber: number;
}

const initialState: BranchesState = {
    branches: [],
    loading: false,
    selectedBranch: null,
    successMsg: '',
    formToShow: 1, // Initial value
    error: null,
    metaData: null,
    pageSize: 10, // Initial page size
    pageNumber: 1 // Initial page number
};

// Branches slice
const branchesSlice = createSlice({
    name: 'branches',
    initialState,
    reducers: {
        setFormToShow: (state, action: PayloadAction<number>) => {
            state.formToShow = action.payload;
        },
        setSelectedBranch: (state, action: PayloadAction<BranchRow | null>) => {
            state.selectedBranch = action.payload;
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
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload;
        },
        setPageNumber: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBranches.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBranches.fulfilled, (state, action) => {
                state.loading = false;
                state.branches = action.payload.data.data;
                state.metaData = action.payload.data.metaData;
            })
            .addCase(getBranches.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
            .addCase(createBranch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBranch.fulfilled, (state) => {
                state.loading = false;
                state.formToShow = 1;
                state.successMsg = "تم اضافة الفرع بنجاح";
            })
            .addCase(createBranch.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
            .addCase(updateBranch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBranch.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم تعديل الفرع بنجاح";
            })
            .addCase(updateBranch.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
            .addCase(deleteBranch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBranch.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم حذف الفرع بنجاح";
            })
            .addCase(deleteBranch.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            });
    }
});

export const { setFormToShow, setSelectedBranch, setError, setSuccess, setPageSize, setPageNumber } = branchesSlice.actions;

export default branchesSlice.reducer;
