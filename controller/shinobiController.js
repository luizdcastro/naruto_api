const Shinobi = require('./../model/shinobiModels');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.getAllShinobis = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Shinobi.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const shinobi = await features.query;

  res.status(200).json({
    status: 'success',
    results: shinobi.length,
    data: {
      shinobi,
    },
  });
});

exports.createShinobi = catchAsync(async (req, res, next) => {
  const newShonobi = await Shinobi.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      shinobi: newShonobi,
    },
  });
});

exports.getShinobi = catchAsync(async (req, res, next) => {
  const shinobi = await Shinobi.findById(req.params.id);

  if (!shinobi) {
    return next(new AppError('No shinobi found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      shinobi,
    },
  });
});

exports.updateShinobi = catchAsync(async (req, res, next) => {
  const shinobi = await Shinobi.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!shinobi) {
    return next(new AppError('No shinobi found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      shinobi,
    },
  });
});

exports.deleteShinobi = catchAsync(async (req, res, next) => {
  const shinobi = await Shinobi.findByIdAndDelete(req.params.id);

  if (!shinobi) {
    return next(new AppError('No shinobi found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

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
