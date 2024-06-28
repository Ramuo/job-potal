import {useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify";
import "../../inputFix.css";
import Spinner from '../../components/Spinner';


//FAILED TO UPLOAD RESUME

import {useApplyForJobMutation} from "../../slices/applicationApiSlice";



const ApplyPage = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  

  const [apply, {isLoading}] = useApplyForJobMutation();

 
  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", resume);
    try {
      await apply({
        name, 
        email, 
        coverLetter, 
        phone, 
        address, 
        formData, 
        jobId 
      }).unwrap();
      toast.success("Your application has been submited");
      navigate("/jobsList")
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }


  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="spin-button-none"
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <textarea
            placeholder="CoverLetter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Select Resume
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
          </div>
          <button type="submit">Send Application</button>
          
          {isLoading && <Spinner/>}
        </form>
      </div>
    </section>
  );
};


export default ApplyPage;