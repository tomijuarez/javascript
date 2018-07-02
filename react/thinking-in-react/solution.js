import React from 'react';

const FilterableProductTable = () => {
    return (
        <div>
            <SearchBar />
            <ProductTable />
        </div>
    );
};

const SearchBar = () => {
    return (
        <div>Search...</div>
    );
};

const ProductTable = () => {
    return (
        <div>
            <ProductCategoryRow />
            <ProductRow />
        </div>
    );
};

const ProductCategoryRow = () => {
    return (
        <h2>Algo</h2>
    );
};

const ProductRow = (productName) => {
    return (
        <p>Otra cosa</p>
    );
};

export default FilterableProductTable;