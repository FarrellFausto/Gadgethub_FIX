// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 4000;
// const DATA_PATH = path.join(__dirname, 'data', 'products.json');

// const readProducts = () => {
//   const file = fs.readFileSync(DATA_PATH, 'utf-8');
//   return JSON.parse(file);
// };

// const writeProducts = (products) => {
//   fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2), 'utf-8');
// };

// const apiMetadata = {
//   name: 'GadgetHub API',
//   version: '1.1.0',
//   description: 'RESTful API untuk katalog produk GadgetHub dengan CRUD',
// };

// app.use(cors());
// app.use(express.json());

// app.get('/api', (req, res) => {
//   res.json({
//     ...apiMetadata,
//     endpoints: [
//       '/api/products',
//       '/api/products/:id',
//       '/api/categories',
//     ],
//   });
// });

// app.get('/api/products', (req, res) => {
//   const { category, search } = req.query;
//   let result = readProducts();

//   if (category) {
//     result = result.filter(
//       (product) => product.category.toLowerCase() === category.toLowerCase(),
//     );
//   }

//   if (search) {
//     const keyword = search.toLowerCase();
//     result = result.filter((product) => product.name.toLowerCase().includes(keyword));
//   }

//   res.json(result);
// });

// app.get('/api/products/:id', (req, res) => {
//   const productId = Number(req.params.id);
//   const product = readProducts().find((item) => item.id === productId);

//   if (!product) {
//     return res.status(404).json({ message: 'Produk tidak ditemukan' });
//   }

//   return res.json(product);
// });

// app.post('/api/products', (req, res) => {
//   const { name, category, price, image, rating, description, specs = {} } = req.body;

//   if (!name || !category || typeof price === 'undefined') {
//     return res.status(400).json({ message: 'Name, category, dan price wajib diisi' });
//   }

//   const products = readProducts();
//   const newProduct = {
//     id: products.length ? Math.max(...products.map((item) => item.id)) + 1 : 1,
//     name,
//     category,
//     price,
//     image: image || '',
//     rating: typeof rating === 'number' ? rating : 0,
//     description: description || '',
//     specs,
//   };

//   products.push(newProduct);
//   writeProducts(products);

//   return res.status(201).json(newProduct);
// });

// app.put('/api/products/:id', (req, res) => {
//   const productId = Number(req.params.id);
//   const products = readProducts();
//   const productIndex = products.findIndex((item) => item.id === productId);

//   if (productIndex === -1) {
//     return res.status(404).json({ message: 'Produk tidak ditemukan' });
//   }

//   const existingProduct = products[productIndex];
//   const updatedProduct = {
//     ...existingProduct,
//     ...req.body,
//     id: existingProduct.id,
//     specs: req.body.specs || existingProduct.specs,
//   };

//   products[productIndex] = updatedProduct;
//   writeProducts(products);

//   return res.json(updatedProduct);
// });

// app.delete('/api/products/:id', (req, res) => {
//   const productId = Number(req.params.id);
//   const products = readProducts();
//   const productIndex = products.findIndex((item) => item.id === productId);

//   if (productIndex === -1) {
//     return res.status(404).json({ message: 'Produk tidak ditemukan' });
//   }

//   const deletedProduct = products.splice(productIndex, 1)[0];
//   writeProducts(products);

//   return res.json({ message: 'Produk berhasil dihapus', product: deletedProduct });
// });

// app.get('/api/categories', (req, res) => {
//   const categories = [...new Set(readProducts().map((product) => product.category))];
//   res.json(categories);
// });

// app.use((req, res) => {
//   res.status(404).json({ message: 'Endpoint tidak tersedia' });
// });

// app.listen(PORT, () => {
//   console.log(`✅ GadgetHub API running on http://localhost:${PORT}`);
// });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 4000;

// Konfigurasi Supabase
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Error: SUPABASE_URL dan SUPABASE_ANON_KEY harus diisi di file .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const apiMetadata = {
  name: 'GadgetHub API',
  version: '2.0.0',
  description: 'RESTful API untuk katalog produk GadgetHub dengan Supabase',
};

app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/api', (req, res) => {
  res.json({
    ...apiMetadata,
    endpoints: [
      { method: 'GET', path: '/api/products', description: 'Get all products' },
      { method: 'GET', path: '/api/products/:id', description: 'Get product by ID' },
      { method: 'POST', path: '/api/products', description: 'Create new product' },
      { method: 'PUT', path: '/api/products/:id', description: 'Update product' },
      { method: 'DELETE', path: '/api/products/:id', description: 'Delete product' },
      { method: 'GET', path: '/api/categories', description: 'Get all categories' },
    ],
  });
});

// GET semua products dengan filter
app.get('/api/products', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = supabase.from('products').select('*');

    // Filter by category
    if (category) {
      query = query.ilike('category', category);
    }

    // Search by name
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// GET product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// POST - Tambah product baru
app.post('/api/products', async (req, res) => {
  try {
    const { name, category, price, image, rating, description, specs } = req.body;

    // Validasi input
    if (!name || !category || price === undefined || price === null) {
      return res.status(400).json({
        message: 'Name, category, dan price wajib diisi',
        required: ['name', 'category', 'price']
      });
    }

    const newProduct = {
      name,
      category,
      price: parseFloat(price),
      image: image || '',
      rating: rating ? parseFloat(rating) : 0,
      description: description || '',
      specs: specs || {},
    };

    const { data, error } = await supabase
      .from('products')
      .insert([newProduct])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// PUT - Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const updates = { ...req.body };

    // Jangan izinkan update id, created_at
    delete updates.id;
    delete updates.created_at;

    // Convert price dan rating ke number jika ada
    if (updates.price) updates.price = parseFloat(updates.price);
    if (updates.rating) updates.rating = parseFloat(updates.rating);

    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', productId)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    res.json({ message: 'Produk berhasil dihapus', product: data });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

// GET semua categories
app.get('/api/categories', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('category');

    if (error) throw error;

    // Get unique categories
    const categories = [...new Set(data.map((item) => item.category))];

    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak tersedia' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ GadgetHub API running on http://localhost:${PORT}`);
  console.log(`📦 Connected to Supabase: ${SUPABASE_URL}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
});