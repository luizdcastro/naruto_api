const express = require('express');
const missionController = require('../controller/missionController');

const router = express.Router();

router.route('/:id').get(missionController.getMission);

router.route('/:id/remove/:shinobiId').patch(missionController.RemoveShinobis);

router.route('/:id/add').patch(missionController.AddShinobis);

router
  .route('/')
  .get(missionController.getAllMissions)
  .post(missionController.createMission);

module.exports = router;
