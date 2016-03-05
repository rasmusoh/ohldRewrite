var Application = (function(){
    var currentState,
    time = {
        now : 0,
        dt : 0,
        last : 0,
        step : 1/60
    };
    
    var timestamp = function() {
          return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    };

    var handleKeyPress = function(e){
        currentState.handleKeyPress(e);
    };

    var handleMouseDown = function(){
        currentState.handleMouseDown();
    };

    var handleMouseUp = function(){
        currentState.handleMouseUp();
    };

    var frame = function(){
        time.now = timestamp();
        time.dt = time.dt + Math.min(1, (time.now - time.last) / 1000);
        while(time.dt > time.step) {
            time.dt = time.dt - time.step;
            currentState = currentState.update(time.step);
        }
        currentState.render(time.dt);
        requestAnimationFrame(frame);
    };

    var startGame = function(){
        document.onkeypress = handleKeyPress;
        document.onmousedown = handleMouseDown;
        document.onmouseup = handleMouseUp;

        GameState.init();
        currentState = GameState.gotoThis();//should normally be intro/menu state but for testing purposes...
        requestAnimationFrame(frame);
    };

    return {
        startGame : startGame
    };

})();
