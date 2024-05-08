import React from "react";
import API from "../../api.js";
import { redirect } from "react-router-dom";



export async function action ({request, params}) {
    try {
        let itemId = params.itemId;
        const response = await API.delete(`/api-inventory/item/${itemId}`, {});
        return redirect("/Inventario-Usuario"); ;
    } catch (error) {
        console.log("Error deleting item", error);
        return redirect("/Inventario-Usuario") ;
    }
}

const DestroyItem = () => {
    return (
        <>
        <h1>Destroy Item</h1>
        </>
    )
}

export default DestroyItem;