
/**
 * Module dependencies.
 */

var feathers = require('feathers');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

// Connect to Mongo
var connection = mongoose.connect('mongodb://localhost/test');

// Setup Feathers
var app = feathers();

// all environments
app.set('port', process.env.PORT || 3031);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(feathers.favicon());
app.use(feathers.logger('dev'));
app.use(feathers.json());
app.use(feathers.urlencoded());
app.use(feathers.methodOverride());
app.use(app.router);
app.use(feathers.static(path.join(__dirname, 'public')));
app.use(feathers.static(path.join(__dirname, 'bower_components')));

app.configure(feathers.socketio(function(io) {

  io.on('connection', function(socket) {

    // Examples
    // - Emitting
    socket.emit('news', { hello: 'world' });
    // - Receiving
    socket.on('my other event', function (data) {
      console.log(data);
    });


  });

  // Authentication
  io.set('authorization', function (handshakeData, callback) {
    // Authorize using the /users service
    app.lookup('/api/users').find({
      username: handshakeData.username,
      password: handshakeData.password
    }, callback);
  });

}));

// development only
if ('development' == app.get('env')) {
  app.use(feathers.errorHandler());
}

// Routes
app.get('/', routes.index);
app.get('/users', user.list);

// Views
app.get('/home', function(req,res) {
    res.render('home');
});
app.get('/projects', function(req,res) {
    res.render('projects');
});

// Feathers Services
var ProjectsService = require(path.join(__dirname, 'services/', 'projects.js'))(connection);
var UsersService = require(path.join(__dirname, 'services/', 'users.js'))(connection);
 
app.configure(feathers.socketio())
  .use(feathers.static(__dirname))
  .use('/api/projects', new ProjectsService())
  .use('/api/users', new UsersService())
  .listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
    });
