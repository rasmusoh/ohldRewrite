var PauseState = (function(){
    var unpause;

    var init = function(){
    };

    var gotoThis = function(){
        unpause = false;
        return this;
    };

    var handleKeyPress = function(e)
    {
        if(e.keyCode == KEYCODES.SPACE)
        {
            unpause = true;
        }
    };

    var handleMouseDown = function(){
    };

    var handleMouseUp = function(){
    };

    var	update = function(delta) {
        if(unpause === true)
        {
            return GameState;
        }
        return this;
    };

    var render = function(delta){
    };

    return {
        gotoThis: gotoThis,

        init : init,

        handleMouseDown: handleMouseDown,

        handleKeyPress: handleKeyPress,

        handleMouseUp: handleMouseUp,

        update: update,

        render : render
    };
})();
