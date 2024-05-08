import React from 'react';
import { Link, Navigate, useNavigate, useLoaderData, redirect, Form } from "react-router-dom";
import API from '../../api.js';
import ItemCard from '../../components/ItemCard.tsx';


export async function loader (){
    
    try {
        const response = await API.get('/api-inventory/inventory', {});
        return response.data ;
        
    } catch (error) {
        console.log("Error fetching inventory", error);
        return null ;
    }   
}



const Items = () => {
    const inventory = useLoaderData();
    console.log(inventory);
    
    
    return (
        <>
        <h1 className='text-4xl font-bold text-primary mb-8'>Inventario Chilenos</h1>
            
        {
        (() => {
            if (!inventory || inventory === null) return <span className="loading loading-ring loading-lg"></span>
            
            if (inventory.length === 0) 
                return <></>
                
            if (inventory.length <= 4) 
                return <>            
                <div className='flex flex-row w-[80%] justify-evenly items-center'>
                    
                    {inventory && inventory.map((item) => (
                        <ItemCard key={item.item_id} username={item.user.username} number={item.item_id} name={item.item_name} description={item.item_description} quantity={item.item_quantity} image={item.item_image} />
                    ))}
                </div>
                </>
                
            else
                return <div className='grid grid-cols-4 gap-4'>
                    
                    {inventory && inventory.map((item) => (
                        <ItemCard key={item.item_id} username={item.user.username} number={item.item_id} name={item.item_name} description={item.item_description} quantity={item.item_quantity} image={item.item_image} />
                    ))}
                </div>
                    
            })()
            }            
        </>
    );
};

export default Items;