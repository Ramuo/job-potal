import React from 'react';
import {Link} from "react-router-dom";
import Spinner from '../../components/Spinner';


import {useGetJobsQuery} from "../../slices/jobsApiSlice";

const JobsPage = () => {
  const {
    data: jobs,
    isLoading,
    error,
  } = useGetJobsQuery();
 
  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {isLoading ? (
            <Spinner/>
          ) : error ? (
            <h2 className="text-center text-3xl text-red-600">
                {error?.data?.message || error.error}
            </h2>
          ) : (
            <>
              {jobs.map((job) => (
                <div className="card" key={job._id}>
                  <p>{job.title}</p>
                  <p>{job.category}</p>
                  <p>{job.country}</p>
                  <Link to={`/job/${job._id}`}>Job Details</Link>
                </div>
              ))}
            </>
          ) }
        </div>
      </div>
    </section>
  )
}

export default JobsPage