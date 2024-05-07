import React, {useContext, useState} from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../root";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../components/ItemImageUploader";
import ErrorMessageAccount from "../../components/ErrorMessageAccount.jsx";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.useCredentials = true;



export async function loader ({params}){
    
    try { 
        const response = await axios.get(`/api-inventory/item/${params.itemId}/`, {});
        return response.data ;
    } 
    catch (error) {
        console.log("Error fetching inventory", error);
        return null ;
    }   
}


const UpdateItem = () => {
    const item = useLoaderData();
    const {user, setUser, isLogged} = useContext(AuthContext);
    const [itemId, setItemId] = useState(item.item_id)
    const [itemName, setItemName] = useState(item.item_name);
    const [itemDescription, setItemDescription] = useState(item.item_description);
    const [itemQuantity, setItemQuantity] = useState(item.item_quantity);
    const [itemImage, setItemImage] = useState(item.item_image);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    
    // --------------------- Actualizar item ---------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!isLogged) {
            navigate("/Login");
            return;
        }   
        try {
            const formData = new FormData();
            formData.append("item_name", itemName);
            formData.append("item_description", itemDescription);
            formData.append("item_quantity", itemQuantity);
            
            if (typeof itemImage === "object") {
                formData.append("item_image", itemImage);
            }
            
            
            const response = await axios.put(`/api-inventory/item/${itemId}/`, formData, 
            { headers: 
                {
                'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 200) {
                console.log("Item updated successfully");
                navigate("/Inventario-Usuario");
            } else {
                console.log("Error updating item", response);
            }
        } catch (e) {
            
            if (e.response.data) {
                for (const key in e.response.data) {
                    setError(key + " : " + e.response.data[key][0])
                }
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    }
    
    
    
    return (
    <>
    {
    user ?
        
        <div  id="form-create-item"                
            className="" encType="multipart/form-data">
            
            <h1 className='text-4xl font-bold text-primary mb-8 text-center w-full'>Edit item</h1>
                
            <section className="card h-[calc(0.3*100vw)] w-[calc(0.35*100vw)] mb-5 shadow-xl bg-base-100">
            
            <ImageUploader itemImage={itemImage} setItemImage={setItemImage} />
            
            <div className="card-body">
                <label id="item-name" className="flex items-center card-title">
                    <input required 
                        name="itemName" type="text" value={itemName} id="itemName"
                        className="bg-base-100 grow pb-1"
                        onChange={(e) => setItemName(e.target.value)} />
                </label>
                
                <label id="item-description" className="">
                    <textarea required 
                        name="itemDescription" type="text" value={itemDescription} id="itemDescription"
                        className="bg-base-100 grow pb-1 h-[calc(3*1.5rem)] w-full resize-none" 
                        row={3} maxLength={200}
                        onChange={(e) => setItemDescription(e.target.value)} />
                </label>
                
                <label id="item-quantity" className="flex flex-row justify-center align-middle items-center gap-2">
                    <span>Cantidad:</span>
                    <input required
                        name="itemQuantity" type="number" value={itemQuantity} id="itemQuantity"
                        className="bg-base-100 grow"
                        onChange={(e) => setItemQuantity(e.target.value)} />
                </label>
                
                <ErrorMessageAccount error={error} /> 
                
                <div className="card-actions justify-end">
                    
                    <button type="button" onClick={handleSubmit} className="btn btn-primary w-20">Update</button>
                    <button type="button" onClick={() => {navigate(-1);}} className="btn btn-secondary w-20">Cancel</button>
                    
                </div>
            </div>
            
            </section> 
        </div>  
        
    : 
    <div className='flex-1 flex flex-col justify-center'>
        <span className="flex-1 loading loading-ring loading-lg"></span>
    </div>
    } 
    </>
    )
}


export default UpdateItem;