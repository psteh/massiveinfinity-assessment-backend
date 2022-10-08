var { Sequelize, DataTypes, Model, Op } = require('sequelize');

var DBConn = require('./DBConn');

this.products = DBConn.define(
  'products',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    brand: DataTypes.STRING,
    productName: {
      type: DataTypes.STRING,
      field: 'product_name',
    },
    upc: DataTypes.BIGINT,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at',
    },
  },
  {
    freezeTableName: true,
    tableName: 'products',
  }
);

const truncate = async () => {
  try {
    await this.products.truncate();
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

const bulkCreate = async (products) => {
  try {
    await this.products.bulkCreate(products);
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

const getAll = async () => {
  try {
    return await this.products.findAll();
  } catch (error) {
    throw new Error(error);
  }
};

const getByID = async (id) => {
  try {
    const resp = await this.products.findOne({ where: { id } });
    return resp;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (product, data) => {
  const t = await DBConn.transaction();
  try {
    const resp = await product.update(data, { transaction: t });
    await t.commit();
    return resp;
  } catch (error) {
    await t.rollback();
    throw new Error(error);
  }
};

const search = async (requestBody) => {
  const { brand, productName } = requestBody || {};
  try {
    const products = await this.products.findAll({
      where: {
        [Op.or]: {
          brand: {
            [Op.like]: `%${brand}%`,
          },
          productName: {
            [Op.like]: `%${productName}%`,
          },
        },
      },
    });
    return products;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  products: this.products,
  truncate,
  bulkCreate,
  getAll,
  getByID,
  update,
  search,
};
