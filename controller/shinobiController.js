const Shinobi = require('./../model/shinobiModels');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.createShinobi = factory.createOne(Shinobi);
exports.getAllShinobis = factory.getAll(Shinobi);
exports.getShinobi = factory.getOne(Shinobi);
exports.updateShinobi = factory.updateOne(Shinobi);
exports.deleteShinobi = factory.deleteOne(Shinobi);

exports.teamRandom = catchAsync(async (req, res, next) => {
  const random = await Shinobi.aggregate([
    { $sample: { size: 3 } },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        clan: { $first: '$clan' },
        rank: { $first: '$rank' },
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      random,
    },
  });
});

exports.teamCustom = catchAsync(async (req, res) => {
  const custom = await Shinobi.aggregate([
    { $match: req.body },
    { $sample: { size: 3 } },
    {
      $group: {
        _id: '$name',
        clan: { $first: '$clan' },
        rank: { $first: '$rank' },
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      custom,
    },
  });
});
