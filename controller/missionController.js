const Mission = require('./../model/missionModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.createMission = catchAsync(async (req, res, next) => {
  const mission = await Mission.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      mission,
    },
  });
});

exports.getAllMissions = catchAsync(async (req, res, next) => {
  const mission = await Mission.find(req.query);

  res.status(200).json({
    status: 'success',
    results: mission.length,
    data: {
      mission,
    },
  });
});

exports.getMission = catchAsync(async (req, res, next) => {
  const mission = await Mission.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    results: mission.length,
    data: {
      mission,
    },
  });
});

exports.RemoveShinobis = catchAsync(async (req, res, next) => {
  const shinobiUpdate = await Mission.findByIdAndUpdate(req.params.id, {
    $pull: { shinobis: { $in: req.params.shinobiId } },
    runValidators: true,
    new: true,
  });

  if (!shinobiUpdate) {
    return next(new AppError('No shinobi found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      shinobiUpdate,
    },
  });
});

exports.AddShinobis = catchAsync(async (req, res, next) => {
  const shinobiUpdate = await Mission.findByIdAndUpdate(req.params.id, {
    runValidators: true,
    new: true,
    $addToSet: { shinobis: req.body.shinobis },
  });

  if (!shinobiUpdate) {
    return next(new AppError('No shinobi found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      shinobiUpdate,
    },
  });
});
