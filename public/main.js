
window.updateDOM = function(){
    const M = window.M;
    
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});

    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems, {});

    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {});
    
    var elems = document.querySelectorAll('.scrollspy');
    var instances = M.ScrollSpy.init(elems, {});

    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});

    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, {});

    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {});

    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});

    var elems = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems, {});

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});

    M.updateTextFields();
}

document.addEventListener('DOMContentLoaded', updateDOM);

