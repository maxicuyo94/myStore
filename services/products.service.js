/* eslint-disable no-unused-vars */
const faker = require('faker'); //fake data
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }
  async generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10), //convierto a nro base 10
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async create({ name, price, image }) {
    const newProduct = {
      id: faker.datatype.uuid(),
      name,
      price,
      image,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async replace(id, name, price, image) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products[index] = { id, name, price, image };
    return this.products[index];
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
