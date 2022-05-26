import React from 'react';
import { Routes,Route } from 'react-router-dom';

import {DashboardNav,CategoriesAdmin,NewCategory,ProductsAdmin,NewProduct,EditCategory,EditProduct,OrdersAdmin} from './index';



const Dashboard:React.FC = ()=>{

    return(
        <div className="dashboard">
            <section className="dashboard-header">
               <DashboardNav />
            </section>
            <section className="dashboard-main">
               <Routes>
                   <Route path='categories' element={<CategoriesAdmin/>}/>
                   <Route path='products'  element={<ProductsAdmin/>}/>
                   <Route path='orders' element={<OrdersAdmin/>}/>

                   <Route path='categories/new-category' element={<NewCategory/>}/>
                   <Route path='categories/edit-category' element={<EditCategory/>}/>
                   
                   <Route path='products/new-product' element={<NewProduct/>}/>
                   <Route path='products/edit-product' element={<EditProduct/>}/>


               </Routes>
            </section>
        </div>
    )
}

export default Dashboard;