"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const gameSchema = new _mongoose.default.Schema({
  room_code: String,
  quiz: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'quiz',
    default: []
  },
  players: [String],
  question_index: {
    type: Number,
    default: 0
  }
});
gameSchema.set('timestamps', true);

var _default = _mongoose.default.model('game', gameSchema);

exports.default = _default;