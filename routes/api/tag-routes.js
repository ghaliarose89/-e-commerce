const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
     
    },
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

// get a tag by id
router.get('/:id', (req, res) => {
  Tag.findOne({
    where:
    {
      id: req.params.id
    },
    include: [{
      model: Product
    }],
  })
    .then(dbUserData => {
      if(!dbUserData){
        res.status(404).json({ message: 'No Tag found with this id' });
        return;

      }
      res.json(dbUserData)})
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// post a tag
router.post('/', (req, res) => {
  Tag.create({
    id: req.body.id,
    tag_name: req.body.tag_name,
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// update a tag
router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name,

  },
    {
      where: {
        id: req.params.id
      }
    },
  )
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No Tag found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
//delete a tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No Tag found with this id' });
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
