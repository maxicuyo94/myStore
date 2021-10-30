const express = require('express');
const ProductsService = require('./../services/products.service'); //fake data

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.status(200).json(products);
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, image } = req.body;
    const product = await service.replace(id, name, price, image);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await service.delete(id);
    res.json(deleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// router.get('/filter', async (req, res) => {
//   res.send('soy un filter');
// });
