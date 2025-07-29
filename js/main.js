"use strict";

// Configuration et données globales
const API_BASE_URL = 'http://localhost:3000/api';
let currentUser = null;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Données de démonstration pour les produits
const sampleProducts = {
    imprimantes: [
        {
            id: 1,
            name: "Canon PIXMA TS3350",
            price: 59.99,
            category: "imprimantes",
            brand: "Canon",
            type: "jet d'encre",
            description: "Imprimante multifonction jet d'encre WiFi",
            image: "🖨️"
        },
        {
            id: 2,
            name: "HP LaserJet Pro M15w",
            price: 89.99,
            category: "imprimantes",
            brand: "HP",
            type: "laser",
            description: "Imprimante laser monochrome WiFi",
            image: "🖨️"
        },
        {
            id: 3,
            name: "Epson EcoTank ET-2720",
            price: 199.99,
            category: "imprimantes",
            brand: "Epson",
            type: "jet d'encre",
            description: "Imprimante multifonction à réservoirs rechargeables",
            image: "🖨️"
        }
    ],
    consommables: [
        {
            id: 4,
            name: "Cartouche Canon PG-545XL",
            price: 24.99,
            category: "consommables",
            brand: "Canon",
            type: "cartouche",
            description: "Cartouche d'encre noire haute capacité",
            image: "🎨"
        },
        {
            id: 5,
            name: "Toner HP CF217A",
            price: 79.99,
            category: "consommables",
            brand: "HP",
            type: "toner",
            description: "Toner noir original HP 17A",
            image: "🎨"
        },
        {
            id: 6,
            name: "Papier Photo Epson A4",
            price: 19.99,
            category: "consommables",
            brand: "Epson",
            type: "papier",
            description: "Papier photo brillant A4 - 100 feuilles",
            image: "📄"
        }
    ],
    accessoires: [
        {
            id: 7,
            name: "Câble USB-C vers USB-A",
            price: 12.99,
            category: "accessoires",
            brand: "Générique",
            type: "câble",
            description: "Câble USB-C vers USB-A 2m",
            image: "🔌"
        },
        {
            id: 8,
            name: "Support d'imprimante",
            price: 34.99,
            category: "accessoires",
            brand: "Générique",
            type: "support",
            description: "Support mobile pour imprimante avec rangement",
            image: "📐"
        }
    ]
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    updateCartCount();
    checkUserSession();
    
    // Charger les produits vedettes sur la page d'accueil
    if (document.getElementById('featuredProducts')) {
        loadFeaturedProducts();
    }
    
    // Charger les produits par catégorie
    if (document.getElementById('productsContainer')) {
        loadCategoryProducts();
    }
    
    // Initialiser la page panier
    if (document.getElementById('cartItems')) {
        loadCartItems();
    }
    
    // Initialiser les formulaires
    initializeForms();
}

// Gestion de la recherche
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm) {
        window.location.href = `category.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

// Écouter la touche Entrée dans la barre de recherche
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

// Chargement des produits vedettes
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    // Simuler un délai de chargement
    setTimeout(() => {
        const allProducts = [...sampleProducts.imprimantes, ...sampleProducts.consommables, ...sampleProducts.accessoires];
        const featuredProducts = allProducts.slice(0, 6); // Prendre les 6 premiers
        
        container.innerHTML = '';
        featuredProducts.forEach(product => {
            container.appendChild(createProductCard(product));
        });
    }, 1000);
}

// Chargement des produits par catégorie
function loadCategoryProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    const searchTerm = urlParams.get('search');
    
    let products = [];
    
    if (searchTerm) {
        // Recherche dans tous les produits
        const allProducts = [...sampleProducts.imprimantes, ...sampleProducts.consommables, ...sampleProducts.accessoires];
        products = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        document.getElementById('categoryTitle').textContent = `Résultats pour "${searchTerm}"`;
    } else if (category && sampleProducts[category]) {
        products = sampleProducts[category];
        document.getElementById('categoryTitle').textContent = getCategoryTitle(category);
    } else {
        // Afficher tous les produits
        products = [...sampleProducts.imprimantes, ...sampleProducts.consommables, ...sampleProducts.accessoires];
        document.getElementById('categoryTitle').textContent = 'Tous nos produits';
    }
    
    container.innerHTML = '';
    if (products.length === 0) {
        container.innerHTML = '<div class="alert alert-info">Aucun produit trouvé pour votre recherche.</div>';
    } else {
        products.forEach(product => {
            container.appendChild(createProductCard(product));
        });
    }
}

function getCategoryTitle(category) {
    const titles = {
        'imprimantes': 'Imprimantes',
        'consommables': 'Consommables',
        'accessoires': 'Accessoires',
        'promotions': 'Promotions'
    };
    return titles[category] || 'Produits';
}

// Création d'une carte produit
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in-up';
    
    card.innerHTML = `
        <div class="product-image">${product.image}</div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-brand">${product.brand}</p>
            <p class="product-description">${product.description}</p>
            <div class="product-price">${product.price.toFixed(2)} €</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Ajouter au panier
            </button>
        </div>
    `;
    
    // Ajouter un événement de clic pour voir les détails
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('add-to-cart')) {
            window.location.href = `product.html?id=${product.id}`;
        }
    });
    
    return card;
}

// Gestion du panier
function addToCart(productId) {
    const allProducts = [...sampleProducts.imprimantes, ...sampleProducts.consommables, ...sampleProducts.accessoires];
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) {
        showAlert('Produit non trouvé', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showAlert('Produit ajouté au panier !', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
    showAlert('Produit retiré du panier', 'info');
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(newQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        loadCartItems();
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function loadCartItems() {
    const container = document.getElementById('cartItems');
    const totalElement = document.getElementById('cartTotal');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="alert alert-info">Votre panier est vide</div>';
        if (totalElement) totalElement.textContent = '0.00 €';
        return;
    }
    
    let total = 0;
    container.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${item.brand}</p>
                <p class="cart-item-price">${item.price.toFixed(2)} €</p>
            </div>
            <div class="cart-item-controls">
                <input type="number" value="${item.quantity}" min="1" 
                       onchange="updateQuantity(${item.id}, this.value)" class="quantity-input">
                <button onclick="removeFromCart(${item.id})" class="remove-btn">Supprimer</button>
            </div>
            <div class="cart-item-total">${itemTotal.toFixed(2)} €</div>
        `;
        
        container.appendChild(cartItem);
    });
    
    if (totalElement) {
        totalElement.textContent = total.toFixed(2) + ' €';
    }
}

// Gestion des utilisateurs
function checkUserSession() {
    const user = localStorage.getItem('currentUser');
    const loginLink = document.getElementById('loginLink');
    const accountLink = document.getElementById('accountLink');
    
    if (user) {
        currentUser = JSON.parse(user);
        if (loginLink) loginLink.style.display = 'none';
        if (accountLink) {
            accountLink.style.display = 'block';
            accountLink.textContent = `Bonjour ${currentUser.name}`;
        }
    } else {
        if (loginLink) loginLink.style.display = 'block';
        if (accountLink) accountLink.style.display = 'none';
    }
}

function login(email, password) {
    // Simulation d'une connexion
    if (email && password) {
        const user = {
            id: 1,
            name: email.split('@')[0],
            email: email
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUser = user;
        checkUserSession();
        showAlert('Connexion réussie !', 'success');
        
        setTimeout(() => {
            window.location.href = 'account.html';
        }, 1500);
        
        return true;
    }
    
    showAlert('Email ou mot de passe incorrect', 'error');
    return false;
}

function register(name, email, password, confirmPassword) {
    if (password !== confirmPassword) {
        showAlert('Les mots de passe ne correspondent pas', 'error');
        return false;
    }
    
    if (name && email && password) {
        const user = {
            id: Date.now(),
            name: name,
            email: email
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUser = user;
        checkUserSession();
        showAlert('Compte créé avec succès !', 'success');
        
        setTimeout(() => {
            window.location.href = 'account.html';
        }, 1500);
        
        return true;
    }
    
    showAlert('Veuillez remplir tous les champs', 'error');
    return false;
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    checkUserSession();
    showAlert('Déconnexion réussie', 'info');
    window.location.href = 'index.html';
}

// Initialisation des formulaires
function initializeForms() {
    // Formulaire de connexion
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            login(email, password);
        });
    }
    
    // Formulaire d'inscription
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            register(name, email, password, confirmPassword);
        });
    }
    
    // Formulaire de checkout
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processCheckout();
        });
    }
}

// Traitement du paiement
function processCheckout() {
    if (cart.length === 0) {
        showAlert('Votre panier est vide', 'error');
        return;
    }
    
    if (!currentUser) {
        showAlert('Veuillez vous connecter pour finaliser votre commande', 'error');
        window.location.href = 'login.html';
        return;
    }
    
    // Simulation du traitement de paiement
    showAlert('Traitement du paiement en cours...', 'info');
    
    setTimeout(() => {
        // Vider le panier
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        showAlert('Commande confirmée ! Vous recevrez un email de confirmation.', 'success');
        
        setTimeout(() => {
            window.location.href = 'account.html';
        }, 2000);
    }, 2000);
}

// Système d'alertes
function showAlert(message, type = 'info') {
    // Supprimer les alertes existantes
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Insérer l'alerte en haut de la page
    document.body.insertBefore(alert, document.body.firstChild);
    
    // Supprimer l'alerte après 5 secondes
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Filtrage des produits
function filterProducts() {
    const brand = document.getElementById('brandFilter')?.value;
    const minPrice = document.getElementById('minPrice')?.value;
    const maxPrice = document.getElementById('maxPrice')?.value;
    const sortBy = document.getElementById('sortBy')?.value;
    
    // Recharger les produits avec les filtres
    loadCategoryProducts();
}

// Utilitaires
function formatPrice(price) {
    return price.toFixed(2) + ' €';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--primary)';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--border-color)';
        }
    });
    
    return isValid;
}

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    showAlert('Une erreur est survenue. Veuillez rafraîchir la page.', 'error');
});

// Export des fonctions pour utilisation globale
window.performSearch = performSearch;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.logout = logout;
window.filterProducts = filterProducts;
