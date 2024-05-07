import React from "react";
import { Outlet } from "react-router-dom";

const Inventario = () => {

    return (
        <>
        <section className="flex flex-col my-8 items-center min-h-[calc(100svh-16*0.25rem-19*0.25rem-16*0.25rem)]">
            
            <Outlet />
            
        </section>
        </>
    );
}

export default Inventario;