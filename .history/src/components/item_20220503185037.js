import React from 'react';

export default function Item({itemData}) {

    return (
        <div className="item">
        <p>{itemData.title}</p>
        <input type="checkbox"/>
        </div>
    );
    
}