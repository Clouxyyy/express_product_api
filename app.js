const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Route root
app.get("/", (req, res) => {
    res.status(200).json({ message: "API Produk ExpressJS siap digunakan" });
});

// Route produk
app.use("/products", productRoutes);

// Handler untuk route yang tidak ditemukan (404)
app.use((req, res) => {
    res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

app.listen(port, () => {
    console.log(`Server aktif di http://localhost:${port}`);
});
