import Products from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Products.findAll({
        attributes: ["uuid", "name", "sellPrice", "buyPrice", "stock", "image"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Products.findAll({
        attributes: ["uuid", "name", "sellPrice", "buyPrice", "stock", "image"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Products.findOne({
        attributes: ["uuid", "name", "sellPrice", "buyPrice", "stock", "image"],
        where: {
          id: product.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Products.findOne({
        attributes: ["uuid", "name", "sellPrice", "buyPrice", "stock", "image"],
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["uuid", "name", "sellPrice", "buyPrice", "stock", "image"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, buyPrice, sellPrice, stock, image } = req.body;

  try {
    await Products.create({
      name: name,
      buyPrice: buyPrice,
      sellPrice: sellPrice,
      stock: stock,
      imageUrl: image,
      userId: req.userId,
      role: req.role,
    });
    const role = req.role;
    res.status(201).json({ msg: "Product Berhasil Dibuat", role });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { name, sellPrice, buyPrice, stock, image } = req.body;
    if (req.role === "admin") {
      await product.update(
        { name, sellPrice, buyPrice, stock, image },
        {
          where: {
            id: product.id,
          },
        }
      );
    } else {
      if (req.userId !== product.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Products.update(
        { name, price, sellPrice, buyPrice, stock, image },
        {
          where: {
            [Op.and]: [{ id: product.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Product updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { name, price, sellPrice, buyPrice, stock, image } = req.body;
    if (req.role === "admin") {
      await Products.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.userId !== product.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Products.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Product deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
