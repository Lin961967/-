//-----------------------------------------------------------------------------
//  Galv's Event Detectors
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_EventDetectors.js
//-----------------------------------------------------------------------------
//  2016-08-21 - Version 1.2 - fixes to 'non detected' frequency
//  2016-08-20 - Version 1.1 - fixed bug when no terrain or regions specified
//  2016-08-01 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_EventDetectors = true;

var Galv = Galv || {};          // Galv's main object
Galv.DETECT = Galv.DETECT || {};        // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc 让事件在玩家进入范围和视线时激活
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param LOS Blocking Terrain
 * @text 挡住视线的瓷砖
 * @desc Terrain tag ID's for tiles that block line of sight, separated by commas
 * @default 5,6
 *
 * @param LOS Blocking Regions
 * @text 挡住视线区域ID
 * @desc 挡住视线的瓷砖的区域ID
 * @default 1,2
 *
 * @param Tile Size
 * @text 瓷砖的像素大小
 * @desc 你所使用的瓷砖的像素大小
 * Default: 48
 * @default 48
 *
 * @param Search Limit
 * @text 瓷砖的像素大小
 * @desc 默认寻路的检查量。大的可能会导致滞后，小的可能会使回家失败
 * Default: 12
 * @default 24
 *
 * @param --- Behaviors ---
 * @desc
 * @default
 *
 * @param Behavior 0
 * @text 检测到事件行为 0
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 1
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 2
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 3
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 4
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 5
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 6
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 7
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 8
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 9
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 10
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 11
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 12
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 13
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 14
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 15
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 16
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 17
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 18
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 19
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 20
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @help
 * Galv的事件检测器
 * ----------------------------------------------------------------------------
 * 这是一个基本的事件检测插件。它可以让事件检测到
 * 一定范围内和视线内的玩家。
 * 视线是事件前弧的180度。区域、地形标签
 * 或事件可以被设置为阻止玩家的视线。
 * 区域标识和地形标签标识是通过插件设置来设定的。要使
 * 要使一个事件阻挡视线，你需要在一个事件中使用一个COMMENT。
 * 页面，该页面有一个文本标签，如下所示。
 *
 *   <block_los>
 *
 * 一个有此标签的活动页面的事件将阻挡视线。如果
 * 该页面被改变为没有该标签的页面，它将不会阻挡LOS
 *
 * ----------------------------------------------------------------------------
 *
 * ---------------------------------------------------------------------------
 * 条件性分支SCRIPT
 * ----------------------------------------------------------------------------
 * 你可以使用下面的脚本调用来检查一个事件是否可以检测到玩家
 * 在条件性分支被调用时。(是的这可以用在一个
 * 如果需要的话，可以用在平行处理事件中）。
 *
 *   Galv.DETECT.event(id,dist,los)   // id = 事件ID是一个检测器
 *                                    // dist = 瓦片与玩家的距离
 *                                    // los = 视线的true or false
 *
   如果玩家在事件的距离范围内，这将返回真，并且
 * 如果los为真，它还会检查玩家是否在其视线范围内。
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 *   事件命令SCRIPT
 * ----------------------------------------------------------------------------
 *     $gameSystem._undetectable = x;   // x 可以是真，也可以是假。当真时
 *                                      // 无法检测到播放器
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 *   Behaviors
 * ----------------------------------------------------------------------------
 * 行为可以用来在自定义的事件的 "自主运动 "设置中设置事件的反应。
 * 事件的 "自主运动 "设置。该插件设置有许多
 * 行为，你可以通过以下设置来设置。
 *
 *       moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 *
 * moveTypes可以是以下之一
 *            approach, flee, search, freeze, rand, return
 *            approach  - 事件向玩家移动，没有寻路功能
 *            flee   - 事件远离玩家
 *            search - 事件向玩家最后检测到的位置移动。
 *                   - 默认的rpgmaker寻路。搜索极限 "设置
 *                   -事件会在多远的地方找到玩家或返
 *            freeze - 事件不动
 *            rand   - 事件随机移动
 *            return - 事件保存了它的原始位置并返回到这个
 *                     position when not detecting the player.
 * dist    = distance in number of tiles from the event that it can detect
 * los     = 0 or 1... 1 to use line of sight or 0 to not for detecting
 * speed   = the change of move speed while detecting (1-6)
 * freq    = the change of move frequency while detecting (1-5)
 * balloon = the balloon id to show when event detects player
 *
 * HOW TO USE
 * To set an event to follow a behavior, you need to use a 'SCRIPT' command
 * inside of a custom Autonomous Move Route as follows:
 *
 *       this.detector(id);
 *
 * This will use the chosen Behavior id (from the numbers in the plugin setup).
 * The 'moveTypeBefore' selection above and the event page's speed and freq
 * control the event's default movement when not detecting.
 *
 * See demo for examples
 */



//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

// Blocking terrain tag array
var tmp = PluginManager.parameters('Galv_EventDetectors')["LOS Blocking Terrain"].split(",");
Galv.DETECT.bTerrain = [];

if (tmp && tmp[0]) {
	for (var i = 0; i < tmp.length; i++) {
		Galv.DETECT.bTerrain.push(Number(tmp[i]));
	};
};


// Blocking regions array
tmp = PluginManager.parameters('Galv_EventDetectors')["LOS Blocking Regions"].split(",");
Galv.DETECT.bRegions = [];
if (tmp || tmp[0]) {
	for (var i = 0; i < tmp.length; i++) {
		Galv.DETECT.bRegions.push(Number(tmp[i]));
	};
};

// tile size
Galv.DETECT.tile = Number(PluginManager.parameters('Galv_EventDetectors')["Tile Size"]);
Galv.DETECT.searches = Number(PluginManager.parameters('Galv_EventDetectors')["Search Limit"]);

// Behaviors
Galv.DETECT.behaviors = {};
var i = 0;
do {
    tmp = PluginManager.parameters('Galv_EventDetectors')["Behavior " + i];
	if (tmp) {
		Galv.DETECT.behaviors[i] = tmp.split(",");
		for (var i2 = 2; i2 < Galv.DETECT.behaviors[i].length; i2++) {
			Galv.DETECT.behaviors[i][i2] = Number(Galv.DETECT.behaviors[i][i2]);
		};
	};
    i++;
}
while (tmp);

Galv.DETECT.event = function(id,dist,los) {
	if ($gameSystem._undetectable) return false;
	return $gameMap.event(id).distDetect(dist,los);
};

Galv.DETECT.dist = function(x1,y1,x2,y2) {
	return Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2));
};

Galv.DETECT.isBlock = function(x,y) {
	var x = Math.round(x);
	var y = Math.round(y);
	if (Galv.DETECT.bRegions.contains($gameMap.regionId(x,y))) return true;
	if (Galv.DETECT.bTerrain.contains($gameMap.terrainTag(x,y))) return true;
	// Blocking event
	var blockEvent = false;
	$gameMap.eventsXy(x, y).forEach(function(event) {
		if (event._blockLos) return blockEvent = true;
	});
	return blockEvent;
};

Galv.DETECT.los = function(char1,char2) {
	var a = {x:char1.x, y:char1.y};
	var b = {x:char2.x, y:char2.y};

	// If in front
	switch (char2._direction) {
		case 2:
			if (b.y > a.y) return false;
			break;
		case 4:
			if (b.x < a.x) return false;
			break;
		case 6:
			if (b.x > a.x) return false;
			break;
		case 8:
			if (b.y < a.y) return false;
			break;
		default:
			
	};

	// Direct Line
	if (Math.abs(a.x - b.x) >= Math.abs(a.y - b.y)) {
		// h slope
		if (a.x == b.x) {
			var slope = null;
			var int = a.x;
		} else {
			var slope = (a.y - b.y) / (a.x - b.x);
			var int = a.y - slope * a.x;
		};

		for (var x = a.x; x <= b.x; x++) {
			var y = slope * x + int;
			if (Galv.DETECT.isBlock(x,y)) return false;
		}
		
		for (var x = a.x; x >= b.x; x--) {
			var y = slope * x + int;
			if (Galv.DETECT.isBlock(x,y)) return false;
		}
	} else if (Math.abs(a.y - b.y) >= Math.abs(a.x - b.x)) {
		// v slope
		if (a.y == b.y) {
			var slope = null;
			var int = a.y;
		} else {
			var slope = (a.x - b.x) / (a.y - b.y);
			var int = a.x - slope * a.y;
		};
	
		for (var y = a.y; y <= b.y; y++) {
			var x = slope * y + int;
			if (Galv.DETECT.isBlock(x,y)) return false;
		}
		
		for (var y = a.y; y >= b.y; y--) {
			var x = slope * y + int;
			if (Galv.DETECT.isBlock(x,y)) return false;
		}
	};
	return true;
};


Game_Character.prototype.searchLimit = function() {
    return Galv.DETECT.searches;
};


// GAME CHARACTER
//-----------------------------------------------------------------------------

Galv.DETECT.Game_Character_initMembers = Game_Character.prototype.initMembers;
Game_Character.prototype.initMembers = function() {
	this.setDetectVars();
	Galv.DETECT.Game_Character_initMembers.call(this);
};

Game_Character.prototype.distDetect = function(range,los,id,balloon) {
	var balloon = balloon || 0;
	var id = id || 0;
	var range = range * Galv.DETECT.tile;
	var target = id > 0 ? $gameMap.event(id) : $gamePlayer;
	var x1 = this.screenX();
	var y1 = this.screenY();
	var x2 = target.screenX();
	var y2 = target.screenY();
	
	var dist = Galv.DETECT.dist(x1,y1,x2,y2);

	if (dist <= range) { // If in radius range of target
		if ((los && Galv.DETECT.los(target,this)) || !los) {  // If LOS to target is not blocked
			this._dTarget = {x:target.x,y:target.y};  // Set target x,y each step when detected so if los is broken, event still moves to last seen x,y
			this.doDetected(id);
			return true;
		};
	};
	this.doUndetected(id);
	
	return false;
};

Game_Character.prototype.isDetecting = function(id) {
	return id ? this._detecting.contains(id) : this._detecting.length > 0;
};

Game_Character.prototype.doDetected = function(id) {
	if (!this._detecting.contains(id)) {
		this._detecting.push(id);
		if (!this._searchXY[0]) this._balloonId = this._detectBalloon;
	};
};

Game_Character.prototype.doUndetected = function(id) {
	var index = this._detecting.indexOf(id);
	if (index > -1) this._detecting.splice(index,1);
};

Game_Character.prototype.detector = function(id) {
	if ($gameSystem._undetectable) return;
	this._detectBalloon = Galv.DETECT.behaviors[id][6];
	var detected = this.distDetect(Galv.DETECT.behaviors[id][2],Galv.DETECT.behaviors[id][3]);

	if (detected) {
		this.doDetectMove(id,1); // do detected movement
	} else {
		if (this._searchXY[0]) {
			// do move toward last x,y position detected at
			this.moveTowardLastDetect();
		} else {
			this.doDetectMove(id,0); // do original movement
		};
	};
};

Game_Character.prototype.doDetectMove = function(id,type) {
	//type 1 = detect move
	//type 0 = after detect move
	if (type == 0) {
		this._moveSpeed = this._origMovement._moveSpeed;
		this._moveFrequency = this._origMovement._moveFrequency;
		
	} else {
		this._moveSpeed = Galv.DETECT.behaviors[id][4];
		this._moveFrequency = Galv.DETECT.behaviors[id][5];
	};
	
	
	switch (Galv.DETECT.behaviors[id][type]) {
		case 'approach':
			this.moveTowardPlayer();
			break;
		case 'flee':
			this.moveAwayFromPlayer();
			break;
		case 'search':
			if (this._detectPause <= 0) {
				this._moveFrequency = 5;
				this._searchXY = [$gamePlayer.x,$gamePlayer.y]; // get last detected x,y coords
				this.moveTowardLastDetect();
				this._detectPause = 30 * (5 - this._origMovement._moveFrequency) + 3;
			};
			this._detectPause -= 1;
			break;
		case 'rand':
		
			if (this._detectPause <= 0) {
				this._moveFrequency = 5;
				this.moveRandom();
				this._detectPause = 30 * (5 - this._origMovement._moveFrequency) + 1;
			};
			this._detectPause -= 1;
			break;
		case 'return':
			this._moveFrequency = 5;
			this.returnToSavedXY();  // move to original position
		case 'freeze':
		default:
			this.resetStopCount();
	};
	
};

Game_CharacterBase.prototype.returnToSavedXY = function() {
	if (this.x != this._origMovement.x || this.y != this._origMovement.y) {
		direction = this.findDirectionTo(this._origMovement.x,this._origMovement.y);
		if (direction > 0) {
			this.moveStraight(direction);
		}
	} else {
		this._direction = this._origMovement._direction;
		this.resetStopCount();
	};
};

Game_Character.prototype.setDetectVars = function() {
	this._detecting = [];
	this._searchXY = [];
	this._detectPause = 0;
	this._detectPauseTime = 40;
	this._origMovement = {'_moveFrequency':this._moveFrequency,'_moveSpeed':this._moveSpeed,'x':0,'y':0};
	this.searchActions = [
		'turnRight90',
		'turnLeft90',
		'turnLeft90',
		'turnRight90',
	];
	this.searchActions.reverse();
};

Game_Character.prototype.moveTowardLastDetect = function() {
	if (!this._searchXY[0]) {
		this._searchXY = [];
		this.resetStopCount();
	} else if (this._searchXY[0] == this.x && this._searchXY[1] == this.y) {
		if (this._searchTurnIndex > -1) {
			this[this.searchActions[this._searchTurnIndex]](); // run corresponding action
			// set searchXY to destination in case search actions move it
			this._searchXY[0] = this.x;
			this._searchXY[1] = this.y;
			this._searchTurnIndex -= 1;
			this._waitCount = 20;
		} else {
			this._searchXY = [];
			this.resetStopCount();
		}
	} else {
		this._searchTurnIndex = this.searchActions.length - 1;
		var direction = this.findDirectionTo(this._searchXY[0],this._searchXY[1]);
		if (direction > 0) {
			this.moveStraight(direction);
		}
	};
};


// GAME EVENT
//-----------------------------------------------------------------------------

Galv.DETECT.Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	Galv.DETECT.Game_Event_setupPageSettings.call(this);
	this.setDetectStuff();
};

Game_Event.prototype.setDetectStuff = function() {
	this._detectBalloon = 0;
	var page = this.page();
	this._blockLos = false;
	if (page) {
		for (var i = 0; i < page.list.length; i++) {
			if (page.list[i].code == 108 && page.list[i].parameters[0].contains("<block_los>")) {
				this._blockLos = true;
				break;
			};
		};
		this._origMovement._moveSpeed = page.moveSpeed;
		this._origMovement._moveFrequency = page.moveFrequency;
		this._origMovement._direction = this._direction;
		this._origMovement.x = this.x;
		this._origMovement.y = this.y;
	};
};

})();