import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFoundPage from "./pages/layout/NotFoundPage"
import ApplyPage from "./pages/application/ApplyPage";
import MyApplicationsPage from "./pages/application/MyApplicationsPage";
import CreateJobPage from "./pages/jobs/CreateJobPage";
import JobsPage from "./pages/jobs/JobsPage";
import JobsDetailsPage from "./pages/jobs/JobDetailsPage";
import MyJobsPage from "./pages/jobs/MyJobsPage";

import PrivateRoute from "./components/protect/PrivateRoute";
import ApplicantRoute from "./components/protect/ApplicantRoute";
import EmployerRoute from "./components/protect/EmployerRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path='/jobsList' element={<JobsPage/>}/>
        <Route path='/job/:id' element={<JobsDetailsPage/>}/>

        {/* Private route */}
        <Route path="/" element={<PrivateRoute/>}>
          {/* <Route path='/apply' element={<ApplyPage/>}/> */}
          <Route path='/application/:id' element={<ApplyPage/>}/>
          <Route path='/myjobs' element={<MyJobsPage/>}/>
        </Route>

        {/* Employer Route */}
        <Route path='' element={<EmployerRoute/>}>
          {/* <Route path='/applicationList' element={<ApplicationsListPage/>}/> */}
          <Route path='/createjob' element={<CreateJobPage/>}/>
        </Route>
        
        {/* Applicant Route */}
        <Route path='' element={<ApplicantRoute/>}>
          <Route path='/applications/me' element={<MyApplicationsPage/>}/>
        </Route>

        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
      <Footer/>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
