import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../_env';
import { MetaData } from '../../types/metadata';

// Define types for the contract
export type ContractType = {
    establishmentNewspaper: string;
    editedNewspaper: string;
    establishmentAttach: string;
    editedAttach: string;
};

export interface ContractRow extends ContractType {
    id: number;
}

interface GetContractsResponse {
    data: {
        metaData: MetaData;
        data: ContractRow[];
    };
    isSuccess: boolean;
    errorMessage: string[];
    successMessage: string;
}

// Async actions
export const getContracts = createAsyncThunk<GetContractsResponse, { PageSize: number, PageNumber: number, clientId: number }>(
    'contracts/getContracts',
    async ({ PageSize, PageNumber, clientId }, { rejectWithValue }) => {
        try {
            const response = await axios.get<GetContractsResponse>(`${API_URL}/api/Client/${clientId}/Contract`, {
                params: { PageSize, PageNumber }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch contracts: ${error}`);
        }
    }
);

export const createContract = createAsyncThunk<void, { contract: ContractType, clientId: number }>(
    'contracts/createContract',
    async ({ contract, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await axios.post(`${API_URL}/api/Client/${clientId}/Contract`, contract);
            await dispatch(getContracts({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to create contract: ${error}`);
        }
    }
);

export const updateContract = createAsyncThunk<void, { contract: ContractRow, clientId: number }>(
    'contracts/updateContract',
    async ({ contract, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await axios.put(`${API_URL}/api/Client/${clientId}/Contract`, contract);
            await dispatch(getContracts({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to update contract: ${error}`);
        }
    }
);

export const deleteContract = createAsyncThunk<void, { id: number, clientId: number }>(
    'contracts/deleteContract',
    async ({ id, clientId }, { dispatch, rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/api/Client/${clientId}/Contract/${id}`);
            await dispatch(getContracts({ PageSize: 10, PageNumber: 1, clientId }));
        } catch (error) {
            return rejectWithValue(`Failed to delete contract: ${error}`);
        }
    }
);

// Initial state
interface ContractsState {
    contracts: ContractRow[];
    loading: boolean;
    selectedContract: ContractRow | null;
    formToShow: number;
    successMsg: string;
    metaData: MetaData | null;
    error: string | null;
}

const initialState: ContractsState = {
    contracts: [],
    loading: false,
    selectedContract: null,
    successMsg: '',
    metaData: null,
    formToShow: 1, // Initial value
    error: null
};

// Contracts slice
const contractsSlice = createSlice({
    name: 'contracts',
    initialState,
    reducers: {
        setFormToShow: (state, action: PayloadAction<number>) => {
            state.formToShow = action.payload;
        },
        setSelectedContract: (state, action: PayloadAction<ContractRow | null>) => {
            state.selectedContract = action.payload;
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
            .addCase(getContracts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getContracts.fulfilled, (state, action) => {
                state.loading = false;
                state.contracts = action.payload.data.data;
                state.metaData = action.payload.data.metaData;
            })
            .addCase(getContracts.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
                setTimeout(() => {
                    state.error = null;
                }, 200);
            })
            .addCase(createContract.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createContract.fulfilled, (state) => {
                state.loading = false;
                state.formToShow = 1;
                state.successMsg = "تم اضافة العقد بنجاح";
                setTimeout(() => {
                    state.successMsg = '';
                }, 200);
            })
            .addCase(createContract.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
                setTimeout(() => {
                    state.error = null;
                }, 200);
            })
            .addCase(updateContract.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateContract.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم تعديل العقد بنجاح";
                setTimeout(() => {
                    state.successMsg = '';
                }, 200);
            })
            .addCase(updateContract.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
                setTimeout(() => {
                    state.error = null;
                }, 200);
            })
            .addCase(deleteContract.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteContract.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم حذف العقد بنجاح";
                setTimeout(() => {
                    state.successMsg = '';
                }, 200);
            })
            .addCase(deleteContract.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
                setTimeout(() => {
                    state.error = null;
                }, 200);
            });
    }
});

export const { setFormToShow, setSelectedContract, setError, setSuccess } = contractsSlice.actions;

export default contractsSlice.reducer;
