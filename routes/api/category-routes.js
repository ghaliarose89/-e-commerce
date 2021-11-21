const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      { 
        model: Product,
        attributes: ['product_name', 'price', 'stock',],
      }
    ]
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });


});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  Category.findOne({
    where:
    {
      id: req.params.id
    },
    include: [{
      model: Product,
      attributes: ['product_name', 'price', 'stock',],
    }],
  })
    .then(dbUserData => {
      if(!dbUserData){
        res.status(404).json({ message: 'No category found with this id' });
        return;

      }
      res.json(dbUserData)})
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name,
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// update a Category
router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name

  },
    {
      where: {
        id: req.params.id
      }
    },
  )
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
// delete category by ID
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No Category found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
