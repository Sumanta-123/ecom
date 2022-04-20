import React from 'react';
import MostPropularProducts from '../product/MostPropularProducts';
import OfferOfTheDayProducts from '../product/OfferOfTheDayProducts';
import SuggestedProducts from '../product/SuggestedProducts';
import TopSelectionProducts from '../product/TopSelectionProducts';
import Auth from '../authentication/Auth';
import './Home.css';
export default function Home() {
    return (
        <div className="homeContainer">
            <MostPropularProducts />
            <OfferOfTheDayProducts />
            <SuggestedProducts/>
            <TopSelectionProducts />
            {/* <Auth/> */}
        </div>
    );
}
