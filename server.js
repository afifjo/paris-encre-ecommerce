const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Base de données simulée en mémoire
let users = [
    {
        id: 1,
        name: 'Admin Paris Encre',
        email: 'admin@parisencre.fr',
        password: 'admin123',
        role: 'admin'
    },
    {
        id: 2,
        name: 'Client Test',
        email: 'client@test.fr',
        password: 'test123',
        role: 'client'
    }
];

let products = [
    // Imprimantes
    {
        id: 1,
        name: "Canon PIXMA TS3350",
        price: 59.99,
        category: "imprimantes",
        brand: "Canon",
        type: "jet d'encre",
        description: "Imprimante multifonction jet d'encre WiFi compacte et élégante",
        image: "🖨️",
        stock: 15,
        featured: true
    },
    {
        id: 2,
        name: "HP LaserJet Pro M15w",
        price: 89.99,
        category: "imprimantes",
        brand: "HP",
        type: "laser",
        description: "Imprimante laser monochrome WiFi rapide et fiable",
        image: "🖨️",
        stock: 8,
        featured: true
    },
    {
        id: 3,
        name: "Epson EcoTank ET-2720",
        price: 199.99,
        category: "imprimantes",
        brand: "Epson",
        type: "jet d'encre",
        description: "Imprimante multifonction à réservoirs rechargeables économique",
        image: "🖨️",
        stock: 12,
        featured: true
    },
    {
        id: 4,
        name: "Brother DCP-L2530DW",
        price: 149.99,
        category: "imprimantes",
        brand: "Brother",
        type: "laser",
        description: "Imprimante laser multifonction avec WiFi et recto-verso automatique",
        image: "🖨️",
        stock: 6,
        featured: false
    },
    
    // Consommables
    {
        id: 5,
        name: "Cartouche Canon PG-545XL",
        price: 24.99,
        category: "consommables",
        brand: "Canon",
        type: "cartouche",
        description: "Cartouche d'encre noire haute capacité pour Canon PIXMA",
        image: "🎨",
        stock: 25,
        featured: true
    },
    {
        id: 6,
        name: "Toner HP CF217A",
        price: 79.99,
        category: "consommables",
        brand: "HP",
        type: "toner",
        description: "Toner noir original HP 17A pour LaserJet Pro",
        image: "🎨",
        stock: 18,
        featured: true
    },
    {
        id: 7,
        name: "Papier Photo Epson A4",
        price: 19.99,
        category: "consommables",
        brand: "Epson",
        type: "papier",
        description: "Papier photo brillant A4 premium - 100 feuilles",
        image: "📄",
        stock: 30,
        featured: false
    },
    {
        id: 8,
        name: "Pack 4 Cartouches Canon",
        price: 89.99,
        category: "consommables",
        brand: "Canon",
        type: "cartouche",
        description: "Pack économique 4 cartouches couleur Canon PG-545/CL-546",
        image: "🎨",
        stock: 15,
        featured: true
    },
    
    // Accessoires
    {
        id: 9,
        name: "Câble USB-C vers USB-A",
        price: 12.99,
        category: "accessoires",
        brand: "Générique",
        type: "câble",
        description: "Câble USB-C vers USB-A haute qualité 2 mètres",
        image: "🔌",
        stock: 50,
        featured: false
    },
    {
        id: 10,
        name: "Support d'imprimante mobile",
        price: 34.99,
        category: "accessoires",
        brand: "Générique",
        type: "support",
        description: "Support mobile pour imprimante avec rangement intégré",
        image: "📐",
        stock: 12,
        featured: true
    },
    {
        id: 11,
        name: "Adaptateur WiFi USB",
        price: 19.99,
        category: "accessoires",
        brand: "TP-Link",
        type: "adaptateur",
        description: "Adaptateur WiFi USB haute vitesse AC600",
        image: "📡",
        stock: 20,
        featured: false
    },
    {
        id: 12,
        name: "Disque dur externe 1To",
        price: 69.99,
        category: "accessoires",
        brand: "Seagate",
        type: "stockage",
        description: "Disque dur externe portable 1To USB 3.0",
        image: "💾",
        stock: 8,
        featured: true
    }
];

let orders = [
    {
        id: 1,
        userId: 2,
        orderNumber: 'PE-2024-001',
        status: 'delivered',
        orderDate: '2024-12-15',
        deliveryDate: '2024-12-17',
        total: 89.99,
        items: [
            { productId: 1, quantity: 1, price: 59.99 },
            { productId: 5, quantity: 1, price: 24.99 }
        ],
        shippingAddress: {
            firstName: 'Client',
            lastName: 'Test',
            address: '123 Rue de la Paix',
            city: 'Paris',
            postalCode: '75001',
            country: 'France'
        }
    },
    {
        id: 2,
        userId: 2,
        orderNumber: 'PE-2024-002',
        status: 'processing',
        orderDate: '2024-12-20',
        deliveryDate: '2024-12-23',
        total: 199.99,
        items: [
            { productId: 3, quantity: 1, price: 199.99 }
        ],
        shippingAddress: {
            firstName: 'Client',
            lastName: 'Test',
            address: '123 Rue de la Paix',
            city: 'Paris',
            postalCode: '75001',
            country: 'France'
        }
    }
];

// Routes API

// Authentification
app.post('/api/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email et mot de passe requis' 
            });
        }
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            const { password, ...userWithoutPassword } = user;
            res.json({ 
                success: true, 
                user: userWithoutPassword,
                message: 'Connexion réussie'
            });
        } else {
            res.status(401).json({ 
                success: false, 
                message: 'Email ou mot de passe incorrect' 
            });
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur' 
        });
    }
});

app.post('/api/register', (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Tous les champs sont requis' 
            });
        }
        
        // Vérifier si l'email existe déjà
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({ 
                success: false, 
                message: 'Cet email est déjà utilisé' 
            });
        }
        
        // Créer le nouvel utilisateur
        const newUser = {
            id: users.length + 1,
            name,
            email,
            password,
            role: 'client'
        };
        
        users.push(newUser);
        
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json({ 
            success: true, 
            user: userWithoutPassword,
            message: 'Compte créé avec succès'
        });
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur' 
        });
    }
});

// Produits
app.get('/api/products', (req, res) => {
    try {
        const { category, search, brand, minPrice, maxPrice, sortBy, featured } = req.query;
        let filteredProducts = [...products];
        
        // Filtrer par catégorie
        if (category && category !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === category);
        }
        
        // Filtrer par recherche
        if (search) {
            const searchTerm = search.toLowerCase();
            filteredProducts = filteredProducts.filter(p => 
                p.name.toLowerCase().includes(searchTerm) ||
                p.brand.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm)
            );
        }
        
        // Filtrer par marque
        if (brand) {
            filteredProducts = filteredProducts.filter(p => p.brand === brand);
        }
        
        // Filtrer par prix
        if (minPrice) {
            filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
        }
        if (maxPrice) {
            filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
        }
        
        // Filtrer les produits vedettes
        if (featured === 'true') {
            filteredProducts = filteredProducts.filter(p => p.featured);
        }
        
        // Trier
        if (sortBy) {
            switch (sortBy) {
                case 'price-asc':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'name':
                    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'brand':
                    filteredProducts.sort((a, b) => a.brand.localeCompare(b.brand));
                    break;
                default:
                    break;
            }
        }
        
        res.json({ 
            success: true, 
            products: filteredProducts,
            total: filteredProducts.length
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur' 
        });
    }
});

app.get('/api/products/:id', (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);
        
        if (product) {
            res.json({ 
                success: true, 
                product 
            });
        } else {
            res.status(404).json({ 
                success: false, 
                message: 'Produit non trouvé' 
            });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur' 
        });
    }
});

// Commandes
app.get('/api/orders/:userId', (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const userOrders = orders.filter(o => o.userId === userId);
        
        // Enrichir les commandes avec les détails des produits
        const enrichedOrders = userOrders.map(order => ({
            ...order,
            items: order.items.map(item => {
                const product = products.find(p => p.id === item.productId);
                return {
                    ...item,
                    product: product || null
                };
            })
        }));
        
        res.json({ 
            success: true, 
            orders: enrichedOrders 
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur' 
        });
    }
});

app.post('/api/orders', (req, res) => {
    try {
        const { userId, items, shippingAddress, paymentMethod, total } = req.body;
        
        if (!userId || !items || !shippingAddress || !total) {
            return res.status(400).json({ 
                success: false, 
                message: 'Données de commande incomplètes' 
            });
        }
        
        // Vérifier le stock
        for (const item of items) {
            const product = products.find(p => p.id === item.productId);
            if (!product) {
                return res.status(404).json({ 
                    success: false, 
                    message: `Produit ${item.productId} non trouvé` 
                });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ 
                    success: false, 
                    message: `Stock insuffisant pour ${product.name}` 
                });
            }
        }
        
        // Créer la commande
        const newOrder = {
            id: orders.length + 1,
            userId,
            orderNumber: `PE-2024-${String(orders.length + 1).padStart(3, '0')}`,
            status: 'processing',
            orderDate: new Date().toISOString().split('T')[0],
            deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            total,
            items,
            shippingAddress,
            paymentMethod
        };
        
        orders.push(newOrder);
        
        // Mettre à jour le stock
        items.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                product.stock -= item.quantity;
            }
        });
        
        res.status(201).json({ 
            success: true, 
            order: newOrder,
            message: 'Commande créée avec succès'
        });
    } catch (error) {
        console.error('Erreur lors de la création de la commande:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur' 
        });
    }
});

// Statistiques (pour le tableau de bord admin)
app.get('/api/stats', (req, res) => {
    try {
        const totalProducts = products.length;
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const lowStockProducts = products.filter(p => p.stock < 5).length;
        
        res.json({
            success: true,
            stats: {
                totalProducts,
                totalOrders,
                totalRevenue,
                lowStockProducts
            }
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur' 
        });
    }
});

// Route pour servir les pages HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
    console.error('Erreur serveur:', err);
    res.status(500).json({ 
        success: false, 
        message: 'Erreur interne du serveur' 
    });
});

// Middleware pour les routes non trouvées
app.use((req, res) => {
    if (req.path.startsWith('/api/')) {
        res.status(404).json({ 
            success: false, 
            message: 'Route API non trouvée' 
        });
    } else {
        res.status(404).sendFile(path.join(__dirname, 'index.html'));
    }
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur Paris Encre démarré sur http://localhost:${PORT}`);
    console.log(`📁 Fichiers statiques servis depuis: ${__dirname}`);
    console.log(`🛒 API disponible sur: http://localhost:${PORT}/api`);
    console.log('\n📊 Données de test disponibles:');
    console.log('👤 Comptes utilisateurs:');
    console.log('   - admin@parisencre.fr / admin123 (Admin)');
    console.log('   - client@test.fr / test123 (Client)');
    console.log(`📦 ${products.length} produits en base`);
    console.log(`🛍️ ${orders.length} commandes de test`);
});

// Gestion propre de l'arrêt du serveur
process.on('SIGINT', () => {
    console.log('\n🛑 Arrêt du serveur Paris Encre...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Arrêt du serveur Paris Encre...');
    process.exit(0);
});
