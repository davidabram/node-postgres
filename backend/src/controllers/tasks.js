const { Task } = require('../models');
const { broadcastLock, broadcastUnlock } = require('../ws');

module.exports = {
  async create(req, res) {
    try {
      const task = await Task.create({
        laneId: req.body.laneId,
        userId: req.body.userId,
        title: req.body.title || 'New Task?',
        content: req.body.content || 'Lorem Ipsum Happy Holidays?',
      });
      res.status(201).send({
        id: task.id,
        title: task.title,
        content: task.content,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async lock(req, res) {
    try {
      await Task.update({
        lockedBy: req.body.userId,
      },
      {
        where: {
          id: req.params.id,
        },
      });
      broadcastLock(req.params.id);
      res.status(200).send();
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async unlock(req, res) {
    try {
      await Task.update({
        lockedBy: null,
      },
      {
        where: {
          id: req.params.id,
        },
      });
      broadcastUnlock(req.params.id);
      res.status(200).send();
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async moveToLane(req, res) {
    try {
      await Task.update({
        laneId: req.params.laneId,
      },
      {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send();
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
