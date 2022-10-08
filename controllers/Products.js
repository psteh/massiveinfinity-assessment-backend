const moment = require('moment');

const productsJson = require('../products.json');
const Products = require('../models/Products');

const initialize = async (req, res) => {
  try {
    const products = productsJson.map((product) => {
      const { name, upc, manufacturer } = product;
      return {
        productName: name,
        upc,
        brand: manufacturer,
        createdAt: moment(),
        updatedAt: moment(),
        deletedAt: null,
      };
    });
    await Products.truncate();
    await Products.bulkCreate(products);
    res.status(200).send({ message: 'Successfully initialize products' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Failed to initialize products' });
  }
};

const getAll = async (req, res) => {
  try {
    const products = await Products.getAll();
    res.status(200).send({
      data: products,
      message: `Successfully retrieve all products`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Failed to retrieve all product` });
  }
};

const getByID = async (req, res) => {
  try {
    console.log(`finding product with ID: ${req.params.id}`);
    const product = await Products.getByID(req.params.id);
    res.status(200).send({
      data: product,
      message: `Successfully get product ID: ${req.params.id}`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Failed to get product ID: ${req.params.id}` });
  }
};

const update = async (req, res) => {
  try {
    console.log(`finding product with ID: ${req.params.id}`);
    const product = await Products.getByID(req.params.id);

    const data = {
      ...req.body,
      updatedAt: moment(),
    };

    const updatedProduct = await Products.update(product, data);
    res.status(200).send({
      data: updatedProduct,
      message: `Successfully update product ID: ${req.params.id}`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Failed to update product ID: ${req.params.id}` });
  }
};

const search = async (req, res) => {
  try {
    const products = await Products.search(req.body);
    res
      .status(200)
      .send({ data: products, message: `Successfully search products` });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Failed to search products` });
  }
};

module.exports = {
  initialize,
  getAll,
  getByID,
  update,
  search,
};
