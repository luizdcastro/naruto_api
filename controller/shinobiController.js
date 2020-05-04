const Shinobi = require('./../model/shinobiModels');

exports.getAllShinobis = async (req, res) => {
  try {
    const shinobi = await Shinobi.find();
    res.status(200).json({
      status: 'success',
      results: shinobi.length,
      data: {
        shinobi,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createShinobi = async (req, res) => {
  try {
    const newShonobi = await Shinobi.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        shinobi: newShonobi,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getShinobi = async (req, res) => {
  try {
    const shinobi = await Shinobi.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        shinobi,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateShinobi = async (req, res) => {
  try {
    const shinobi = await Shinobi.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        shinobi,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteShinobi = async (req, res) => {
  try {
    const shinobi = await Shinobi.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
