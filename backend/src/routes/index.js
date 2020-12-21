const {
  tables, users, lanes, tasks,
} = require('../controllers');

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.status(200).send({
      message: 'This is working!',
    });
  });

  // Tables
  app.post('/api/tables', tables.create);
  app.get('/api/tables', tables.list);

  // Users
  app.post('/api/users', users.create);

  // Lanes
  app.post('/api/lanes', lanes.create);

  // Tasks
  app.post('/api/tasks', tasks.create);
  app.put('/api/tasks/:id/lane/:laneId', tasks.moveToLane);
  app.put('/api/tasks/lock/:id', tasks.lock);
  app.put('/api/tasks/unlock/:id', tasks.unlock);
};
