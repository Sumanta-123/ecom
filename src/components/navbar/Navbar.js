import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../buttons/Button';
import './Navbar.css';
import SearchItems from '../search-items/SearchItems';

function Navbar() {
    return (
        <div className="navBar">
            <div>
                <Link to="/"><Button title={'BKD Spices'}/></Link>
                 <Button title={"Today's Offers"}/>
            </div>
            <div>
                <SearchItems/>
            </div>
            <div>
                <Button title={"Sign In \n Accounts"}/>
                <Button title={"Carts"}/>
            </div>
        </div>
        
    );
}

export default Navbar;
