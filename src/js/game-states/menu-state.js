var MenuState = (function(){
	var start = false;
	var startInEditMode = false;

	var clearMenuState = function () {
	};

	return {
		gotoThis: {
			state: function(){
				return this;
			}
		},

		handleKeyPress: function(e){
		},

		handleMouseDown: function(){
		},
		
		handleMouseUp: function(){
		},

		update: function() {
			if(start === true)
			{
				clearMenuState();
				return GameState.gotoThis.asBeginLevel();
			}
			else if(startInEditMode === true)
			{
				clearMenuState();
				return DesignState.gotoThis.state();
			}
			return this;
		},
	};
})();
