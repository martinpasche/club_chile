import React, {useState, useContext} from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";    
import { AuthContext } from "../root";
import ErrorMessageAccount from "../components/ErrorMessageAccount";
/* import API from "../api.js"; */
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: `https://django.clubchilien.xyz`,
  
});


const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {user, setUser, isLogged, setIsLogged} = useContext(AuthContext);
    const [error, setError] = useState('');


    const handleSubmit = async (request) => {
        request.preventDefault();
        console.log("handle submit");
        try {
            const response = await API.post( 
                "api-user/login/", 
                {
                    email : email,
                    password : password
                }
            );
            console.log("response",response);
            console.log("response.data", response.data);
            
            setIsLogged(true);
            navigate("/");
            

        } catch (error) {
            if (error.response && error.response.data && error.response.data.detail) {
                setError(error.response.data.detail.substring(2, error.response.data.detail.length-2));
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    }





    return (
        <>
        <section className="flex flex-col justify-center items-center h-[calc(100vh-0.25rem*16-0.25rem*20)] overflow-hidden">
            <h1 className="text-4xl font-bold text-primary mb-4">Login</h1>
            <Form id="form-login" onSubmit={handleSubmit} className="flex flex-col bg-primary-content justify-center gap-5 px-12 py-12 w-1/3 rounded-xl">
                
                {/* email */}
                <label className="input input-bordered flex items-center gap-2 grow">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input required name="email" type="email" className="grow" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                
                {/* Pasword */}
                <label className="input input-bordered flex items-center gap-2 grow">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input required name="password" type="password" className="grow" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                
                
                {/* Recuerdame NO ESTA FUNCIONAL XD efecto placebo --------------------------------------- */}
                <div className="flex flex-row justify-around items-center grow">
                    <div className="form-control">
                        <label className="cursor-pointer label flex flex-row gap-5">
                            <span className="label-text">Recuerdame</span>
                            <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
                        </label>
                    </div>
                    <a className="text-primary cursor-pointer">¿Contra?</a>
                </div>
                
                {/* Error message */}       
                {<ErrorMessageAccount error={error} />  }         
                 

                <button id="submit-button" value="submit" type="submit" className="btn btn-primary w-full grow">Login</button>

                <div className="flex flex-row text-sm justify-center gap-3 grow">
                    <p>¿Aun no e' chileno?</p>
                    <Link to={'/register'} className="text-primary cursor-pointer">¡Chilenizate!</Link>
                </div>
            </Form>
        </section>
        </>
    );
} 

export default LoginPage;