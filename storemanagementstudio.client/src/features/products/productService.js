const API_URL = "https://localhost:7155/api/Products";

// GET
const getProducts = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return await response.json();
};

// CREATE
const createProduct = async (productData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    });

    if (!response.ok) {
        throw new Error("Failed to create product");
    }

    return await response.json();
};

// DELETE
const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete product");
    }
};

// UPDATE
const updateProduct = async (id, productData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    });

    if (!response.ok) {
        throw new Error("Failed to update product");
    }

    return productData;
};

const productService = {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
};

export default productService;