entity = function(){
	this.id = entity.prototype.count;

	entity.prototype.count++;

	this.c = {};

	return this;
};

entity.prototype.count = 0;

entity.prototype.addComponent = function addComponent ( component ){
	this.c[component.name] = component;
	return this;
};

entity.prototype.removeComponent = function removeComponent ( componentName ){
	var name = componentName;
	
	if(typeof componentName === 'function'){
		name = componentName.prototype.name;
	}

	delete this.c[name];
	return this;
};

entity.prototype.print = function print () {
	console.log(JSON.stringify(this, null, 4));
	return this;
};


