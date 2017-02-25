Entity = function(){
	this.id = Entity.prototype.count;

	Entity.prototype.count++;

	this.c = {};

	return this;
};

Entity.prototype.count = 0;

Entity.prototype.addComponent = function addComponent ( component ){
    component.id = this.id;
	this.c[component.name] = component;
	return this;
};

Entity.prototype.removeComponent = function removeComponent ( componentName ){
	var name = componentName;
	
	if(typeof componentName === 'function'){
		name = componentName.prototype.name;
	}

	delete this.c[name];
	return this;
};

Entity.prototype.print = function print () {
	console.log(JSON.stringify(this, null, 4));
	return this;
};


