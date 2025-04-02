import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';  // Adjust the path according to your project structure

// Define a more detailed Job interface based on likely API fields
interface Job {
  id: string; // API likely uses string IDs
  headline: string;
  description?: { text: string }; // Keep description minimal here
  employer?: { name?: string };
  workplace_address?: { municipality?: string; country?: string; }; // Adjusted for location filtering
  occupation?: { label?: string }; // For Yrke/Occupation
  occupation_field?: { label?: string }; // For Område/Field
  working_hours_type?: { label?: string }; // For Omfattning/Extent
  application_deadline?: string;
  // Add other relevant fields from the API as needed
}

// Define filter keys based on potential API parameters
export interface JobFilters {
  occupationField: string; // Maps to occupation-field ?
  municipality: string;    // Maps to municipality ?
  workTimeExtent: string; // Maps to working-hours-type ?
}

interface JobsState {
  entities: Job[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  currentFilters: JobFilters; // Use the specific filter interface
}

const initialState: JobsState = {
  entities: [],
  loading: 'idle',
  currentFilters: {
    occupationField: '',
    municipality: '',
    workTimeExtent: ''
  }
};

// Define the parameters for fetchJobs using the specific filter interface
export const fetchJobs = createAsyncThunk<
  Job[],
  { searchTerm: string, filters: Partial<JobFilters> }, // Allow partial filters
  { state: RootState }
>(
    'jobs/fetchJobs',
    async ({ searchTerm, filters }, { getState, rejectWithValue }) => {
        try {
            const queryParams: Record<string, string> = { q: searchTerm || '' };

            // Map internal filter names to potential API query parameter names
            // These are educated guesses based on typical JobTech API structures.
            // Adjust these based on the actual API documentation.
            const filterMap: Record<keyof JobFilters, string> = {
              occupationField: 'occupation-field',
              municipality: 'municipality',
              workTimeExtent: 'working-hours-type'
            };

            // Add non-empty filters to the query parameters using the mapped names
            Object.entries(filters).forEach(([key, value]) => {
              if (value) {
                const filterKey = key as keyof JobFilters;
                const apiParam = filterMap[filterKey];
                if (apiParam) {
                  queryParams[apiParam] = value as string;
                }
              }
            });

            const queryString = new URLSearchParams(queryParams).toString();
            console.log("Fetching with query:", queryString);

            const response = await fetch(`https://jobsearch.api.jobtechdev.se/search?${queryString}`);

            if (!response.ok) {
                console.error('API call failed:', response.status);
                throw new Error('Failed to fetch jobs');
            }

            const data = await response.json();
            console.log("Fetched Data:", data);

            // Assume the API returns hits with the structure defined in our Job interface
            return data.hits as Job[];
        } catch (error) {
            console.error("Error fetching jobs:", error);
            return rejectWithValue(error);
        }
    }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    // Update the reducer to use the specific filter keys
    setCategoryFilter(state, action: PayloadAction<{ categoryType: keyof JobFilters, value: string }>) {
      state.currentFilters[action.payload.categoryType] = action.payload.value;
    },
    // Optional: Keep setFilter or remove if setCategoryFilter is sufficient
    // setFilter(state, action: PayloadAction<{ type: keyof JobFilters; value: string }>) {
    //   state.currentFilters[action.payload.type] = action.payload.value;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        // Ensure the payload matches the Job[] type
        state.entities = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = 'failed';
        console.error('Failed to fetch jobs:', action.payload);
      });
  }
});

// Export the updated action
export const { setCategoryFilter } = jobsSlice.actions;
export default jobsSlice.reducer;
