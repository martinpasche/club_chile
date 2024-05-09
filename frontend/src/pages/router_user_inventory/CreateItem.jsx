import React, { useState, useContext} from "react";
import API from "../../api.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../root";
import ErrorMessageAccount from "../../components/ErrorMessageAccount.jsx";
import ImageUploader from "../../components/ItemImageUploader.jsx";


const CreateItem = () => {
    const {user, setUser, isLogged} = useContext(AuthContext);
    const [itemName, setItemName] = useState("Nombre");
    const [itemDescription, setItemDescription] = useState("Descripción");
    const [itemQuantity, setItemQuantity] = useState(1);
    const [itemImage, setItemImage] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!isLogged) {
            navigate("/Login");
            return;
        }   
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        try {
            const response = await API.post("/api-inventory/create/", {
                item_name: itemName,
                item_description: itemDescription,
                item_quantity: itemQuantity,
                item_image: itemImage
            }, 
            { headers: 
                {
                'Content-Type': 'multipart/form-data' ,
                'X-CSRFToken': csrftoken,
            }
            });
            
            console.log("response", response);
            

            if (response.status === 201) {
                console.log("Item created successfully");
                navigate("/Inventario-Usuario");
            } else {
                console.log("Error creating item", response);
            }
        } catch (e) {
            
            console.log("Error creating item", e);
            
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
            
            <h1 className='text-4xl font-bold text-primary mb-8 text-center w-full'>Nuevo item</h1>
                
            <section className="card h-[calc(0.30*100vw)] w-[calc(0.35*100vw)] mb-5 shadow-xl bg-base-100">
            
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
                    
                    <button type="button" onClick={handleSubmit} className="btn btn-primary w-20">Save</button>
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
    );
}

export default CreateItem;