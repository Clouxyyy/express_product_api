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

// PUT: Mengupdate data yang sudah ada (mendukung id via body atau url param)
const updateProduct = async (req, res) => {
    try {
        const rawId = req.body && req.body.id !== undefined ? req.body.id : req.params.id;
        const id = parseId(rawId);

        if (id === null) {
            return res.status(400).json({ message: "id tidak valid" });
        }

        const error = validateProduct(req.body);
        if (error) {
            return res.status(400).json({ message: error });
        }

        const existingProduct = await prisma.product.findUnique({ where: { id } });
        if (!existingProduct) {
            return res.status(404).json({ message: "produk tidak ditemukan" });
        }

        const updated = await prisma.product.update({
            where: { id },
            data: {
                name: req.body.name.trim(),
                price: Number(req.body.price),
            },
        });

        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
    }
};

// DELETE /:id: Menghapus data produk berdasarkan ID
const deleteProduct = async (req, res) => {
    try {
        const id = parseId(req.params.id);
        if (id === null) {
            return res.status(400).json({ message: "id tidak valid" });
        }

        const existingProduct = await prisma.product.findUnique({ where: { id } });
        if (!existingProduct) {
            return res.status(404).json({ message: "produk tidak ditemukan" });
        }

        await prisma.product.delete({ where: { id } });
        return res.status(200).json({ message: "produk berhasil dihapus" });
    } catch (error) {
        return res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
