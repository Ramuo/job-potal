import React from 'react';
import {useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useSelector } from 'react-redux';
import Spinner from '../../components/Spinner';

import {useGetJobByIdQuery} from "../../slices/jobsApiSlice"

const JobDetailsPage = () => {
  const {id: jobId} = useParams();

  const {userInfo} = useSelector((state) => state.auth);

  const {
    data: job,
    isLoading,
    error
  } = useGetJobByIdQuery(jobId);


  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        {isLoading ? (
          <Spinner/>
        ) : error ? (
          <h2 className="text-center text-3xl text-red-600">
              {error?.data?.message || error.error}
          </h2>
        ) : (
          <div className="banner mx-auto">
            <p>
              Title: <span> {job.title}</span>
            </p>
            <p>
              Category: <span>{job.category}</span>
            </p>
            <p>
              Country: <span>{job.country}</span>
            </p>
            <p>
              City: <span>{job.city}</span>
            </p>
            <p>
              Location: <span>{job.location}</span>
            </p>
            <p>
              Description: <span>{job.description}</span>
            </p>
            <p>
              Job Posted On: <span>{new Date(job.jobPostedOn).toLocaleDateString()}</span>
            </p>
            <p>
              Salary:{" "}
              {job.fixedSalary ? (
                <span>{job.fixedSalary}€</span>
              ) : (
                <span>
                  {job.salaryFrom}€ - {job.salaryTo}€
                </span>
              )}
            </p>
            {userInfo ? (
              <Link to={`/application/${job._id}`}>Apply Now</Link>
            ) : (
              <Link to="/login" className="text-center text-3xl text-indigo-500">
                 Please login in to apply
              </Link>
            )}
          </div>
        ) }
      </div>
    </section>
  )
}

export default JobDetailsPage