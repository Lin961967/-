/*:
 * @plugindesc 禁用默认菜单调用插件
 * @author 你的名字
 * 
 * @help DisableMenu.js
 * 这个插件的作用是禁用默认的菜单按键（通常是Esc/F1），防止玩家在地图界面呼出菜单。
 * 
 * @param MenuKeyEnabled
 * @text 启用菜单键
 * @type boolean
 * @on 启用
 * @off 禁用
 * @desc 设置为“否”将禁用菜单按键。
 * @default false
 */

(function() {
    // 读取插件参数
    var parameters = PluginManager.parameters('DisableMenu');
    var menuEnabled = String(parameters['MenuKeyEnabled'] || 'false') === 'true';

    // 核心重写代码
    // 这里是 MV 引擎检测是否按下菜单键的地方
    Scene_Map.prototype.isMenuCalled = function() {
        // 如果参数设置为 false，则永远返回 false，即“没按下”
        return menuEnabled && Input.isTriggered('menu');
    };

})();