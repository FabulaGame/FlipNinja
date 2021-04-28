/*
 * @Author: Ztory
 * @Date: 2018-11-15 11:44:04
 * @Last Modified by: Ztory
 * @Last Modified time: 2018-11-15 11:47:36
 */
{
    var __version_1 = "0.0.6";
    var http_1 = function (url, callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (4 == request.readyState && 200 <= request.status && 400 > request.status) {
                callback(request.responseText);
            }
        };
        request.open("GET", url);
        request.send();
    };
    var _utils = /** @class */ (function () {
        function _utils() {
            this.JustShowNodeName = "___JustShowNode";
            this.showButtonTarget = true;
            var utils = this.getUtils();
            if (utils) {
                this.register(utils);
            }
            this.checkNew();
        }
        _utils.prototype.checkNew = function () {
        };
        _utils.prototype.register = function (utils) {
            console.log("\n\n================================\n\nWill Load Utils\n\n");
            for (var k in utils) {
                var func = utils[k];
                window[k] = func.func;
            }
            window["showHelp"]();
            console.log("Utils Loaded Success!!\n\n================================\n\n");
        };
        _utils.prototype.getUtils = function () {
            if (typeof (window) != 'undefined' && window["cc"]) {
                if (window["cc"]['DEFAULT_ENGINE']) {
                    console.log("%c \n\n================================\n\n " + window["cc"]['DEFAULT_ENGINE'] + " Project\n\n================================\n\n", 'color:#ff0000');
                    return null;
                }
                console.log("%c \n\n================================\n\n Cocos Creator Project\n\n================================\n\n", 'color:#ff0000');
                return this.initCocosCreatorProject();
            }
            else if (typeof (window) != 'undefined' && window["egret"]) {
                console.log("%c \n\n================================\n\n Egret Project\n\n================================\n\n", 'color:#ff0000');
                return this.initEgretProject();
            }
            else {
                if (typeof (window) != 'undefined' && (window["laya"] || window["Laya"])) {
                    console.log("%c \n\n================================\n\n Laya Project\n\n================================\n\n", 'color:#ff0000');
                }
                else {
                    console.log("%c \n\n================================\n\nUnkonw Project!!!\n\nUtils Load Failed!!!\n\n================================\n\n", 'color:#ff0000');
                }
                return null;
            }
        };
        _utils.prototype.initEgretProject = function () {
            var _egret = window["egret"];
            var _eui = window['eui'];
            var _utils = this;
            var nodeDoc = "";
            var helpDoc;
            var scriptKeyCache = {};
            var getTopNode = function () {
                for (var k in window) {
                    var j = window[k];
                    if (j && j.stage && j.stage.stageHeight) {
                        return j.stage;
                    }
                }
            };
            function _nodeFilter(filter, withShowNode) {
                if (withShowNode === void 0) { withShowNode = false; }
                var pNode = getTopNode();
                var arr = [];
                var tempFunc = withShowNode ? function () { return true; } : function (node) { return node.name != _utils.JustShowNodeName; };
                function filterNode(node) {
                    if (filter(node) && tempFunc(node)) {
                        arr.push(node);
                    }
                    node.$children && node.$children.forEach(function (n) {
                        filterNode(n);
                    });
                }
                filterNode(pNode);
                if (arr.length > 1) {
                    return arr;
                }
                return arr[0] || [];
            }
            var getInScriptKey = function (node, showInfo) {
                if (showInfo === void 0) { showInfo = true; }
                var cache = scriptKeyCache[node.hashCode];
                var ret;
                if (cache) {
                    if (showInfo) {
                        console.log("cached:");
                        console.log(cache.obj);
                        console.log(cache.skinName + "-->" + cache.name);
                    }
                    return cache.name;
                }
                _nodeFilter(function (object) {
                    if (object instanceof _egret.Stage) {
                        return false;
                    }
                    for (var key in object) {
                        if ('$parent' == key || 'parent' == key || '$stage' == key || 'stage' == key) {
                            continue;
                        }
                        var value = object[key];
                        if (value && typeof (value) == "object") {
                            if (value == node) {
                                scriptKeyCache[node.hashCode] = { obj: object, name: key, skinName: value.skinName };
                                if (showInfo) {
                                    console.log(object);
                                    console.log(object.skinName + "-->" + key);
                                }
                                if (ret) {
                                    console.log("注意, 这个object在多个脚本中被引用!! " + ret);
                                }
                                ret = key;
                                return true;
                            }
                        }
                    }
                });
                return ret;
            };
            var canPrint = true;
            _egret.DisplayObject.prototype.$oldOnAddToStage = _egret.DisplayObject.prototype.$onAddToStage;
            _egret.DisplayObject.prototype.$onAddToStage = function (stage, nestLevel) {
                var self = this;
                _egret.DisplayObject.prototype.$oldOnAddToStage.call(self, stage, nestLevel);
                if (!self._addTouchEvent) {
                    self.addEventListener('touchBegin', function () {
                        if (!canPrint)
                            return;
                        canPrint = false;
                        console.log(self.getMyName(), self);
                        setTimeout(function () {
                            canPrint = true;
                        }, 1);
                    }, self);
                    self._addTouchEvent = true;
                }
            };
            Object.defineProperty(_eui.Image.prototype, "source", {
                get: function () {
                    return this._source;
                },
                set: function (value) {
                    if (value == this._source) {
                        return;
                    }
                    this._source = value;
                    if (this.$stage) {
                        this.parseSource();
                    }
                    else {
                        this.sourceChanged = true;
                        this.invalidateProperties();
                    }
                    window[value] = this;
                },
                enumerable: true,
                configurable: true
            });
            var index = 0;
            var getNemo = function (t) {
                return t.__class__ + "_" + (index++);
            };
            var _nodeFunctions = {
                getMyName: {
                    doc: "()\n        自动设置指定节点的名称, 优先级 : name -> source -> inScriptKey -> __class__",
                    func: function (_this) {
                        _this.name = _this.name || _this.source || getInScriptKey(_this, false) || getNemo(_this);
                        return _this.name;
                    }
                },
                showMyName: {
                    doc: "()\n        显示指定节点的名称",
                    func: function (_this) {
                        if (_this.name.indexOf(_utils.JustShowNodeName) != -1) {
                            return;
                        }
                        var showNode;
                        var container;
                        if (_this instanceof _egret.DisplayObjectContainer) {
                            showNode = _this.getChildByName(_this.JustShowNodeName);
                            container = true;
                        }
                        else {
                            showNode = _this.parent.getChildByName(_this.JustShowNodeName);
                            container = false;
                        }
                        if (!showNode) {
                            var nodee = new _egret.TextField();
                            var str = _this.getMyName();
                            nodee.name = str + _utils.JustShowNodeName;
                            _this.JustShowNodeName = nodee.name;
                            container ? _this.addChild(nodee) : (nodee.visible = _this.visible, _this.parent.addChild(nodee), nodee.x = _this.x, nodee.y = _this.y);
                            nodee.text = str;
                            nodee.textColor = 'ff0000';
                            nodee.size = 20;
                        }
                        else {
                            if (!showNode.visible) {
                                showNode.visible = _this.visible;
                            }
                        }
                    }
                }
            };
            nodeDoc += "===== Node Function Begin =====\n\n";
            var _loop_1 = function (k) {
                nodeDoc += "    node." + k + _nodeFunctions[k].doc + "\n\n";
                _egret.DisplayObject.prototype[k] = function () {
                    return _nodeFunctions[k].func(this);
                };
            };
            for (var k in _nodeFunctions) {
                _loop_1(k);
            }
            nodeDoc += "====== Node Function Done ======\n";
            var isFirstShowAllNode = true;
            var utils = {
                showAllNode: {
                    doc: "(): void\n        显示所有显示用的节点, (附加的显示节点可能会导致程序报错, 使用destroyAllShowNode()来删除显示用的节点)",
                    func: function () {
                        if (isFirstShowAllNode) {
                            console.log('%c 第一次调用可能会卡, 请耐心等待加载完全后的提示', 'color:#ff0000');
                        }
                        _nodeFilter(function (node) {
                            node.showMyName();
                            return false;
                        });
                        if (isFirstShowAllNode) {
                            console.log("%c 加载完了", 'color:#ff0000');
                            isFirstShowAllNode = false;
                        }
                    }
                },
                hideAllNode: {
                    doc: "(): void\n        隐藏所有显示用的节点(附加的显示节点可能会导致程序报错, 使用destroyAllShowNode()来删除显示用的节点)",
                    func: function () {
                        _nodeFilter(function (node) {
                            if (node.name.indexOf(_utils.JustShowNodeName) != -1) {
                                node.visible = false;
                            }
                            return false;
                        });
                    }
                },
                destroyAllShowNode: {
                    doc: "(): void\n        删除所有显示用的节点(附加的显示节点可能会导致程序报错, 使用destroyAllShowNode()来删除显示用的节点)",
                    func: function () {
                        _nodeFilter(function (node) {
                            return node instanceof _egret.TextField && node.name.indexOf(_utils.JustShowNodeName) != -1;
                        }).forEach(function (n) {
                            n.parent.removeChild(n);
                        });
                    }
                },
                getRootNode: {
                    doc: "(): egret.Stage\n        获取场景的root节点",
                    func: function () {
                        return getTopNode();
                    }
                },
                getInScriptKey: {
                    doc: "(egret.HashObject): void\n        打印出引用该节点是否已在脚本被引用",
                    func: getInScriptKey
                },
                nodeFilter: {
                    doc: "(filter: Function): egret.DisplayObject | Array<egret.DisplayObject>\n        过滤节点",
                    func: _nodeFilter
                },
                getIncludeNameNode: {
                    doc: "(name: string): egret.DisplayObject | Array<egret.DisplayObject>\n        显示名称包含该字符串的节点",
                    func: function (name) {
                        return _nodeFilter(function (node) {
                            var nodeName = (node.name || node.source || "");
                            return -1 != nodeName.indexOf(name) && -1 == nodeName.indexOf(_utils.JustShowNodeName);
                        });
                    }
                },
                getIncludeStringNode: {
                    doc: "(string: string): egret.TextField | Array<egret.TextField>\n        显示内容包含该字符串的节点",
                    func: function (string) {
                        return _nodeFilter(function (node) {
                            return node.text && node.text.indexOf(string) !== -1;
                        });
                    }
                },
                getByScriptKey: {
                    doc: "(string: string)\n        获取出指定的变量的值, 若该变量不为object, 则会打印含有该变量的object; 若该变量为object, 则会保存在其__script属性中",
                    func: function (string) {
                        var ret = [];
                        _nodeFilter(function (n) {
                            if ((typeof n[string]) !== typeof void 0) {
                                if (typeof n[string] != 'object') {
                                    console.log(n[string], n);
                                }
                                else {
                                    n[string].__script = n;
                                }
                                ret.push(n[string]);
                            }
                            return false;
                        });
                        if (ret.length > 1) {
                            return ret;
                        }
                        return ret[0] || [];
                    }
                },
                seekNodeByName: {
                    doc: "(name: string): egret.DisplayObject | Array<egret.DisplayObject>\n        返回所有与指定名称相同的节点(单个)或节点数组(多个)",
                    func: function (string) {
                        return _nodeFilter(function (node) {
                            return node.getMyName() == string;
                        });
                    }
                },
                showHelp: {
                    doc: "()\n        显示帮助\n",
                    func: function () {
                        if (helpDoc) {
                            console.log(helpDoc);
                        }
                        else {
                            helpDoc = nodeDoc + "\n\n";
                            helpDoc += "====== Global Function Begin ======\n\n";
                            for (var k in utils) {
                                helpDoc += ("    " + k + utils[k].doc + "\n\n");
                            }
                            helpDoc += "====== Global Function Done ======";
                            console.log(helpDoc);
                        }
                    }
                }
            };
            return utils;
        };
        _utils.prototype.initCocosCreatorProject = function () {
            var nodeDoc = "";
            var helpDoc;
            var _cc = window["cc"];
            var _utils = this;
            var getTopNode = function () {
                var canvas = _cc.find("Canvas");
                if (!canvas) {
                    canvas = _cc.Canvas.instance.node;
                }
                console.assert(canvas, "can't find canvas!!!");
                var topNode = canvas;
                var parent = topNode.parent;
                while (parent) {
                    topNode = parent;
                    parent = topNode.parent;
                }
                return topNode;
            };
            var _nodeFunctions = {
                showMyName: {
                    doc: "()\n        显示指定节点的名称",
                    func: function (_this) {
                        if (_this.name == _utils.JustShowNodeName) {
                            return;
                        }
                        var showNode = _this.getChildByName(_utils.JustShowNodeName);
                        if (!showNode) {
                            var nodee = new _cc.Node();
                            nodee.name = _utils.JustShowNodeName;
                            _this.addChild(nodee);
                            var nameText = nodee.addComponent(_cc.Label);
                            nameText.string = _this.name;
                            nodee.color = _cc.color(255, 0, 0);
                        }
                        else {
                            if (!showNode.active) {
                                showNode.active = true;
                            }
                        }
                    }
                },
                showComponents: {
                    doc: "() \n        显示指定节点的所有Component",
                    func: function (_this) {
                        _this._components.forEach(function (a) { console.log(a.name); console.log(a); });
                    }
                },
                showChildren: {
                    doc: "() \n        显示指定节点的子节点",
                    func: function (_this) {
                        _this._children.forEach(function (a, index) { console.log(index + ":", a); });
                    }
                },
                showPath: {
                    doc: "() \n        显示指定节点的路径",
                    func: function (_this) {
                        var parent = _this.parent;
                        var path = _this.name;
                        while (parent && parent.name != "Canvas") {
                            path = parent.name + "/" + path;
                            parent = parent.parent;
                        }
                        if (!parent || parent.name != "Canvas") {
                            console.log("获取层级失败! " + path);
                        }
                        else {
                            if (_cc.find("Canvas/" + path) == _this) {
                                console.log("cc.find(\"Canvas/" + path + "\")");
                            }
                            else {
                                console.log("根据获取结果查找节点失败, 路径中存在重复节点 : ", "cc.find(\"Canvas/" + path + "\")");
                            }
                        }
                    }
                },
                stay: {
                    doc: "() \n        使指定节点被点击后跟随鼠标移动",
                    func: function (_this) {
                        if (_this._touchListener) {
                            if (_this.oldMove) {
                                return;
                            }
                            _this.oldMove = _this._touchListener.onTouchMoved;
                            _this._touchListener.onTouchMoved = function (t, e) {
                                _this.position = _this.parent.convertToNodeSpaceAR(t._point);
                                _this.owner = _this;
                                _this.oldMove(t, e);
                            };
                            _this.oldEnd = _this._touchListener.onTouchEnded;
                            _this._touchListener.onTouchEnded = function () {
                                console.log("========\nName: " + _this.name);
                                console.log(_this);
                                console.log("Position : " + _this.position + "\n========");
                                if (_this.showPath()) {
                                }
                            };
                            _this.oldBegin = _this._touchListener.onTouchBegan;
                            _this._touchListener.onTouchBegan = function (t, e) {
                                _this.owner = _this;
                                return _this.oldBegin(t, e);
                            };
                        }
                        else {
                            _this.on("touchstart", function (t, e) { });
                            _this.stay();
                        }
                    }
                },
                leave: {
                    doc: "() \n        停止指定节点跟随鼠标移动",
                    func: function (_this) {
                        if (!_this.oldMove) {
                            return;
                        }
                        _this._touchListener.onTouchMoved = _this.oldMove;
                        _this._touchListener.onTouchEnded = _this.oldEnd;
                        _this._touchListener.onTouchBegan = _this.oldBegin;
                        _this.oldMove = null;
                        _this.oldEnd = null;
                        _this.oldBegin = null;
                    }
                }
            };
            nodeDoc += "===== Node Function Begin =====\n\n";
            var _loop_2 = function (k) {
                nodeDoc += "    node." + k + _nodeFunctions[k].doc + "\n\n";
                _cc.Node.prototype[k] = function () {
                    _nodeFunctions[k].func(this);
                };
            };
            for (var k in _nodeFunctions) {
                _loop_2(k);
            }
            nodeDoc += "====== Node Function Done ======\n";
            _cc.Button.prototype.oldOnTouchBegan = _cc.Button.prototype._onTouchBegan;
            _cc.Button.prototype._onTouchBegan = function (t) {
                if (_utils.showButtonTarget) {
                    var _this_1 = this;
                    this.clickEvents.forEach(function (e) {
                        e && console.log("\n按钮名称: " + _this_1.node.name + ", 绑定回调 : " + e.component + " ---> " + e.handler + "\n\n");
                        _this_1.node.showPath();
                    });
                }
                this.oldOnTouchBegan(t);
            };
            function _nodeFilter(filter, withShowNode) {
                if (withShowNode === void 0) { withShowNode = false; }
                var pNode = getTopNode();
                var arr = [];
                var tempFunc = withShowNode ? function () { return true; } : function (node) { return node.name != _utils.JustShowNodeName; };
                function filterNode(node) {
                    if (filter(node) && tempFunc(node)) {
                        arr.push(node);
                    }
                    node.getChildren().forEach(function (n) {
                        filterNode(n);
                    });
                }
                filterNode(pNode);
                if (arr.length > 1) {
                    return arr;
                }
                return arr[0] || [];
            }
            var utils = {
                showAllNode: {
                    doc: "(): void\n        显示所有显示用的节点(附加的显示节点可能会导致程序报错, 使用destroyAllShowNode()来删除显示用的节点)",
                    func: function () {
                        _nodeFilter(function (node) {
                            node.showMyName();
                            return false;
                        });
                    }
                },
                hideAllNode: {
                    doc: "(): void\n        隐藏所有显示用的节点(附加的显示节点可能会导致程序报错, 使用destroyAllShowNode()来删除显示用的节点)",
                    func: function () {
                        _nodeFilter(function (node) {
                            if (node.name == _utils.JustShowNodeName) {
                                node.active = false;
                            }
                            return false;
                        }, true);
                    }
                },
                destroyAllShowNode: {
                    doc: "(): void\n        删除所有显示用的节点(附加的显示节点可能会导致程序报错, 使用destroyAllShowNode()来删除显示用的节点)",
                    func: function () {
                        _nodeFilter(function (node) {
                            if (node.name == _utils.JustShowNodeName) {
                                node.destroy();
                            }
                            return false;
                        }, true);
                    }
                },
                showByName: {
                    doc: "(name: string): void\n        显示所有与指定名称相同的节点(附加的显示节点可能会导致程序报错, 使用destroyAllShowNode()来删除显示用的节点)",
                    func: function (name) {
                        _nodeFilter(function (node) {
                            if (node.name == name) {
                                node.showMyName();
                            }
                            return false;
                        });
                    }
                },
                showByComponent: {
                    doc: "(component: string | _cc.Component): void\n        显示所有包含指定控件的节点",
                    func: function (component) {
                        _nodeFilter(function (node) {
                            if (node.getComponent(component)) {
                                node.showMyName();
                            }
                            return false;
                        });
                    }
                },
                seekNodeByName: {
                    doc: "(name: string): _cc.Node | Array<_cc.Node>\n        返回所有与指定名称相同的节点(单个)或节点数组(多个)",
                    func: function (name) {
                        return _nodeFilter(function (node) {
                            return node.name == name;
                        });
                    }
                },
                nodeFilter: {
                    doc: "(filter: function, withShowNode:boolean = false) : _cc.Node | Array<_cc.Node>\n        返回所有满足过滤条件的的节点(单个)或节点数组(多个)",
                    func: _nodeFilter
                },
                setShowButtonEvent: {
                    doc: "(openOrClose: boolean): void\n        设置显示按钮绑定事件开关, 默认打开, 打开后会在开始点击按钮时显示按钮绑定的事件(一个按钮可能有多个绑定事件)\n        当前显示按钮回调开关 : " + _utils.showButtonTarget,
                    func: function (openOrClose) {
                        _utils.showButtonTarget = openOrClose;
                        console.log("显示按钮回调开关 : " + _utils.showButtonTarget + " 可以通过setShowButtonEvent(open: boolean)设置\n\n");
                    }
                },
                getRootNode: {
                    doc: "(): cc.Node\n        获取场景的root节点",
                    func: function () {
                        return getTopNode();
                    }
                },
                getIncludeNameNode: {
                    doc: "(name: string): cc.Node | Array<cc.Node>\n        显示名称包含该字符串的节点",
                    func: function (name) {
                        return _nodeFilter(function (node) {
                            return -1 != node.name.indexOf(name);
                        });
                    }
                },
                getIncludeStringNode: {
                    doc: "(string: string): cc.Node | Array<cc.Node>\n        显示内容包含该字符串的节点",
                    func: function (string) {
                        return _nodeFilter(function (node) {
                            return node.getComponent(_cc.Label) && node.getComponent(_cc.Label).string.indexOf(string) !== -1;
                        });
                    }
                },
                moveAllButton: {
                    doc: "(stayOrLeave: boolean): void\n        使场景中所有可见按钮开启(关闭)跟随鼠标移动",
                    func: function (stayOrLeave) {
                        if (stayOrLeave === void 0) { stayOrLeave = true; }
                        _nodeFilter(function (node) {
                            return node.activeInHierarchy && node.getComponent(_cc.Button);
                        }).forEach(function (n) {
                            if (stayOrLeave) {
                                n.stay();
                            }
                            else {
                                n.leave();
                            }
                        });
                    }
                },
                moveAllSprite: {
                    doc: "(stayOrLeave: boolean): void\n        使场景中所有可见精灵开启(关闭)跟随鼠标移动",
                    func: function (stayOrLeave) {
                        if (stayOrLeave === void 0) { stayOrLeave = true; }
                        _nodeFilter(function (node) {
                            return node.activeInHierarchy && node.getComponent(_cc.Sprite) && !node.getComponent(_cc.Button);
                        }).forEach(function (n) {
                            if (stayOrLeave) {
                                n.stay();
                            }
                            else {
                                n.leave();
                            }
                        });
                    }
                },
                moveAllLabel: {
                    doc: "(stayOrLeave: boolean): void\n        使场景中所有可见文字开启(关闭)跟随鼠标移动",
                    func: function (stayOrLeave) {
                        if (stayOrLeave === void 0) { stayOrLeave = true; }
                        _nodeFilter(function (node) {
                            return node.activeInHierarchy && node.getComponent(_cc.Label);
                        }).forEach(function (n) {
                            if (stayOrLeave) {
                                n.stay();
                            }
                            else {
                                n.leave();
                            }
                        });
                    }
                },
                stopAllMoveNode: {
                    doc: "(): void\n        使场景中所有节点关闭跟随鼠标移动",
                    func: function (stayOrLeave) {
                        if (stayOrLeave === void 0) { stayOrLeave = true; }
                        _nodeFilter(function (node) {
                            node.leave();
                            return false;
                        });
                    }
                },
                getInScriptKey: {
                    doc: "(cc.Node): void\n        打印出引用该节点是否已在脚本被引用",
                    func: function (node) {
                        _nodeFilter(function (n) {
                            return n != node && n._components.filter(function (k) {
                                var _loop_3 = function (kk) {
                                    if ("_defaultSkinIndex" === kk) return false;
                                    try{
                                        k[kk]
                                    } catch(e){
                                        console.log(kk)
                                    }
                                    var key = k[kk];
                                    if (key && typeof (key) == "object") {
                                        if (key == node) {
                                            console.log(n);
                                            console.log(k.name + "-->" + kk);
                                            return { value: true };
                                        }
                                        else {
                                            if (Array.isArray(key)) {
                                                key.forEach(function (value, index) {
                                                    if (value == node) {
                                                        console.log(n);
                                                        console.log(k.name + "-->" + kk + "-->" + index);
                                                        return true;
                                                    }
                                                });
                                            }
                                        }
                                    }
                                };
                                for (var kk in k) {
                                    var state_1 = _loop_3(kk);
                                    if (typeof state_1 === "object")
                                        return state_1.value;
                                }
                                return false;
                            }).length > 0;
                        });
                    }
                },
                showHelp: {
                    doc: "()\n        显示帮助\n",
                    func: function () {
                        if (helpDoc) {
                            console.log(helpDoc);
                        }
                        else {
                            helpDoc = nodeDoc + "\n\n";
                            helpDoc += "====== Global Function Begin ======\n\n";
                            for (var k in utils) {
                                helpDoc += ("    " + k + utils[k].doc + "\n\n");
                            }
                            helpDoc += "====== Global Function Done ======";
                            console.log(helpDoc);
                        }
                    }
                }
            };
            return utils;
        };
        return _utils;
    }());
    window.ccccc = ()=>{
        new _utils();
    }
}
