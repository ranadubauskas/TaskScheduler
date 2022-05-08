import React from 'react';

export default function Item({itemData}) {

    return (
        <div>
        <p>{itemData.title}</p>
        <input type="checkbox"/>
        </div>
    );
    
}