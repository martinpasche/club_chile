import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from 'react';
import { MdFileUpload } from "react-icons/md";

interface ImageUploaderProps {
    // Define your component props here
    profilePic: any;
    setProfilePic: React.Dispatch<React.SetStateAction<any>>;
}

const ProfileImageUploader: React.FC<ImageUploaderProps> = (props) => {
    // Add your component logic here    
    const fileUploadRef = useRef<HTMLInputElement>(null);
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
    
    // esto es para que podamos hacer click en otro icono para subir imagenes
    const handleImageUpload = (event: any) => {
        event.preventDefault();
        if (fileUploadRef.current) {
            fileUploadRef.current.click();
        }
    };
    
    // update the image source when the profilePic changes
    useEffect(() => {
        setImageSrc("http://127.0.0.1:8000" + props.profilePic);
    }, [props.profilePic]);
    
    //big functional function for saving image
    const saveImage = () => {
        try {

            const uploadedFile = fileUploadRef.current?.files?.[0];
            props.setProfilePic(uploadedFile);
            
            // Display the image on the client side
            if (uploadedFile) {
                const reader = new FileReader();
                reader.onload = () => {
                    const dataURL = reader.result;
                    setImageSrc(dataURL);
                };
                reader.readAsDataURL(uploadedFile);
            }
            
        } catch (error) {
            console.log('Error uploading image: ', error);
        }
    }
    
    //
    // ----------- NO ESTAN PERFECTAMENTE ALINEADAS LAS IMAGENES, PERO FUNCIONA BIEN ----------------
    //

    return (
        <div>

            <div className="w-100 flex flex-row justify-center">
                <div className='relative'>
                
                    {
                        props.profilePic && imageSrc ?              
                        <div className="avatar">
                            <div className="w-32 rounded-full shadow-xl">
                                <img src={imageSrc.toString()} style={{ width: '100%', height: 'auto' }} alt="Profile" />
                            </div>
                        </div>
                        :
                        <FaUserCircle className='text-9xl text-[#606060]'/>
                    }
                    <div className='cursor-pointer absolute top-24 right-0 z-50 bg-[#484848] rounded-full shadow-lg  p-1'>
                        <MdFileUpload onClick={handleImageUpload} className='text-3xl text-primary-content  ' /> 
                        <input type="file" className='hidden' ref={fileUploadRef} onChange={saveImage} />
                    </div>            
                </div>
            </div>
        </div>
    );
};

export default ProfileImageUploader;