const express = require('express');
const ProductsService = require('./../services/products.service'); //fake data

const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  const products = service.find();
  res.status(200).json(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  product
    ? res.status(200).json(product)
    : res.status(404).json({
        message: 'id not found',
      });
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.replace(id, ...body);
  res.json(product);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);

  res.json(product);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleted = service.delete(id);

  res.json(deleted);
});

// router.get('/filter', (req, res) => {
//   res.send('soy un filter');
// });
module.exports = router;
