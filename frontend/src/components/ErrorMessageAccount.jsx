import React, { useEffect } from 'react';
import "../css/animations.css";

const ErrorMessageAccount = ({error}) => {
    
    /* useEffect(() => {
        if (error === '' || error === undefined || error === null) {
            return;
        }
        document.getElementById("error-message-account").classList.remove("hidden");
        
        void ErrorMessageAccount.offsetWidth;
        
        document.getElementById("error-message-account").classList.add("expand");
        document.getElementById("svg-error-message-account").classList.add("svg-expand");
           
    }, [error]); */
    
    return (
        
        <div 
            id="error-message-account"
            role="alert" 
            className={`flex flex-row justify-center text-error transition-all duration-100 ease-in animate-bounce ${error ? "opacity-100" : "opacity-0"}`}>
            
            <svg id="svg-error-message-account" xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="">{error}</span>
        </div>
    );
};

export default ErrorMessageAccount;