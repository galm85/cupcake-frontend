import React from 'react';
import { useSelector } from 'react-redux';
import { Routes,Route,useNavigate } from 'react-router-dom';
import { State, User } from '../utils/types';


import {DashboardNav,CategoriesAdmin,NewCategory,ProductsAdmin,NewProduct,EditCategory,EditProduct,OrdersAdmin,RestaurantAdmin,NewRestaurant,EditRestaurant,JobsAdmin, NewJob,EditJob,ApplicationsAdmin} from './index';
import MainScreen from './pages/mainScreen';




const Dashboard:React.FC = ()=>{


    const navigate:any = useNavigate();
    const user:User = useSelector((state:State)=>state.usersReducer.currentUser);
    
    React.useEffect(()=>{
        if(!user || !user.isAdmin){
            navigate('/');
        }
    },[])

    return(
        <div className="dashboard">
            {user && user.isAdmin && <>
            <section className="dashboard-header">
               <DashboardNav />
            </section>
            <section className="dashboard-main">
               <Routes>

                   <Route path='/' element={<MainScreen/>}/>

                   <Route path='categories' element={<CategoriesAdmin/>}/>
                   <Route path='categories/new-category' element={<NewCategory/>}/>
                   <Route path='categories/edit-category' element={<EditCategory/>}/>
                   
                   <Route path='products'  element={<ProductsAdmin/>}/>
                   <Route path='products/new-product' element={<NewProduct/>}/>
                   <Route path='products/edit-product' element={<EditProduct/>}/>

                   <Route path='restaurants' element={<RestaurantAdmin/>}/>
                   <Route path='restaurants/new-restaurant' element={<NewRestaurant/>}/>
                   <Route path='restaurants/edit-restaurant' element={<EditRestaurant/>}/>

                   
                   <Route path='jobs' element={<JobsAdmin/>}/>
                   <Route path='jobs/new-job' element={<NewJob/>}/>
                   <Route path='jobs/edit-job' element={<EditJob/>}/>
                   <Route path='jobs/applications/:jobId' element={<ApplicationsAdmin/>}/>

                   <Route path='orders' element={<OrdersAdmin/>}/>


               </Routes>

            </section>
            </>}
        </div>
    )
}

export default Dashboard;