"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _stringUtil = require("../utilities/string-util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
  username: String,
  first: String,
  last: String,
  password: String,
  role: {
    type: String,
    default: 'user'
  }
});
userSchema.set('timestamps', true);
userSchema.virtual('fullName').get(function () {
  const first = _stringUtil.StringUtil.capitalize(this.first.toLowerCase());

  const last = _stringUtil.StringUtil.capitalize(this.last.toLowerCase());

  return `${first} ${last}`;
});

userSchema.statics.passwordMatches = function (password, hash) {
  return _bcryptNodejs.default.compareSync(password, hash);
};

userSchema.pre('save', function (next) {
  this.username = this.username.toLowerCase();
  this.first = this.first.toLowerCase();
  this.last = this.last.toLowerCase();
  const unsafePassword = this.password;
  this.password = _bcryptNodejs.default.hashSync(unsafePassword);
  next();
});

var _default = _mongoose.default.model('user', userSchema);

exports.default = _default;