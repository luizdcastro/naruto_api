const express = require('express');
const shinobiController = require('./../controller/shinobiController');

const router = express.Router();

router
  .route('/')
  .get(shinobiController.getAllShinobis)
  .post(shinobiController.createShinobi)
  .patch(shinobiController.updateShinobi);

router
  .route('/:id')
  .get(shinobiController.getShinobi)
  .patch(shinobiController.updateShinobi)
  .delete(shinobiController.deleteShinobi);

module.exports = router;
