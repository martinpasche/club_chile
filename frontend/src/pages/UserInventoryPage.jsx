import React from 'react';
import { Outlet } from "react-router-dom";


const UserInventoryPage = () => {

    
    return (
        <>      

        <section className='flex flex-col items-center mt-8 mb-8 min-h-[calc(100vh-20*0.25rem-39*0.25rem+10*0.25rem)]'>
            
            <Outlet />
            
        </section>
        </>  
    );
};

export default UserInventoryPage;