//=============================================================================
// MOG_SkipWindowLog.js
//=============================================================================

/*:
 * @plugindesc MOG禁用战斗日志窗口[v1.2]
 * @author Moghunter
 *
 * @param Lag Time
 * @text 行动后等待时间
 * @desc 行动后的等待时间设置
 * @default 10 
 *
 * @param Display Start Message
 * @text 显示敌人名称初始消息
 * @type boolean
 * @on 显示
 * @off 禁用
 * @desc 是否显示包含敌人名称的初始消息
 * @default false
 *
 * @param Display Preemptive Message
 * @type boolean
 * @on 显示
 * @off 禁用
 * @text 显示先发制人攻击消息
 * @desc 是否显示先发制人攻击的消息
 * @default true
 *
 * @help  
 * =============================================================================
 * +++ MOG - Skip Window Log (v1.2) +++
 * By Moghunter 
 * https://mogplugins.com
 * =============================================================================
 * 禁用战斗日志窗口

   插件允许商业游戏制作
 
 * =============================================================================
 * 历史更新
 * ============================================================================= 
 * v1.2 - 增加禁用战斗初始消息的选项
 * v1.1 - Compatibilidade com MOG Flash Damage.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_SkipWindowLog = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_SkipWindowLog');
    Moghunter.winLogSpeed = Number(Moghunter.parameters['Lag Time'] || 10);
	Moghunter.battleStartMessage = String(Moghunter.parameters['Display Start Message'] || "false");
	Moghunter.battlePreemptiveMessage = String(Moghunter.parameters['Display Preemptive Message'] || "true");
//=============================================================================
// ** Window BattleLog
//=============================================================================

//==============================
// * Refresh 
//==============================
Window_BattleLog.prototype.refresh = function(text) { 
   this.visible = false;
};

//==============================
// * Message Speed
//==============================
Window_BattleLog.prototype.messageSpeed = function() {
	if (Imported.MOG_FlashDamage) {if ($gameTemp._flashDamage) {return 0}};
    return Moghunter.winLogSpeed;
};


//=============================================================================
// ** Battle Manager
//=============================================================================

//==============================
// * Refresh 
//==============================
BattleManager.displayStartMessages = function() {
    if (String(Moghunter.battleStartMessage) === "true") {
		$gameTroop.enemyNames().forEach(function(name) {
			$gameMessage.add(TextManager.emerge.format(name));
		});
	};
	if (String(Moghunter.battlePreemptiveMessage) === "true") {
    if (this._preemptive) {
        $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
    } else if (this._surprise) {
        $gameMessage.add(TextManager.surprise.format($gameParty.name()));
    }
	};
};