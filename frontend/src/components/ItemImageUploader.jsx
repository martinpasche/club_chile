import React, {useRef, useState} from 'react';
import { AiOutlinePicture } from "react-icons/ai";



const ItemImageUploader = ({itemImage, setItemImage}) => {
    
    const [image, setImage] = useState(itemImage);
    const fileInput = useRef();
    
    const handleImageUpload = (event) => {
        event.preventDefault();
        if (fileInput.current) fileInput.current.click();
    }
    
    
    const saveImage = () => {
        const file = fileInput.current?.files?.[0];
        setItemImage(file);
        if (file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    
    return (
    <figure className='flex flex-row items-center justify-center h-full bg-base-200 cursor-pointer'>
        {
            itemImage || image ?
            <>
                <input type="file" id="itemImage" name="itemImage" className='hidden' ref={fileInput} onChange={saveImage} />
                <img src={image} onClick={handleImageUpload} alt="Item image" />
            </>
            :
            <div
            className="p-5 text-[20rem] text-center"
            >   
                <div  onClick={handleImageUpload}>
                    <AiOutlinePicture style={{color:"#000000", }}/>
                </div>
                <input type="file" id="itemImage" name="itemImage" className='hidden' ref={fileInput} onChange={saveImage} />
            </div>    
        }
    </figure>
    );
}


export default ItemImageUploader;