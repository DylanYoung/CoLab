// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// -----------------
module.exports = function(connection) {

    // --- EDIT HERE

    var modelName = "Users";
    // Create Schema
    var theSchema = new Schema({ 
        email: {type : String, required : true, index: {unique: true, dropDups: true}},
        firstName: {type : String, required : true},
        lastName: {type : String, required : true},
        age: {type : Number, required : true},
        password: {type : String, required : true, select: false},
        skills: {type : Array, required : true}
    });

    // -----------------

    // Model
    var theModel = connection.model(modelName, theSchema);

    var tagsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;'
    };
    // Escapes HTML so that evil people can't inject mean things into the page
    function escapeHtml(str) {
      return str.replace(/[&<>]/g, function (tag) {
        return tagsToReplace[tag] || tag;
      });
    }

    function Store() {
    // Constructor
    }

    // Returns a Todo by it's id
    Store.prototype.find = function (params, callback) {
        theModel.find(params.query, function (err, data) {
            callback(err, data);
        })
    }

    Store.prototype.get = function (id, params, callback) {
        theModel.find({ _id: id },function (err, data) {
            callback(err, data);
        });
    }

    Store.prototype.create = function (data, params, callback) {
      // Create our actual Todo object so that we only get what we really want
        var data = new theModel(data);
        data.save(function (err, data) {
            //console.log(err, data);
            callback(err, data);
        });
    }

    Store.prototype.update = function (id, data, params, callback) {
        theModel.update({_id: id}, data, { upsert: true }, function(err, data) {
            return callback(err, data);
        });
    }

    Store.prototype.remove = function (id, params, callback) {
        theModel.findByIdAndRemove(id, function(err, data) {
            return callback(err, data);
        });
    }

    return Store;

}