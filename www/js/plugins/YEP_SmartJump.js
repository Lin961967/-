//=============================================================================
// Yanfly Engine Plugins - Smart Jump
// YEP_SmartJump.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SmartJump = true;

var Yanfly = Yanfly || {};
Yanfly.Jump = Yanfly.Jump || {};
Yanfly.Jump.version = 1.03

//=============================================================================
 /*:
 * @plugindesc 【YEP❀实用类】智能跳跃系统|YEP_SmartJump.js
 * @author Yanfly Engine Plugins
 *
 * @param Illegal Regions
 * @text 禁用区域
 * @desc 这些是玩家无法跳跃的区域 ID
 * 或过去。用空格分隔每个区域。
 * @default 0
 *
 * @param Illegal Regions List
 * @text 禁用区域列表
 * @type number[]
 * @desc These are the region ID's the player cannot jump on
 * or past. Use with MV 1.5.0+
 * @default []
 *
 * @param Equal Regions
 * @text 跳跃区域
 * @desc 这些是玩家只能在以下情况下跳转到的区域 ID
 * 他们所站立的磁贴与目标区域匹配。
 * @default 0
 *
 * @param Equal Regions List
 * @text 跳跃区域列表
 * @type number[]
 * @desc 这些是玩家只能在以下情况下跳转到的区域 ID
 * 他们站立的磁贴与目标匹配。1.5.0+
 * @default []
 *
 * @help
 * ============================================================================
 * ▼ 介绍
 * ============================================================================
 *
 * 对于那些可能之前已经制作了自己的Jump系统的人，你
 * 可能遇到了能够跳出地图的问题，进入
 * 你不应该去的地方，甚至是不应该去的事件的顶部
 * 允许在上面。此插件有助于促进事件跳转系统
 * 通过引入智能跳跃为您的RPG制作游戏。
 *
 * 智能跳跃将允许您跳过区域，但会限制您
 * 跳到你不能去的地方，在正常的优先事件之上，以及
 * 设置通常无法跳过的边界（例如墙壁）。
 *
 * ============================================================================
 *  ▼ 说明 - 设置智能跳跃
 * ============================================================================
 *  SmartJump X  X代表距离   记得加等待帧
 *  使用插件命令“SmartJump”使玩家角色执行
 *  智能跳跃。
 *
 *  在插件参数中，标记您的玩家不能的非法区域
 *  跳过或跳上，然后在地图上绘制它们。或者，您可以标记
 *  数据库>图块集选项卡中的某些图块类型，并使用地形标签
 *  限制玩家不能跳跃的地方。
 *
 * ============================================================================
 *  ▼ 说明 - 相等区域
 * ============================================================================
 *
 * 对于那些想为您的地图制作高度系数的人，以及
 * 希望保持具有该高度系数的跳跃系统，平等区域
 * 会有所帮助。列出要用于标记的所有区域 ID
 * “相等区域”插件参数中的高度。您可以插入多个
 * 地区。用空格分隔它们。
 *
 * 当玩家站在相等区域列出的区域时
 * 插件参数并尝试智能跳转到被图块集阻止的区域
 * 可通过性，如果玩家跳转的区域是相同的区域 ID
 * 随着玩家打算经过的区域，跳跃变得合法。
 *
 * ============================================================================
 *  ▼ 事件标签
 * ============================================================================
 *
 * 您可以使用这些注释标签来设置玩家无法设置的地形标签
 * 跳上或跳过。
 *
 * 图块集注释标签：
 *
 *   <Illegal Jump: x>
 *   <Illegal Jump: x, x, x>
 *   <Illegal Jump: x to y>
 *   将x替换为您要禁止玩家进入的地形标签
 *   在进行智能跳跃时过去或着陆。
 *
 * 事件标签：
 *
 *   <Illegal Jump>
 *   这将阻止玩家跳上或跳过它
 *   在进行智能跳跃时的事件。如果事件设置为“通过”模式，则
 *   玩家可以跳过或跳到事件中。
 *
 * ============================================================================
 *  ▼ 更新
 * ============================================================================
 *
 * Version 1.03:
 * - Updated for RPG Maker MV version 1.5.0.
 * - Added 'Illegal Regions List' and 'Equal Regions List' parameters for 1.5.0
 * simplified usage.
 *
 * Version 1.02:
 * - Fixed a bug that allowed you to perform a smart jump from above a tile
 * that requires equal regions.
 *
 * Version 1.01:
 * - Added 'Equal Regions' plugin parameter. This is a unique region area. More
 * of it will be explained in the instructions.
 *
 * Version 1.00:
 * - Finished Plugin!
 * ============================================================================
 *  YEP官网：http://yanfly.moe/yep
 *  插件作者：Yanfly
 *  汉化插件：云书 
 *  使用条款：除非另有说明，否则 Yanfly 
 *  使用条款：http://www.yanfly.moe/wiki/Category:Yanfly_Engine_Plugins#Terms_of_Use
 *  声明：仅用于汉化参考，如发布游戏到官网下载原版插件。
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_SmartJump');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.JumpIllegalRegion = String(Yanfly.Parameters['Illegal Regions']);
Yanfly.Param.JumpEqualRegion = String(Yanfly.Parameters['Equal Regions']);

Yanfly.createSmartJumpRegions = function() {
    var regions = Yanfly.Param.JumpIllegalRegion.split(' ');
    var length = regions.length;
    Yanfly.Param.JumpIllegalRegion = [];
    for (var i = 0; i < length; ++i) {
      Yanfly.Param.JumpIllegalRegion[i] = parseInt(regions[i]);
    }

    var data = JSON.parse(Yanfly.Parameters['Illegal Regions List'] || '[]');
    var length = data.length;
    for (var i = 0; i < length; ++i) {
      Yanfly.Param.JumpIllegalRegion.push(parseInt(data[i]));
    }

    var regions = Yanfly.Param.JumpEqualRegion.split(' ');
    var length = regions.length;
    Yanfly.Param.JumpEqualRegion = [];
    for (var i = 0; i < length; ++i) {
      Yanfly.Param.JumpEqualRegion[i] = parseInt(regions[i]);
    }

    var data = JSON.parse(Yanfly.Parameters['Equal Regions List'] || '[]');
    var length = data.length;
    for (var i = 0; i < length; ++i) {
      Yanfly.Param.JumpEqualRegion.push(parseInt(data[i]));
    }
};

Yanfly.createSmartJumpRegions();

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Jump.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.Jump.DataManager_isDatabaseLoaded.call(this)) return false;
    this.processJumpNotetags1($dataTilesets);
    return true;
};

DataManager.processJumpNotetags1 = function(group) {
  var note1a = /<(?:ILLEGAL JUMP):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note1b = /<(?:ILLEGAL JUMP):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.illegalJumpTag = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1a)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.illegalJumpTag = obj.illegalJumpTag.concat(array);
      } else if (line.match(note1b)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.illegalJumpTag = obj.illegalJumpTag.concat(range);
      }
    }
  }
};

DataManager.processJumpNotetags2 = function(obj) {
  var notedata = obj.note.split(/[\r\n]+/);
  obj.illegalJump = false;
  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(/<(?:ILLEGAL JUMP)>/i)) {
      obj.illegalJump = true;
    }
  }
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Game_CharacterBase.prototype.smartJump = function(distance) {
    if (distance === 0) return this.jump(0, 0);
    this.setupSmartJump(this.getSmartJumpDistance(distance));
};

Game_CharacterBase.prototype.setupSmartJump = function(distance) {
    if (this._direction === 2) {
      this.jump(0, distance);
    } else if (this._direction === 4) {
      this.jump(-distance, 0);
    } else if (this._direction === 6) {
      this.jump(distance, 0);
    } else if (this._direction === 8) {
      this.jump(0, -distance);
    }
};

Game_CharacterBase.prototype.getSmartJumpDistance = function(distance) {
    if (this._direction === 2) {
      for (var i = 0; i < distance; ++i) {
        if (this.isSmartJumpIllegalRegion(this.x, this.y + i + 1)) {
          distance = i;
          break;
        }
      }
    } else if (this._direction === 4) {
      for (var i = 0; i < distance; ++i) {
        if (this.isSmartJumpIllegalRegion(this.x - i - 1, this.y)) {
          distance = i;
          break;
        }
      }
    } else if (this._direction === 6) {
      for (var i = 0; i < distance; ++i) {
        if (this.isSmartJumpIllegalRegion(this.x + i + 1, this.y)) {
          distance = i;
          break;
        }
      }
    } else if (this._direction === 8) {
      for (var i = 0; i < distance; ++i) {
        if (this.isSmartJumpIllegalRegion(this.x, this.y - i - 1)) {
          distance = i;
          break;
        }
      }
    }
    return this.calcSmartJumpDistance(distance);
};

Game_CharacterBase.prototype.isSmartJumpIllegalRegion = function(x, y) {
    if (x < 0 || y < 0) return true;
    if (x > $gameMap.width() - 1 || y > $gameMap.height() - 1) return true;
    if (this.isThrough()) return false;
    var regionId = $gameMap.regionId(x, y);
    if (Yanfly.Param.JumpEqualRegion.contains(regionId)) {
      if (this.regionId() === regionId) return false;
    }
    if (regionId > 0 && Yanfly.Param.JumpIllegalRegion.contains(regionId)) {
      return true;
    }
    var tileset = $gameMap.tileset();
    if (tileset && tileset.illegalJumpTag.contains($gameMap.terrainTag(x, y))) {
      return true;
    }
    var events = $gameMap.eventsXy(x, y);
    var length = events.length;
    for (var i = 0; i < length; ++i) {
      var ev = events[i];
      if (!ev) continue;
      if (ev.isThrough()) continue;
      if (ev.isSmartJumpBlocked()) return true;
    }
    return false;
};

Game_CharacterBase.prototype.calcSmartJumpDistance = function(distance) {
    var max = distance;
    var value = 0;
    if (this._direction === 2) {
      for (var i = 0; i < max; ++i) {
        if (this.isSmartJumpValid(this.x, this.y + max - i)) {
          value = max - i;
          break;
        }
      }
    } else if (this._direction === 4) {
      for (var i = 0; i < max; ++i) {
        if (this.isSmartJumpValid(this.x - max + i, this.y)) {
          value = max - i;
          break;
        }
      }
    } else if (this._direction === 6) {
      for (var i = 0; i < max; ++i) {
        if (this.isSmartJumpValid(this.x + max - i, this.y)) {
          value = max - i;
          break;
        }
      }
    } else if (this._direction === 8) {
      for (var i = 0; i < max; ++i) {
        if (this.isSmartJumpValid(this.x, this.y - max + i)) {
          value = max - i;
          break;
        }
      }
    }
    return value;
};

Game_CharacterBase.prototype.isSmartJumpValid = function(x, y) {
    if (this.isThrough()) return true;
    var events = $gameMap.eventsXyNt(x, y);
    var length = events.length;
    var regionId = $gameMap.regionId(x, y);
    if (Yanfly.Param.JumpEqualRegion.contains(regionId)) {
      if (this.regionId() !== regionId) return false;
    }
    for (var i = 0; i < length; ++i) {
      var ev = events[i];
      if (!ev) continue;
      if (ev.isThrough()) continue;
      if (ev.isNormalPriority()) return false;
      if (ev.isSmartJumpBlocked()) return false;
    }
    var regionId = $gameMap.regionId(x, y);
    if (regionId > 0 && Yanfly.Param.JumpEqualRegion.contains(regionId)) {
      if (this.regionId() === regionId) return true;
    }
    return $gameMap.isPassable(x, y, this._direction);
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.Jump.Game_Event_setupPageSettings = 
    Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
    Yanfly.Jump.Game_Event_setupPageSettings.call(this);
    DataManager.processJumpNotetags2(this.event());
};

Game_Event.prototype.isSmartJumpBlocked = function() {
    if (this.event().illegalJump === undefined) {
      DataManager.processJumpNotetags2(this.event());
    }
    return this.event().illegalJump;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Jump.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Jump.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'SmartJump') {
    $gamePlayer.smartJump(parseInt(args[0]));
  }
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

//=============================================================================
// End of File
//=============================================================================
