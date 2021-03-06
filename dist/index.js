"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var db = _interopRequireWildcard(require("./utils/DataBaseUtils"));

var _cors = _interopRequireDefault(require("cors"));

var _config = require("../etc/config");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Logic work with database
db.setUpConnection();
var app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use((0, _cors.default)({
  origin: '*'
}));
app.get('/notes', function (req, res) {
  db.listNotes().then(function (data) {
    return res.send(data);
  });
});
app.post('/notes', function (req, res) {
  db.createNote(req.body).then(function (data) {
    return res.send(data);
  });
});
app.delete('/notes/:id', function (req, res) {
  db.deleteNote(req.params.id).then(function (data) {
    return res.send(data);
  });
});
var server = app.listen(8080, function () {
  console.log("Server is up and running on port ".concat(_config.serverPort));
});