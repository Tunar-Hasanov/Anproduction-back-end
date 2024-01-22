// app.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const handlers = require('./Handler/handlers');
const adminLogin = require('./routes/POST/adminlogin');
const adminRegister = require('./routes/POST/adminregister');
const { authenticateAdmin } = require('./middlewares/authadmin');
const productRouter = require('./routes/POST/add-product');
const imagePath = require('./routes/GET/imageUrl')
const productEdit = require('./routes/GET/product-edit');
const productEditPut = require('./routes/PUT/productEditPut');
const productDelete = require('./routes/DELETE/product-delete');
const addCategory = require('./routes/POST/add-category');
const orderPost = require('./routes/POST/order-post');
const categoryRoute = require('./routes/GET/categoryUrl');
const categoryUpdateGet = require('./routes/GET/category-edit');
const categoryEditPut = require('./routes/PUT/categoryEditPut');
const productAdd = require('./routes/GET/product-add');
const categoryDelete = require('./routes/DELETE/category-delete');
const orderDelete = require('./routes/DELETE/order-delete');
const MarkRead = require('./routes/POST/read-order');
const mongoose = require('mongoose');
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(handlers);

require('dotenv').config();
// mongodb conn
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'conn error: '));
db.once('open', () => {
    console.log('conn successful mongodb');
});

// cors
app.use(cors({
    origin: 'https://anproduction.com/',
}));
// routes post
app.use('/admin/login', adminLogin);
app.use('/admin/register', adminRegister);
app.use('/add-product', productRouter);
app.use('/add-category', addCategory);
app.use('/submit-order', orderPost);
app.use('/', MarkRead);
// routes get
app.use('/', imagePath);
app.use('/', productEdit);
app.use('/', categoryRoute);
app.use('/', productAdd);
app.use('/', categoryUpdateGet);
// routes put
app.use('/', productEditPut);
app.use('/', categoryEditPut);
// routes delete
app.use('/', productDelete);
app.use('/', categoryDelete);
app.use('/', orderDelete);
// LISTEN PORT
app.set('port', process.env.PORT);

const PORT = app.get('port');
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
