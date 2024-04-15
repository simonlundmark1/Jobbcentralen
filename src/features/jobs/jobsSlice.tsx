import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Job {
    id: number;
    title: string;
    location: string;
    level: string;
}

interface JobsState {
    entities: Job[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    currentFilters: {
        role: string;
        level: string;
        location: string;
    }
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
export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async (searchParams: {searchTerm: string, filters: any}, { rejectWithValue }) => {
        try {
            const queryString = new URLSearchParams({
                ...searchParams.filters,
                q: searchParams.searchTerm
            }).toString();
            const response = await fetch(`https://jobsearch.api.jobtechdev.se/search?${queryString}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.hits as Job[];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setCategoryFilter(state, action: PayloadAction<{categoryType: string, value: string}>) {
            state.currentFilters[action.payload.categoryType] = action.payload.value;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
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
