// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


// Products belongsTo Category
Product.belongsTo(Category,{
  onDelete: 'SET NULL'
});
// Categories have many Products
Category.hasMany(Product,{
  onDelete: 'SET NULL'
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { through: ProductTag,
  onDelete: 'SET NULL'})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product,  {
  through: ProductTag,
  onDelete: 'SET NULL'
});

ProductTag.belongsTo (Product);
ProductTag.belongsTo (Tag);

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
