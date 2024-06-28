import {Outlet, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const ApplicantRoute = () => {
    const {userInfo} = useSelector((state) => state.auth);

    return userInfo && userInfo.role === "Applicant" ? ( 
        <Outlet/>
    ) : (
        <Navigate to='/login' replace/>
    );
};

export default ApplicantRoute;