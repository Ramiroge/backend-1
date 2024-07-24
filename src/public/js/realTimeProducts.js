// public/js/realTimeProducts.js

document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
  
    socket.emit('requestProducts');
  
    socket.on('productList', (products) => {
      const productContainer = document.getElementById('product-list');
      productContainer.innerHTML = '';
  
      products.forEach(product => {
        const productElement = document.createElement('li');
        productElement.innerHTML = `
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <p>Precio: $${product.price}</p>
          <p>Categoría: ${product.category}</p>
          <p>Stock: ${product.stock}</p>
          <p>Código: ${product.code}</p>
          <p>Status: ${product.status ? 'Disponible' : 'No disponible'}</p>
          <button onclick="deleteProduct(${product.id})">Eliminar</button>
        `;
        productContainer.appendChild(productElement);
      });
    });
  
    document.getElementById('add-product-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(e.target);
      const product = Object.fromEntries(formData.entries());
      
      socket.emit('addProduct', product);
      e.target.reset();
    });
  
    window.deleteProduct = (id) => {
      socket.emit('deleteProduct', id);
    };
  });
  