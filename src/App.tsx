import React, { useState } from 'react';
import './App.css';

type Product = {
  name: string;
  category: string;
  price: number;
};

const products: Product[] = [
  { name: "TV", category: "Electronics", price: 1500 },
  { name: "Washing machine", category: "Electronics", price: 3000 },
  { name: "Laptop", category: "Electronics", price: 1999 },
  { name: "T-shirt", category: "Clothing", price: 50 },
  { name: "Jeans", category: "Clothing", price: 40 },
  { name: "Shoes", category: "Clothing", price: 20 },
  { name: "Calculus", category: "Books", price: 100 },
  { name: "Novel", category: "Books", price: 15 },
  { name: "Arabic", category: "Books", price: 120 },
];

const App: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [priceFilter, setPriceFilter] = useState<number>(500);

  const filteredProducts = products.filter(product => {
    return (categoryFilter === "All" || product.category === categoryFilter) &&
           product.price <= priceFilter;
  });

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  const handlePriceChange = (price: number) => {
    setPriceFilter(price);
  };

  return (
    <div className="App">
      <header>
        <h1>Product List</h1>
      </header>

      <section className="filters">
        <div className="filter-group">
          <label htmlFor="categoryFilter">Select Category:</label>
          <select id="categoryFilter" value={categoryFilter} onChange={(e) => handleCategoryChange(e.target.value)}>
            <option value="All">All</option>
            <option value="Electronics">📱 Electronics</option>
            <option value="Clothing">👗 Clothing</option>
            <option value="Books">📚 Books</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priceRange">Price Range:</label>
          <input type="range" id="priceRange" min="0" max="1000" value={priceFilter} onChange={(e) => handlePriceChange(parseInt(e.target.value))} />
          <span id="priceValue">{priceFilter}</span>
        </div>
      </section>

      <ProductList products={filteredProducts} />
    </div>
  );
};

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <section id="product-list" className="product-list">
      {products.map(product => (
        <div key={product.name} className="product-item">
          <div className="product-card">
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default App;
