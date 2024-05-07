import React from 'react';
import { Form } from 'react-router-dom';
import { MdOutlineAddCircleOutline } from "react-icons/md";

function AddItemSymbol() {
    
    
    return (
        <div className={`w-96 h-96 flex flex-row justify-center items-center`}>
            <Form method="post">
                <input type="hidden" name="info" value="create" />
                <button type="submit">
                    <MdOutlineAddCircleOutline className='text-9xl text-[#606060]' />
                </button>
            </Form>
        </div>
    );
}

export default AddItemSymbol;