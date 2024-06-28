import {Outlet, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const EmployerRoute = () => {
    const {userInfo} = useSelector((state) => state.auth);

    return userInfo && userInfo.role === "Employer" ? ( 
        <Outlet/>
    ) : (
        <Navigate to='/login' replace/>
    );
};

export default EmployerRoute;