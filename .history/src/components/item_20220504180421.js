import React from 'react';

export default function Item({itemData, removeItem}) {

    return (
        <div className="item">
        <p>{itemData.title}</p>
        <p>{itemData.date.toDateString()}</p> 
        <input type="checkbox" onChange={() => removeItem(itemData)} /> 
        </div>
    );
    
}