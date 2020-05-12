const mongoose = require('mongoose');
const Shinobi = require('./shinobiModels');

const missionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The mission must have a name'],
      unique: [true, 'This mission name alredy exist'],
    },
    members: Number,
    shinobis: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Shinobi',
        required: [true, 'A mission must have at least an shinobi!'],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

missionSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'shinobis',
    select: 'name rank',
  });
  next();
});

const Mission = mongoose.model('Missions', missionSchema);

module.exports = Mission;
