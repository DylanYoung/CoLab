$(document).ready(function() {
    
    $("#menu-close").click(function(e) {
            e.preventDefault();
            $("#sidebar-wrapper").toggleClass("active");
    });

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });

    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    })

});