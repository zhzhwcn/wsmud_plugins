// ==UserScript==
// @name         wsmud_plugins
// @namespace    cqv
// @version      0.0.2
// @description  武神传说 MUD
// @author       fjcqv
// @match        http://game.wsmud.com/*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require      https://cdn.bootcss.com/jquery-contextmenu/3.0.0-beta.2/jquery.contextMenu.min.js
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
(function () {
    'use strict';

    var roomItemSelectIndex = -1;
    var timer=0;
    var cnt=0;
    var goods = {
        //扬州城-醉仙楼-店小二
        "米饭": {
            "id": null,
            "sales": "店小二",
            place: "扬州城-醉仙楼"
        },
        "包子": {
            "id": null,
            "sales": "店小二",
            place: "扬州城-醉仙楼"
        },
        "鸡腿": {
            "id": null,
            "sales": "店小二",
            place: "扬州城-醉仙楼"
        },
        "面条": {
            "id": null,
            "sales": "店小二",
            place: "扬州城-醉仙楼"
        },
        "扬州炒饭": {
            "id": null,
            "sales": "店小二",
            place: "扬州城-醉仙楼"
        },
        "米酒": {
            "id": null,
            "sales": "店小二",
            place: "扬州城-醉仙楼"
        },
        "花雕酒": {
            "id": null,
            "sales": "店小二",
            place: "扬州城-醉仙楼"
        },
        "女儿红": {
            "id": null,
            "sales": "店小二",
            place: "扬州城-醉仙楼"
        },
        "醉仙酿": {
            "id": null,
            "sales": "店小二",
            place: "扬州城-醉仙楼"
        },
        "神仙醉": {
            "id": null,
            "sales": "店小二",
            place: "扬州城-醉仙楼"
        },
        //扬州城-杂货铺
        "布衣": {
            "id": null,
            "sales": "杂货铺老板 杨永福",
            place: "扬州城-杂货铺"
        },
        "钢刀": {
            "id": null,
            "sales": "杂货铺老板 杨永福",
            place: "扬州城-杂货铺"
        },
        "木棍": {
            "id": null,
            "sales": "杂货铺老板 杨永福",
            place: "扬州城-杂货铺"
        },
        "英雄巾": {
            "id": null,
            "sales": "杂货铺老板 杨永福",
            place: "扬州城-杂货铺"
        },
        "布鞋": {
            "id": null,
            "sales": "杂货铺老板 杨永福",
            place: "扬州城-杂货铺"
        },
        "铁戒指": {
            "id": null,
            "sales": "杂货铺老板 杨永福",
            place: "扬州城-杂货铺"
        },
        "簪子": {
            "id": null,
            "sales": "杂货铺老板 杨永福",
            place: "扬州城-杂货铺"
        },
        "长鞭": {
            "id": null,
            "sales": "杂货铺老板 杨永福",
            place: "扬州城-杂货铺"
        },
        "钓鱼竿": {
            "id": null,
            "sales": "杂货铺老板 杨永福",
            place: "扬州城-杂货铺"
        },
        "鱼饵": {
            "id": null,
            "sales": "杂货铺老板 杨永福",
            place: "扬州城-杂货铺"
        },

        //扬州城-打铁铺
        "铁剑": {
            "id": null,
            "sales": "铁匠铺老板 铁匠",
            place: "扬州城-打铁铺"
        },
        "钢刀": {
            "id": null,
            "sales": "铁匠铺老板 铁匠",
            place: "扬州城-打铁铺"
        },
        "铁棍": {
            "id": null,
            "sales": "铁匠铺老板 铁匠",
            place: "扬州城-打铁铺"
        },
        "铁杖": {
            "id": null,
            "sales": "铁匠铺老板 铁匠",
            place: "扬州城-打铁铺"
        },
        "铁镐": {
            "id": null,
            "sales": "铁匠铺老板 铁匠",
            place: "扬州城-打铁铺"
        },

        //扬州城-药铺
        "金创药": {
            "id": null,
            "sales": "药铺老板 平一指",
            place: "扬州城-药铺"
        },
        "引气丹": {
            "id": null,
            "sales": "药铺老板 平一指",
            place: "扬州城-药铺"
        },
        "养精丹": {
            "id": null,
            "sales": "药铺老板 平一指",
            place: "扬州城-药铺"
        },
    };
    var equip={
        "铁镐":0,
    };
    var npcs = {
        "店小二": 0
    };
    var place = {
        "住房":"jh fam 0 start;go west;go west;go north;go enter",
        "扬州城-醉仙楼": "jh fam 0 start;go north;go north;go east",
        "扬州城-杂货铺": "jh fam 0 start;go east;go south",
        "扬州城-打铁铺": "jh fam 0 start;go east;go east;go south",
        "扬州城-药铺": "jh fam 0 start;go east;go east;go north",
        "扬州城-衙门正厅":"jh fam 0 start;go west;go north;go north",
        "扬州城-矿山":"jh fam 0 start;go west;go west;go west;go west",
        "武当派-广场":"jh fam 1 start;",
        "武当派-三清殿":"jh fam 1 start;go north",
        "武当派-后山小院": "jh fam 1 start;go west;go northup;go north;go west;go northup;go northup;go northup;go north;go north;go north;go north;go north;go north",
        "少林派-广场":"jh fam 2 start;",
        "华山派-镇岳宫":"jh fam 3 start;",
        "华山派-客厅":"jh fam 3 start;go westup;go north;go north",
        "峨眉派-金顶":"jh fam 4 start;",
        "逍遥派-青草坪":"jh fam 5 start;",
        "丐帮-树洞内部":"jh fam 6 start;",
        "襄阳城-广场":"jh fam 7 start;",
        "武道塔":"jh fam 8 start"
    };
    var family = null;

    //快捷键功能
    var KEY = {
        init: function () {
            //添加快捷键说明
            $("span[command=stopstate] span:eq(0)").html("S");
            $("span[command=showcombat] span:eq(0)").html("A");
            $("span[command=showtool] span:eq(0)").html("C");
            $("span[command=pack] span:eq(0)").html("B");
            $("span[command=tasks] span:eq(0)").html("L");
            $("span[command=score] span:eq(0)").html("O");
            $("span[command=jh] span:eq(0)").html("J");
            $("span[command=skills] span:eq(0)").html("K");
            $("span[command=message] span:eq(0)").html("U");
            $("span[command=shop] span:eq(0)").html("P");
            $("span[command=stats] span:eq(0)").html("I");
            $("span[command=setting] span:eq(0)").html(",");
            this.do_command("showtool");
            this.do_command("showcombat");
            $(document).on("keydown", this.e);
        },

        e: function (event) {
            //快捷键绑定
            var ctrlKey = event.ctrlKey || event.metaKey;
            var altKey = event.altKey;
            // 聊天模式单独处理
            if ($(".channel-box").is(":visible")) {
                chatModeKeyEvent(event);
                return;
            }
            switch (event.keyCode) {
                    //////////////////////////////
                    //         杂项
                    //////////////////////////////
                case 27:
                    // ESC
                    KEY.dialog_close();
                    break;
                case 192:
                    // `
                    $(".map-icon").click();
                    break;
                case 32:
                    // Space
                    KEY.dialog_confirm();
                    break;
                    //////////////////////////////
                    //       命令栏控制
                    //////////////////////////////
                case 83:
                    // S 停止
                    KEY.do_command("stopstate");
                    break;
                case 13:
                    // 回车 聊天
                    KEY.do_command("showchat");
                    return false;
                case 65:
                    // A 打开动作框
                    KEY.do_command("showcombat");
                    break;
                case 67:
                    // C 打开工具框
                    KEY.do_command("showtool");
                    break;
                case 66:
                    // B 打开背包
                    KEY.do_command("pack");
                    break;
                case 76:
                    // L 打开任务
                    KEY.do_command("tasks");
                    break;
                case 79:
                    // O 打开属性
                    KEY.do_command("score");
                    break;
                case 74:
                    // J 江湖
                    KEY.do_command("jh");
                    break;
                case 75:
                    // K 技能
                    KEY.do_command("skills");
                    break;
                case 73:
                    // Q 任务
                    KEY.do_command("stats");
                    break;
                case 85:
                    // U 消息
                    KEY.do_command("message");
                    break;
                case 80:
                    // P 商城
                    KEY.do_command("shop");
                    break;
                case 188:
                    // , 设置
                    KEY.do_command("setting");
                    break;
                case 81:
                    // Q 门派任务
                    WG.go_family();
                    break;
                case 87:
                    // W 自动门派任务
                    WG.auto_family_task();
                    break;
                case 69:
                    // E,一键追捕
                    WG.go_yamen_task();
                    break;
                case 82:
                    // R 一键击杀
                    WG.kill_all();
                    break;
                case 84:
                    // T, 一键拾取
                    WG.get_all();
                    break;
                    //////////////////////////////
                    //         动作栏控制
                    // 无修饰键：个人房间动作
                    // Alt 键：个人命令动作
                    // Crtl 键：房间人物列表动作
                    //////////////////////////////
                case 49:
                    // 1
                    if (altKey) {
                        KEY.onRoomItemAction(0);
                    } else if (ctrlKey) {
                        KEY.room_commands( 0);
                    } else {
                        KEY.combat_commands(0);

                    }
                    return false;
                case 50:
                    // 2
                    if (altKey) {
                        KEY.onRoomItemAction(1);
                    } else if (ctrlKey) {
                        KEY.room_commands( 1);
                    } else {
                        KEY.combat_commands(1);

                    }
                    return false;
                case 51:
                    // 3
                    if (altKey) {
                        KEY.onRoomItemAction(2);
                    } else if (ctrlKey) {
                        KEY.room_commands( 2);
                    } else {
                        KEY.combat_commands(2);

                    }
                    return false;
                case 52:
                    // 4
                    if (altKey) {
                        KEY.onRoomItemAction(3);
                    } else if (ctrlKey) {
                        KEY.room_commands( 3);
                    } else {
                        KEY.combat_commands(3);

                    }
                    return false;
                case 53:
                    // 5
                    if (altKey) {
                        KEY.onRoomItemAction(4);
                    } else if (ctrlKey) {
                        KEY.room_commands( 4);
                    } else {
                        KEY.combat_commands(4);

                    }
                    return false;
                    //////////////////////////////
                    //       房间人物控制
                    //////////////////////////////
                case 9:
                    // Tab
                    KEY.onRoomItemSelect();
                    return false;
                    //////////////////////////////
                    //         地图控制
                    //////////////////////////////
                case 103:
                    // NumPad 7
                    WG.Send("go northwest");
                    KEY.onChangeRoom();
                    break;
                case 104:
                    // NumPad 8
                case 38:
                    // Up Arrow
                    WG.Send("go north");
                    KEY.onChangeRoom();
                    break;
                case 105:
                    // NumPad 9
                    WG.Send("go northeast");
                    KEY.onChangeRoom();
                    break;
                case 100:
                    // NumPad 4
                case 37:
                    // Left Arrow
                    WG.Send("go west");
                    KEY.onChangeRoom();
                    break;
                case 102:
                    // NumPad 6
                case 39:
                    // Right Arrow
                    WG.Send("go east");
                    KEY.onChangeRoom();
                    break;
                case 97:
                    // NumPad 1
                    WG.Send("go southwest");
                    KEY.onChangeRoom();
                    break;
                case 98:
                    // NumPad 2
                case 40:
                    // Down Arrow
                    WG.Send("go south");
                    KEY.onChangeRoom();
                    break;
                case 99:
                    // NumPad 3
                    WG.Send("go southeast");
                    KEY.onChangeRoom();
                    break;
            }
        },
        dialog_close: function () {
            $(".dialog-close").click();
        },
        dialog_confirm: function () {
            $(".dialog-btn.btn-ok").click();
        },
        do_command: function (name) {
            $("span[command=" + name + "]").click();
        },
		room_commands: function (index) {
            $("div.combat-panel div.room-commands span:eq(" + index + ")").click();
        },
        combat_commands: function (index) {
            $("div.combat-panel div.combat-commands span.pfm-item:eq(" + index + ")").click();
        },
        chatModeKeyEvent: function (event) {
            switch (event.keyCode) {
                case 27:
                    // ESC
                    KEY.dialog_close();
                    break;
                case 84:
                    // T
                    if (event.altKey) {
                        KEY.dialog_close();
                    }
                    break;
                case 13:
                    // Enter
                    if ($(".sender-box").val().length) $(".sender-btn").click();
                    else KEY.dialog_close();
                    break;
            }
        },
        onChangeRoom: function () {
            roomItemSelectIndex = -1;
        },
        onRoomItemSelect: function () {
            if (roomItemSelectIndex != -1) {
                $(".room_items div.room-item:eq(" + roomItemSelectIndex + ")").css("background", "#000");
            }
            roomItemSelectIndex = (roomItemSelectIndex + 1) % $(".room_items div.room-item").length;
            var curItem = $(".room_items div.room-item:eq(" + roomItemSelectIndex + ")");
            curItem.css("background", "#444");
            curItem.click();
        },
        onRoomItemAction: function (index) {
            //NPC下方按键
            $(".room_items .item-commands span:eq(" + index + ")").click();
        },
    }

    function messageClear() {
        $(".content-message pre").html("");
    }
    function messageAppend(m) {
        $(".content-message pre").Append(m);
    }
    function tip(t)	{
        $(".WG_Tip").html(t);
    }

    var WG = {
        init: function () {
            $(".bottom-bar").append("<span class='item-commands' style='display:none'><span WG='WG' cmd=''></span></span>"); //命令行模块
            var t
            $(".content-message").after("<div class='' style='right:45px;bottom:2.6em;'>" + "门派任务：<span class='zdy-item go_family'>接(Q)</span>" + "<span class='zdy-item auto_family_task'>自动(W)</span>" + "<span class='zdy-item go_yamen_task'>一键追捕(E)</span><br>" + "副本：<span class='zdy-item kill_all'>击杀(R)</span>" + "<span class='zdy-item get_all'>拾取(T)</span>" + "生活：<span class='zdy-item sell_all'>清包(T)</span>" + "<span class='zdy-item zdwk'>挖矿(T)</span>" + "<span class='WG_Tip'></span>" + "</div>");
            var css = ".zdy-item{display: inline-block; border: solid 1px gray;color: gray;background-color: black;" + "text-align: center;cursor: pointer;border-radius: 0.25em;min-width: 2.5em;margin-right: 0.4em;" + "margin-left: 0.4em;position: relative;padding-left: 0.4em;padding-right: 0.4em;}";
            GM_addStyle(css);
            goods = GM_getValue("goods", goods);
            npcs = GM_getValue("npcs", npcs);
            equip = GM_getValue("equip", equip);

            $(".go_family").on("click", WG.go_family);
            $(".auto_family_task").on("click", WG.auto_family_task);
            $(".go_yamen_task").on("click", WG.go_yamen_task);
            $(".kill_all").on("click", WG.kill_all);
            $(".get_all").on("click", WG.get_all);
            $(".sell_all").on("click", WG.sell_all);
            $(".zdwk").on("click", WG.zdwk);
        },
        updete_goods_id: function () {
            var lists = $(".dialog-list > .obj-list:first");
            var id;
            var name;
            $(".content-message > pre").html("");
            if (lists.length) {
                messageAppend("检测到商品清单\n");
                for (var a of lists.children()) {
                    a = $(a);
                    id = a.attr("obj");
                    name = $(a.children()[0]).html();
                    console.log(name + ":" + id);
                    goods[name].id = id;
                    messageAppend(name + ":" + id + '\n');
                }
                GM_setValue("goods", goods);
            } else {
                messageAppend("未检测到商品清单\n");
            }
        },
        updete_npc_id: function () {
            var lists = $(".room_items .room-item");
            $(".content-message > pre").html("");

            for (var npc of lists) {
                if (npc.lastElementChild.lastElementChild == null) {
                    npcs[npc.lastElementChild.innerText] = $(npc).attr("itemid");
                    messageAppend(npc.lastElementChild.innerText+" 的ID:"+$(npc).attr("itemid")+"\n");
                }
            }
            GM_setValue("npcs", npcs);
        },

        Send: function (cmd) {
            console.log(cmd);
            $("span[WG='WG']").attr("cmd", cmd).click();
        },
        go: function (p) {
            if(WG.at(p))return;
            if (place[p] != undefined) WG.Send(place[p]);
        },
        at:function(p){
            var w=$(".room-name").html();
            return w.indexOf(p)==-1?false:true;
        },
        go_family: function () {
            //无门派，提取门派
            if (family == null) {
                family = $('.role-list .select').text().substr(0, 2);
            }
            switch (family) {
                case '武当':
                    WG.go("武当派-后山小院");
                    WG.sm("邋遢真人 张三丰");
                    break;
                case '华山':
                    WG.go("华山派-客厅");
                    WG.sm("华山派掌门 君子剑 岳不群");
                    break;
                default:
                    tip("识别门派为" + family + "，无法工作");
                    family = $('.role-list .select').text().substr(0, 2);
                    break;
            }
        },
        sm:function(master){
            master=npcs[master];
            if(master!=undefined)
                WG.Send("task sm "+master);
            else
                WG.updete_npc_id();
        },
        buy:function(good){
            var tmp=npcs[good.sales];
            if(tmp==undefined){
                WG.updete_npc_id();
                return false;}
            WG.Send("list "+tmp);
            WG.Send("buy 1 "+good.id+" from " +tmp);
            return true;
        },
        eq:function(e){
            WG.Send("eq "+equip[e]);
        },
        ask:function(npc,i){
            npc=npcs[npc];
            if(npc!=undefined)
                WG.Send("ask"+i+" "+npcs["扬州知府 程药发"]);
            else
                WG.updete_npc_id();
        },
        auto_family_task: function () {
            //获取师门任务道具
            var item = $("span[cmd$='giveup']:last").parent().prev();
            if (item.length == 0) {
                tip("自动接收师门任务");
                WG.go_family();
                return
            };
            item = item.html();
            //能直接上交
            if ($("span[cmd$='giveup']:last").prev().children().html() == item) {
                $("span[cmd$='giveup']:last").prev().click();
                tip("自动上交" + item);
                messageClear();
                return;
            }
            var good = goods[item];
            if (good != undefined) {
                tip("自动购买" + item);
                WG.go(good.place);
                if(WG.buy(good)){
                    WG.go_family();
                }
                return;
            }
            tip("无法自动购买" + item);
        },


        go_yamen_task: function () {
            WG.go("扬州城-衙门正厅");
            WG.ask("扬州知府 程药发",1);
        },

        kill_all: function () {
            var lists = $(".room_items .room-item");
            for (var npc of lists) {
                WG.Send("kill " + $(npc).attr("itemid"));
            }
        },

        get_all: function () {
            var lists = $(".room_items .room-item");
            for (var npc of lists) {
                WG.Send("get all from " + $(npc).attr("itemid"));
            }
        },

        sell_all: function () {
            WG.go("扬州城-打铁铺");
            WG.Send("sell all");
        },
        zdwk: function () {
            var t=$(".room_items .room-item:first .item-name").text();
            t=t.indexOf("<挖矿");

            if(t==-1){
                tip("当前不在挖矿状态");
                if(timer==0)
                {
                    WG.go("扬州城-矿山");
                    WG.eq("铁镐");
                    WG.Send("wa");
                    timer=setInterval(WG.zdwk,1000);
                }
            }
            else
            {
                WG.timer_close();
            }

            if(WG.at("扬州城-矿山") && t==-1)
            {
                //不能挖矿，自动买铁镐
                WG.go("扬州城-打铁铺");
                WG.buy(goods["铁镐"]);
                //买完等待下一次检查
                tip("自动买铁镐");
                return;
            }
            if(WG.at("扬州城-打铁铺") )
            {
                var lists = $(".dialog-list > .obj-list:eq(1)");
                var id;
                var name;
                if (lists.length) {
                    tip("查找铁镐ID\n");
                    for (var a of lists.children()) {
                        a = $(a);
                        id = a.attr("obj");
                        name = $(a.children()[0]).html();
                        if(name=="铁镐")
                        {
                            equip["铁镐"]=id;

                            WG.eq("铁镐");

                        }
                    }
                    GM_setValue("equip", equip);
                    WG.go("扬州城-矿山");
                    WG.Send("wa");
                }
                return;
            }

        },
        timer_close:function()
        {
            if(timer)
            {
                clearInterval(timer);
                timer=0;
            }
        },
        wudao_auto:function()
        {
            //创建定时器
            if(timer==0)
            {
                timer=setInterval(WG.wudao_auto,1000);
            }
            if(!WG.at("武道塔"))
            {
                //进入武道塔
                WG.go("武道塔");
                WG.ask("守门人",1);
                WG.Send("go enter");
            }
            else
            {
                //武道塔内处理
                tip("武道塔");
            }
        },
        xue_auto:function()
        {
            var t=$(".room_items .room-item:first .item-name").text();
            t=t.indexOf("<打坐")!=-1 || t.indexOf("<学习")!=-1 ;
            //创建定时器
            if(timer==0)
            {
                if(t==false){
                    tip("当前不在打坐或学习状态");
                    return;
                }
                timer=setInterval(WG.xue_auto,1000);
            }
            if(t==false)
            {
                //学习状态中止，自动去挖矿
                WG.timer_close();
                WG.zdwk();
            }
            else
            {
                tip("自动打坐学习中");
            }

        }

    };

    KEY.init();
    WG.init();
    $('head').append('<link href="https://cdn.bootcss.com/jquery-contextmenu/3.0.0-beta.2/jquery.contextMenu.min.css" rel="stylesheet">');
    $.contextMenu({
        selector: '.content-message',
        callback: function(key, options) {
            console.log("点击了：" + key);
        },
        items: {
            "关闭自动": {name: "关闭自动",visible: function(key, opt) {return timer!=0;},
                     callback: function(key, opt){WG.timer_close();},},
			"自动": {name: "自动",visible: function(key, opt) {return timer==0;},
                     "items": {
						"自动打坐学习": {name: "自动打坐学习",callback: function(key, opt){WG.xue_auto();},},
						"自动武道": {name: "自动武道",callback: function(key, opt){WG.wudao_auto();},},
						"自动副本": {name: "自动副本",callback: function(key, opt){WG.wudao_auto();},},
					 },
			},
            "门派传送": {name: "门派传送",
                     "items": {
                         "mp0": {name: "豪宅",callback: function(key, opt){WG.go("住房");},},
                         "mp1": {name: "武当",callback: function(key, opt){WG.go("武当派-广场");},},
                         "mp2": {name: "少林",callback: function(key, opt){WG.go("少林派-广场");},},
                         "mp3": {name: "华山",callback: function(key, opt){WG.go("华山派-镇岳宫");},},
                         "mp4": {name: "峨眉",callback: function(key, opt){WG.go("峨眉派-金顶");},},
                         "mp5": {name: "逍遥",callback: function(key, opt){WG.go("逍遥派-青草坪");},},
                         "mp6": {name: "丐帮",callback: function(key, opt){WG.go("丐帮-树洞内部");},},
                         "mp7": {name: "襄阳",callback: function(key, opt){WG.go("襄阳城-广场");},},
                         "mp8": {name: "武道",callback: function(key, opt){WG.go("武道塔");},},
                     },
                    },
            "更新商品": {name: "更新商品",callback: function(key, opt){WG.updete_goods_id();},},
            "更新NPC": {name: "更新NPC",callback: function(key, opt){WG.updete_npc_id();},}
        }
    });

})();