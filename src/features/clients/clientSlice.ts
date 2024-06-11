import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_URL } from '../../_env';
import { MetaData } from '../../types/metadata';
import {api} from '../../API';
  
// Define types for the client
export type ClientType = {
    code: string,
    fileStatus: string,
    companyName: string,
    tradeName: string,
    activity: string,
    legalEntity: string,
    entryDate: string,
    issuingAuthority: string,
    commercialRegisterNum: string,
    releaseDate: string,
    dateLastRenewal: string,
    dateLastRecord: string,
    licensed: string,
    source: string,
    paid: string,
    establishmentNewspaper: string,
    establishmentAttach: string;
};

export interface ClientRow extends ClientType {
    id: number;
}

interface GetClientsResponse {
    data: {
        metaData: MetaData;
        data: ClientRow[];
    };
    isSuccess: boolean;
    errorMessage: string[];
    successMessage: string;
}
  
// Async actions
export const getClients = createAsyncThunk<GetClientsResponse, { PageSize: number, PageNumber: number }>(
    'clients/getClients',
    async ({ PageSize, PageNumber }, { rejectWithValue }) => {
    
      try {
        const response = await api.get<GetClientsResponse>(`${API_URL}/api/Client/Index`, {
          params: { PageSize, PageNumber }
        });
        return response.data;
      } catch (error) {   
        console.log(error);
             
        return rejectWithValue(`Failed to fetch clients: ${error}`);
      }
    }
  );
export const createClient = createAsyncThunk<void, ClientType>(
    'clients/createClient',
    async (client, { dispatch ,rejectWithValue }) => {
        try {
            await api.post(`${API_URL}/api/Client/Create`, client);
            await dispatch(getClients({ PageSize: 10, PageNumber: 1 }));
        } catch (error) {
            return rejectWithValue(`Failed to create client: ${error}`);
        }
    }
);

export const updateClient = createAsyncThunk<void, ClientType>(
    'clients/updateClient',
    async (client, { dispatch, rejectWithValue }) => {
        try {
            await api.put(`${API_URL}/api/Client/Update`, client);
            await dispatch(getClients({ PageSize: 10, PageNumber: 1 }));
        } catch (error) {
            return rejectWithValue(`Failed to update client: ${error}`);
        }
    }
);

export const deleteClient = createAsyncThunk<void, number>(
    'clients/deleteClient',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            await api.delete(`${API_URL}/api/Client/Delete?dtoId=${id}`);
            await dispatch(getClients({ PageSize: 10, PageNumber: 1 }));
        } catch (error) {            
            return rejectWithValue(`Failed to delete client: ${error}`);
        }
    }
);

// Initial state
interface ClientsState {
    clients: ClientRow[];
    loading: boolean;
    selectedClient: ClientRow | null;
    formToShow: number;
    successMsg: string;
    error: string | null;
    metaData: MetaData | null;
    pageSize: number;
    pageNumber: number;
}

// clientSlice.ts
const initialState: ClientsState = {
    clients: [],
    loading: false,
    selectedClient: null,
    successMsg: '',
    formToShow: 1, // Initial value
    error: null,
    metaData: null,
    pageSize: 10, // Initial page size
    pageNumber: 1 // Initial page number
};
  
// Clients slice
const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setFormToShow: (state, action: PayloadAction<{ formToShow: number }>) => {
            state.formToShow = action.payload.formToShow;
        },      
        setSelectedClient: (state, action: PayloadAction<{ client: ClientRow | null }>) => {
            state.selectedClient = action.payload.client;
        },      
        setError: (state, action: PayloadAction<{ error: string }>) => {
            state.error = action.payload.error;
        },      
        setSuccess: (state, action: PayloadAction<{ msg: string }>) => {
            state.successMsg = action.payload.msg;
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
            .addCase(getClients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClients.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload.data.data;
                state.metaData = action.payload.data.metaData;
            })
            .addCase(getClients.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";                
            })
            .addCase(createClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createClient.fulfilled, (state) => {
                state.loading = false;
                state.formToShow = 1;
                state.successMsg = "تم اضافة العميل بنجاح";
            })
            .addCase(createClient.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
            .addCase(updateClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateClient.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم تعديل العميل بنجاح";
            })
            .addCase(updateClient.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            })
            .addCase(deleteClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteClient.fulfilled, (state) => {
                state.loading = false;
                state.successMsg = "تم حذف العميل بنجاح";
            })
            .addCase(deleteClient.rejected, (state) => {
                state.loading = false;
                state.error = "حدث خطا ما";
            });
    }
});

export const { setFormToShow, setError, setSuccess, setSelectedClient, setPageSize, setPageNumber } = clientsSlice.actions;

export default clientsSlice.reducer;
