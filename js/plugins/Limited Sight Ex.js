//------------------------------------------------------------
// Limited Sight Ex.js
//------------------------------------------------------------
/*:
* @plugindesc Makes the player have a limited sight on the map.
* @author Soulpour777
*
* @help
/ ------------------------------------------------------------
 Limited Sight Ex Help File / Documentation

 Q: How can I make the plugin work? I installed it and placed
 it on in my plugin manager but it doesn't work.
 A: You have to set your LimiterSwitchID to true or ON. If
 your ID is 2, make sure you do a Control Switch Event and
 set 2 to ON. Thus if you turn it off again, it makes it
 go away.

 Q: How can I set a different image and opacity for this
 plugin? I mean, I want a bigger sight or limited sight,
 how can I possibly do that?

 A: That's easy. Use this plugin command in an event to
 set the image that you want:

 Soul-LimitedSightEx : Limiter : Name : Opacity

 where name is the name of the image
 and opacity the opacity value that you want. For
 example:

 Soul-LimitedSightEx : Limiter : Sight : 150

 Make sure that the images is stored in the 
 img / pictures folder.

 Q: What does LimiterScale exactly mean?
 A: This is how you scale your limited sight image. When it
 is scaled by 81 in default, it resizes the image to fit in
 your current window. Of course, if you change resolution,
 you also change the scale. The reason for this is if you're
 using Yanfly's Change Resolution plugin, it makes this plugin
 still usable and adjust to your resolution's needs. By default,
 make sure that your image is sized 2000 x 1500.

/ ------------------------------------------------------------
* @param LimiterImage
* @desc The name of the image you use. Works only by default.
* @default Sight
*
* @param CoverImageOpacity
* @desc The opacity of the image you use. Works only by default.
* @default 255
*
* @param LimiterSwitch
* @desc The switch ID that you use to activate the limiter.
* @default 2
*
* @param LimiterScale
* @desc How much would you like to scale your image? (2000 x 1500)
* @default 81
*/

var Imported = Imported || {};
Imported.LimitedSight = true;
  
var Soulpour777 = Soulpour777 || {};
Soulpour777.LimitedSight = Soulpour777.LimitedSight || {};
Soulpour777.LimitedSight.params = PluginManager.parameters('Limited Sight Ex'); 

var lsparam = Soulpour777.LimitedSight.params;

Soulpour777.LimitedSight.LimiterImage = String(lsparam['LimiterImage']);
Soulpour777.LimitedSight.LimiterOpacity = Number(lsparam['CoverImageOpacity']);
Soulpour777.LimitedSight.LimiterSwitch = Number(lsparam['LimiterSwitch']);
Soulpour777.LimitedSight.LimiterScale = Number(lsparam['LimiterScale']);

(function ($) {

  Soulpour777.LimitedSight.Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    Soulpour777.LimitedSight.Game_System_initialize.call(this);
  	this.limiterName = Soulpour777.LimitedSight.LimiterImage;
  	this.limiterOpacity = Soulpour777.LimitedSight.LimiterOpacity;
  	
  }

  Soulpour777.LimitedSight.Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
  	Soulpour777.LimitedSight.Spriteset_Map_createLowerLayer.call(this);
  	this.createLimiter();
  };

  Soulpour777.LimitedSight.Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function() {
	Soulpour777.LimitedSight.Spriteset_Map_update.call(this);
  	if($gameSwitches.value([Soulpour777.LimitedSight.LimiterSwitch])) {
  		this.updateLimiter();
  	} else {
  		this.removeLimiter();
  	}
  };

  Spriteset_Map.prototype.createLimiter = function() {
    this._Limiter = new Sprite();
    this.addChild(this._Limiter);
  };

  Spriteset_Map.prototype.removeLimiter = function() {
  	this._Limiter.bitmap = ImageManager.loadPicture(null);
  }

  Spriteset_Map.prototype.updateLimiter = function() {  	
  	this._Limiter.bitmap = ImageManager.loadPicture($gameSystem.limiterName);
  	this._Limiter.opacity = $gameSystem.limiterOpacity;
    this._Limiter.x = $gamePlayer.screenX() - Graphics.width;
    this._Limiter.y = $gamePlayer.screenY() - Graphics.height;
    this._Limiter.scale.x = parseFloat(Soulpour777.LimitedSight.LimiterScale) * 0.01;
    this._Limiter.scale.y = parseFloat(Soulpour777.LimitedSight.LimiterScale) * 0.01;
  };

  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    switch(command) {
      // Soul-LimitedSightEx : Limiter : Name : Opacity
      case 'Soul-LimitedSightEx':
        if (args[0] === 'Limiter') {
          Soulpour777.LimitedSight.LimiterScale = Number(args[1]);
          $gameSystem.limiterName = args[2];
          $gameSystem.limiterOpacity = Number(args[3]);
        }
        break;
    }
  }

})();
