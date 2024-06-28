import {apiSlice} from "./apiSlice";
import { JOBS_URL } from "../constants";



export const jobsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getJobs: builder.query({
            query: () => ({
                url: JOBS_URL
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Job'],
        }),
        getJobById: builder.query({
            query: (jobId) => ({
                url: `${JOBS_URL}/${jobId}`
            }),
            keepUnusedDataFor: 5,
        }),
        createJob: builder.mutation({
            query: (job) => ({
                url: `${JOBS_URL}/create`,
                method: 'POST',
                body: job,
            }),
        }),
        getMyJobs: builder.query({
            query: () => ({
                url: `${JOBS_URL}/getmyjobs`,
            }),
            keepUnusedDataFor: 5,
            // providesTags: ['Job'],
        }),
    }),
});

export const {
    useGetJobsQuery,
    useGetJobByIdQuery,
    useCreateJobMutation,
    useGetMyJobsQuery,
} = jobsApiSlice;