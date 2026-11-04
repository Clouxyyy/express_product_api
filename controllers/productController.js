const products = require("../data/products");

const getAllProducts = (req, res) => {
    return res.status(200).json(products);
};

const getProductById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    return res.status(200).json(product);
};

const createProduct = (req, res) => {
    const { name, price } = req.body;

    // Validasi input: nama harus terisi dan harga harus berupa angka valid
    if (!name || price === undefined || price === null || isNaN(Number(price))) {
        return res.status(400).json({ message: "Nama dan harga produk wajib diisi" });
    }

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = {
        id: newId,
        name: typeof name === "string" ? name.trim() : name,
        price: Number(price)
    };
    
    products.push(newProduct);
    return res.status(201).json(newProduct);
};

module.exports = { getAllProducts, getProductById, createProduct };
