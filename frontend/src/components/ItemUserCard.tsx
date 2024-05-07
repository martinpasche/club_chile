import React from 'react';
import { Form } from 'react-router-dom';
import choripanImage from '../imgs/choripan.jpeg';

interface ItemUserCardProps {
    number: null | number;
    name: string;
    description: number;
    quantity: number;
    image: string | null;
}




const ItemUserCard: React.FC<ItemUserCardProps> = (props) => {
    
    console.log(props);
    
    return (
        <div className="card h-96 w-96 bg-base-100 shadow-xl">
            
            <figure><img src={props.image ? props.image : choripanImage} alt="imagen item" /></figure>
            <div className="card-body">
                <h2 className="card-title">{props.name}</h2>
                <p>{props.description}</p>
                <p>Cantidad: {props.quantity}</p>
                <div className="card-actions justify-end">
                
                <Form method="post">
                    <input type="hidden" name="info" value="edit" />
                    <input type="hidden" name="item_id" value={`${props.number}`} />
                    <button type="submit" className="btn btn-primary w-20">Edit</button>
                </Form>
                <Form method="post" action={`${props.number}/destroy`}>
                    <button type="submit" className="btn btn-secondary w-20">Erase</button>
                </Form>
                
                </div>
            </div>
        </div>
    );
};

export default ItemUserCard;