import {apiSlice} from "./apiSlice";
import {APPLICATIONS_URL} from "../constants"



export const applicationSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        applyForJob: builder.mutation({
            query: (application) => ({
                url: `${APPLICATIONS_URL}/apply`,
                method: 'POST',
                body: application,
            }),
        }),
        getMyApplications: builder.query({
            query: () => ({
                url: `${APPLICATIONS_URL}/getMyapplications`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Application']
        }),
    })
});


export const {
    useApplyForJobMutation,
    useGetMyApplicationsQuery, 
} = applicationSlice