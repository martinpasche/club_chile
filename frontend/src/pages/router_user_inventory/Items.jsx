import React, {useContext} from 'react';
import { Link, Navigate, useNavigate, useLoaderData, redirect, Form } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../../root.jsx';
import ItemUserCard from '../../components/ItemUserCard.tsx';
import AddItemSymbol from '../../components/AddItemSymbol.jsx';


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.useCredentials = true;


export async function loader (){
    
    try {
        const response = await axios.get('/api-inventory/user-inventory', {});
        return response.data ;
        
    } catch (error) {
        console.log("Error fetching inventory", error);
        return null ;
    }   
}


export async function action ({request, params}) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
     
    //aquí obtuvimos la informacion del form que creamos
    
    if (updates.info === "create") return redirect(`/Inventario-Usuario/new`);
    if (updates.info === "edit") return redirect(`/Inventario-Usuario/${updates.item_id}/edit`);
    
    
    return null;
}



const Items = () => {
    const {user, setUser, isLogged} = useContext(AuthContext);
    const inventory = useLoaderData();

    return (
        <>
        <h1 className='text-4xl font-bold text-primary mb-8'>Tu inventario</h1>
        {
            user ? <>
            {
                (() => {
                    if (!inventory || inventory === null) return <span className="loading loading-ring loading-lg"></span>
                    
                    if (inventory.length === 0) 
                        return <AddItemSymbol />
                        
                    if (inventory.length < 4) 
                        return <>            
                        <div className='flex flex-row w-[80%] justify-evenly items-center'>
                            <AddItemSymbol />
                            
                            {inventory && inventory.map((item) => (
                                <ItemUserCard key={item.item_id} number={item.item_id} name={item.item_name} description={item.item_description} quantity={item.item_quantity} image={item.item_image} />
                            ))}
                        </div>
                        </>
                        
                    else
                        return <div className='grid grid-cols-4 gap-4'>
                            <AddItemSymbol />
                            
                            {inventory && inventory.map((item) => (
                                <ItemUserCard key={item.item_id} number={item.item_id} name={item.item_name} description={item.item_description} quantity={item.item_quantity} image={item.item_image} />
                            ))}
                        </div>
                    
                })()
            }            
            
            </> :
            <div className='flex-1 flex flex-col justify-center'>
                <span className="flex-1 loading loading-ring loading-lg"></span>
            </div>
            
        }
        
        </>
    );
};

export default Items;