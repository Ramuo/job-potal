import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from "../../components/Spinner";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx"

//NEED TO CHANGE THIS APPROCH BY SEPARATING MY JOBSPAGE AND EDIT

import  {useGetMyJobsQuery} from "../../slices/jobsApiSlice";

const MyJobsPage = () => {

  const [editingMode, setEditingMode] = useState(null);

  const navigate= useNavigate();
  const {
    data: myJobs,
    isLoading,
    error,
    refetch
  } = useGetMyJobsQuery();


  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h1>Your Posted Jobs</h1>
          {isLoading ? (
            <Spinner/>
          ) : error ? (
            <h2 className="text-center text-3xl text-red-600">
                {error?.data?.message || error.error}
            </h2>
          ) : (
            <>
              {myJobs.length > 0 ? (
                <>
                  <div className="banner">
                    {myJobs.map((job) => (
                      <div className="card" key={job._id}>
                          <div className="content">
                            <div className="short_fields">
                              <div>
                                <span>Title:</span>
                                <input 
                                type="text"
                                // disabled={editingMode !== job._id ? true : false}
                                // value={job.title}
                                // onChange={(e) =>handleInputChange(job._id, "title", e.target.value)} 
                                />
                              </div>
                              <div>
                                {" "}
                                <span>Country:</span>
                                <input
                                type="text"
                                // disabled={editingMode !== job._id ? true : false}
                                // value={job.country}
                                // onChange={(e) => handleInputChange(job._id, "country", e.target.value)}
                                />
                              </div>
                              <div>
                                <span>City:</span>
                                <input
                                type="text"
                                // disabled={editingMode !== job._id ? true : false}
                                // value={job.city}
                                // onChange={(e) => handleInputChange(job._id, "city",  e.target.value)}
                                />
                              </div>
                              {/* <div>
                                <span>Category:</span>
                                <select
                                value={job.category}
                                onChange={(e) =>handleInputChange(job._id, "category", e.target.value)}
                                disabled={editingMode !== job._id ? true : false}
                                >
                                  <option value="Graphics & Design">
                                    Graphics & Design
                                  </option>
                                  <option value="Mobile App Development">
                                    Mobile App Development
                                  </option>
                                  <option value="Frontend Web Development">
                                    Frontend Web Development
                                  </option>
                                  <option value="MERN Stack Development">
                                    MERN STACK Development
                                  </option>
                                  <option value="Account & Finance">
                                    Account & Finance
                                  </option>
                                  <option value="Artificial Intelligence">
                                    Artificial Intelligence
                                  </option>
                                  <option value="Video Animation">
                                    Video Animation
                                  </option>
                                  <option value="MEAN Stack Development">
                                    MEAN STACK Development
                                  </option>
                                  <option value="MEVN Stack Development">
                                    MEVN STACK Development
                                  </option>
                                  <option value="Data Entry Operator">
                                    Data Entry Operator
                                  </option>
                                </select>
                              </div> */}
                              <div>
                                <span>
                                  Salary:{" "}
                                  {job.fixedSalary ? (
                                    <input
                                    type="number"
                                    // disabled={editingMode !== job._id ? true : false}
                                    // value={job.fixedSalary}
                                    // onChange={(e) => handleInputChange(job._id, "fixedSalary", e.target.value)}
                                    />
                                  ) : (
                                    <div>
                                      <input
                                      type="number"
                                      // disabled={editingMode !== job._id ? true : false}
                                      // value={job.salaryFrom}
                                      // onChange={(e) => handleInputChange(job._id, "salaryFrom", e.target.value)}
                                      />
                                      <input
                                      type="number"
                                      // disabled={editingMode !== job._id ? true : false}
                                      // value={job.salaryTo}
                                      // onChange={(e) => handleInputChange(job._id, "salaryTo", e.target.value)}
                                      />
                                    </div>
                                  )}
                                </span>
                              </div>
                              <div>
                                {" "}
                                <span>Expired:</span>
                                <select
                                // value={job.expired}
                                // onChange={(e) => handleInputChange(job._id, "expired", e.target.value)}  
                                // disabled={editingMode !== job._id ? true : false}
                                >
                                  {/* <option value={true}>TRUE</option>
                                  <option value={false}>FALSE</option> */}
                                </select>
                              </div>
                            </div>
                            <div className="long_field">
                              <div>
                                <span>Description:</span>{" "}
                                <textarea
                                rows={5}
                                // value={job.description}
                                // disabled={editingMode !== job._id ? true : false}
                                // onChange={(e) => handleInputChange(job._id, "description",)}
                                />
                              </div>
                              <div>
                                <span>Location: </span>
                                <textarea
                                // value={job.location}
                                rows={5}
                                // disabled={editingMode !== job._id ? true : false}
                                // onChange={(e) => handleInputChange(job._id, "location", e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          {/* Out Of Content Class */}
                          {/* <div className="button_wrapper">
                            <div className="edit_btn_wrapper">
                              {editingMode === job._id ? (
                                <>
                                  <button
                                    onClick={() => handleUpdateJob(job._id)}
                                    className="check_btn"
                                  >
                                    <FaCheck />
                                  </button>
                                  <button
                                    onClick={() => handleDisableEdit()}
                                    className="cross_btn"
                                  >
                                    <RxCross2 />
                                  </button>
                                </>
                              ) : (
                                <button
                                onClick={() => handleEnableEdit(job._id)}
                                className="edit_btn"
                                >
                                  Edit
                                </button>
                              )}
                            </div>
                            <button
                            onClick={() => handleDeleteJob(job._id)}
                            className="delete_btn"
                            >
                              Delete
                            </button>
                          </div> */}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p>
                  You've not posted any job or may be you deleted all of your jobs!
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default MyJobsPage