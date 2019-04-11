document.body.onkeydown = function (e) {
    var keys = {
        40: 'change',
        38: 'jump'
    };
    if (typeof keys[e.keyCode] != 'undefined') {
        keyPress(keys[e.keyCode]);
        if (!lose) {
            render();
        }
    }
};
