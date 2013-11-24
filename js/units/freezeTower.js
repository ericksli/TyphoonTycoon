// defines your module and loads any dependencies
define([
	'Utility',
	'units/unit',
	'stage',
	'units/tower',
	'models/buildEffect',
	'models/laser',
	'config',
	'underscore'
], function(Utility,Unit,Stage,Tower,BuildEffect,Laser,Config,_) {

	console.log("attackTower.js loaded");

	//Create Tower Object and its constructor
	function FreezeTower(startX,startY,spriteSrc){
		//call super constructor.
		Tower.call(this,startX,startY,spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "aqua", 40, 40, 3);

		//Auto add to stage
		this.id = Stage.addChild(this,'towers');
		//var nearEnemy = this.findNearestEnemy();
		//nearEnemy.setMotion(0,0);
	}
	//subclass extends superclass
	FreezeTower.prototype = Object.create(Tower.prototype);
	FreezeTower.prototype.constructor = FreezeTower;


	// tick event handler
	FreezeTower.prototype.tick = function(dt){	// override
		/**
		 * finds the enemy closest in distance
		 * @return {Enemy} the enemy that is nearest
		 * @returns {undefined} if no enemy is alive
		 */
		var target = this.findNearestEnemy();
		if(target)
		{
			if(target.distance <= Config.maxFreezeDistance)
			{
				// console.log("tower "+this.x+" "+ this.y);
				var laser = new Laser(this.x, this.y, target.targetEnemy.x, target.targetEnemy.y, "aqua", 20, 5);
				target.targetEnemy.slow(Config.freezeTowerEffect);
			}
		}
	};
	

	return FreezeTower;
});