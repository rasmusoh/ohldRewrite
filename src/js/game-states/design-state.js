var DesignState = (function(){
	var world;
	var worldStartingState;
	var unpause;

	var clearState = function(){
	};

	return {
		goto: {
			state: function(){
				return this;
			}
		},

		handleKeyPress: function(e)
		{
			if(e.keyCode == KEYCODES.SPACE)
			{
				unpause = true;
			}
		},

		handleMouseDown: function(){
		},

		handleMouseUp: function(){
		},

		update: function() {
			if(unpause === true)
			{
				return GameState.withLevel(this);
			}
			return this;
		},
	};
})();
