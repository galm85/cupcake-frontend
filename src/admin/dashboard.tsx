import React from 'react';
import { Routes,Route } from 'react-router-dom';

import {DashboardNav,CategoriesAdmin,NewCategory,ProductsAdmin,NewProduct} from './index';



const Dashboard:React.FC = ()=>{

    return(
        <div className="dashboard">
            <section className="dashboard-header">
               <DashboardNav />
            </section>
            <section className="dashboard-main">
               <Routes>
                   <Route path='categories' element={<CategoriesAdmin/>}/>
                   <Route path='products' element={<ProductsAdmin/>}/>
                   <Route path='orders' element={<p>Orders</p>}/>

                   <Route path='categories/new-category' element={<NewCategory/>}/>
                   <Route path='products/new-product' element={<NewProduct/>}/>
               </Routes>
            </section>
        </div>
    )
}

export default Dashboard;