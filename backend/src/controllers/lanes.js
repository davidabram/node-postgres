const { Lane } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const lane = await Lane.create({
        name: req.body.name || 'New Lane',
        tableId: req.body.tableId,
      });
      res.status(201).send({
        id: lane.id,
        name: lane.name,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
