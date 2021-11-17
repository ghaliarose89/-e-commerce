// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


// Products belongsTo Category
Products.belongsTo(Category);
// Categories have many Products
Category.hasMany(Products);
// Products belongToMany Tags (through ProductTag)
Products.belongsToMany(Tag, { through: ProductTag,})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product,  {
  through: ProductTag,
 
});

ProductTag.belongsTo (Product);
ProductTag.belongsTo (Tag);

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
