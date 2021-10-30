const faker = require('faker'); //fake data

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10), //convierto a nro base 10
        image: faker.image.imageUrl(),
      });
    }
  }
  create({ name, price, image }) {
    const newProduct = {
      id: faker.datatype.uuid(),
      name,
      price,
      image,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return this.products;
  }
  findOne(id) {
    return this.products.find((item) => item.id === id);
  }

  replace(id, name, price, image) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    this.products[index] = { id, name, price, image };
    return this.products[index];
  }

  update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
