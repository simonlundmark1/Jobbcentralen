import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';  // Adjust the path according to your project structure

interface Job {
  id: number;
  title: string;
  location: string;
  level: string;
  role: string;
}

interface JobsState {
  entities: Job[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  currentFilters: Record<string, string>;
}


const initialState: JobsState = {
  entities: [],
  loading: 'idle',
  currentFilters: {
    role: '',
    level: '',
    location: ''
  }
};
export const fetchJobs = createAsyncThunk<Job[], { searchTerm: string, filters: Record<string, any> }, { state: RootState }>(
    'jobs/fetchJobs',
    async ({ searchTerm, filters }, { getState, rejectWithValue }) => {
        const queryString = new URLSearchParams({ ...filters, q: searchTerm }).toString();
        const response = await fetch(`https://jobsearch.api.jobtechdev.se/search?${queryString}`);
        console.log("API Response:", response);  // Debugging log
        if (!response.ok) {
            console.error('API call failed:', response.status);
            throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        console.log("Fetched Data:", data);  // Debugging log
        return data.hits as Job[];
    }
);


  const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
      setCategoryFilter(state, action: PayloadAction<{ categoryType: string, value: string }>) {
        state.currentFilters[action.payload.categoryType] = action.payload.value;
      },
      setFilter(state, action: PayloadAction<{ type: string; value: string }>) {
        state.currentFilters[action.payload.type] = action.payload.value;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchJobs.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = 'failed';
        console.error('Failed to fetch jobs:', action.payload);
      });
    }
  });
  
export const { setCategoryFilter } = jobsSlice.actions;
export default jobsSlice.reducer;
