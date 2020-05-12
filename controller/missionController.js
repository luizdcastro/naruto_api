const Mission = require('./../model/missionModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.createMission = factory.createOne(Mission);
exports.getAllMissions = factory.getAll(Mission);
exports.getMission = factory.getOne(Mission);
exports.updateMission = factory.updateOne(Mission);
exports.deleteMission = factory.deleteOne(Mission);

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
