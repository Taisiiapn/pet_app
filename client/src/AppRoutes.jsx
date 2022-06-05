import { Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from "./components/pages/LoginForm";
import DepartmentsPage from './components/pages/DepartmentsList';
import Department from './components/pages/Department';
import NotFoundPage from "./components/NotFound";
import { formLoginConfig, formDepartmentConfig } from './formConfig';
import EditDepartmentPage from "./components/pages/EditDepartment";
import { CreateDepartmentPage } from "./components/pages/CreateDepartment";


const AppRoutes = () => {

    const reduxStateMe = useSelector(state => state.me)
    const meData = reduxStateMe.data

 

    return (
        <Routes>

            <Route exact path="/" element={<Navigate to="/departments" />} />

            <Route path='/login' 
                element={<LoginPage formConfig={formLoginConfig} />}
            />

            <Route path='/departments' 
                element={<DepartmentsPage meData={meData} />}
            />

            <Route path='/departments/:id' 
                element={<Department meData={meData} />}
            />

            <Route path='/departments/create' 
                element={<CreateDepartmentPage meData={meData}
                formConfig={formDepartmentConfig} 
                />}
            />

            <Route path='/departments/:id/update' 
                element={<EditDepartmentPage meData={meData}
                    formConfig={formDepartmentConfig} 
                />}
            />

            <Route path="*" element={<NotFoundPage />} />
        
        </Routes>
    )
}

export default AppRoutes;