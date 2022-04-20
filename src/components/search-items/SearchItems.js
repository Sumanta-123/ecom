import React from 'react';
import './SearchItems.css';
const SearchItems =()=> {
  return (
    <div className="searchItems">
      <input type="text" placeholder="Search your favorite items here...." name="searchItems" className="itemSearchBox"/>
    </div>
  );
}

export default SearchItems;
