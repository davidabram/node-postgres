const { User } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const user = await User.create({
        name: req.body.name || 'New User',
      });
      res.status(201).send({
        id: user.id,
        name: user.name,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
