document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            name: 'Auriculares Inalámbricos',
            price: 59.99,
            category: 'electronics',
            image: 'image/audifonos.jpg'
        },
        {
            id: 2,
            name: 'Smartphone Android',
            price: 299.99,
            category: 'electronics',
            image: 'image/iphone.jpg'
        },
        {
            id: 3,
            name: 'Tablet 10"',
            price: 199.99,
            category: 'electronics',
            image: 'image/tablet.jpg'
        },
        {
            id: 4,
            name: 'Reloj Inteligente',
            price: 129.99,
            category: 'electronics',
            image: 'image/applewatch.jpg'
        },
        {
            id: 5,
            name: 'Chocolates Variados',
            price: 9.99,
            category: 'candies',
            image: 'image/galletas.jpg'
        },
        {
            id: 6,
            name: 'Gomitas de Frutas',
            price: 4.99,
            category: 'candies',
            image: 'image/gomitas.jpg'
        },
        {
            id: 7,
            name: 'Caramelos Surtidos',
            price: 3.99,
            category: 'candies',
            image: 'image/caramelos.jpg'
        },
        {
            id: 8,
            name: 'Chicles de Menta',
            price: 2.99,
            category: 'candies',
            image: 'image/chicles.jpg'
        },
        {
            id: 9,
            name: 'Jabón Líquido',
            price: 5.99,
            category: 'hygiene',
            image: 'image/jabonliquido.jpg'
        },
        {
            id: 10,
            name: 'Shampoo Anticaspa',
            price: 7.99,
            category: 'hygiene',
            image: 'image/shampoo.jpg'
        },
        {
            id: 11,
            name: 'Crema Dental',
            price: 3.49,
            category: 'hygiene',
            image: 'image/pastadental.jpg'
        },
        {
            id: 12,
            name: 'Desodorante Roll-On',
            price: 4.99,
            category: 'hygiene',
            image: 'image/dosodrante.jpg'
        }
    ];

    // DOM Elements
    const productGrid = document.getElementById('product-grid');
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.querySelector('.close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckout = document.querySelector('.close-checkout');
    const checkoutForm = document.getElementById('checkout-form');
    const paymentModal = document.getElementById('payment-modal');
    const paymentInfo = document.getElementById('payment-info');
    const closePayment = document.querySelector('.close-payment');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('MenuItems');
    const categoryFilter = document.querySelector('.category-filter');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const miniCartNotification = document.createElement('div');

    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    const mobileSearchInput = document.getElementById('mobile-search');
    const mobileSearchBtn = document.getElementById('mobile-search-btn');
    
    miniCartNotification.className = 'mini-cart-notification';
    document.body.appendChild(miniCartNotification);

    // Cart state
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Initialize the app
    function init() {
        renderProducts();
        updateCartCount();
        setupEventListeners();
        setupCategoryFilter();
        setupFAQ();
    }

// Nueva función para configurar el filtro de categorías
function setupCategoryFilter() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
}

// Función para filtrar productos
function filterProducts(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    renderFilteredProducts(filteredProducts);
}

// Función para renderizar productos filtrados
function renderFilteredProducts(filteredProducts) {
    productGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p class="no-products">No hay productos en esta categoría</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

    // Render products to the page
    function renderProducts() {
        productGrid.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // Update cart count in the header
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Render cart items in the modal
    function renderCartItems() {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Tu carrito está vacío</p>';
            return;
        }
        
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${product.name}</h4>
                    <p class="cart-item-price">$${product.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${product.id}">+</button>
                    </div>
                </div>
                <span class="remove-item" data-id="${product.id}">&times;</span>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Calculate and display total
        const total = cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            return sum + (product.price * item.quantity);
        }, 0);
        
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Add product to cart
    function addToCart(productId) {
        const existingItem = cart.find(item => item.id === productId);
        const product = products.find(p => p.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        
        saveCart();
        updateCartCount();
        renderCartItems();
        
        // Mostrar notificación del carrito
        miniCartNotification.innerHTML = `
            <i class="fas fa-check"></i>
            <span>${product.name} añadido al carrito</span>
        `;
        miniCartNotification.style.display = 'flex';
        
        setTimeout(() => {
            miniCartNotification.style.display = 'none';
        }, 3000);
        
        // Animación de vuelo al carrito
        const cartIconRect = cartIcon.getBoundingClientRect();
        const button = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
        const buttonRect = button.getBoundingClientRect();
        
        const flyingItem = document.createElement('div');
        flyingItem.className = 'flying-item';
        flyingItem.style.left = `${buttonRect.left}px`;
        flyingItem.style.top = `${buttonRect.top}px`;
        document.body.appendChild(flyingItem);
        
        setTimeout(() => {
            flyingItem.style.left = `${cartIconRect.left}px`;
            flyingItem.style.top = `${cartIconRect.top}px`;
            flyingItem.style.transform = 'scale(0.5)';
            flyingItem.style.opacity = '0.5';
            
            setTimeout(() => {
                flyingItem.remove();
            }, 500);
        }, 10);
    }


    // Función para configurar FAQ
    function setupFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                this.classList.toggle('active');
                const answer = this.nextElementSibling;
                answer.classList.toggle('active');
            });
        });
    }

    // Añadir este estilo para el mensaje de no productos

    // Remove product from cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartCount();
        renderCartItems();
    }

    // Update product quantity in cart
    function updateQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity += change;
            
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                saveCart();
                updateCartCount();
                renderCartItems();
            }
        }
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Setup event listeners
    function setupEventListeners() {
        // Add to cart buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = parseInt(e.target.getAttribute('data-id'));
                addToCart(productId);
            }
            
            // Cart item controls
            if (e.target.classList.contains('decrease')) {
                const productId = parseInt(e.target.getAttribute('data-id'));
                updateQuantity(productId, -1);
            }
            
            if (e.target.classList.contains('increase')) {
                const productId = parseInt(e.target.getAttribute('data-id'));
                updateQuantity(productId, 1);
            }
            
            if (e.target.classList.contains('remove-item')) {
                const productId = parseInt(e.target.getAttribute('data-id'));
                removeFromCart(productId);
            }
        });

        // Cerrar menú al hacer clic en un enlace del menú
        document.querySelectorAll('#MenuItems li a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) { // Solo para móviles
                    navMenu.classList.remove('active');
                }
             });
        });
    
        
        // Cart modal
        cartIcon.addEventListener('click', function() {
            renderCartItems();
            cartModal.style.display = 'block';
        });
        
        closeCart.addEventListener('click', function() {
            cartModal.style.display = 'none';
        });
        
        // Checkout process
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Tu carrito está vacío');
                return;
            }
            
            cartModal.style.display = 'none';
            checkoutModal.style.display = 'flex';
        });
        
        closeCheckout.addEventListener('click', function() {
            checkoutModal.style.display = 'none';
        });
        
        // Checkout form submission
       checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(checkoutForm);
            const name = formData.get('fullname');
            const address = formData.get('address');
            const phone = formData.get('phone');
            const notes = formData.get('notes') || 'Sin notas adicionales';
            
            // Calcular total
            const total = cart.reduce((sum, item) => {
                const product = products.find(p => p.id === item.id);
                return sum + (product.price * item.quantity);
            }, 0);
            
            // Generar detalles del pedido
            let orderDetails = `📦 *Nuevo Pedido Hemslt'Store* 📦\n\n`;
            orderDetails += `👤 *Cliente:* ${name}\n`;
            orderDetails += `📱 *Teléfono:* ${phone}\n`;
            orderDetails += `🏠 *Dirección:* ${address}\n\n`;
            orderDetails += `🛒 *Detalles del Pedido:*\n`;
            
            cart.forEach(item => {
                const product = products.find(p => p.id === item.id);
                orderDetails += `- ${product.name} (x${item.quantity}) - $${(product.price * item.quantity).toFixed(2)}\n`;
            });
            
            orderDetails += `\n💵 *Total:* $${total.toFixed(2)}\n`;
            orderDetails += `📝 *Notas:* ${notes}\n\n`;
            orderDetails += `🕒 *Fecha:* ${new Date().toLocaleString()}`;
            
            // Codificar el mensaje para URL
            const encodedMessage = encodeURIComponent(orderDetails);
            
            // Reemplaza ESTE_NUMERO con el número del grupo WhatsApp (sin + ni espacios)
            // Formato: 593987654321 (código país + número)
            const whatsappGroupNumber = "5356880708"
            
            // Crear enlace de WhatsApp
            const whatsappLink = `https://wa.me/${whatsappGroupNumber}?text=${encodedMessage}`;
            
            // Abrir enlace en nueva pestaña
            window.open(whatsappLink, '_blank');
            
            // Mostrar instrucciones de pago
            const cardNumber = 'XXXX-XXXX-XXXX-' + Math.floor(1000 + Math.random() * 9000);
            const phoneNumber = '5356880708';
            
            paymentInfo.innerHTML = `
                <p>Gracias por tu compra, ${name}!</p>
                <p>Hemos enviado los detalles de tu pedido a nuestro equipo.</p>
                <p><strong>Instrucciones de pago:</strong></p>
                <p>Pague via Transfermóvil a la tarjeta ${cardNumber} o al teléfono ${phoneNumber}.</p>
                <p><strong>Monto: $${total.toFixed(2)}</strong></p>
                <p>Una vez realizado el pago, recibirá un mensaje de confirmación.</p>
            `;
            
            checkoutModal.style.display = 'none';
            paymentModal.style.display = 'flex';
            
            // Limpiar carrito después del pedido
            cart = [];
            saveCart();
            updateCartCount();
        });
        // Close payment modal
        closePayment.addEventListener('click', function() {
            paymentModal.style.display = 'none';
            checkoutForm.reset();
        });
        
        // Mobile menu toggle
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
            
            if (e.target === checkoutModal) {
                checkoutModal.style.display = 'none';
            }
            
            if (e.target === paymentModal) {
                paymentModal.style.display = 'none';
                checkoutForm.reset();
            }
        });
    }

    // Initialize the app
    init();


// Función de búsqueda
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );

    if (filteredProducts.length > 0) {
        renderFilteredProducts(filteredProducts);
        // Desplázate a la sección de productos
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    } else {
        productGrid.innerHTML = '<p class="no-products">No encontramos "' + searchTerm + '"</p>';
    }
}

// Event listeners
searchBtn.addEventListener('click', searchProducts);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchProducts();
});


// Función de búsqueda (reutiliza la misma función del buscador desktop)
function handleMobileSearch() {
    const searchTerm = mobileSearchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    
    if (filteredProducts.length > 0) {
        renderFilteredProducts(filteredProducts);
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    } else {
        productGrid.innerHTML = '<p class="no-products">No hay resultados para "' + searchTerm + '"</p>';
    }
}

// Event listeners
mobileSearchBtn.addEventListener('click', handleMobileSearch);
mobileSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleMobileSearch();
});



});

