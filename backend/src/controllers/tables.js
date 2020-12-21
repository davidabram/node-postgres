const { Table, Lane, Task } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const table = await Table.create({
        name: req.body.name || 'New Table',
      });

      let lanes = [];

      if (req.body.lanes) {
        lanes = await Lane.bulkCreate(
          req.body.lanes.map((lane) => ({ tableId: table.id, name: lane.name })),
        );
      }
      res.status(201).send({
        id: table.id,
        name: table.name,
        lanes: lanes.map((lane) => ({ id: lane.id, name: lane.name })),
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async list(req, res) {
    try {
      const tables = await Table.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            attributes: ['id', 'name'],
            model: Lane,
            as: 'lanes',
            include: [
              {
                attributes: ['id', 'title', 'content'],
                model: Task,
                as: 'tasks',
              },
            ],
          },
        ],
      });
      res.status(200).send(tables);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
