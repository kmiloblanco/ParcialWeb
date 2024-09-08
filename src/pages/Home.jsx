// src/components/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import '../styles/Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://parcial.nucleoslabs.com.co/api/v1/productos/listar');
      setProducts(response.data.result); 
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    if (selectedProductId) {
      const fetchProductDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`https://parcial.nucleoslabs.com.co/api/v1/productos/listar/${selectedProductId}`);
          if (response.status === 200) {
            setSelectedProduct(response.data.result || {});
          } else {
            throw new Error(`Unexpected status code: ${response.status}`);
          }
        } catch (err) {
          console.error('Error al cargar los detalles del producto:', err.response || err.message);
          setError('Error al cargar los detalles del producto');
        } finally {
          setLoading(false);
        }
      };

      fetchProductDetails();
    }
  }, [selectedProductId]);

  const openModal = (productId) => {
    setSelectedProductId(productId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProductId(null);
    setSelectedProduct(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <h1>Products</h1>
      <Link to="/register-product" className="add-product-button">Añadir producto</Link>
      <div className="product-grid">
        {products.map(product => (
          <div
            className="product-card"
            key={product._id}
            onClick={() => openModal(product._id)} 
          >
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><strong>Marca:</strong> {product.marca}</p>
            <p><strong>Price:</strong> ${product.price}</p>
          </div>
        ))}
      </div>

      {modalIsOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {loading && <p className="text-center">Cargando...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {selectedProduct && !loading && !error && (
              <div>
                <h2>{selectedProduct.name}</h2>
                <img src={selectedProduct.image} alt={selectedProduct.name} className="product-image" />
                <p>{selectedProduct.description}</p>
                <p><strong>Marca:</strong> {selectedProduct.marca}</p>
                <p><strong>Price:</strong> ${selectedProduct.price}</p>
                <button onClick={closeModal}>Cerrar</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
