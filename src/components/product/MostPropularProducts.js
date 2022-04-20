import React from 'react';
import './Product.css';
import ProductGruops from './ProductGruops';
const MostPropularProducts =()=> {
    return (
        <div className="productContainer bgWhite">
            <ProductGruops group={["Home","Eelectronics", "Kid", "Feshion"] }/>
        </div>
    );
}

export default MostPropularProducts;
    