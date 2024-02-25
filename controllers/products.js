const Product = require('../models/product');
const fs = require('fs');
const path = require('path');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

// exports.postAddProduct = (req, res, next) => {
//   const product = new Product(req.body.title);
//   product.save();
//   res.redirect('/');
// };

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);

  const filePath = path.join(__dirname, '..', 'product.txt');

  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
      }

      let products = [];
      if (data) {
          try {
              products = JSON.parse(data);
          } catch (parseError) {
              console.error(parseError);
              return res.status(500).send('Internal Server Error');
          }
      }

      products.push(product);

      fs.writeFile(filePath, JSON.stringify(products), (writeErr) => {
          if (writeErr) {
              console.error(writeErr);
              return res.status(500).send('Internal Server Error');
          }
          res.redirect('/');
      });
  });
};

// exports.getProducts = (req, res, next) => {
//   const products = Product.fetchAll();
//   res.render('shop', {
//     prods: products,
//     pageTitle: 'Shop',
//     path: '/',
//     hasProducts: products.length > 0,
//     activeShop: true,
//     productCSS: true
//   });
// };

exports.getProducts = (req, res, next) => {
  const filePath = path.join(__dirname, '..', 'product.txt');

  fs.readFile(filePath, 'utf8', (readErr, data) => {
      if (readErr) {
          console.error(readErr);
          return res.status(500).send('Internal Server Error');
      }

      let products = [];
      if (data) {
          try {
              products = JSON.parse(data);
          } catch (parseError) {
              console.error(parseError);
              return res.status(500).send('Internal Server Error');
          }
      }

      res.render('shop', {
          prods: products,
          pageTitle: 'Shop',
          path: '/',
          hasProducts: products.length > 0,
          activeShop: true,
          productCSS: true
      });
  });
};

