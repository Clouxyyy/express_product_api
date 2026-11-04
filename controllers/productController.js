const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Helper untuk parsing dan validasi ID (bilangan bulat positif)
const parseId = (value) => {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
};

// Helper untuk validasi body produk
const validateProduct = (body) => {
    if (!body || typeof body.name !== "string" || body.name.trim() === "") {
        return "name wajib diisi";
    }

    const price = Number(body.price);
    if (!Number.isInteger(price) || price < 0) {
        return "price wajib berupa bilangan bulat minimal 0";
    }

    return null;
};

// GET: Menampilkan seluruh data produk
const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: { id: "asc" },
        });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
    }
};

// GET /:id: Menampilkan detail produk berdasarkan ID
const getProductById = async (req, res) => {
    try {
        const id = parseId(req.params.id);
        if (id === null) {
            return res.status(400).json({ message: "id tidak valid" });
        }

        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) {
            return res.status(404).json({ message: "produk tidak ditemukan" });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
    }
};

// POST: Membuat data produk baru
const createProduct = async (req, res) => {
    try {
        const error = validateProduct(req.body);
        if (error) {
            return res.status(400).json({ message: error });
        }

        const product = await prisma.product.create({
            data: {
                name: req.body.name.trim(),
                price: Number(req.body.price),
            },
        });

        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
};
