import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import API from "../api.js";
import { AuthContext } from "../root";
import ImageUploader from '../components/ProfileImageUploader.tsx';
import ErrorMessageAccount from '../components/ErrorMessageAccount.jsx';



const AccountPage = () => {


    const {user, setUser, isLogged} = useContext(AuthContext);
    
    const navigation = useNavigate();
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState();
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [liveOnCampus, setLiveOnCampus] = useState(false);
    const [studying, setStudying] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const [error, setError] = useState('');
    

    /* este useEffect es para actualizar las variables cuando efectivamente se haya cargado user */
    useEffect(() => {
        
        if (isLogged) {
            setUsername(user.username);
            setEmail(user.email);
            setLiveOnCampus(user.live_on_campus);
            setStudying(user.studying);
            setProfilePic(user.profile_pic);
        }
    }, [isLogged, user]);
    
    
    
    const handleSubmit = async (request) => {
        request.preventDefault();
        if ( !isLogged) {
            console.log("Account error: user not logged");
            navigation("/");
        } else {       
            
            try {
                const formData = new FormData();
                formData.append("username", username);
                formData.append("email", email);
                formData.append("studying", studying);
                formData.append("live_on_campus", liveOnCampus);
                formData.append("profile_pic", profilePic);
                formData.append("password1", password1);
                formData.append("password2", password2);
                
                const response = await API.post(
                    "api-user/update/",
                    formData,
                );
                
                if (response.status !== 200) {
                    console.log("Error updating user");
                    return;
                } else{
                    console.log("User updated successfully");
                    setUser(response.data);
                    localStorage.setItem("user", JSON.stringify(response.data));
                    navigation("/");
                }
                
            } catch (error) {
                if (error.response && error.response.data && error.response.data.detail) {
                    setError(error.response.data.detail.substring(2, error.response.data.detail.length-2));
                } else {
                    setError("An error occurred. Please try again.");
                }
            }   
        }
    }
    
    

    return (
        <>

        <section className="flex flex-col justify-center items-center min-h-[calc(100svh-16*0.25rem-19*0.25rem)] overflow-hidden">
            
            
            {
                user ? <>
                <h1 className="text-4xl font-bold text-primary mb-4">Cuenta</h1>
                <form id="form-login" onSubmit={handleSubmit} className="shadow-lg flex flex-col bg-primary-content justify-center gap-5 px-12 py-12 w-1/3 rounded-xl">
                    
                    {/* AVATAR */}
                    <ImageUploader profilePic={profilePic} setProfilePic={setProfilePic}/>
                    
                    {/* EMAIL */}
                    <label className="input input-bordered bg-gray-200 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input required name="email" type="email" className="grow" placeholder="Email" id="email" defaultValue={user.email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    
                    {/* USERNAME */}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                        <input required name="username" type="text" className="grow" placeholder="Username" id="username" value={user.username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    
                    
                    <div className="flex flex-row justify-around items-center">
                        <div className="form-control">
                            <label className="cursor-pointer label flex flex-row gap-5">
                                <span className="label-text">Estudiando?</span>
                                <input type="checkbox" checked={studying} onChange={() => setStudying(!studying)} className="checkbox checkbox-primary" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="cursor-pointer label flex flex-row gap-5">
                                <span className="label-text">Vive en campus?</span>
                                <input type="checkbox" checked={liveOnCampus} onChange={() => setLiveOnCampus(!liveOnCampus)} className="checkbox checkbox-primary" />
                            </label>
                        </div>
                    </div>

                    {/* PASSWORD   */}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input name="password1" type="password" className="grow" placeholder="Change Password" id="password1" defaultValue={""} value={password1} onChange={(e) => setPassword1(e.target.value)} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input name="password2" type="password" className="grow" placeholder="Repeat Password" id="password2" defaultValue={""} value={password2} onChange={(e) => setPassword2(e.target.value)} />
                    </label>
                    
                    {/* Error message */}
                    <ErrorMessageAccount error={error} />  

                    <button id="submit-button" value="submit" type="submit" className="btn btn-primary w-full">Actualizar</button>

                </form> 
            </> : <span className="loading loading-ring loading-lg"></span>
               
            }
            
        </section>        
        </>
    );
} 

export default AccountPage;