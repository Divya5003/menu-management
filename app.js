const express = require('express');
const app = express();
app.use(express.json());

// Connect MongoDB
const connectDB = require('./config/database');
connectDB();

// Routes
const categoryRoutes = require('./routes/category');
const subcategoryRoutes = require('./routes/subcategory');
const itemRoutes = require('./routes/item');

app.use('/categories', categoryRoutes);
app.use('/subcategories', subcategoryRoutes);
app.use('/items', itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
