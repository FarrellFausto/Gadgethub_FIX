// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

// const handleResponse = async (response) => {
//     if (!response.ok) {
//         const errorBody = await response.json().catch(() => ({}));
//         const message = errorBody?.message || 'Terjadi kesalahan pada server';
//         throw new Error(message);
//     }
//     return response.json();
// };

// export const fetchProducts = async ({ category, search } = {}) => {
//     const params = new URLSearchParams();
//     if (category && category !== 'All') params.append('category', category);
//     if (search) params.append('search', search);

//     const queryString = params.toString();
//     const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`;

//     const response = await fetch(url);
//     return handleResponse(response);
// };

// export const fetchCategories = async () => {
//     const response = await fetch(`${API_BASE_URL}/categories`);
//     return handleResponse(response);
// };

// export const createProduct = async (payload) => {
//     const response = await fetch(`${API_BASE_URL}/products`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//     });
//     return handleResponse(response);
// };

// export const updateProduct = async (id, payload) => {
//     const response = await fetch(`${API_BASE_URL}/products/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//     });
//     return handleResponse(response);
// };

// export const deleteProduct = async (id) => {
//     const response = await fetch(`${API_BASE_URL}/products/${id}`, {
//         method: 'DELETE',
//     });
//     return handleResponse(response);
// };

// export const fetchApiMeta = async () => {
//     const response = await fetch(API_BASE_URL);
//     return handleResponse(response);
// };

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const message = errorBody?.message || 'Terjadi kesalahan pada server';
        throw new Error(message);
    }
    return response.json();
};

// GET all products with optional filters and pagination
export const fetchProducts = async ({ category, search, page = 1, limit = 6 } = {}) => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    params.append('page', page);
    params.append('limit', limit);

    const queryString = params.toString();
    const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url);
    return handleResponse(response);
};

// GET all categories
export const fetchCategories = async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return handleResponse(response);
};

// POST - Create new product
export const createProduct = async (payload) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return handleResponse(response);
};

// PUT - Update product
export const updateProduct = async (id, payload) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return handleResponse(response);
};

// DELETE - Remove product
export const deleteProduct = async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};

// GET API metadata
export const fetchApiMeta = async () => {
    const response = await fetch(API_BASE_URL);
    return handleResponse(response);
};
