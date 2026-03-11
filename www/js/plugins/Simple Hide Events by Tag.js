// JavaScript source code
// 名称：Simple Hide Events by Tag
// 功能：通过注释标签批量隐藏/显示事件
(function () {
    'use strict';

    // 拦截插件指令
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        // 如果指令是 "HideEvents"
        if (command.toLowerCase() === 'hideevents') {
            var tagName = args[0]; // 获取第一个参数（标签名）
            var action = args[1];  // 获取第二个参数（on 或 off）

            // 遍历地图上所有事件
            $gameMap.events().forEach(function (event) {
                // 检查该事件的备注（注释）里是否包含指定的标签
                if (event.event().note.includes("<" + tagName + ">")) {
                    if (action.toLowerCase() === 'on') {
                        event.erase(); // 隐藏（抹除）事件
                    } else {
                        event.appear(); // 显示事件
                    }
                }
            });
        }
    }();
})