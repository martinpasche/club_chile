import maoiImg from './svg/moai-chile-svgrepo-com.svg';
import chileFlag from './svg/flag-for-flag-chile-svgrepo-com.svg';
import instaImg from './svg/instagram-svgrepo-com.svg';
import linkcs from './svg/linkcs_logo.svg';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import React, {useEffect, useState, createContext} from 'react';
import API from './api.js';




const media_path = "https://django.clubchilien.xyz"
const user_default_state = {
    username : null,
    first_name : null,
    last_name : null,
    email : null,
    profile_pic : null,
}

export const AuthContext = createContext(null);


export default function Root () {

    const [user, setUser] = useState(user_default_state);
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate()


    /* we want to control the top navbar */
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visibleNavBar, setVisibleNavBar] = useState(true);  
    
    
    
    console.log("User",user);
    console.log("profile pic", user.profile_pic);
    console.log("isLogged", isLogged);
    
    
    
    
    
    const handleLogout = async (e) => {
        
        // we are going to check if an item exists in localstorage
        const storedUser = localStorage.getItem("user");
        if (storedUser){
            localStorage.removeItem("user");
            setIsLogged(false);
        }
        
        API
            .post(
                "/api-user/logout/", {}
            ).then( (response) => {
                console.log("Logout successful");
                setUser(user_default_state);
                setIsLogged(false);
                localStorage.removeItem("user");
                navigate("/");
            }).catch( (error) => {
                console.log("handle logout:", error);
                setIsLogged(false);
                navigate("/");
            })
    }


    
    
    /* For controlling the navbar disappearance */
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            if (currentScrollPos > prevScrollPos) {     
                setVisibleNavBar(false);
            } else {
                setVisibleNavBar(true);
            }
            setPrevScrollPos(currentScrollPos);    
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);


    useEffect(() => {
        
        const storedUser = localStorage.getItem("user");
        if (storedUser){
            setUser(JSON.parse(storedUser));
        }else {
            
            if (isLogged) {
                API
                .get("/api-user/user/", {})
                .then( (response) => {
                    console.log("response", response);
                    if (response.data.user === undefined || response.data.user === null) {
                        setIsLogged(false);
                    }
                    else {
                        setIsLogged(true);
                        setUser(response.data.user);
                        localStorage.setItem("user", JSON.stringify(response.data.user));
                    }
                })
                .catch( (error) => {
                    localStorage.removeItem("user");
                    setIsLogged(false);
                    console.log("User not logged in");
                });
            } else {
                //AGREGAR LOGIN THE USUARIO
                return;
            }            
        }
    }, [isLogged]);


    return (
    <>
    <AuthContext.Provider value={{user, setUser, isLogged, setIsLogged}}>

    {/* --------- Init navbar ----------- */}
    <div className={`navbar bg-base-100 z-50 fixed top-0 transition-transform ease-in-out duration-500 ${visibleNavBar ? '' : '-translate-y-20'} `}>
        <div className="navbar-start">
            <div className="dropdown">
                
            <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            
            {/* small screen */}
            <ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Actividades</a></li>
                <li>
                <a>Parent</a>
                <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                </ul>
                </li>
                <li><Link to={'/Nosotros'}>Nosotros</Link></li>
                <li><Link to={'/Inventario'}>Inventario</Link></li>
            </ul>

            </div>
            <Link to={"/"} className="btn btn-ghost text-xl hover:bg-transparent ">
                <img src={chileFlag} className='' width="30px" alt="Chilean flag"/>
                Club Chileno
            </Link>
        </div>
        
        {/* full screen */}
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
            <li><a >Actividades</a></li>
            <li>
                <details>
                <summary>Parent</summary>
                <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                </ul>
                </details>
            </li>
            <li><Link to={'/Nosotros'}>Nosotros</Link></li>
            <li><Link to={'/Inventario'}>Inventario</Link></li>
            </ul>
        </div>
        
        <div className="navbar-end">
            
            {/* Icono de instagram y linkcs */}
            <a className="btn btn-ghost" href='https://linkcs.fr/association/club-chilien-254' target="_blank"><img src={linkcs} width="30px" alt="Link CS"/></a>
            <a className="btn btn-ghost" target="_blank" href="https://www.instagram.com/club_chilien_cs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><img src={instaImg} width="30px" alt="Instagram"/></a>

            {/* Icono de perfil */}
            { isLogged ? 
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost m-1">
                        {
                            user !== null && user.profile_pic !== null ?
                            <img src={media_path + user.profile_pic} className="size-9 rounded-full border-2 border-black" alt="Profile pic"/>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-9">
                                <path strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        }
                        
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to={"/Account"}>Account</Link></li>
                        <li><Link to={"/Inventario-Usuario"}>Inventario</Link></li>
                        <li><a onClick={(e) => handleLogout(e)}>Logout</a></li>
                    </ul>
                </div>
            : /* the not to isLogged */
                <Link to={'/Login'} className="btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-9">
                        <path strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </Link>
            }
            
        </div>
    </div>

    {/* --------- End navbar ----------- */}


    {/* --------- Contenido ------------ */}

    <div className='w-full'>
        <div className="w-full h-[calc(19*0.25rem)] bg-base-100"/>
        <Outlet />
    </div>


    {/* Añadir un footer */}
    
    <footer className="footer items-center p-4 bg-neutral h-16 text-neutral-content">
        <aside className="items-center grid-flow-col">
            <img src={maoiImg} className='-scale-x-90' width="25px" alt="Moai"/>
            <p>Copyright © 2024 - All right reserved</p>
        </aside> 
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
            </a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
        </nav>
    </footer>

    </AuthContext.Provider>

    </>);
}