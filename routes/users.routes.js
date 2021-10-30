const express = require('express');
const ProductsService = require('./../services/products.service'); //fake data

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await service.findOne(id);
  res.status(200).json(user);
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newUser = await service.create(body);
  res.status(201).json(newUser);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = await service.replace(id, ...body);
  res.json(product);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = await service.update(id, body);

  res.json(product);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await service.delete(id);

  res.json(deleted);
});

module.exports = router;

// router.get('/', async (req, res) => {
//   const { limit, offset } = req.query; // queri son opcionales asi q uso if

//   if (limit && offset) {
//     res.json({ limit, offset });
//   } else {
//     res.json('no hay parametros');
//   }
// });
