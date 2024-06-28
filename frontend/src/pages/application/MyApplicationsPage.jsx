import {useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import Spinner from '../../components/Spinner';
import ResumeModal from '../../components/ResumeModal';

import {useGetMyApplicationsQuery} from "../../slices/applicationApiSlice";

const MyApplicationsPage = () => {
  const navigate = useNavigate();
  const {userInfo} = useSelector((state) => state.auth); 

  const {
    data: myApplications,
    isLoading,
    error,
  } = useGetMyApplicationsQuery();

  console.log(myApplications)

  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      <div className="container">
        {isLoading ? (
          <Spinner/>
        ) : error ? (
          <h2 className="text-center text-3xl text-red-600">
              {error?.data?.message || error.error}
          </h2>
        ) : (
          <>
          {myApplications.length <= 0 ? (
            <>
              {" "}
              <h4>No application Found</h4>{" "}
            </>
          ) : (
            <>
              {myApplications?.map((element) => (
                <JobSeekerCard
                    element={element}
                    key={element._id}
                    // deleteApplication={deleteApplication}
                    openModal={openModal}
                  />
              ))}
            </>
          )}
          </>
        )}
      </div>
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
}

export default MyApplicationsPage;



const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};