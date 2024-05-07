import React from 'react';
import { Form } from 'react-router-dom';

interface ItemUserCardProps {
    number: null | number;
    name: string;
    description: number;
    quantity: number;
    image: string | null;
    username: string | null;
}




const ItemCard: React.FC<ItemUserCardProps> = (props) => {
    
    return (
        <div className="card h-96 w-96 bg-base-100 shadow-xl">
            
            <figure><img src={`${props.image}`} alt="imagen item" /></figure>
            <div className="card-body">
                <h2 className="card-title">{props.name}</h2>
                <p className='text-sm text-gray-500'>{props.username}</p>
                <p>{props.description}</p>
                <p>Cantidad: {props.quantity}</p>
                <div className="card-actions justify-end">                
                </div>
            </div>
        </div>
    );
};

export default ItemCard;