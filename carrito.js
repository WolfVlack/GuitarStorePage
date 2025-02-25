document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cartIcon');
    const cartContainer = document.getElementById('cartContainer');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const cartItemsContainer = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');

    let cart = [];

    // Función para actualizar el carrito en la ventana
    function updateCartUI() {
        cartItemsContainer.innerHTML = ''; // Limpiar el contenedor
        let total = 0;
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <img class="cartProductImage" src="${item.img}" alt="${item.name}">
                <span class="cartProductName">${item.name}</span>
                <span class="cartProductPrice">$${item.price}</span>
                <div class="quantity-controls">
                    <button class="decreaseBTN" onclick="changeQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="increaseBTN" onclick="changeQuantity(${index}, 1)">+</button>
                </div>
                <button class="removeBTN" onclick="removeItem(${index})">X</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
            total += item.price * item.quantity;
        });
        totalAmount.textContent = total.toFixed(2);
    }

    // Mostrar el carrito con animación
    cartIcon.addEventListener('click', () => {
        cartContainer.style.right = '0'; // Muestra el carrito
        updateCartUI(); // Actualiza el carrito al abrirlo
    });

    // Cerrar el carrito cuando se hace clic en el botón "Cerrar"
    closeCartBtn.addEventListener('click', () => {
        cartContainer.style.right = '-700px'; // Mueve el carrito fuera de la pantalla
    });

    // Vaciar el carrito
    clearCartBtn.addEventListener('click', () => {
        cart = []; // Vaciar el array del carrito
        updateCartUI(); // Actualiza la UI
    });

    // Función para eliminar un item del carrito
    window.removeItem = (index) => {
        cart.splice(index, 1); // Elimina el producto por índice
        updateCartUI(); // Actualiza la UI
    };

    // Función para cambiar la cantidad de un producto
    window.changeQuantity = (index, delta) => {
        if (cart[index].quantity + delta > 0) {
            cart[index].quantity += delta; // Cambiar la cantidad
            updateCartUI(); // Actualiza la UI
        }
    };

    // Agregar producto al carrito (se puede implementar dinámicamente al seleccionar productos)
    function addItemToCart(img, name, price) {
        // Comprobar si el producto ya está en el carrito
        const existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity += 1; // Si ya está, aumentar la cantidad
        } else {
            const product = { img, name, price, quantity: 1 };
            cart.push(product); // Agregar el nuevo producto al carrito
        }
        updateCartUI(); // Actualiza el carrito con el nuevo item
    }

    // Manejar el evento de clic en el icono del carrito
    document.querySelectorAll('.cart-icone').forEach(icon => {
        icon.addEventListener('click', (event) => {
            const img = event.currentTarget.dataset.img;
            const name = event.currentTarget.dataset.name;
            const price = parseFloat(event.currentTarget.dataset.price);
            addItemToCart(img, name, price);
        });
    });

    // Agregar algunos productos de ejemplo al carrito (esto lo debes adaptar a tu sistema de productos)
    addItemToCart('https://thumbs.static-thomann.de/thumb/thumb248x248/pics/prod/233185.webp', 'Guitarra Ejemplo', 300);
    addItemToCart('https://thumbs.static-thomann.de/thumb/thumb248x248/pics/prod/570927.webp', 'Batería Ejemplo', 500);
});
