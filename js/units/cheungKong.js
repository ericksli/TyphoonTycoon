define([
	'units/unit',
	'stage',
	'models/buildEffect',
	'config'
], function(Unit, Stage, BuildEffect, Config) {
	// Create Tower Object and its constructor
	function CheungKong(game, startX, startY, spriteSrc) {
		this.game = game;
		// Call super constructor.
		Unit.call(this, startX, startY, spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "Red", 40, 40, 3);

		// Auto add to stage
		this.id = Stage.addChild(this, 'towers');

		this.game.built('CheungKongLimited');
		this.game.addPower(Config.cheungKong.power);
	}

	// subclass extends superclass
	CheungKong.prototype = Object.create(Unit.prototype);
	CheungKong.prototype.constructor = CheungKong;

	CheungKong.prototype.remove = function() {
		this.game.destroyBuilding('CheungKongLimited');
	};
	
	return CheungKong;
});