const express = require('express');
const router = express.Router();

const faker = require('faker'); //fake data

// router.get('/', (req, res) => {
//   const { limit, offset } = req.query; // queri son opcionales asi q uso if

//   if (limit && offset) {
//     res.json({ limit, offset });
//   } else {
//     res.json('no hay parametros');
//   }
// });

router.get('/', (req, res) => {
  const users = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    users.push({
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      image: faker.image.imageUrl(),
    });
  }
  res.status(200).json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id == '999') {
    res.status(404).json({
      message: 'id not found',
    });
  } else {
    res.status(200).json({
      id,
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      image: faker.image.imageUrl(),
    });
  }
});

router.post('/', (req, res) => {
  const body = req.body;

  res.status(201).json({
    message: 'user Creation',
    data: body,
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    message: 'user Update',
    data: body,
    id,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    message: 'user Update',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: 'user delete',
    id,
  });
});

module.exports = router;
