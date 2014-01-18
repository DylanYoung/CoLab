$(document).ready(function() {
    
    /**
    AJAX request Methods:
    GET == Find
    POST == Create
    PUT == Update
    DELETE == Delete
    */

    var getAllProjects = function(callback) {
        // Ajax request to load projects
        $.ajax({
            method: 'GET',
            url: '/api/projects'
        })
        .done(function(data) {
            return callback && callback(null, data);
        });
    };

    var $projects = $('.projects-container tbody');

    var displayProjects = function(callback) {
        
        getAllProjects(function(err, data) {
            console.log(err, data);
            if (!err) {
                // Display data
                for (var i=0, len=data.length; i<len; i++) {
                    var curr = data[i];
                    // 
                    var $project = $('<tr/>', {})
                        .addClass('project');
                    // 
                    var $name = $('<td/>', {})
                        .addClass('name')
                        .text(curr.name);
                    var $desc = $('<td/>', {})
                        .addClass('desc')
                        .text(curr.description);
                    var $tags = $('<td/>', {})
                        .addClass('tags')
                        .text(curr.tags.join(', '));
                    // Append data to row
                    $project
                        .append($name)
                        .append($desc)
                        .append($tags);
                    // Append row to table
                    $projects.append($project);
                }
            }
        })
    };

    displayProjects();
})