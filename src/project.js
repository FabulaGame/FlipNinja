require = function a(o, r, c) {
    window.ccccc && window.ccccc();
    window.ccccc || (console.log=()=>{});
    function l(t, e) {
        if (!r[t]) {
            if (!o[t]) {
                var i = "function" == typeof require && require;
                if (!e && i) return i(t, !0);
                if (h) return h(t, !0);
                var n = new Error("Cannot find module '" + t + "'");
                throw n.code = "MODULE_NOT_FOUND", n;
            }
            var s = r[t] = {
                exports: {}
            };
            o[t][0].call(s.exports, function(e) {
                return l(o[t][1][e] || e);
            }, s, s.exports, a, o, r, c);
        }
        return r[t].exports;
    }
    for (var h = "function" == typeof require && require, e = 0; e < c.length; e++) l(c[e]);
    return l;
}({
    1: [ function(e, t, i) {
        var n, s, a = t.exports = {};
        function o() {
            throw new Error("setTimeout has not been defined");
        }
        function r() {
            throw new Error("clearTimeout has not been defined");
        }
        function c(t) {
            if (n === setTimeout) return setTimeout(t, 0);
            if ((n === o || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);
            try {
                return n(t, 0);
            } catch (e) {
                try {
                    return n.call(null, t, 0);
                } catch (e) {
                    return n.call(this, t, 0);
                }
            }
        }
        (function() {
            try {
                n = "function" == typeof setTimeout ? setTimeout : o;
            } catch (e) {
                n = o;
            }
            try {
                s = "function" == typeof clearTimeout ? clearTimeout : r;
            } catch (e) {
                s = r;
            }
        })();
        var l, h = [], d = !1, u = -1;
        function g() {
            d && l && (d = !1, l.length ? h = l.concat(h) : u = -1, h.length && p());
        }
        function p() {
            if (!d) {
                var e = c(g);
                d = !0;
                for (var t = h.length; t; ) {
                    for (l = h, h = []; ++u < t; ) l && l[u].run();
                    u = -1, t = h.length;
                }
                l = null, d = !1, function(t) {
                    if (s === clearTimeout) return clearTimeout(t);
                    if ((s === r || !s) && clearTimeout) return s = clearTimeout, clearTimeout(t);
                    try {
                        s(t);
                    } catch (e) {
                        try {
                            return s.call(null, t);
                        } catch (e) {
                            return s.call(this, t);
                        }
                    }
                }(e);
            }
        }
        function m(e, t) {
            this.fun = e, this.array = t;
        }
        function f() {}
        a.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (1 < arguments.length) for (var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
            h.push(new m(e, t)), 1 !== h.length || d || c(p);
        }, m.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, a.title = "browser", a.browser = !0, a.env = {}, a.argv = [], a.version = "", 
        a.versions = {}, a.on = f, a.addListener = f, a.once = f, a.off = f, a.removeListener = f, 
        a.removeAllListeners = f, a.emit = f, a.prependListener = f, a.prependOnceListener = f, 
        a.listeners = function(e) {
            return [];
        }, a.binding = function(e) {
            throw new Error("process.binding is not supported");
        }, a.cwd = function() {
            return "/";
        }, a.chdir = function(e) {
            throw new Error("process.chdir is not supported");
        }, a.umask = function() {
            return 0;
        };
    }, {} ],
    AchievementMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "9585eCd3xtGwKn+1hb/6moZ", "AchievementMgr");
        var n = {}, s = {
            PASS_LEVEL: 1,
            COIN: 2,
            BAT: 3,
            SHARE: 4,
            LIKE: 5,
            CHALLENGE: 6,
            CHALLENGE_SCORE: 7,
            LOTTERY: 8
        };
        n.AchievementType = s;
        var o = {}, a = null;
        n.init = function(e) {
            (a = e).active = !1;
        }, n.showAchievementGain = function(e) {
            console.log("showAchievementGain", e);
            var t = DataMgr.getAchievementById(e);
            a.y = cc.winSize.height / 2 + a.height / 2, a.active = !0, a.getChildByName("title").getComponent(cc.Label).string = t.title, 
            a.getChildByName("des").getComponent(cc.Label).string = t.des, a.stopAllActions();
            var i = t.id;
            i < 10 && (i = "0" + i), cc.loader.loadRes("aicons/AH_" + i, function(e, t) {
                var i = a.getChildByName("icon");
                i.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t), i.getComponent(cc.Button).interactable = !1, 
                a.runAction(cc.sequence(cc.moveTo(.1, 0, cc.winSize.height / 2 - a.height / 2), cc.delayTime(.5), cc.callFunc(function() {
                    i.getComponent(cc.Button).interactable = !0, a.getChildByName("star").getComponent(cc.ParticleSystem).resetSystem();
                }), cc.delayTime(3), cc.moveTo(.1, 0, cc.winSize.height / 2 + a.height / 2), cc.callFunc(function() {
                    a.active = !1;
                })));
            });
        }, n.getByType = function(e) {
            if (o[e]) return o[e];
            for (var t = [], i = DataMgr.getAchievementCfg(), n = Object.keys(i), s = 0; s < n.length; s++) {
                var a = DataMgr.getAchievementById(n[s]);
                a.type == e && t.push(a);
            }
            return o[e] = t;
        }, n.checkAchievementGain = function(e, t) {
            this.getByType(e).forEach(function(e) {
                e.count != t || User.isAchievementGained(e.id) || (User.markAchievementGained(e.id), 
                AdHelper.logEvent("achievement_gained", {
                    id: e.id
                }), n.showAchievementGain(e.id));
            });
        }, n.onPassLevel = function(e) {
            this.checkAchievementGain(s.PASS_LEVEL, e), console.log("onPassLevel", e);
        }, n.onCoinChange = function(e) {
            this.checkAchievementGain(s.COIN, e);
        }, n.onKillBat = function() {
            var e = User.addAchiCounter("bat");
            this.checkAchievementGain(s.BAT, e), console.log("onKillBat");
        }, n.onShareGame = function() {
            var e = User.addAchiCounter("share");
            this.checkAchievementGain(s.SHARE, e), console.log("onShareGame");
        }, n.onLikeVideo = function() {
            var e = User.addAchiCounter("like");
            this.checkAchievementGain(s.LIKE, e), console.log("onLikeVideo");
        }, n.onChallengeFriends = function() {
            var e = User.addAchiCounter("friend");
            this.checkAchievementGain(s.CHALLENGE, e), console.log("onChallengeFriends");
        }, n.onChallengeScore = function(e) {
            this.checkAchievementGain(s.CHALLENGE_SCORE, e), console.log("onChallengeScore", e);
        }, n.onSpinLottery = function() {
            var e = User.addAchiCounter("spin");
            this.checkAchievementGain(s.LOTTERY, e), console.log("onSpinLottery");
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    AchivementItem: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "cc48cX+y3NOTbxjhj1Umlrj", "AchivementItem"), cc.Class({
            extends: cc.Component,
            properties: {
                iconSprite: cc.Sprite,
                titleLabel: cc.Label,
                desLabel: cc.Label,
                collectBtn: cc.Button,
                anim: cc.Animation
            },
            onLoad: function() {},
            onCollect: function() {
                if (!User.isAchievementCollected(this.data.id)) {
                    var e = DataMgr.getAchievementById(this.data.id);
                    User.markAchievementCollected(this.data.id), User.addGold(e.rewardNum), this.anim.setCurrentTime(0), 
                    this.anim.sample("achiicon"), this.anim.stop("achiicon"), AdHelper.logEvent("achievement_collect", {
                        id: this.data.id
                    }), PageMgr.showTips("Wow! Get " + e.rewardNum + " conis!");
                }
            },
            updateItem: function(e, t) {
                var i = this;
                this.itemId = e, this.data = t, this.titleLabel.string = t.title, this.desLabel.string = t.des, 
                this.collectBtn.interactable = User.isAchievementGained(t.id), this.anim.setCurrentTime(0), 
                this.anim.sample("achiicon"), this.anim.stop("achiicon"), User.isAchievementGained(t.id) && !User.isAchievementCollected(t.id) && this.anim.play("achiicon");
                var n = t.id;
                n < 10 && (n = "0" + n), cc.loader.loadRes("aicons/AH_" + n, function(e, t) {
                    i.iconSprite.spriteFrame = new cc.SpriteFrame(t);
                });
            },
            start: function() {}
        }), cc._RF.pop();
    }, {} ],
    AchivementPage: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "0d1dfW0Y0tL0qRKIeKtzaRJ", "AchivementPage");
        var n = e("ListView");
        cc.Class({
            extends: cc.Component,
            properties: {
                listView: n
            },
            onLoad: function() {
                for (var e = [], t = DataMgr.getAchievementCfg(), i = Object.keys(t), n = 0; n < i.length; n++) {
                    var s = DataMgr.getAchievementById(i[n]);
                    e.push(s);
                }
                this.listView.setItemsData(e);
            },
            onHome: function() {
                PageMgr.showPage("HomePage");
            },
            start: function() {}
        }), cc._RF.pop();
    }, {
        ListView: "ListView"
    } ],
    AdHelper: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "89c77fib/xAjpNFYYF07APU", "AdHelper");
        var a = [  ], o = 0, r = null, c = !1, l = !1, h = [ ], d = 0, u = null, g = !1, p = !1, m = {}, n = 0, s = 0, f = {};
        f.loadAsync = function(t, i) {
        }, f.isInterstitialLoad = function() {
            return true;
        }, f.showInterstitialAd = function(e, t, i) {
            window.__adStartCallback = ()=>{
                cc.game.pause();
            }
            window.__adFinishedCallback = ()=>{
                cc.game.resume();
                t && t();
            }
            window.__adErrorCallback = ()=>{
                i && i();
                cc.game.resume();
            }
            window.createVideoAd && window.createVideoAd();
        }, f.debugMsg = function(e) {}, f.loadVideoAsync = function(e, t) {
            if (p || FBInstant.getSupportedAPIs().indexOf("getRewardedVideoAsync") < 0) return t && t(), 
            void f.debugMsg("isVideoLoading true");
            console.log("loadVideoAsync");
            var i = function() {
                p = !1, u && (g = !0, e && e(), f.logEvent("reward_success", {
                    index: d
                }));
            }, n = function(e) {
                f.logEvent("aderrornew", {
                    code: e.code
                }), "ADS_TOO_MANY_INSTANCES" != e.code && "CLIENT_UNSUPPORTED_OPERATION" != e.code && (p = g = !1, 
                m[h[d]] = u, u = null, f.logEvent("reward_fail", {
                    index: d
                }), ++d < h.length ? (p = !0, setTimeout(function() {
                    p = !1, f.loadVideoAsync();
                }, 5e3)) : (p = !(d = 0), setTimeout(function() {
                    p = !1;
                }, 9e4), t && t(e)));
            }, s = h[d];
            f.logEvent("reward_load", {
                index: d
            }), p = !0, u = m[s], m[s] = null, u ? u.loadAsync().then(i, n) : FBInstant.getRewardedVideoAsync(s).then(function(e) {
                return (u = e).loadAsync();
            }).then(i, n);
        }, f.isVideoLoad = function() {
            return true;
        }, f.showVideoAd = function(e, t, i) {
            this.showInterstitialAd(e, t, i || (()=>{
                PageMgr.showTips("Sorry, no ad available!")
            }));
        }, f.logEvent = function(e, t, i) {
            console.log(e, t, i)
        };
        var y = 0;
        f.autoShowAd = function() {
            3 <= ++y && f.isInterstitialLoad() && (f.logEvent("autoShowAd"), this.showInterstitialAd("autoShow"));
        }, t.exports = f, cc._RF.pop();
    }, {} ],
    ArmMonsterMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "4471fYLHNJFa7e9YMd9Kz86", "ArmMonsterMgr");
        var n = {}, s = new cc.NodePool();
        n.initGame = function(e, t, i) {
            this.layerNode = e, this.prefab = t, this.mainGame = i, this.tileList = [], this.inited = !0;
        }, n.addTile = function(e, t) {
            var i = s.get() || cc.instantiate(this.prefab);
            i.position = this.mainGame.getTilePosition(e, t), this.layerNode.addChild(i);
            var n = i.getComponent("ArmMonsterTile");
            return this.tileList.push(n), n;
        }, n.removeAll = function(e, t) {
            if (this.inited) {
                for (var i = this.tileList.length - 1; 0 <= i; i--) s.put(this.tileList[i].node);
                this.tileList = [];
            }
        }, n.resetAll = function(e, t) {
            if (this.inited) for (var i = this.tileList.length - 1; 0 <= i; i--) this.tileList[i].reset();
        }, n.step = function(t, i) {
            var n = this;
            this.inited && this.tileList.forEach(function(e) {
                e.step(t, i), e.isHit(n.mainGame.player) && (n.mainGame.player.setPlayerDeath(e, "ArmMonster"), 
                e.reset());
            });
        }, n.freeze = function() {
            this.inited && this.tileList.forEach(function(e) {
                e.onFreeze();
            });
        }, n.unFreeze = function() {
            this.inited && this.tileList.forEach(function(e) {
                e.onUnFreeze();
            });
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    ArmMonsterTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "c656fOyLAZGZr/imPSLsTLg", "ArmMonsterTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {
                bullet: cc.Node,
                bulletSpine: sp.Skeleton,
                spineMonster: sp.Skeleton,
                freezeNode: cc.Node
            },
            ctor: function() {
                this.isWalkable = !1, this.isArmMonster = !0, this.dir = null, this.moveSpeed = 3, 
                this.moveDir = this.dir, this.isInMoveState = !0, this.curTime = 0, this.intervalTime = 1e3, 
                this.isFreezeState = !1;
            },
            init: function() {
                this.moveDir = this.dir;
                var e = this.spineMonster.node;
                1 == this.dir.x ? e.rotation = 180 : -1 == this.dir.x ? e.rotation = 0 : 1 == this.dir.y ? e.rotation = -90 : -1 == this.dir.y && (e.rotation = 90), 
                this.spineMonster.setAnimation(0, "daiji", !1), this.isInMoveState = !1, this.bulletTileX = 0, 
                this.bulletTileY = 0;
                var t = this.mainGame.getTilePosition(this.bulletTileX, this.bulletTileY);
                this.bullet.x = t.x, this.bullet.y = t.y, this.curTime = 0, this.bullet.active = !1, 
                this.isFreezeState = !1, this.freezeNode.active = this.isFreezeState;
            },
            reset: function() {
                this.init();
            },
            onFreeze: function() {
                this.reset(), this.isFreezeState = !0, this.freezeNode.active = this.isFreezeState;
            },
            onUnFreeze: function() {
                this.isFreezeState = !1, this.freezeNode.active = this.isFreezeState;
            },
            isHit: function(e) {
                if (!this.isInMoveState || this.isFreezeState) return !1;
                var t = this.bulletTileX + this.tileX, i = this.bulletTileY + this.tileY;
                return t == e.tileX && i == e.tileY;
            },
            step: function(e, t) {
                if (!this.isFreezeState) {
                    if (this.curTime += e, this.isInMoveState) {
                        if (50 < this.curTime && (this.bullet.active = !0), !this.bullet.active) return;
                        var i = this.bulletTileX + this.tileX, n = this.bulletTileY + this.tileY, s = this.mainGame.getTileAt(i, n), a = s.getNextTile(this.moveDir), o = s.getTilePosition(), r = a.getTilePosition(), c = 0 == this.moveDir.x ? r.y - this.node.y : r.x - this.node.x;
                        0 == this.moveDir.x ? this.bullet.y : this.bullet.x;
                        this.bullet.x += this.moveDir.x * e * this.moveSpeed, this.bullet.y -= this.moveDir.y * e * this.moveSpeed;
                        var l = c - (0 == this.moveDir.x ? this.bullet.y : this.bullet.x);
                        a.isWalkable ? Math.abs(l) <= e * this.moveSpeed / 2 && (this.bulletTileX += this.moveDir.x, 
                        this.bulletTileY += this.moveDir.y, this.bullet.x = r.x - this.node.x, this.bullet.y = r.y - this.node.y) : (this.isInMoveState = !1, 
                        this.bullet.x = o.x - this.node.x, this.bullet.y = o.y - this.node.y, this.bulletSpine.setAnimation(0, "ZiDan_XiaoShi", !1));
                    }
                    if (!this.isInMoveState && this.curTime >= this.intervalTime) {
                        this.bulletTileX = 0, this.bulletTileY = 0;
                        var h = this.mainGame.getTilePosition(this.bulletTileX, this.bulletTileY);
                        this.bullet.x = h.x, this.bullet.y = h.y, this.spineMonster.setEndListener(null), 
                        this.bulletSpine.setAnimation(0, "ZiDan_FeiXing", !1), this.bullet.active = !1, 
                        this.spineMonster.setAnimation(0, "KaiHuo", !1), this.isInMoveState = !0, this.curTime = 0;
                    }
                }
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    BaseTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "3afe2VbEpZG44fIL/SsjYAs", "BaseTile"), cc.Class({
            extends: cc.Component,
            properties: {},
            ctor: function() {
                return this.mainGame = null, this.tileX = 0, this.tileY = 0, this.stageLevel = 1, 
                this.isWalkable = !0, this;
            },
            getTileKey: function() {
                return "" + this.stageLevel + this.tileX + "." + this.tileY;
            },
            init: function() {
                this.getProp("isHide") && this.mainGame.hideTileAt(this.tileX, this.tileY);
            },
            reset: function() {},
            setType: function(e) {
                this.type = e;
            },
            getType: function() {
                return this.type;
            },
            setProp: function(e) {
                this.prop = e;
            },
            getProp: function(e) {
                return this.prop ? this.prop[e] : null;
            },
            getNeighborTiles: function() {
                var e = [];
                return e.push(this.mainGame.getTileAt(this.tileX - 1, this.tileY - 1)), e.push(this.mainGame.getTileAt(this.tileX, this.tileY - 1)), 
                e.push(this.mainGame.getTileAt(this.tileX + 1, this.tileY - 1)), e.push(this.mainGame.getTileAt(this.tileX - 1, this.tileY)), 
                e.push(this.mainGame.getTileAt(this.tileX + 1, this.tileY)), e.push(this.mainGame.getTileAt(this.tileX - 1, this.tileY + 1)), 
                e.push(this.mainGame.getTileAt(this.tileX, this.tileY + 1)), e.push(this.mainGame.getTileAt(this.tileX + 1, this.tileY + 1)), 
                e;
            },
            getLeftTile: function() {
                return this.mainGame.getTileAt(this.tileX - 1, this.tileY);
            },
            getRightTile: function() {
                return this.mainGame.getTileAt(this.tileX + 1, this.tileY);
            },
            getUpTile: function() {
                return this.mainGame.getTileAt(this.tileX, this.tileY - 1);
            },
            getDownTile: function() {
                return this.mainGame.getTileAt(this.tileX, this.tileY + 1);
            },
            getNextTile: function(e, t) {
                return t = t || 1, this.mainGame.getTileAt(this.tileX + e.x * t, this.tileY + e.y * t);
            },
            getTilePosition: function() {
                return this.mainGame.getTilePosition(this.tileX, this.tileY);
            },
            onBeforeEnter: function(e) {},
            onPlayerEnter: function(e) {},
            onPlayerLeave: function(e) {},
            onPlayerAround: function(e) {},
            onPlayerStandOn: function(e) {},
            onPlayerStandOff: function(e) {},
            onFreeze: function() {},
            onUnFreeze: function() {},
            step: function(e) {}
        }), cc._RF.pop();
    }, {} ],
    BeginShowDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "d8c24Zx73FEFZ+k0OQOnMXP", "BeginShowDialog"), cc.Class({
            extends: cc.Component,
            properties: {
                starNode: cc.Node,
                titleLabel: cc.Label,
                protectNumLabel: cc.Label,
                adBtnNode: cc.Node
            },
            onPlayClick: function(e) {
                User.decEnergy(1) ? (()=>{
                    
                    
                    window.__adErrorCallback = window.__adFinishedCallback = ()=>{
                        this.close(), Utils.startGameMain({
                            level: this.data.stageId,
                            from: "mappage"
                        })
                    }
                    window.__adStartCallback = ()=>{
                    }
                    createVideoAd();
            })() : PageMgr.showTips("Not enough energy!!");
            },
            setData: function(e) {
                10 <= User.getShieldCount() || !AdHelper.isVideoLoad() ? this.adBtnNode.getComponent(cc.Button).interactable = !1 : this.adBtnNode.getComponent(cc.Button).interactable = !0, 
                this.data = e, this.titleLabel.string = "STAGE " + e.stageId;
                for (var t = 0; t < 3; ++t) {
                    this.starNode.getChildByName("resultpage_star_" + (t + 1)).active = t < e.star;
                }
                this.protectNumLabel.string = "x" + User.getKeyValue("shieldCount"), AdHelper.logEvent("beginshow", {
                    stageId: e.stageId
                });
            },
            close: function() {
                PageMgr.hideDialog("BeginShowDialog");
            },
            onAdClick: function() {
                var e = this;
                AdHelper.showVideoAd("beginAddShield", function() {
                    User.addShield(1), e.protectNumLabel.string = "x" + User.getKeyValue("shieldCount"), 
                    10 <= User.getShieldCount() || !AdHelper.isVideoLoad() ? e.adBtnNode.getComponent(cc.Button).interactable = !1 : e.adBtnNode.getComponent(cc.Button).interactable = !0;
                });
            },
            onCloseClick: function() {
                this.close();
            },
            start: function() {
                this.node.scale = cc.winSize.width / 750;
            }
        }), cc._RF.pop();
    }, {} ],
    BigFaceMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "8802amX3C9INKLS7pixdHuj", "BigFaceMgr");
        var n = {}, s = new cc.NodePool();
        n.initGame = function(e, t, i) {
            this.layerNode = e, this.prefab = t, this.mainGame = i, this.tileList = [], this.inited = !0;
        }, n.addTile = function(e, t) {
            var i = s.get() || cc.instantiate(this.prefab);
            i.position = this.mainGame.getTilePosition(e, t), i.x += this.mainGame.tileSize.width / 2, 
            i.y -= this.mainGame.tileSize.height / 2, this.layerNode.addChild(i);
            var n = i.getComponent("BigFaceTile");
            return this.tileList.push(n), n;
        }, n.removeAll = function(e, t) {
            if (this.inited) {
                for (var i = this.tileList.length - 1; 0 <= i; i--) s.put(this.tileList[i].node);
                this.tileList = [];
            }
        }, n.resetAll = function(e, t) {
            if (this.inited) for (var i = this.tileList.length - 1; 0 <= i; i--) this.tileList[i].reset();
        }, n.step = function(t, i) {
            var n = this;
            this.inited && this.tileList.forEach(function(e) {
                e.step(t, i), e.isHit(n.mainGame.player) && n.mainGame.player.setPlayerDeath(e, "BigFace");
            });
        }, n.freeze = function() {
            this.inited && this.tileList.forEach(function(e) {
                e.onFreeze();
            });
        }, n.unFreeze = function() {
            this.inited && this.tileList.forEach(function(e) {
                e.onUnFreeze();
            });
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    BigFaceTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "d0fc60yq+lKdpa7tHQOLyGc", "BigFaceTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {
                animate: cc.Animation,
                freezeNode: cc.Node
            },
            ctor: function() {
                this.isWalkable = !1, this.isBigFace = !0, this.idleTime = 1e3, this.curTime = 0, 
                this.isInBig = !1, this.isFreezeState = !1;
            },
            init: function() {
                this.curTime = 0, this.isInBig = !1, this.animate.play("bigface"), this.animate.stop(), 
                this.animate.setCurrentTime(0, "bigface"), this.animate.sample("bigface"), this.isFreezeState = !1, 
                this.freezeNode.active = this.isFreezeState;
            },
            reset: function() {
                this.curTime = 0, this.isInBig = !1, this.animate.setCurrentTime(.01, "bigface"), 
                this.animate.sample("bigface");
            },
            onBeforeEnter: function(e) {},
            onPlayerEnter: function(e) {},
            onFreeze: function() {
                this.isFreezeState = !0, this.freezeNode.active = this.isFreezeState, this.isInBig = !1, 
                this.curTime = 0, this.animate.setCurrentTime(0, "bigface"), this.animate.sample("bigface");
            },
            onUnFreeze: function() {
                this.isFreezeState = !1, this.freezeNode.active = this.isFreezeState;
            },
            isHit: function(e) {
                if (this.isInBig) {
                    var t = this.mainGame.player.tileX, i = this.mainGame.player.tileY, n = Math.abs(this.tileX - t), s = Math.abs(this.tileY - i);
                    if (n <= 1 && s <= 1 && n + s <= 2) return 140 < this.curTime && !0;
                }
                return !1;
            },
            step: function(e, t) {
                if (!this.isFreezeState) if (this.curTime += e, this.isInBig) {
                    var i = this.curTime / 1e3;
                    i >= this.animate.defaultClip.duration && (i = this.animate.duration, this.curTime = 0, 
                    this.isInBig = !1), this.animate.setCurrentTime(i, "bigface"), this.animate.sample("bigface");
                } else this.curTime >= this.idleTime && (this.curTime = 0, this.isInBig = !0);
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    BoxMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "aae70eOJfdEiapRCJ77UwPu", "BoxMgr");
        var n = {}, a = new cc.NodePool();
        n.initGame = function(e, t, i) {
            this.layerNode = e, this.prefab = t, this.mainGame = i, this.tileList = [], this.inited = !0;
        }, n.addTile = function(e, t, i) {
            var n = a.get() || cc.instantiate(this.prefab);
            n.position = this.mainGame.getTilePosition(e, t), this.layerNode.addChild(n);
            var s = n.getComponent("BoxTile");
            return s.tileX = e, s.tileY = t, s.mainGame = this.mainGame, s.subtype = i, this.tileList.push(s), 
            s;
        }, n.removeTile = function(e) {
            if (this.inited) for (var t = this.tileList.length - 1; 0 <= t; t--) if (this.tileList[t] == e) {
                this.tileList.splice(t, 1), a.put(e.node);
                break;
            }
        }, n.removeAll = function(e, t) {
            if (this.inited) {
                for (var i = this.tileList.length - 1; 0 <= i; i--) a.put(this.tileList[i].node);
                this.tileList = [];
            }
        }, n.resetAll = function(e, t) {
            if (this.inited) for (var i = this.tileList.length - 1; 0 <= i; i--) this.tileList[i].reset();
        }, n.step = function(e, t) {
            this.inited;
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    BoxTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "a791anmsepLnLdn97DS+VPR", "BoxTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {
                freeNode: cc.Node,
                adNode: cc.Node,
                freeAnim: cc.Animation,
                adAnim: cc.Animation
            },
            ctor: function() {
                this.isBox = !0, this.isWalkable = !1, this.anim = null, this.isAd = !1, this.isOpened = !1, 
                this.subtype = "ad";
            },
            init: function() {
                this.isAd = "ad" == this.subtype || User.isBoxOpened(this.getTileKey()), this.adNode.active = this.isAd, 
                this.freeNode.active = !this.adNode.active, this.anim = this.isAd ? this.adAnim : this.freeAnim, 
                this.animName = this.isAd ? "boxad" : "boxfree", this.isOpened = !1, this.anim.setCurrentTime(.01, this.animName), 
                this.anim.sample(this.animName);
            },
            openBox: function(t) {
                var i = this;
                this.anim.once("finished", function() {
                    var e = cc.v2(-(t.tileX - i.tileX) * i.mainGame.tileSize.width, (t.tileY - i.tileY) * i.mainGame.tileSize.height);
                    i.mainGame.addCoinWithAnim(i.isAd ? 200 : 50, e);
                }), this.anim.play(this.animName);
            },
            onBeforeEnter: function(e) {
                var t = this;
                this.isOpened || (this.isOpened = !0, this.isAd ? (AdHelper.logEvent("box_ad_click"), 
                AdHelper.isVideoLoad() ? AdHelper.showVideoAd("box_ad", function() {
                    t.openBox(e);
                }) : (this.isOpened = !1, PageMgr.showTips("No ad available!"))) : (User.markBoxOpened(this.getTileKey()), 
                this.openBox(e)));
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    BuyCoinDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "5c759PgaopOMLfg+Q9XvoJ/", "BuyCoinDialog"), cc.Class({
            extends: cc.Component,
            properties: {
                energy20offPrice: cc.Label,
                energy30offPrice: cc.Label,
                energy50offPrice: cc.Label,
                timeLeftLabel: cc.Label
            },
            start: function() {
                this.node.scale = cc.winSize.width / 750;
            },
            onEnable: function() {
                AdHelper.logEvent("buy_coin_show"), this.energy20offPrice.string = User.getPrice("coin_2", "$2.99"), 
                this.energy30offPrice.string = User.getPrice("coin_4", "$9.99"), this.energy50offPrice.string = User.getPrice("coin_6", "$49.99");
            },
            onBuyItem1: function() {
                var e = this;
                AdHelper.logEvent("buy_coin_click", {
                    button: "20off"
                }), User.purchase("coin_2", function() {
                    User.addGold(3300), e.closePage();
                });
            },
            onBuyItem2: function() {
                var e = this;
                AdHelper.logEvent("buy_coin_click", {
                    button: "30off"
                }), User.purchase("coin_4", function() {
                    User.addGold(11500), e.closePage();
                });
            },
            onBuyItem3: function() {
                var e = this;
                AdHelper.logEvent("buy_coin_click", {
                    button: "50off"
                }), User.purchase("coin_6", function() {
                    User.addGold(62500), e.closePage();
                });
            },
            closePage: function() {
                this.node.active = !1, this.onCloseCB && this.onCloseCB();
            },
            onClose: function() {
                AdHelper.logEvent("buy_coin_click", {
                    button: "close"
                }), this.closePage();
            },
            update: function() {
                0 < User.getThanksgivingLeftTime() && (this.timeLeftLabel.string = Utils.formatTimeHMS(User.getThanksgivingLeftTime())), 
                0 < User.getChristmasLeftTime() ? this.timeLeftLabel.string = Utils.formatTimeHMS(User.getChristmasLeftTime()) : 0 < User.getNewYearLeftTime() && (this.timeLeftLabel.string = Utils.formatTimeHMS(User.getNewYearLeftTime()));
            }
        }), cc._RF.pop();
    }, {} ],
    BuyEnergyDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "2c9393oy7xKEJ+VxmJVAxc4", "BuyEnergyDialog"), cc.Class({
            extends: cc.Component,
            properties: {
                adBtn: cc.Button,
                energy5Price: cc.Label,
                energy15Price: cc.Label
            },
            start: function() {
                this.node.scale = cc.winSize.width / 750;
            },
            onEnable: function() {
                this.adBtn.interactable = AdHelper.isVideoLoad(), AdHelper.logEvent("buy_energy_show", {
                    type: "money",
                    isVideoOK: AdHelper.isVideoLoad() ? "YES" : "NO"
                }), this.energy5Price.string = User.getPrice("energy_5", "$0.99"), this.energy15Price.string = User.getPrice("energy_15", "$1.99");
            },
            onBuyItem1: function() {
                var e = this;
                AdHelper.logEvent("buy_energy_click", {
                    button: "5energy"
                }), User.purchase("energy_5", function() {
                    User.addEnergy(5), e.closePage();
                });
            },
            onBuyItem2: function() {
                var e = this;
                AdHelper.logEvent("buy_energy_click", {
                    button: "15energy"
                }), User.purchase("energy_15", function() {
                    User.addEnergy(15), e.closePage();
                });
            },
            onAdClick: function() {
                var e = this;
                AdHelper.logEvent("buy_energy_click", {
                    button: "ad"
                }), this.adBtn.interactable = !1, AdHelper.showVideoAd("addEnergy", function() {
                    User.addEnergy(1), e.closePage();
                });
            },
            closePage: function() {
                PageMgr.hideDialog("BuyEnergyDialog");
            },
            onClose: function() {
                AdHelper.logEvent("buy_energy_click", {
                    button: "close"
                }), this.closePage();
            }
        }), cc._RF.pop();
    }, {} ],
    ChristmasSkinDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "b8005BTFShN578zXFKt5YGy", "ChristmasSkinDialog"), cc.Class({
            extends: cc.Component,
            properties: {
                priceLabel: cc.Label,
                timeLeftLabel: cc.Label
            },
            onEnable: function() {
                AdHelper.logEvent("buy_skin_show"), this.productId = "skin_2", this.skinId = 8, 
                this.priceLabel.string = User.getPrice(this.productId, "$0.99");
            },
            onBuyItem: function() {
                var e = this;
                AdHelper.logEvent("buy_skin_click", {
                    button: this.productId
                }), User.purchase(this.productId, function() {
                    User.skinBuy(e.skinId), e.closePage();
                });
            },
            closePage: function() {
                this.node.active = !1, this.onCloseCB && this.onCloseCB();
            },
            onClose: function() {
                AdHelper.logEvent("buy_skin_click", {
                    button: "close"
                }), this.closePage();
            },
            update: function() {
                0 < User.getChristmasLeftTime() && (this.timeLeftLabel.string = Utils.formatTimeHMS(User.getChristmasLeftTime()));
            }
        }), cc._RF.pop();
    }, {} ],
    CloudMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "21f12vUJ/NKcImCW0nd9fyz", "CloudMgr");
        var n = {}, s = new cc.NodePool();
        n.initGame = function(e, t, i) {
            this.layerNode = e, this.prefab = t, this.mainGame = i, this.tileList = [], this.inited = !0;
        }, n.addTile = function(e, t) {
            var i = s.get() || cc.instantiate(this.prefab);
            i.position = this.mainGame.getTilePosition(e, t), this.layerNode.addChild(i);
            var n = i.getComponent("CloudTile");
            return this.tileList.push(n), n;
        }, n.getTileAt = function(e, t) {
            for (var i = null, n = this.tileList.length - 1; 0 <= n; n--) this.tileList[n].tileX == e && this.tileList[n].tileY == t && (i = this.tileList[n]);
            return i;
        }, n.sort = function() {
            var i = this.mainGame.mapSize.width;
            this.tileList.sort(function(e, t) {
                return e.tileY * i + e.tileX - (t.tileY * i + t.tileX);
            });
        }, n.removeAll = function(e, t) {
            if (this.inited) {
                for (var i = this.tileList.length - 1; 0 <= i; i--) s.put(this.tileList[i].node);
                this.tileList = [];
            }
        }, n.step = function(t, i) {
            this.inited && this.tileList.forEach(function(e) {
                e.step(t, i);
            });
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    CloudTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "8d64ecyU2lNVqWkynpIVbDl", "CloudTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {
                cloudNode: cc.Node
            },
            ctor: function() {
                this.isWalkable = !1, this.isCloud = !0, this.dir = null, this.moveSpeed = 1, this.idleTime = 200, 
                this.curTime = 0, this.isInMoveState = !1, this.isCloudGroup = !1;
            },
            init: function() {
                this.curTime = 0, this.isInMoveState = !0, this.moveDir = this.dir, this.playerTileOffset = {
                    x: 0,
                    y: 0
                }, this.player = null, this.leftCloud = null, this.rightCloud = null, this.upCloud = null, 
                this.downCloud = null, this.enteringTile = null, this.isCloudGroup = !1;
                var e = this.getLeftTile();
                e.isCloud && (e.isCloudGroup = !0, this.isCloudGroup = !0, (this.leftCloud = e).rightCloud = this);
                var t = this.getRightTile();
                t.isCloud && (t.isCloudGroup = !0, this.isCloudGroup = !0, (this.rightCloud = t).leftCloud = this);
                var i = this.getUpTile();
                i.isCloud && (i.isCloudGroup = !0, this.isCloudGroup = !0, (this.upCloud = i).downCloud = this);
                var n = this.getDownTile();
                n.isCloud && (n.isCloudGroup = !0, this.isCloudGroup = !0, (this.downCloud = n).upCloud = this);
            },
            onPlayerStandOn: function(e) {
                if (this.player = e, this.isInMoveState) {
                    var t = this.mainGame.getTileAt(e.tileX + this.moveDir.x, e.tileY + this.moveDir.y);
                    e.onBeforeEnter(t);
                }
                e.standOnTile == this && (this.playerTileOffset = {
                    x: e.tileX - this.tileX,
                    y: e.tileY - this.tileY
                });
            },
            onPlayerStandOff: function(e) {
                !this.isInMoveState || this.moveDir.x * this.playerTileOffset.x != 1 && this.moveDir.y * this.playerTileOffset.y != 1 || e.moveDir && this.moveDir.x * e.moveDir.x != 1 && this.moveDir.y * e.moveDir.y != 1 && this.stopMove(), 
                this.playerTileOffset = {
                    x: 0,
                    y: 0
                }, e.standOnTile = null, this.player = null;
            },
            step: function(e, t) {
                if (this.isGoingToMove) return this.isInMoveState = !0, void (this.isGoingToMove = !1);
                if (this.isInMoveState) {
                    this.cloudNode.rotation += 30 * (0 == this.moveDir.x ? this.moveDir.y : this.moveDir.x);
                    var i = this.mainGame.getTileAt(this.tileX, this.tileY), n = this.getNextTile(this.moveDir), s = this.getNextTile(this.moveDir, 2), a = this.getTilePosition(), o = n.getTilePosition(), r = 0 == this.moveDir.x ? a.y : a.x, c = 0 == this.moveDir.x ? o.y : o.x, l = 0 == this.moveDir.x ? this.node.y : this.node.x, h = this.mainGame.player, d = n.tileX == h.tileX && n.tileY == h.tileY;
                    0 == Math.abs(r - l) && Math.abs(c - l) <= this.mainGame.tileSize.width && (n.enteringTile = this), 
                    this.node.x += this.moveDir.x * e * this.moveSpeed, this.node.y -= this.moveDir.y * e * this.moveSpeed;
                    var u = c - (l = 0 == this.moveDir.x ? this.node.y : this.node.x);
                    n.isCloud && n.isInMoveState || n.isWalkable || d && h.standOnTile == this && (s.isWalkable || s.isCloud) ? (Math.abs(u) <= e * this.moveSpeed / 2 && this.tileX == i.tileX && this.tileY == i.tileY && (this.tileX = n.tileX, 
                    this.tileY = n.tileY, this.node.x = o.x, this.node.y = o.y, n.enteringTile = null, 
                    this.checkHitPlayerAndFire(n)), d && h.standOnTile && !h.standOnTile.isCloud && this.stopMove()) : this.stopMove();
                } else {
                    if (this.curTime += e, this.curTime >= this.idleTime) this.getNextTile({
                        x: -this.moveDir.x,
                        y: -this.moveDir.y
                    }).isCloud || this.startMove();
                }
            },
            checkHitPlayerAndFire: function(e) {
                var t = this.mainGame.player;
                t && t.standOnTile && t.standOnTile.isCloud || t.tileX == this.tileX + this.moveDir.x && t.tileY == this.tileY + this.moveDir.y && (e.isCloud || this.stopMove());
            },
            startMove: function(e) {
                if (!this.isInMoveState) {
                    e = e || this, this.isInMoveState = !0, this.moveDir.x = -this.moveDir.x, this.moveDir.y = -this.moveDir.y, 
                    this.curTime = 0;
                    var t = this.player;
                    if (t && t.standOnTile == this) {
                        var i = this.mainGame.getTileAt(t.tileX + this.moveDir.x, t.tileY + this.moveDir.y);
                        t.onBeforeEnter(i);
                    } else {
                        var n = this.getNextTile(this.moveDir);
                        this.checkHitPlayerAndFire(n);
                    }
                    this.isCloudGroup && this.startGroupMove(e);
                }
            },
            startGroupMove: function(e) {
                this.upCloud && (this.upCloud.tileX = this.tileX, this.upCloud.tileY = this.tileY - 1, 
                this.upCloud.startByOtherCloud(e)), this.leftCloud && (this.leftCloud.tileX = this.tileX - 1, 
                this.leftCloud.tileY = this.tileY, this.leftCloud.startByOtherCloud(e)), this.rightCloud && (this.rightCloud.tileX = this.tileX + 1, 
                this.rightCloud.tileY = this.tileY, this.rightCloud.startByOtherCloud(e)), this.downCloud && (this.downCloud.tileX = this.tileX, 
                this.downCloud.tileY = this.tileY + 1, this.downCloud.startByOtherCloud(e));
            },
            startByOtherCloud: function(e) {
                this.isInMoveState || this.isGoingToMove || ((this.tileY > e.tileY || this.tileY == e.tileY && this.tileX > e.tileX) && (this.isGoingToMove = !0), 
                this.startMove(e));
            },
            stopMove: function(e) {
                if (this.isInMoveState) {
                    this.isInMoveState = !1, this.isGoingToMove = !1, this.enteringTile = null;
                    var t = this.getTilePosition();
                    this.node.x = t.x, this.node.y = t.y, this.getNextTile(this.moveDir).enteringTile = null, 
                    this.isCloudGroup && this.stopGroupMove(e);
                }
            },
            stopByOtherCloud: function(e) {
                this.moveDir.x = e.moveDir.x, this.moveDir.y = e.moveDir.y, this.isInMoveState && this.stopMove(e);
            },
            stopGroupMove: function(e) {
                e = e || this, this.upCloud && (this.upCloud.tileX = this.tileX, this.upCloud.tileY = this.tileY - 1, 
                this.upCloud.stopByOtherCloud(e)), this.leftCloud && (this.leftCloud.tileX = this.tileX - 1, 
                this.leftCloud.tileY = this.tileY, this.leftCloud.stopByOtherCloud(e)), this.rightCloud && (this.rightCloud.tileX = this.tileX + 1, 
                this.rightCloud.tileY = this.tileY, this.rightCloud.stopByOtherCloud(e)), this.downCloud && (this.downCloud.tileX = this.tileX, 
                this.downCloud.tileY = this.tileY + 1, this.downCloud.stopByOtherCloud(e));
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    CoinMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "6a9d1Vs4bBKLqKmMY/gpXCO", "CoinMgr");
        var n = {}, s = new cc.NodePool();
        n.initGame = function(e, t, i) {
            this.layerNode = e, this.prefab = t, this.mainGame = i, this.tileList = [], this.inited = !0;
        }, n.addTile = function(e, t) {
            var i = s.get() || cc.instantiate(this.prefab);
            i.position = this.mainGame.getTilePosition(e, t), this.layerNode.addChild(i);
            var n = i.getComponent("CoinTile");
            return n.tileX = e, n.tileY = t, n.mainGame = this.mainGame, this.tileList.push(n), 
            n;
        }, n.removeTile = function(e) {
            if (this.inited) for (var t = this.tileList.length - 1; 0 <= t; t--) if (this.tileList[t] == e) {
                this.tileList.splice(t, 1), s.put(e.node);
                break;
            }
        }, n.removeAll = function(e, t) {
            if (this.inited) {
                for (var i = this.tileList.length - 1; 0 <= i; i--) s.put(this.tileList[i].node);
                this.tileList = [];
            }
        }, n.resetAll = function(e, t) {
            if (this.inited) for (var i = this.tileList.length - 1; 0 <= i; i--) this.tileList[i].reset();
        }, n.step = function(e, t) {
            this.inited;
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    CoinTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7ed6605tJRBxreP+5q4gIae", "CoinTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {
                anim: cc.Animation
            },
            ctor: function() {
                this.isCoin = !0;
            },
            init: function() {
                this.anim.setCurrentTime(0), this.anim.sample();
            },
            onPlayerEnter: function(e) {
                this.mainGame.removeTileAt(this.tileX, this.tileY), this.mainGame.addCoin(), SoundMgr.play("getcoin");
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    ColorSprite: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "70238Ol7w5C7p0HERJythNr", "ColorSprite");
        var n = "\n#ifdef GL_ES  \nprecision mediump float;  \n#endif \nattribute vec4 a_position;\nattribute vec2 a_texCoord;\nattribute vec4 a_color;\nvarying vec4 v_fragmentColor; \nvarying vec2 v_texCoord; \nvoid main() \n{ \n    gl_Position = CC_PMatrix * a_position;\n    v_fragmentColor = a_color; \n    v_texCoord = a_texCoord; \n}\n", s = "\n#ifdef GL_ES  \nprecision mediump float;  \n#endif  \nvarying vec4 v_fragmentColor;\nvarying vec2 v_texCoord;\n\nuniform float u_dH;\nvec3 hueShift( vec3 color, float hueAdjust ){\n    const vec3  kRGBToYPrime = vec3 (0.299, 0.587, 0.114);\n    const vec3  kRGBToI      = vec3 (0.596, -0.275, -0.321);\n    const vec3  kRGBToQ      = vec3 (0.212, -0.523, 0.311);\n\n    const vec3  kYIQToR     = vec3 (1.0, 0.956, 0.621);\n    const vec3  kYIQToG     = vec3 (1.0, -0.272, -0.647);\n    const vec3  kYIQToB     = vec3 (1.0, -1.107, 1.704);\n\n    float   YPrime  = dot (color, kRGBToYPrime);\n    float   I       = dot (color, kRGBToI);\n    float   Q       = dot (color, kRGBToQ);\n    float   hue     = atan (Q, I);\n    float   chroma  = sqrt (I * I + Q * Q);\n\n    hue += hueAdjust;\n\n    Q = chroma * sin (hue);\n    I = chroma * cos (hue);\n\n    vec3    yIQ   = vec3 (YPrime, I, Q);\n\n    return vec3( dot (yIQ, kYIQToR), dot (yIQ, kYIQToG), dot (yIQ, kYIQToB) );\n\n}\n\nvoid main() {\n\n    vec4 texColor= texture2D(CC_Texture0, v_texCoord);\n    gl_FragColor = vec4(hueShift(vec3(texColor),u_dH),texColor.a);\n\n}\n";
        cc.Class({
            extends: cc.Sprite,
            properties: {
                hue: {
                    default: 0,
                    range: [ 0, 360 ],
                    slide: !0,
                    notify: function() {
                        this.glProgram && this.setHue(this.hue);
                    }
                }
            },
            onLoad: function() {
                if (0 != cc._renderType) {
                    var e = null;
                    e || (e = new cc.GLProgram(), cc.sys.isNative ? e.initWithString(n, s) : (e.initWithVertexShaderByteArray(n, s), 
                    e.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION), 
                    e.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR), e.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS)), 
                    e.link(), e.updateUniforms()), this.glProgram = e, this.mm_dHlocation = e.getUniformLocationForName("u_dH"), 
                    this._sgNode.setShaderProgram(e), this.setHue(this.hue);
                }
            },
            setHue: function(e) {
                0 != cc._renderType && (cc.sys.isNative ? this._sgNode.getGLProgramState().setUniformFloat("u_dH", 2 * Math.PI - e / 180 * Math.PI) : (this.glProgram.updateUniforms(), 
                this.mm_dHlocation = this.glProgram.getUniformLocationForName("u_dH"), this.glProgram.setUniformLocationWith1f(this.mm_dHlocation, 2 * Math.PI - e / 180 * Math.PI)));
            },
            start: function() {}
        }), cc._RF.pop();
    }, {} ],
    CommonUtils: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "1997doJWJVNZLenianCG2Jb", "CommonUtils");
        var n = e("PageMgr"), s = e("SoundMgr");
        cc.Class({
            extends: cc.Component,
            emitEvent: function(e, t) {
                this.node.emit(t);
            },
            openPage: function(e, t) {
                n.showPage(t);
            },
            closePage: function(e, t) {
                n.hidePage(t);
            },
            openDialog: function(e, t) {
                n.showDialog(t);
            },
            closeDialog: function(e, t) {
                n.hideDialog(t);
            },
            playClickSound: function() {
                s.playClick();
            },
            logEvent: function(e, t) {
            },
            showShare: function() {}
        }), cc._RF.pop();
    }, {
        PageMgr: "PageMgr",
        SoundMgr: "SoundMgr"
    } ],
    Constants: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f50eeJoyVVBi4D/M+4XC+9O", "Constants");
        var n = {
            DIR: {
                LEFT: {
                    x: -1,
                    y: 0
                },
                UP: {
                    x: 0,
                    y: -1
                },
                RIGHT: {
                    x: 1,
                    y: 0
                },
                DOWN: {
                    x: 0,
                    y: 1
                }
            },
            CONTROL_TYPE: {
                INPUT: 1,
                REPLAY: 2
            },
            GAME_STATE: {
                PREPARE: 1,
                READYTOPLAY: 2,
                PLAYING: 3,
                LEVELPASS: 4,
                PLAYERDIE: 5
            },
            SERVER_URL: "https:///",
            SERVER_URL_LOCAL: "https://localhost/",
            TILE_TYPE: {
                EMPTY: 0,
                WALL: 1,
                COIN: 2,
                STAR: 3,
                SPRING: 4,
                BIGFACE: 5,
                TRAP: 6,
                RUNMONSTER: 7,
                DIEWALL: 8,
                TURNWALL: 9,
                DOOR: 10,
                ARMMONSTER: 11,
                FOLLOWMONSTER: 12,
                ENTRYPOINT: 13,
                EXITPOINT: 14,
                FLYMONSTER: 15,
                SNAKE: 16,
                CLOUD: 17,
                XP: 18,
                GLASSWALL: 19,
                WHEEL: 20,
                HUB: 21,
                MAGICDOOR: 22,
                BOX: 23,
                SLOT: 24,
                SECRET: 25
            },
            PARAM: {
                EneryIncressMax: 10,
                EneryIncressTm: 180,
                MapStageMax: 131,
                ChallengeContinueCnt: 2,
                VideoVersion: 3
            },
            FREE_LOTTERY_TM: [ 1, 10, 30, 60, 120, 240, 480 ],
            ITEMTYPE: {
                COIN: 1,
                PROTECT: 2,
                LOTTERY: 3,
                SECRET: 100
            },
            SOUND_WRAP: {
                NormalClick: "open",
                HomePagePlay: "open",
                HomePageChallenge: "open",
                HomePageMenu: "open",
                TaskPageGetReward: "open",
                BackHome: "open",
                ShopItemChoose: "open",
                ShopTipsClick: "open",
                MapItemsChoose: "open",
                NormalCloseClick: "open",
                VideoWatch: "open",
                YuFuGet: "chi_yu",
                MubeiGet: "chi_yu",
                PassStage: "XXX",
                CiWeiDie: "",
                DialogShow: "open",
                ContinueTick: "004",
                PlayerDie: "fenshen3",
                RewardShow: "reward_show"
            },
            PROTECT_TIME: 18e3,
            FREEZE_TIME: 3e3,
            FREEZE_RATE: .2,
            DOUBLE_SCORE_TIME: 3e3,
            DOUBLE_SCORE_RATE: .1,
            TURN_SCORE_RATE: 1 / 150,
            EFFECT_TYPE: {
                FREEZE: 1,
                TURNCOIN: 2,
                PROTECT: 3,
                DOUBLESCORE: 4
            }
        };
        t.exports = n, cc._RF.pop();
    }, {} ],
    DataMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f47616V4WhIDpb4Os+H6lSF", "DataMgr");
        var a = {}, n = {};
        a.register = function(e, t) {
            n[e] = t;
        }, a.getLotteryCfg = function() {
            return n.LotteryItemCfg;
        }, a.getTaskCfg = function() {
            return n.TaskCfg;
        }, a.getPriortyTaskCfg = function() {
            if (null == n.PriortyTaskCfg) {
                for (var e in n.PriortyTaskCfg = [], n.TaskCfg) n.PriortyTaskCfg.push(n.TaskCfg[e]);
                n.PriortyTaskCfg.sort(function(e, t) {
                    return e.priority - t.priority;
                });
            }
            return n.PriortyTaskCfg;
        }, a.getLevelCfg = function() {
            return n.LvlCfg;
        }, a.getLevelCfgById = function(e) {
            return n.LvlCfg[e - 1];
        };
        var o = null;
        a.getUnLockInfo = function(e) {
            if (!o) {
                o = {};
                for (var t = a.getSkinCfgArr(), i = 0; i < t.length; i++) 0 == t[i].collectType && (o[t[i].unlockLevel] = {
                    type: "skin",
                    id: t[i].id
                });
                for (var n = a.getWeaponCfgArr(), s = 0; s < n.length; s++) o[n[s].unlockLevel] = {
                    type: "weapon",
                    id: n[s].id
                };
                console.log("level_unlockInfo", o);
            }
            return o[e];
        }, a.getSkinRes = function(e) {
            return "spines/" + n.SkinCfg[e].resUrl;
        }, a.getSkinName = function(e) {
            return n.SkinCfg[e].skinName;
        }, a.getSkinCfgById = function(e) {
            return n.SkinCfg[e];
        }, a.getWeaponCfgById = function(e) {
            return n.WeaponCfg[e];
        }, a.getSkinCfgArr = function() {
            if (null == n.SkinCfgArr) {
                for (var e in n.SkinCfgArr = [], n.SkinCfg) n.SkinCfgArr.push(n.SkinCfg[e]);
                n.SkinCfgArr.sort(function(e, t) {
                    return e.id - t.id;
                });
            }
            return n.SkinCfgArr;
        }, a.getWeaponCfgArr = function() {
            if (null == n.WeaponCfgArr) {
                for (var e in n.WeaponCfgArr = [], n.WeaponCfg) n.WeaponCfgArr.push(n.WeaponCfg[e]);
                n.WeaponCfgArr.sort(function(e, t) {
                    return e.id - t.id;
                });
            }
            return n.WeaponCfgArr;
        }, a.getAchievementById = function(e) {
            return n.AchievementCfg[e];
        }, a.getAchievementCfg = function() {
            return n.AchievementCfg;
        }, t.exports = a, cc._RF.pop();
    }, {} ],
    DieWallMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "bb50ceylLxBYrAtyas+lLw1", "DieWallMgr");
        var n = {}, s = new cc.NodePool();
        n.initGame = function(e, t, i) {
            this.layerNode = e, this.prefab = t, this.mainGame = i, this.tileList = [], this.inited = !0;
        }, n.addTile = function(e, t) {
            var i = s.get() || cc.instantiate(this.prefab);
            i.position = this.mainGame.getTilePosition(e, t), this.layerNode.addChild(i);
            var n = i.getComponent("DieWallTile");
            return this.tileList.push(n), n;
        }, n.removeAll = function(e, t) {
            if (this.inited) {
                for (var i = this.tileList.length - 1; 0 <= i; i--) s.put(this.tileList[i].node);
                this.tileList = [];
            }
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    DieWallTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "dde6fBTIuVD74Al7BB1Fvk9", "DieWallTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {
                leftNode: cc.Node,
                rightNode: cc.Node,
                upNode: cc.Node,
                downNode: cc.Node
            },
            ctor: function() {
                this.isWalkable = !1, this.isDieWall = !0;
            },
            init: function() {
                if (0 != this.tileX) if (this.tileX != this.mainGame.mapSize.width - 1) {
                    var e = !1;
                    this.getUpTile().isWalkable && this.getDownTile().isWall ? (this.mainGame.tileLayer.setTileGID(32, this.tileX, this.tileY), 
                    e = !0) : this.getLeftTile().isWalkable && this.getRightTile().isWall ? (this.mainGame.tileLayer.setTileGID(61, this.tileX, this.tileY), 
                    e = !0) : this.getRightTile().isWalkable && this.getLeftTile().isWall ? (this.mainGame.tileLayer.setTileGID(63, this.tileX, this.tileY), 
                    e = !0) : this.getDownTile().isWalkable && this.getUpTile().isWall && (this.mainGame.tileLayer.setTileGID(92, this.tileX, this.tileY), 
                    e = !0), e || (this.getUpTile().isDieWall && this.getDownTile().isWall ? this.mainGame.tileLayer.setTileGID(32, this.tileX, this.tileY) : this.getLeftTile().isDieWall && this.getRightTile().isWall ? this.mainGame.tileLayer.setTileGID(61, this.tileX, this.tileY) : this.getRightTile().isDieWall && this.getLeftTile().isWall ? this.mainGame.tileLayer.setTileGID(63, this.tileX, this.tileY) : this.getDownTile().isDieWall && this.getUpTile().isWall && this.mainGame.tileLayer.setTileGID(92, this.tileX, this.tileY));
                } else this.mainGame.tileLayer.setTileGID(61, this.tileX, this.tileY); else this.mainGame.tileLayer.setTileGID(63, this.tileX, this.tileY);
            },
            onBeforeEnter: function(e) {
                e.setPlayerDeath(this, "DieWall");
            },
            onPlayerEnter: function(e) {}
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    DoorMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "a3150BHANpO14br1yyiJKCf", "DoorMgr");
        var n = {}, a = new cc.NodePool();
        n.initGame = function(e, t, i) {
            this.doorLayer = e, this.doorPrefab = t, this.mainGame = i, this.doorTypesMap = {}, 
            this.inited = !0;
        }, n.addTile = function(e, t, i) {
            var n = a.get() || cc.instantiate(this.doorPrefab);
            n.position = this.mainGame.getTilePosition(e, t), this.doorLayer.addChild(n);
            var s = n.getComponent("DoorTile");
            return this.doorTypesMap[i] = this.doorTypesMap[i] || [], s.doorIndex = i, this.doorTypesMap[i].push(s), 
            s;
        }, n.getOpponentDoor = function(e) {
            var t = this.doorTypesMap[e.doorIndex];
            return t && 2 == t.length ? t[0] == e ? t[1] : t[0] : (cc.warn("Door error ", e.tileX, e.tileY), 
            null);
        }, n.removeAll = function() {
            if (this.inited) {
                for (var e = Object.keys(this.doorTypesMap), t = e.length - 1; 0 <= t; t--) a.put(this.doorTypesMap[e[t]][0].node), 
                a.put(this.doorTypesMap[e[t]][1].node);
                this.doorTypesMap = {};
            }
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    DoorTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "e90f1GURMBIn5wa/5vdtAnh", "DoorTile");
        var n = e("DoorMgr"), s = e("BaseTile");
        cc.Class({
            extends: s,
            properties: {
                anim: cc.Animation
            },
            ctor: function() {
                this.isDoor = !0, this.doorIndex = 0;
            },
            playDoorOpen: function() {
                this.anim.play();
            },
            onPlayerEnter: function(e) {
                this.playDoorOpen();
                var t = n.getOpponentDoor(this);
                t && (e.setPlayerTileCoord(t.tileX, t.tileY), this.mainGame.getTileAt(t.tileX, t.tileY).playDoorOpen());
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile",
        DoorMgr: "DoorMgr"
    } ],
    EntryTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "763baQ++jdKfq8wx3QDCKq+", "EntryTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {},
            ctor: function() {
                this.isEntry = !0;
            },
            onPlayerEnter: function(e) {}
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    EventLoger: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "9ca6eZe2ZtGcrqo1hM+opVc", "EventLoger"), cc.Class({
            extends: cc.Component,
            properties: {
                eventName: "",
                type: "",
                clickSound: "",
                isEnableLog: !0
            },
            start: function() {
                var e = this;
                (this.node.getComponent(cc.Button) || this.node.getComponent(cc.Toggle)) && this.node.on("click", function() {
                    e.isEnableLog && ("" != e.type ? AdHelper.logEvent("btn_" + e.eventName, {
                        type: e.type
                    }) : AdHelper.logEvent("btn_" + e.eventName)), "" != e.clickSound && SoundMgr.playByKey(e.clickSound);
                });
            }
        }), cc._RF.pop();
    }, {} ],
    ExitTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "5134bI/ZzJOPJ1rABbaUU95", "ExitTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {},
            ctor: function() {
                this.isExit = !0;
            },
            init: function() {},
            onPlayerEnter: function(e) {
                e.stopRun(), e.playOut(), this.mainGame.onGameStagePass();
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    FillEnergyDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "9e9beK03KhED6dTDlGAqJt1", "FillEnergyDialog"), cc.Class({
            extends: cc.Component,
            properties: {
                nextLabel: cc.Label,
                refillAdBtn: cc.Button
            },
            start: function() {
                this.node.scale = cc.winSize.width / 750;
            },
            onEnable: function() {
                this.lastCheckTm = 0, AdHelper.logEvent("buy_energy_show", {
                    type: "coin",
                    isVideoOK: AdHelper.isVideoLoad() ? "YES" : "NO"
                }), this.refillAdBtn.interactable = AdHelper.isVideoLoad();
            },
            onAdClick: function() {
                var e = this;
                AdHelper.logEvent("buy_energy_click", {
                    button: "ad"
                }), AdHelper.showVideoAd("addEnergy", function() {
                    User.addEnergy(1), e.closePage();
                });
            },
            closePage: function() {
                PageMgr.hideDialog("FillEnergyDialog");
            },
            onClose: function() {
                AdHelper.logEvent("buy_energy_click", {
                    button: "close"
                }), this.closePage();
            },
            onRefillClick: function() {
                User.refillEnergy() ? (AdHelper.logEvent("buy_energy_click", {
                    button: "refill"
                }), this.closePage()) : (AdHelper.logEvent("buy_energy_click", {
                    button: "refill_no_money"
                }), PageMgr.showTips("Not enough coin!!!"));
            },
            update: function(e) {
                if (this.lastCheckTm -= e, this.lastCheckTm <= 0) {
                    this.lastCheckTm = .5;
                    var t = User.syncEnergyInfo();
                    this.nextLabel.string = 0 < t ? "NEXT IN:" + Utils.formatTime(Math.floor(t)) : "NEXT IN:00M00S";
                }
            }
        }), cc._RF.pop();
    }, {} ],
    FlyMonsterTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7b29847pXdPOrDm7yrFAuJM", "FlyMonsterTile");
        var n = e("BaseTile"), o = 0, r = 2, c = 3, l = 4;
        cc.Class({
            extends: n,
            properties: {},
            ctor: function() {
                this.status = o, this.moveSpeed = 1, this.rockSpeed = 1, this.moveDir = null, this.isFreezon = !1;
            },
            setProp: function(e) {
                this._super(e);
            },
            setMonster: function(e, t, i) {
                return this.monkeyPrefab = t, this.rockFrame = i, this.monsterMgr = e, !0;
            },
            isHit: function() {
                if (this.status != c) return !1;
                for (var e = this.mainGame.player, t = 0; t < this.activeNodeArr.length; t++) {
                    var i = this.activeNodeArr[t], n = this.mainGame.getTileCoord(i.rockNode.x, i.rockNode.y);
                    if (e.tileX == n.tileX && e.tileY == n.tileY) {
                        this.isFreezon || e.setPlayerDeath(n, "FlyMonster"), this.status = l;
                        for (var s = 0; s < this.activeNodeArr.length; s++) {
                            var a = this.activeNodeArr[s];
                            a.activeNode.removeFromParent(), a.rockNode.removeFromParent();
                        }
                        return !0;
                    }
                }
            },
            removeAll: function() {
                if (this.activeNodeArr && this.status != l) for (var e = 0; e < this.activeNodeArr.length; e++) {
                    var t = this.activeNodeArr[e];
                    t.activeNode.removeFromParent(), t.rockNode && t.rockNode.removeFromParent();
                }
            },
            onPlayerEnter: function(e) {
                var n = this;
                if (this.status == o && !this.isFreezon) {
                    this.status = r, this.activeNodeArr = [];
                    for (var t = this.getProp("num") || 1, s = this.getTilePosition(), i = function(e) {
                        var t = cc.instantiate(n.monkeyPrefab), i = {};
                        i.activeNode = t, i.spAimation = t.getComponent(sp.Skeleton), i.yOffset = t.y, i.activeNode.x = s.x + t.x + 204 * (e - 1), 
                        i.activeNode.y = s.y + t.y + 340, i.activeTileX = n.tileX, i.activeTileY = n.tileY, 
                        i.spAimation.setAnimation(0, "animation", !1), i.spAimation.setEventListener(function(e, t) {
                            "shoot" == t.data.name && (n.rockMoveY = 0, n.status = c, i.rockNode = new cc.Node(), 
                            i.rockNode.x = i.activeNode.x, i.rockNode.y = i.activeNode.y - 34, i.rockNode.scale = i.activeNode.scale, 
                            i.rockNode.addComponent(cc.Sprite).spriteFrame = n.rockFrame, n.monsterMgr.monsterLayer.addChild(i.rockNode), 
                            i.rockNode.runAction(cc.repeatForever(cc.rotateBy(.5, 360))), i.delayTm = 30);
                        }), i.activeNode.active = !0, n.monsterMgr.monsterLayer.addChild(i.activeNode), 
                        n.activeNodeArr.push(i);
                    }, a = 0; a < t; a++) i(a);
                }
            },
            step: function(e) {
                if (this.status == c) {
                    if (this.isFreezon) return;
                    this.rockMoveY += e * this.rockSpeed;
                    for (var t = 0; t < this.activeNodeArr.length; t++) {
                        this.activeNodeArr[t].rockNode.y -= e * this.rockSpeed;
                    }
                    if (1e3 < this.rockMoveY) {
                        this.status = l;
                        for (var i = 0; i < this.activeNodeArr.length; i++) {
                            var n = this.activeNodeArr[i];
                            n.activeNode.removeFromParent(), n.rockNode.removeFromParent();
                        }
                    }
                }
            },
            onFreeze: function() {
                if (this.isFreezon = !0, this.status == c) {
                    this.status = l;
                    for (var e = 0; e < this.activeNodeArr.length; e++) {
                        var t = this.activeNodeArr[e];
                        t.activeNode.removeFromParent(), t.rockNode.removeFromParent();
                    }
                }
            },
            onUnFreeze: function() {
                this.isFreezon = !1;
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    FollowMonsterTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f3f9fXVW15LOIpQ63/LF+kZ", "FollowMonsterTile");
        var n = e("BaseTile"), r = Constants.TILE_TYPE, a = 0, c = 2, l = 3;
        cc.Class({
            extends: n,
            properties: {},
            ctor: function() {
                this.status = a, this.runDirList = [], this.moveSpeed = 1.3, this.moveDir = null, 
                this.isFreezon = !1;
            },
            setProp: function(e) {
                this._super(e);
            },
            removeAll: function() {
                var e = this;
                if (this.activeNode) if (this.animation) if (this.isFreezon) {
                    this.activeNode.getComponent(cc.Sprite).spriteFrame = null;
                    var t = this.activeNode.getChildByName("bingkai").getComponent(cc.Animation);
                    t.off("finished"), t.play("icebreak"), t.on("finished", function() {
                        e.activeNode.removeFromParent();
                    });
                } else this.animation.off("finished"), this.animation.play("lightdie"), this.animation.on("finished", function() {
                    e.activeNode.removeFromParent();
                }); else this.activeNode.removeFromParent();
            },
            setActiveSpriteFrame: function() {
                var e = this.activeNode.getComponent(cc.Sprite);
                0 < Math.abs(this.moveDir.x) ? (e.spriteFrame = this.leftSprite, 0 < this.moveDir.x ? (this.activeNode.scaleX = -Math.abs(this.activeNode.scaleX), 
                this.activeNodeOffsetX = -10) : (this.activeNode.scaleX = Math.abs(this.activeNode.scaleX), 
                this.activeNodeOffsetX = 64), this.activeNode.scaleY = Math.abs(this.activeNode.scaleY), 
                this.activeNodeOffsetY = -34) : (e.spriteFrame = this.uponSprite, 0 < this.moveDir.y ? (this.activeNode.scaleY = -Math.abs(this.activeNode.scaleY), 
                this.activeNodeOffsetY = 10) : (this.activeNode.scaleY = Math.abs(this.activeNode.scaleY), 
                this.activeNodeOffsetY = -64), this.activeNode.scaleX = Math.abs(this.activeNode.scaleX), 
                this.activeNodeOffsetX = 34);
            },
            init: function() {
                var s = this;
                if (this._super(), null == this.getProp("begin")) return !1;
                2 <= this.mainGame.versionCode && (this.moveSpeed = 1);
                var e = cc.instantiate(this.prefab), t = this.getTilePosition();
                return this.activeNode = e, this.animation = e.getComponent(cc.Animation), this.animation.stop(), 
                this.activeNodeOffsetX = this.activeNode.x, this.activeNodeOffsetY = this.activeNode.y, 
                this.activeNode.x = t.x + this.activeNodeOffsetX, this.activeNode.y = t.y + this.activeNodeOffsetY, 
                this.activeTileX = this.tileX, this.activeTileY = this.tileY, this.monsterMgr.monsterLayer.addChild(this.activeNode), 
                this.mainGame.monsterLayer.off("follow_monster_active_" + this.getProp("begin")), 
                this.mainGame.monsterLayer.on("follow_monster_active_" + this.getProp("begin"), function(e) {
                    if (s.status == a && e.detail.id && e.detail.id == s.getProp("begin")) {
                        var t = e.detail.pos, i = t.x > s.tileX ? 1 : t.x < s.tileX ? -1 : 0, n = t.y > s.tileY ? 1 : t.y < s.tileY ? -1 : 0;
                        s.moveDir = {
                            x: i,
                            y: n
                        }, s.runDirList.push(e.detail.beforeDir), s.status = c, s.startTm = 200, s.animation.play(), 
                        s.isFreezon && s.animation.pause(), s.endPos = t;
                    }
                }), this.monsterMgr.addFollowTile(this), !0;
            },
            onPlayerChangeDir: function(e) {
                this.status == c && this.runDirList.push(e);
            },
            setMonster: function(e, t) {
                return this.monsterMgr = e, this.prefab = t, !0;
            },
            isHit: function() {
                if (!this.activeNode) return !1;
                var e = this.mainGame.player;
                return e.tileX == this.activeTileX && e.tileY == this.activeTileY ? (this.isFreezon || e.setPlayerDeath(this, "FollowMonster"), 
                this.status = l, this.monsterMgr.removeMonster(this), !0) : void 0;
            },
            onPlayerEnter: function(e) {
                this.getProp("end") && this.mainGame.monsterLayer.emit("follow_monster_active_" + this.getProp("end"), {
                    id: this.getProp("end"),
                    pos: {
                        x: this.tileX,
                        y: this.tileY
                    },
                    beforeDir: e.moveDir
                });
            },
            step: function(e) {
                if (this.status == c && !(null == this.moveDir && this.runDirList.length <= 0 || this.isFreezon)) if (0 < this.startTm) this.startTm -= e; else if (null == this.moveDir && (this.moveDir = this.runDirList.shift()), 
                this.moveDir && (0 != this.moveDir.x || 0 != this.moveDir.y)) {
                    var t = this.mainGame.getTileAt(this.activeTileX, this.activeTileY), i = this.mainGame.getTileAt(this.activeTileX + this.moveDir.x, this.activeTileY + this.moveDir.y), n = t.getTilePosition(), s = i.getTilePosition(), a = 0 == this.moveDir.x ? s.y + this.activeNodeOffsetY : s.x + this.activeNodeOffsetX;
                    this.activeNode.x += this.moveDir.x * e * this.moveSpeed, this.activeNode.y -= this.moveDir.y * e * this.moveSpeed;
                    var o = a - (0 == this.moveDir.x ? this.activeNode.y : this.activeNode.x);
                    i.isWalkable ? Math.abs(o) <= e * this.moveSpeed / 2 && (this.activeTileX = i.tileX, 
                    this.activeTileY = i.tileY, this.activeNode.x = s.x + this.activeNodeOffsetX, this.activeNode.y = s.y + this.activeNodeOffsetY, 
                    this.endPos && this.endPos.x == i.tileX && this.endPos.y == i.tileY && (this.endPos = null, 
                    this.moveDir = this.runDirList.shift(), this.activeNode.x = s.x + this.activeNodeOffsetX, 
                    this.activeNode.y = s.y + this.activeNodeOffsetY)) : i.getType() == r.TURNWALL ? (this.status = l, 
                    SoundMgr.playByKey("CiWeiDie"), this.monsterMgr.removeMonster(this)) : (this.moveDir = this.runDirList.shift(), 
                    this.activeNode.x = n.x + this.activeNodeOffsetX, this.activeNode.y = n.y + this.activeNodeOffsetY, 
                    this.endPos = null);
                }
            },
            onFreeze: function() {
                this.isFreezon = !0, this.activeNode && (this.activeNode.getChildByName("bingkai").active = !0, 
                this.status == c && this.animation.pause());
            },
            onUnFreeze: function() {
                this.isFreezon = !1, this.activeNode && (this.activeNode.getChildByName("bingkai").active = !1, 
                this.status == c && this.animation.resume());
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    FreezeMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "19f41utbz9KsatR8DzfmnP0", "FreezeMgr");
        var n = {}, s = new cc.NodePool(), a = Constants.FREEZE_TIME, o = Constants.EFFECT_TYPE;
        n.initGame = function(e, t, i) {
            this.layerNode = e, this.prefab = t, this.mainGame = i, this.tileList = [], this.inited || (this.inited = !0, 
            this.FREEZE_TIME = a, this.leftTime = 0);
        }, n.resetAll = function(e, t) {
            this.inited && (this.leftTime = 0);
        }, n.addTile = function(e, t) {
            var i = s.get() || cc.instantiate(this.prefab);
            i.position = this.mainGame.getTilePosition(e, t), i.x += this.mainGame.tileSize.width / 2, 
            i.y -= this.mainGame.tileSize.height / 2, this.layerNode.addChild(i);
            var n = i.getComponent("FreezeTile");
            return n.tileX = e, n.tileY = t, this.tileList.push(n), n;
        }, n.removeTile = function(e) {
            if (this.inited) for (var t = this.tileList.length - 1; 0 <= t; t--) if (this.tileList[t] == e) {
                s.put(e.node);
                break;
            }
        }, n.removeAll = function(e, t) {
            if (this.inited) {
                for (var i = this.tileList.length - 1; 0 <= i; i--) s.put(this.tileList[i].node);
                this.tileList = [];
            }
        }, n.freeze = function() {
            this.leftTime = this.FREEZE_TIME;
            var e = this.mainGame.player;
            e.weaponEffectType == o.FREEZE && (this.leftTime += e.weaponEffectCount), this.mainGame.freeze();
        }, n.isFreeze = function() {
            return 0 < this.leftTime;
        }, n.getFreezePercent = function() {
            return this.leftTime / this.FREEZE_TIME;
        }, n.unFreeze = function() {
            this.mainGame.unFreeze();
        }, n.step = function(e, t) {
            this.inited && (this.leftTime <= 0 || (this.leftTime -= e, this.leftTime <= 0 && (this.leftTime = 0, 
            n.unFreeze())));
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    FreezeTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "273c0V9CwlN3psJGRdY1hup", "FreezeTile");
        var n = e("FreezeMgr"), s = e("BaseTile");
        cc.Class({
            extends: s,
            properties: {},
            ctor: function() {
                this.isFreeze = !0;
            },
            onPlayerEnter: function(e) {
                this.mainGame.removeTileAt(this.tileX, this.tileY), n.freeze(), SoundMgr.play("bingdong");
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile",
        FreezeMgr: "FreezeMgr"
    } ],
    GameBackground: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "bc278weR15KxLKIH3ynqc21", "GameBackground"), cc.Class({
            extends: cc.Component,
            properties: {
                cloudFrames: [ cc.SpriteFrame ],
                camara: cc.Node,
                cloudLayer: cc.Node,
                backLayer: cc.Node
            },
            onLoad: function() {
                this.cloudPool = new cc.NodePool(), this.yunList = [];
                for (var e = 1; e <= 5; e++) this.yunList.push(this.cloudLayer.getChildByName("yunbg_" + e)), 
                this.yunList[e - 1].x = (2 * Math.random() - 1) * cc.winSize.width * .5;
                this.moveRatial = .1;
            },
            init: function() {
                this.cloudLayer.getChildByName("yun_did").opacity = 255;
            },
            getCloud: function() {
                var e = this.cloudPool.get();
                return e || (e = new cc.Node()).addComponent(cc.Sprite), e.getComponent(cc.Sprite).spriteFrame = Utils.randomSelectOne(this.cloudFrames), 
                e;
            },
            putCloud: function(e) {
                this.cloudPool.put(e);
            },
            stepCloud: function(e, t, i) {
                if (i = i || 0, this.cloudLayer.y = -(this.camara.position.y - i) * this.moveRatial, 
                e < 0 || e > cc.winSize.width) if (this.cloudLayer.x = -this.camara.position.x * this.moveRatial, 
                e < 0) {
                    for (var n = 0, s = this.yunList.length - 1; 0 <= s; s--) {
                        var a = this.yunList[s].x + this.cloudLayer.x;
                        a > 1.5 * cc.winSize.width ? this.putCloud(this.yunList.splice(s, 1)[0]) : a < n && (n = a);
                    }
                    if (n > .5 * -cc.winSize.width) {
                        var o = this.getCloud();
                        this.cloudLayer.addChild(o), this.yunList.push(o), o.y = (2 * Math.random() - 1) * cc.winSize.height * .4 - this.cloudLayer.y, 
                        o.x = n - this.cloudLayer.x - 400 - Utils.randomInt(100);
                    }
                } else {
                    for (var r = 0, c = this.yunList.length - 1; 0 <= c; c--) {
                        var l = this.yunList[c].x + this.cloudLayer.x;
                        l < -cc.winSize.width ? this.putCloud(this.yunList.splice(c, 1)[0]) : r < l && (r = l);
                    }
                    if (r < 2 * cc.winSize.width) {
                        var h = this.getCloud();
                        this.cloudLayer.addChild(h), this.yunList.push(h), h.y = (2 * Math.random() - 1) * cc.winSize.height * .4 - this.cloudLayer.y, 
                        h.x = r - this.cloudLayer.x + 400 + Utils.randomInt(100);
                    }
                } else {
                    for (var d = this.cloudLayer.x = 0, u = this.yunList.length - 1; 0 <= u; u--) {
                        var g = this.yunList[u].y + this.cloudLayer.y;
                        g < -cc.winSize.height || this.yunList[u].x < -cc.winSize.width || this.yunList[u].x > cc.winSize.width ? this.putCloud(this.yunList.splice(u, 1)[0]) : d < g && (d = g);
                    }
                    if (d < cc.winSize.height) {
                        var p = this.getCloud();
                        this.cloudLayer.addChild(p), this.yunList.push(p), p.x = (2 * Math.random() - 1) * cc.winSize.width * .5, 
                        p.y = d - this.cloudLayer.y + 400 + Utils.randomInt(100);
                    }
                }
            },
            jumpCloud: function(e) {
                var t = this.cloudLayer.y;
                this.cloudLayer.y = -(this.camara.position.y - e) * this.moveRatial;
                var i = t - this.cloudLayer.y;
                this.cloudLayer.getChildByName("yun_did").opacity = 0;
                for (var n = this.yunList.length - 1; 0 <= n; n--) this.yunList[n].y += i;
            },
            jump: function(e) {
                this.jumpBackLayer(e);
            },
            step: function(e, t, i) {
                this.stepBackLayer(e, t, i);
            },
            stepBackLayer: function(e, t, i) {
                i = i || 0, this.backLayer.y = -(this.camara.position.y - i) * this.moveRatial % 2048, 
                this.backLayer.x = -this.camara.position.x * this.moveRatial % 1024;
            },
            jumpBackLayer: function(e) {
                var t = this.backLayer.y;
                this.backLayer.y = -(this.camara.position.y - e) * this.moveRatial % 2048;
                var i = t - this.backLayer.y, n = this.backLayer.getChildByName("infinite");
                n.y += i, n.y = n.y % 2048, -800 < n.y + this.backLayer.y && (n.y -= 2048);
            }
        }), cc._RF.pop();
    }, {} ],
    GameChallenge: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "9865eSmsHdLWqaWMCVIPQx5", "GameChallenge");
        var n = Constants.CONTROL_TYPE, l = Constants.TILE_TYPE, c = Constants.GAME_STATE, s = Constants.PARAM.ChallengeContinueCnt, a = Constants.DOUBLE_SCORE_RATE, o = Constants.FREEZE_RATE, r = e("GameBackground"), h = e("PlayerControler"), d = e("PlayerTile"), u = e("BaseTile"), g = e("WallTile"), p = e("XPTile"), m = e("StarTile"), f = e("ExitTile"), y = e("EntryTile"), v = e("DieWallTile"), T = e("SpringTile"), P = e("FreezeMgr"), S = e("ScoreBuffMgr"), C = e("GlassWallMgr"), N = e("TrapMgr"), b = e("DoorMgr"), A = e("TurnDoorMgr"), L = e("DieWallMgr"), w = e("ArmMonsterMgr"), I = e("BigFaceMgr"), M = e("CloudMgr"), D = e("WheelMgr"), k = e("CoinMgr"), _ = e("HubMgr"), R = e("RunMonsterTile"), B = e("FollowMonsterTile"), E = e("FlyMonsterTile"), F = e("MonsterMgr"), x = e("SnakeMonsterTile");
        cc.Class({
            extends: cc.Component,
            properties: {
                gameLayer: cc.Node,
                mapUpLayer: cc.Node,
                mapDownLayer: cc.Node,
                background: r,
                connectV: cc.Node,
                connectH: cc.Node,
                waterLayer: cc.Node,
                player: d,
                camara: cc.Node,
                playerControler: h,
                map: cc.TiledMap,
                starLabel: cc.Label,
                coinLabal: cc.Label,
                scoreNum: cc.Label,
                scorex2: cc.Node,
                monsterLayer: cc.Node,
                batPrefab: cc.Prefab,
                trapPrefab: cc.Prefab,
                doorPrefab: cc.Prefab,
                turnDoorPrefab: cc.Prefab,
                dieWallPrefab: cc.Prefab,
                armMonsterPrefab: cc.Prefab,
                bigFacePrefab: cc.Prefab,
                wheelPrefab: cc.Prefab,
                cloudPrefab: cc.Prefab,
                glassWallPrefab: cc.Prefab,
                freezeTilePrefab: cc.Prefab,
                scoreBuffTilePrefab: cc.Prefab,
                coinTilePrefab: cc.Prefab,
                hubPrefab: cc.Prefab,
                lightPrefab: cc.Prefab,
                flyMonsterPrefab: cc.Prefab,
                rockSpritFrame: cc.SpriteFrame,
                snakePrefab: cc.Prefab,
                singleColor: cc.SpriteFrame,
                protectBar: cc.Sprite,
                freezeBar: cc.Sprite,
                scoreBuffBar: cc.Sprite,
                protectNumLabel: cc.Label,
                replayLayerNode: cc.Node,
                replayNode: cc.Node,
                protectNode: cc.Node,
                replayerInfoNode: cc.Node,
                coinNode: cc.Node,
                pauseBtnNode: cc.Node,
                playPauseBtnNode: cc.Node,
                tmProgress: cc.ProgressBar,
                tmLabel: cc.Label,
                replayerNameLabel: cc.Label,
                speedRatialLabal: cc.Label,
                replayerImgSprite: cc.Sprite,
                replayOverDialog: cc.Node,
                replayOverLabel: cc.Label,
                zanNode: cc.Node
            },
            ctor: function() {
                this.isChallenge = !0, this.freezeRate = o, this.scoreRate = a;
            },
            getName: function() {
                return "gameChallenge";
            },
            beginGame: function() {
                this.camara.active = !0;
                var e = this.getTilePosition(this.startX, this.startY);
                this.startPosX = e.x, this.startPosY = e.y, this.moveTileCenter(this.startX, this.startY), 
                this.camara.x = this.mapSize.width * this.tileSize.width / 2, this.camara.y = this.player.node.y, 
                this.connectV.y = -this.allHeight - this.connectV.height, this.connectH.x = 0, this.isPlayBackMod ? (this.playerControler.setControlType(n.REPLAY), 
                this.playerControler.beganReplay(this.recordDatas[this.stage - 1].moveActions)) : (this.playerControler.setControlType(n.INPUT), 
                this.playerControler.beganRecord()), this.timeAll = 0, this.setGameState(c.READYTOPLAY), 
                this.isPlayBackMod && this.replayLayerNode.on(cc.Node.EventType.TOUCH_START, this.replaySwitchBottom, this);
            },
            setGameState: function(e) {
                console.log("state", e), this.gameState != e && (this.gameState = e);
            },
            clearMap: function() {
                this.map.tmxAsset = null, N.removeAll(), b.removeAll(), C.removeAll(), A.removeAll(), 
                L.removeAll(), w.removeAll(), I.removeAll(), M.removeAll(), D.removeAll(), P.removeAll(), 
                S.removeAll(), k.removeAll(), _.removeAll(), F.removeAll();
            },
            freeze: function() {
                N.freeze(), w.freeze(), I.freeze(), F.freeze();
            },
            unFreeze: function() {
                N.unFreeze(), w.unFreeze(), I.unFreeze(), F.unFreeze();
            },
            preLoad: function(e) {
                var n = this;
                if (this.isPaused = !0, this.speedRatialCount = 1, this.speedRatialLabal.string = "x1", 
                S.resetAll(), P.resetAll(), this.resPath = "maps", this.stage = 1, this.playerControler.timeAll = 0, 
                console.log(e), e.isWithFriend && AchievementMgr.onChallengeFriends(), this.entryPointData = e.entryPointData, 
                this.resArrays = [], this.entryPointData && (this.resArrays = this.entryPointData.resArrays || []), 
                this.replayOverDialog.active = !1, this.isPlayBackMod = e.isPlayBackMod, this.recordDatas = e.recordDatas, 
                this.versionCode = Constants.PARAM.VideoVersion, e.version && (this.versionCode = parseInt(e.version)), 
                this.continueCnt = 0, this.isPlayBackMod) {
                    this.onCloseReplayCb = e.onCloseReplay, this.replayLayerNode.active = !0, this.replayLayerNode.off(cc.Node.EventType.TOUCH_START, this.replaySwitchBottom, this), 
                    this.playPauseBtnNode.getChildByName("stop").active = !0, this.playPauseBtnNode.getChildByName("start").active = !1, 
                    this.replayNode.active = !0, this.protectNode.active = !1, this.replayerInfoNode.active = !0, 
                    this.coinNode.active = !1, this.pauseBtnNode.active = !1, this.replayData = e.video, 
                    this.replayVideoId = e.videoId, this.replayWeaponId = e.weaponId, this.replaySkinId = e.skinId, 
                    this.bottomShow = !0, setTimeout(function() {
                        n.bottomShow && n.replaySwitchBottom();
                    }, 3e3), this.replayOver = !1, this.isZan = !1, this.zanNode.opacity = 255, this.replayName = e.name, 
                    this.replayPhoto = e.photo, this.replayPlayerId = e.playerId, this.entryPointData && this.entryPointData.playerId && (this.replayPlayerId = this.entryPointData.playerId), 
                    this.replayerNameLabel.string = e.name, e.photo && (console.log(e.photo), cc.loader.load(e.photo, function(e, t) {
                        e || (n.replayerImgSprite.spriteFrame = new cc.SpriteFrame(t));
                    })), this.replayTm = 0, this.replayTms = [];
                    for (var t = 0; t < this.recordDatas.length; t++) {
                        var i = this.recordDatas[t].moveActions;
                        this.replayTm += .00167 * this.playerControler.decodeFrame(i[i.length - 1]).time, 
                        this.replayTms.push(this.playerControler.decodeFrame(i[i.length - 1]).time);
                    }
                } else this.replayNode.active = !1, this.protectNode.active = !0, this.replayerInfoNode.active = !1, 
                this.coinNode.active = !0, this.replayLayerNode.active = !1;
                return new Promise(function(t, i) {
                    n.startNormal(1, function(e) {
                        e ? i() : t();
                    });
                });
            },
            mergeMaps: function(e, t, i, n) {
                for (var s = [ [], [], [] ], a = [], o = 0, r = 0, c = cc.size(0, 0), l = 0; l < e.length; l++) {
                    var h = e[l];
                    h.tilesets[0], o = h.width, r += h.height, c.width = h.tileheight, c.height = h.tileheight;
                    for (var d = 0; d < h.layers.length; d++) {
                        var u = h.layers[d];
                        s[d].push(u.data), a[d] = u.name;
                    }
                }
                for (var g = this.stage / 200, p = 0; p < s.length; p++) {
                    var m = t._layers[p];
                    m.name = a[p];
                    var f = cc.size(0, 0);
                    f.width = o, f.height = r, m._layerSize = f;
                    for (var y = new Uint32Array(r * o), v = 0, T = s[p], P = 0; P < T.length; P++) for (var S = T[P], C = 0; C < S.length; C++) n || (6 == S[C] && (S[C] = 4), 
                    4 == S[C] && Math.random() < g && (S[C] = 6)), y[v] = S[C], v++;
                    m._tiles = y;
                }
                t._mapSize.width = o, t._mapSize.height = r, t._tileSize = c, this.map._sgNode._buildWithMapInfo(t), 
                this.map._detachedChildren.length = 0, this.map._onMapLoaded(), setTimeout(i, 0);
            },
            loadAndBuildMap: function(e, n, s) {
                var a = this, o = e.map(function(e) {
                    return a.resPath + "/" + e;
                }), t = 0;
                this.setGameState(c.PREPARE);
                var r = function() {
                    2 == ++t && n();
                };
                this.clearMap(), cc.loader.loadRes(this.resPath + "/0_0", cc.TiledMapAsset, function(e, t) {
                    var i = a.mapInfo || new cc.TMXMapInfo(t.tmxXmlStr, cc.url._rawAssets + t.tmxFolderPath);
                    a.mapInfo = i, cc.loader.loadResArray(o, function(e, t) {
                        if (e) return console.log(e), void n(e);
                        t.sort(function(e, t) {
                            return o.indexOf(a.resPath + "/" + e._name) - o.indexOf(a.resPath + "/" + t._name);
                        }), a.mergeMaps(t, i, function() {
                            a.buildMap(r);
                        }, s);
                    });
                }), 1 == this.stage ? this.isPlayBackMod ? this.player.setSkinAsync(this.replaySkinId, this.replayWeaponId).then(r).catch(function(e) {
                    console.log("setSkinAsync", User.getSkinId(), e), r();
                }) : this.player.setSkinAsync().then(r).catch(function(e) {
                    console.log("setSkinAsync", User.getSkinId(), e), r();
                }) : r();
            },
            buildMap: function(e) {
                this.startX = 6, this.startY = 3, (this.player.mainGame = this).isPaused = !1, this.mapSize = this.map.getMapSize(), 
                this.tileSize = this.map.getTileSize(), this.tileLayer = this.map.getLayer("game"), 
                this.tileDatas = this.tileLayer.getTiles(), this.tiles = {}, this.gameLayer.scale = (cc.winSize.width + 68) / (this.mapSize.width * this.tileSize.width), 
                this.allHeight = this.mapSize.height * this.tileSize.height, this.waterOpen = !0, 
                this.waterSpeed = .3 + .01 * this.stage, 1 < this.waterSpeed && (this.waterSpeed = .5), 
                this.waterLayer.active = this.waterOpen, this.waterLayer.height = 300, this.waterLayer.width = cc.winSize.width / this.gameLayer.scale, 
                1 == this.stage ? this.waterLayer.y = -this.allHeight - 600 : this.waterLayer.y = -this.allHeight - 1e3, 
                this.waterLayer.x = 34 / this.gameLayer.scale, this.player.moveDir || this.player.initGame(), 
                N.initGame(this.mapUpLayer, this.trapPrefab, this), b.initGame(this.mapUpLayer, this.doorPrefab, this), 
                A.initGame(this.mapUpLayer, this.turnDoorPrefab, this), L.initGame(this.mapUpLayer, this.dieWallPrefab, this), 
                w.initGame(this.mapUpLayer, this.armMonsterPrefab, this), I.initGame(this.mapUpLayer, this.bigFacePrefab, this), 
                M.initGame(this.mapUpLayer, this.cloudPrefab, this), D.initGame(this.mapDownLayer, this.wheelPrefab, this), 
                C.initGame(this.mapUpLayer, this.glassWallPrefab, this), P.initGame(this.mapUpLayer, this.freezeTilePrefab, this), 
                S.initGame(this.mapUpLayer, this.scoreBuffTilePrefab, this), k.initGame(this.mapUpLayer, this.coinTilePrefab, this), 
                _.initGame(this.mapUpLayer, this.hubPrefab, this), this.monsterMgr.initGame(this.monsterLayer, this.mapDownLayer);
                var t = Math.random() < this.freezeRate, i = Math.random() < this.scoreRate;
                this.doorSubtypes = {};
                for (var n = 0; n < this.mapSize.height; n++) for (var s = 0; s < this.mapSize.width; s++) {
                    var a = this.getTileAt(s, n);
                    if (this.isPlayBackMod) {
                        var o = this.recordDatas && this.recordDatas[this.stage - 1].freezeCoords;
                        o && o.tileX == s && o.tileY == n && this.addFreezeTile(s, n);
                        var r = this.recordDatas && this.recordDatas[this.stage - 1].scoreCoords;
                        r && r.tileX == s && r.tileY == n && this.addScoreBuffTile(s, n);
                    } else (a.isCoin || a.isXP) && (t && (Math.random() < .002 || 50 < n) ? (t = !1, 
                    this.addFreezeTile(s, n), this.stageInfo[this.stage - 1].freezeCoords = {
                        tileX: s,
                        tileY: n
                    }) : i && (Math.random() < .002 || 30 < n) && (i = !1, this.addScoreBuffTile(s, n), 
                    this.stageInfo[this.stage - 1].scoreCoords = {
                        tileX: s,
                        tileY: n
                    }));
                }
                M.sort(), P.isFreeze() && this.freeze(), setTimeout(e, 0);
            },
            addFreezeTile: function(e, t) {
                var i = P.addTile(e, t);
                i.tileX = e, i.tileY = t, i.mainGame = this, i.init(), this.setTileAt(e, t, i);
            },
            addScoreBuffTile: function(e, t) {
                var i = S.addTile(e, t);
                i.tileX = e, i.tileY = t, i.mainGame = this, i.init(), this.setTileAt(e, t, i);
            },
            startHFly: function(e, t, i) {
                var n = this;
                this.followStartIndex = 1, this.followEndIndex = 1;
                var s = Date.now();
                this.loadAndBuildMap(this.getFollowMonsterArray(e, t), function() {
                    n.startX = 1, e && (n.startX = 11), n.startY = n.mapSize.height - 7, 3e3 < Date.now() - s ? i() : setTimeout(function() {
                        i();
                    }, 3e3 - (Date.now() - s));
                }, !0);
            },
            startNormal: function(e, t) {
                var i = this;
                this.loadAndBuildMap(this.getNormalArray(e), function() {
                    i.startX = 6, i.startY = i.mapSize.height - 4, 1 < e && (i.startY = i.mapSize.height + 20), 
                    t ? setTimeout(t, 1e3) : i.beginGame();
                });
            },
            getFollowMonsterArray: function(e, t) {
                if (this.isPlayBackMod) return console.log(this.recordDatas[t - 1].resArray), this.recordDatas[this.stage - 1].resArray;
                for (var i = [ "0_1", "1_" + (Utils.randomInt(105) + 1), "14_1" ], n = 0; n < 6; n++) {
                    var s = Math.floor(24 * Math.random()) + 2;
                    i.push("14_" + s);
                }
                return e ? i.push("14_0_1") : i.push("14_0"), this.resArrays.length >= t ? i = this.resArrays[t - 1].resArray : this.resArrays.push({
                    type: "ciwei",
                    resArray: i
                }), this.stageInfo.push({
                    type: "ciwei",
                    isLeft: e,
                    resArray: i
                }), console.log(i), i;
            },
            getNormalArray: function(e) {
                if (this.isPlayBackMod) return console.log(this.recordDatas[e - 1].resArray), this.recordDatas[e - 1].resArray;
                for (var t = [ 107, 30, 70, 69, 60, 18, 22, 16, 60, 17, 26, 9, 10 ], i = [ "0_1" ], n = [], s = [ "1_3" ], a = 0; a < 6; a++) {
                    var o = Math.floor(Math.random() * (t.length - 1)) + 1;
                    10 == o && Math.random() < .2 && (o = Math.floor(Math.random() * (t.length - 1)) + 1), 
                    1 == e && (o = 1), 11 == o && (o = 1), 0 <= n.indexOf(10) && (o = 1), n.push(o);
                    var r = Math.floor(Math.random() * (t[o] - 1)) + 1;
                    0 <= s.indexOf(o + "_" + r) ? a-- : i.push(o + "_" + r);
                }
                return i.push("0_" + (Utils.randomInt(3) + 2)), this.resArrays.length >= e ? i = this.resArrays[e - 1].resArray : this.resArrays.push({
                    type: "normal",
                    resArray: i
                }), this.stageInfo.push({
                    type: "normal",
                    resArray: i
                }), console.log(i), i;
            },
            onLoad: function() {
                this.replayNode.parent.scale = cc.winSize.width / 750, this.stage = 1, this.monsterMgr = F;
            },
            onEnable: function() {
                this.camara.active = !1, this.stage = 1, this.background.init(), this.player.moveDir = null, 
                this.coinCount = 0, this.xpCount = 0, this.score = 0, this.starCount = 0, this.starLabel.string = this.starCount, 
                this.scoreNum.string = this.score, this.updateShieldCount(), this.stageInfo = [], 
                AdHelper.logEvent("challenge_start", {
                    type: this.isPlayBackMod ? "replay" : "play"
                });
            },
            onDisable: function() {
                this.clearMap();
            },
            getTileAt: function(e, t) {
                var i = M.getTileAt(e, t) || this.tiles[e + "." + t];
                if (i) return i;
                var n = t * this.mapSize.width + e, s = this.tileDatas[n], a = null, o = 0;
                if (0 == s || e < 0 || t < 0 || e >= this.mapSize.width || t >= this.mapSize.height) i = new u(); else {
                    switch (o = null == (a = this.map.getPropertiesForGID(s)) ? 0 : parseInt(a.type)) {
                      case l.WALL:
                        i = new g();
                        break;

                      case l.COIN:
                        this.removeTileAt(e, t, !0), i = k.addTile(e, t);
                        break;

                      case l.XP:
                        i = new p();
                        break;

                      case l.STAR:
                        i = new m();
                        break;

                      case l.EXITPOINT:
                        i = new f();
                        break;

                      case l.ENTRYPOINT:
                        this.removeTileAt(e, t, !0), i = new y();
                        break;

                      case l.DIEWALL:
                        i = new v();
                        break;

                      case l.HUB:
                        this.removeTileAt(e, t, !0), i = _.addTile(e, t);
                        break;

                      case l.TRAP:
                        this.removeTileAt(e, t, !0), i = N.addTile(e, t);
                        break;

                      case l.DOOR:
                        this.removeTileAt(e, t, !0);
                        var r = parseInt(a.subtype);
                        this.doorSubtypes[r] = this.doorSubtypes[r] || 0, this.doorSubtypes[r]++, r += 100 * Math.floor((this.doorSubtypes[r] - 1) / 2), 
                        i = b.addTile(e, t, r);
                        break;

                      case l.TURNWALL:
                        this.removeTileAt(e, t, !0), i = A.addTile(e, t);
                        break;

                      case l.ARMMONSTER:
                        this.removeTileAt(e, t, !0), (i = w.addTile(e, t)).dir = {
                            x: parseInt(a.x),
                            y: parseInt(a.y)
                        };
                        break;

                      case l.BIGFACE:
                        this.removeTileAt(e, t, !0), i = I.addTile(e, t);
                        break;

                      case l.CLOUD:
                        this.removeTileAt(e, t, !0), (i = M.addTile(e, t)).dir = {
                            x: parseInt(a.x),
                            y: parseInt(a.y)
                        };
                        break;

                      case l.WHEEL:
                        this.removeTileAt(e, t, !0), i = D.addTile(e, t, parseInt(a.subtype));
                        break;

                      case l.SPRING:
                        (i = new T()).dir = {
                            x: parseInt(a.x),
                            y: parseInt(a.y)
                        };
                        break;

                      case l.GLASSWALL:
                        i = C.addTile(e, t);
                        break;

                      case l.RUNMONSTER:
                        i = new R(), this.monsterMgr.addMonster(i, this.batPrefab);
                        break;

                      case l.FOLLOWMONSTER:
                        i = new B(), this.monsterMgr.addMonster(i, this.lightPrefab), (a = {
                            begin: a.begin,
                            end: a.end,
                            type: a.type,
                            isHide: a.isHide
                        }).begin && (a.begin = this.followStartIndex + "", this.followStartIndex++), a.end && (a.end = this.followEndIndex + "", 
                        this.followEndIndex++);
                        break;

                      case l.FLYMONSTER:
                        i = new E(), this.monsterMgr.addMonster(i, this.flyMonsterPrefab, this.rockSpritFrame);
                        break;

                      case l.SNAKE:
                        i = new x(), this.monsterMgr.addMonster(i, this.snakePrefab);
                        break;

                      default:
                        i = new u();
                    }
                    i.setType(o), i.setProp(a);
                }
                if (i.enteringTile = null, i.tileX = e, i.tileY = t, ((i.mainGame = this).tiles[e + "." + t] = i).init(), 
                i.isCloud) {
                    var c = new u();
                    c.tileX = e, c.tileY = t, (c.mainGame = this).tiles[e + "." + t] = c;
                }
                return i;
            },
            setTileAt: function(e, t, i) {
                this.removeTileAt(e, t), this.tiles[e + "." + t] = i;
            },
            removeTileAt: function(e, t, i) {
                if (e < 0 || t < 0 || e >= this.mapSize.width || t >= this.mapSize.height) console.warn("removeTileAt error", e, t, i); else {
                    this.tileLayer.setTileGID(0, e, t);
                    var n = this.tiles[e + "." + t];
                    n && n.isFreeze ? P.removeTile(n) : n && n.isScoreBuff && S.removeTile(n), n && n.isCoin && k.removeTile(n), 
                    i || (this.tiles[e + "." + t] = null);
                }
            },
            hideTileAt: function(e, t) {
                var i = this.tileLayer.getTileAt(e, t);
                i && i.setVisible(!1);
            },
            getTilePosition: function(e, t) {
                return cc.p(e * this.tileSize.width, -t * this.tileSize.height);
            },
            getTileCoord: function(e, t) {
                return {
                    tileX: Math.round(e / this.tileSize.width) - 1,
                    tileY: -(Math.round(t / this.tileSize.height) + 1)
                };
            },
            moveTileCenter: function(e, t) {
                this.player.setPlayerTileCoord(e, t, !0);
            },
            addStar: function() {
                this.starCount++, this.starLabel.string = this.starCount;
            },
            addCoin: function() {
                this.coinCount++, this.addXP();
            },
            updateCoin: function() {
                this.coinLabal.string = User.getKeyValue("goldNum") + this.coinCount;
            },
            addXP: function() {
                this.xpCount++, this.score++, S.isBuffActive() && this.score++, this.scoreNum.string = this.score;
            },
            onGameStagePass: function(e, t) {
                var i = this;
                if (this.isPlayBackMod || (this.stageInfo[this.stage - 1].moveActions = this.playerControler.getRecordDatas()), 
                this.playerControler.removeInput(), this.playerControler.timeAll = 0, this.setGameState(c.LEVELPASS), 
                this.stage++, this.isPlayBackMod && this.stage > this.recordDatas.length) return this.isPaused = !0, 
                void console.log("播放完毕");
                this.isPlayBackMod && "ciwei" == this.recordDatas[this.stage - 1].type && (e = !0, 
                t = this.recordDatas[this.stage - 1].isLeft), e ? this.startHFly(t, this.stage, function() {
                    var e = i.camara.y;
                    i.beginGame(), i.background.jump(i.startPosY), i.player.jump(i.camara.y - e);
                }) : this.startNormal(this.stage, function() {
                    var e = i.camara.y;
                    i.beginGame(), i.background.jump(i.startPosY), i.player.jump(i.camara.y - e);
                });
            },
            onPauseGame: function() {
                var i = this;
                this.isPaused = !0, this.playerControler.removeInput(), PageMgr.getPageAsync("PauseDialog").then(function(e) {
                    var t = e.getComponent("PauseDialog");
                    PageMgr.showLoading(), t.preLoad({
                        isChallenge: !0,
                        callback: i.onResumeGame.bind(i)
                    }).then(function() {
                        PageMgr.hideLoading(), PageMgr.showDialog("PauseDialog", !1, !0);
                    }, function(e) {
                        PageMgr.hideLoading();
                    });
                });
            },
            onResumeGame: function() {
                this.isPaused = !1, this.playerControler.setupInput();
            },
            getCurrentReplayTime: function() {
                for (var e = 0, t = 0; t < this.stage - 1; t++) e += this.replayTms[t];
                return this.playerControler.timeAll && (e += this.playerControler.timeAll), e;
            },
            continueGame: function() {
                console.log("challenge continueGame", this.player.tileX, this.player.tileY), this.isPaused = !1, 
                this.player.revive(), this.moveTileCenter(this.player.tileX, this.player.tileY), 
                this.waterLayer.height = -this.waterLayer.y + this.player.node.y - 900, this.setGameState(c.READYTOPLAY), 
                I.resetAll(), w.resetAll(), N.resetAll(), this.playerControler.setupInput();
            },
            onResultShow: function() {
                var t = this;
                this.isPlayBackMod || (this.stageInfo[this.stage - 1].moveActions = this.playerControler.getRecordDatas()), 
                PageMgr.getPageAsync("ResultChallengePage").then(function(e) {
                    e.getComponent("ResultChallengePage").setData({
                        score: t.score,
                        recoreds: t.stageInfo,
                        xpCount: t.xpCount
                    }), PageMgr.showPage("ResultChallengePage"), AdHelper.logEvent("challenge_result_show", {
                        stage: t.stage,
                        score: Math.floor(t.score / 100)
                    });
                }), this.sendFbMessage(), AdHelper.logEvent("challenge_end", {
                    type: "play",
                    stage: this.stage,
                    score: Math.floor(this.score / 100)
                });
            },
            sendFbMessage: function() {
                if (this.entryPointData && this.entryPointData.contextId == User.getContextID() && this.entryPointData.playerId != User.getPlayerID()) {
                    var e = this.entryPointData;
                    Utils.sendFbMessage("MatchResult", {
                        score: e.playerScore,
                        photo: e.playerPhoto,
                        avatorId: e.playerAvatorId,
                        weaponId: e.playerWeaponId,
                        score2: this.score,
                        photo2: User.getPlayerPhoto(),
                        avatorId2: User.getSkinId(),
                        weaponId2: User.getWeaponId()
                    }, {
                        text: "🎉🎉🎉 " + (e.playerScore > this.score ? e.playerName : User.getPlayerName()) + " Win!",
                        from: "match_result",
                        data: {
                            sharetype: "match_result"
                        }
                    }), this.entryPointData = null;
                } else Utils.sendFbMessage("MatchStart", {
                    score: this.score,
                    photo: User.getPlayerPhoto(),
                    avatorId: User.getSkinId(),
                    weaponId: User.getWeaponId()
                }, {
                    from: "match_start",
                    text: "🎮🎮🎮  " + User.getPlayerName() + " has challenged you to a match of Niaja Go !",
                    data: {
                        sharetype: "match_start",
                        contextId: User.getContextID(),
                        playerId: User.getPlayerID(),
                        playerName: User.getPlayerName(),
                        playerPhoto: User.getPlayerPhoto(),
                        playerScore: this.score,
                        playerAvatorId: User.getSkinId(),
                        playerWeaponId: User.getWeaponId(),
                        resArrays: this.resArrays
                    }
                });
            },
            onGameOver: function() {
                var t = this;
                if (this.gameState != c.PLAYERDIE) {
                    if (this.setGameState(c.PLAYERDIE), this.isPaused = !0, this.isPlayBackMod) {
                        var e = .00167 * this.getCurrentReplayTime();
                        return Math.abs(e - this.replayTm) <= 1 ? void this.onReplayOver() : void setTimeout(function() {
                            t.continueGame();
                        }, 1e3);
                    }
                    AdHelper.logEvent("challenge_game_over", {
                        stage: this.stage,
                        score: Math.floor(this.score / 100)
                    }), this.player.moveDir = null, this.playerControler.removeInput(), User.addGold(this.coinCount), 
                    this.coinCount = 0, setTimeout(function() {
                        t.continueCnt < s ? (t.continueCnt++, PageMgr.getPageAsync("continueDialog").then(function(e) {
                            e.getComponent("continueDialog").setCallBack(t), PageMgr.showDialog("continueDialog");
                        })) : t.onResultShow();
                    }, 1e3);
                }
            },
            update: function(e) {
                if (this.updateCoin(), this.updateShieldCount(), !this.isPaused) {
                    for (var t = 0; t < this.speedRatialCount; t++) this.step(10, this.timeAll), this.timeAll += 10;
                    if (this.isPlayBackMod && !this.replayOver && (this.progressCheckTm || (this.progressCheckTm = 0), 
                    this.progressCheckTm -= 10, this.progressCheckTm <= 0)) {
                        this.progressCheckTm = 100;
                        var i = .00167 * this.getCurrentReplayTime();
                        if (0 < this.replayTm) {
                            var n = i / this.replayTm;
                            .9999 <= n && (n = 1, i = this.replayTm, this.onReplayOver()), this.tmProgress.progress = n, 
                            this.tmLabel.string = Utils.formatTimeMS(Math.floor(i));
                        } else this.tmProgress.progress = 1, this.tmLabel.string = Utils.formatTimeMS(0), 
                        this.onReplayOver();
                    }
                    this.gameState == c.PLAYING && this.player.node.y > cc.winSize.height / 2 && this.onGameStagePass(), 
                    this.camara.position.y > -cc.winSize.height && (this.connectV.y = 476 * (Math.floor(this.camara.position.y / 476) - 2), 
                    this.connectV.y < 0 && (this.connectV.y = 0)), this.gameState == c.PREPARE && (this.player.node.x < 0 || this.player.node.x > cc.winSize.width) && (this.camara.x = this.player.node.position.x, 
                    this.connectH.y = this.player.node.position.y, this.connectH.x = 884 * (Math.floor(this.camara.x / 884) + 2)), 
                    this.background.step(this.camara.position.x, this.camara.position.y, this.startPosY);
                }
            },
            step: function(e, t) {
                if (this.gameState != c.READYTOPLAY && this.gameState != c.PLAYING || (this.playerControler.step(e, t), 
                M.step(e, t), this.monsterMgr.step(e, t)), this.player.step(e, t), this.playerControler.quaryDoubleClick() && this.onProtectClick(null, !0), 
                this.protectBar.node.parent.active = this.player.isShieldEquip(), this.protectBar.fillRange = this.player.getShieldPercent(), 
                this.freezeBar.node.parent.active = P.isFreeze(), this.freezeBar.fillRange = P.getFreezePercent(), 
                this.scoreBuffBar.node.parent.active = S.isBuffActive(), this.scoreBuffBar.fillRange = S.getBuffTimePercent(), 
                this.scorex2.active = S.isBuffActive(), this.gameState == c.PLAYING) {
                    w.step(e, t), I.step(e, t), P.step(e, t), S.step(e, t), this.player.stepShieldTime(e), 
                    this.waterOpen && (this.waterLayer.active = !0, P.isFreeze() || (this.player.node.y > this.waterLayer.y + 400 && (this.waterLayer.height += e * this.waterSpeed), 
                    this.waterLayer.y + this.waterLayer.height > this.player.node.y - this.tileSize.height && this.player.setPlayerDeath(this.player, "waterLayer")));
                    var i = cc.pLerp(this.camara.position, this.player.node.position, .4);
                    this.camara.y = Math.round(i.y);
                } else this.waterLayer.active = !1, 1 == this.stage && (this.waterLayer.active = !0), 
                this.camara.y = this.player.node.position.y;
                this.camara.y % 2 == 1 && (this.camara.y += 1), N.step(e, t), D.step(e, t);
            },
            onProtectClick: function(e, t) {
                var i = this;
                0 < User.getShieldCount() && !this.player.isShieldEquip() ? (User.decShield(), this.playerControler.addShield(), 
                this.updateShieldCount()) : t || this.player.isShieldEquip() || (this.isPaused = !0, 
                this.playerControler.removeInput(), PageMgr.showMask(), PageMgr.getPageAsync("ShopQuickShowDialog").then(function(e) {
                    PageMgr.hideMask(), e.getComponent("ShopQuickShowDialog").preLoad({
                        onClose: function() {
                            i.updateShieldCount(), i.onResumeGame();
                        },
                        type: 2
                    }), PageMgr.showDialog("ShopQuickShowDialog", !0, !0);
                }, function(e) {
                    PageMgr.hideMask(), i.onResumeGame();
                }));
            },
            updateShieldCount: function() {
                this.protectNumLabel.string = "x" + User.getKeyValue("shieldCount");
            },
            onReplayClose: function() {
                if (!Global.isFBINSTANT) return PageMgr.hideDialog("GameChallenge"), void PageMgr.showPage("HomePage");
                this.onCloseReplayCb && this.onCloseReplayCb(this.isZan), PageMgr.hideDialog("GameChallenge");
            },
            onReplaySpeed: function() {
                this.speedRatialCount *= 2, 4 < this.speedRatialCount && (this.speedRatialCount = 1), 
                this.speedRatialLabal.string = "x" + this.speedRatialCount;
            },
            replayPause: function() {
                this.isPaused ? (this.isPaused = !1, this.playerControler.setupInput(), this.playPauseBtnNode.getChildByName("stop").active = !0, 
                this.playPauseBtnNode.getChildByName("start").active = !1) : (this.isPaused = !0, 
                this.playerControler.removeInput(), this.playPauseBtnNode.getChildByName("stop").active = !1, 
                this.playPauseBtnNode.getChildByName("start").active = !0);
            },
            replaySwitchBottom: function() {
                this.replayNode.stopAllActions(), this.bottomShow ? (this.replayNode.runAction(cc.moveTo(.2, cc.v2(0, -120))), 
                this.replayerInfoNode.runAction(cc.moveTo(.2, cc.v2(this.replayerInfoNode.x, 130))), 
                this.bottomShow = !1) : (this.replayNode.runAction(cc.moveTo(.2, cc.v2(0, 0))), 
                this.replayerInfoNode.runAction(cc.moveTo(.2, cc.v2(this.replayerInfoNode.x, 0))), 
                this.bottomShow = !0);
            },
            onReplayOver: function() {
                var e = this;
                this.replayOver = !0, setTimeout(function() {
                    e.replayLayerNode.off(cc.Node.EventType.TOUCH_START, e.replaySwitchBottom, e), e.bottomShow || (e.replayNode.runAction(cc.moveTo(.2, cc.v2(0, 0))), 
                    e.bottomShow = !0), e.playPauseBtnNode.getChildByName("stop").active = !1, e.playPauseBtnNode.getChildByName("start").active = !0, 
                    e.replayOverLabel.string = "Replay has finished!", e.replayOverDialog.active = !0, 
                    AdHelper.logEvent("challenge_end", {
                        type: "replay"
                    });
                }, 2e3);
            },
            onReplayShare: function() {
                Utils.shareGame("ShareVideo", {
                    type: 2,
                    photo: this.replayPhoto,
                    name: this.replayName,
                    score: this.score
                }, {
                    text: "😎😎😎 My wonderful replay！ Do you want to try it?",
                    from: "result_challenge_share_share",
                    data: {
                        sharetype: "challenge_recored",
                        videoId: this.replayVideoId,
                        photo: this.replayPhoto,
                        name: this.replayName,
                        playerId: this.replayPlayerId,
                        version: Constants.PARAM.VideoVersion,
                        skinId: this.replaySkinId,
                        weaponId: this.replayWeaponId
                    }
                });
            },
            clickZan: function() {
                this.isZan || (this.isZan = !0, this.zanNode.runAction(cc.fadeOut(.2)), PageMgr.showTips("You likes " + this.replayerNameLabel.string));
            }
        }), cc._RF.pop();
    }, {
        ArmMonsterMgr: "ArmMonsterMgr",
        BaseTile: "BaseTile",
        BigFaceMgr: "BigFaceMgr",
        CloudMgr: "CloudMgr",
        CoinMgr: "CoinMgr",
        DieWallMgr: "DieWallMgr",
        DieWallTile: "DieWallTile",
        DoorMgr: "DoorMgr",
        EntryTile: "EntryTile",
        ExitTile: "ExitTile",
        FlyMonsterTile: "FlyMonsterTile",
        FollowMonsterTile: "FollowMonsterTile",
        FreezeMgr: "FreezeMgr",
        GameBackground: "GameBackground",
        GlassWallMgr: "GlassWallMgr",
        HubMgr: "HubMgr",
        MonsterMgr: "MonsterMgr",
        PlayerControler: "PlayerControler",
        PlayerTile: "PlayerTile",
        RunMonsterTile: "RunMonsterTile",
        ScoreBuffMgr: "ScoreBuffMgr",
        SnakeMonsterTile: "SnakeMonsterTile",
        SpringTile: "SpringTile",
        StarTile: "StarTile",
        TrapMgr: "TrapMgr",
        TurnDoorMgr: "TurnDoorMgr",
        WallTile: "WallTile",
        WheelMgr: "WheelMgr",
        XPTile: "XPTile"
    } ],
    GameConfig: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "b7702GnkxhGEqQz0Ql0wnlm", "GameConfig"), window.GameVersion = "0.14", 
        window.DEV = !1, window.lastScore = Math.floor(500 * Math.random());
        cc._RF.pop();
    }, {} ],
    GameMain: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "6a6b8Fgt6BD7KiUjrymfHhJ", "GameMain");
        var n = Constants.CONTROL_TYPE, h = Constants.TILE_TYPE, l = Constants.GAME_STATE, s = e("LevelData"), a = e("PlayerControler"), o = e("PlayerTile"), d = e("BaseTile"), u = e("WallTile"), g = e("XPTile"), p = e("StarTile"), r = e("ExitTile"), m = e("EntryTile"), f = e("SecretTile"), y = e("DieWallTile"), v = e("SpringTile"), T = e("BoxMgr"), P = e("SlotMgr"), S = e("GlassWallMgr"), C = e("TrapMgr"), N = e("DoorMgr"), b = e("TurnDoorMgr"), A = e("MagicDoorMgr"), c = e("DieWallMgr"), L = e("ArmMonsterMgr"), w = e("BigFaceMgr"), I = e("CloudMgr"), M = e("WheelMgr"), D = e("CoinMgr"), k = e("RIPMgr"), _ = e("RunMonsterTile"), R = e("FollowMonsterTile"), B = e("FlyMonsterTile"), E = e("MonsterMgr"), F = e("SnakeMonsterTile"), x = e("TaskMgr"), G = (e("RIPTile"), 
        new cc.NodePool()), U = new cc.NodePool();
        cc.Class({
            extends: cc.Component,
            properties: {
                mapUpLayer: cc.Node,
                mapDownLayer: cc.Node,
                farBackLayer: cc.Node,
                maskNode: cc.Node,
                farSprite: cc.Sprite,
                nearBackLayer: cc.Node,
                player: o,
                exit: r,
                camara: cc.Node,
                playerControler: a,
                map: cc.TiledMap,
                coinLabal: cc.Label,
                batPrefab: cc.Prefab,
                monsterLayer: cc.Node,
                trapPrefab: cc.Prefab,
                doorPrefab: cc.Prefab,
                turnDoorPrefab: cc.Prefab,
                magicDoorPrefab: cc.Prefab,
                dieWallPrefab: cc.Prefab,
                armMonsterPrefab: cc.Prefab,
                bigFacePrefab: cc.Prefab,
                wheelPrefab: cc.Prefab,
                cloudPrefab: cc.Prefab,
                glassWallPrefab: cc.Prefab,
                boxPrefab: cc.Prefab,
                slotPrefab: cc.Prefab,
                coinPrefab: cc.Prefab,
                lightPrefab: cc.Prefab,
                flyMonsterPrefab: cc.Prefab,
                rockSpritFrame: cc.SpriteFrame,
                snakePrefab: cc.Prefab,
                singleColor: cc.SpriteFrame,
                stageTip: cc.Label,
                coinLabel: cc.Label,
                starNode: cc.Node,
                protectNumLabel: cc.Label,
                ripPrefab: cc.Prefab,
                protectBar: cc.Sprite,
                freezeBar: cc.Sprite,
                replayNode: cc.Node,
                protectNode: cc.Node,
                replayerInfoNode: cc.Node,
                coinNode: cc.Node,
                pauseBtnNode: cc.Node,
                tmProgress: cc.ProgressBar,
                tmLabel: cc.Label,
                playPauseBtnNode: cc.Node,
                replayerNameLabel: cc.Label,
                speedRatialLabal: cc.Label,
                replayerImgSprite: cc.Sprite,
                replayLayerNode: cc.Node,
                replayOverDialog: cc.Node,
                replayOverLabel: cc.Label,
                debugNode: cc.Node,
                warningLabel: cc.Label,
                warningDialog: cc.Node,
                zanNode: cc.Node
            },
            onLoad: function() {
                this.replayNode.parent.scale = cc.winSize.width / 750, this.resultShowCount = 3;
            },
            getName: function() {
                return "gameMain";
            },
            updateStarView: function() {
                for (var e = 0; e < 3; ++e) {
                    this.starNode.getChildByName("resultpage_star_" + (e + 1)).active = e < this.starCount;
                }
            },
            initGame: function(e) {
                this.level = e, this.startX = 16, this.startY = 33, this.continueCnt = 0, this.player.mainGame = this, 
                console.log("initGame  buildMap"), this.buildMap(), this.centerTileX = this.mapSize.width / 2, 
                this.centerTileY = this.mapSize.height / 2;
                var t = this.getTilePosition(this.centerTileX, this.centerTileY);
                this.startPosX = t.x, this.startPosY = t.y, this.moveScaleX = (1024 - cc.winSize.width) / 2 / ((this.mapSize.width - 16) / 2 * this.tileSize.width), 
                this.moveScaleY = (2048 - cc.winSize.height) / 2 / ((this.mapSize.height - 24) / 2 * this.tileSize.height), 
                this.moveTileCenter(this.startX, this.startY), this.camara.position = this.player.node.position, 
                this.starCount = 0, this.coinCount = 0, this.xpCount = 0, this.updateStarView();
            },
            startPlayGame: function() {
                SoundMgr.play("playerin"), this.isReplay ? (this.playerControler.setControlType(n.REPLAY), 
                this.setGameState(l.READYTOPLAY), this.playerControler.beganReplay(this.replayData), 
                this.replayLayerNode.on(cc.Node.EventType.TOUCH_START, this.replaySwitchBottom, this), 
                (this.replayTm = 0) < this.replayData.length && (this.replayTm = .00167 * this.playerControler.decodeFrame(this.replayData[this.replayData.length - 1]).time)) : (this.playerControler.setControlType(n.INPUT), 
                this.playerControler.beganRecord(), this.setGameState(l.READYTOPLAY)), this.isPaused = !1, 
                this.timeAll = 0;
            },
            setGameState: function(e) {
                this.gameState != e && (console.log("setGameState", e), this.gameState = e);
            },
            clearMap: function() {
                this.map.tmxAsset = null, C.removeAll(), N.removeAll(), S.removeAll(), T.removeAll(), 
                P.removeAll(), b.removeAll(), A.removeAll(), c.removeAll(), L.removeAll(), w.removeAll(), 
                I.removeAll(), M.removeAll(), D.removeAll(), E.removeAll(), k.removeAll();
            },
            preLoad: function(e) {
                var i = this;
                return this.camara.active = !1, this.isPaused = !0, this.speedRatialCount = 1, this.speedRatialLabal.string = "x1", 
                0 == this._isOnLoadCalled && (this.isTempEnable = !0, this.node.active = !0, this.node.active = !1, 
                this.isTempEnable = !1), console.log(e), this.level = e.level, this.playerSkinId = e.skinId || User.getSkinId(), 
                this.playerWeaponId = e.weaponId || User.getWeaponId(), this.specialMapUrl = e.specialMap, 
                this.isRewardLevel = !!this.specialMapUrl, this.versionCode = Constants.PARAM.VideoVersion, 
                e.version && (this.versionCode = parseInt(e.version)), this.replayOverDialog.active = !1, 
                e.isReplay ? (this.replayDataInfo = e, this.replayLayerNode.active = !0, this.replayLayerNode.off(cc.Node.EventType.TOUCH_START, this.replaySwitchBottom, this), 
                this.isReplay = !0, this.replayNode.active = !0, this.protectNode.active = !1, this.replayerInfoNode.active = !0, 
                this.coinNode.active = !1, this.pauseBtnNode.active = !1, this.replayData = e.video, 
                this.replayOver = !1, this.playPauseBtnNode.getChildByName("stop").active = !0, 
                this.playPauseBtnNode.getChildByName("start").active = !1, this.replayerNameLabel.string = e.name, 
                e.photo && cc.loader.load(e.photo, function(e, t) {
                    e || (i.replayerImgSprite.spriteFrame = new cc.SpriteFrame(t));
                }), this.bottomShow = !0, setTimeout(function() {
                    i.bottomShow && i.replaySwitchBottom();
                }, 3e3), this.onCloseReplayCb = e.onCloseReplay, this.isZan = !1, this.zanNode.opacity = 255) : (this.isReplay = !1, 
                this.replayNode.active = !1, this.protectNode.active = !0, this.replayerInfoNode.active = !1, 
                this.coinNode.active = !0, this.replayLayerNode.active = !1), new Promise(function(e, t) {
                    i.loadAndBuildMap(i.level, function() {
                        e();
                    });
                });
            },
            loadAndBuildMap: function(i, e) {
                var n = this;
                this.setGameState(l.PREPARE);
                var t = 0, s = function() {
                    2 == ++t && e && e();
                };
                this.loadBackGround(i, s);
                for (var a = "", o = ("" + (a = i)).length; o < 3; ) a = "0" + a, o++;
                var r = "maps/level_" + a;
                this.isRewardLevel && (r = "maps/" + this.specialMapUrl), this.clearMap(), this.isTempEnable = !0, 
                this.node.active = !0, this.node.zIndex = -100;
                var c = function() {
                    n.node.active = !1, n.isTempEnable = !1, cc.loader.loadRes(r, cc.TiledMapAsset, function(e, t) {
                        n.map.tmxAsset = t, n.initGame(i), setTimeout(s, 0);
                    });
                };
                this.player.setSkinAsync(this.playerSkinId, this.playerWeaponId).then(c).catch(function(e) {
                    console.log(e), c();
                });
            },
            preloadRes: function(e) {
                var t = s.get(e);
                cc.loader.loadRes("maps/level_" + e), cc.loader.loadRes("backgrounds/" + t);
            },
            loadBackGround: function(e, i) {
                var n = this, t = s.get(e);
                cc.loader.loadRes("backgrounds/" + t, cc.SpriteFrame, function(e, t) {
                    n.farSprite.spriteFrame = t, i();
                });
            },
            buildMap: function() {
                this.mapSize = this.map.getMapSize(), this.tileSize = this.map.getTileSize(), this.tileLayer = this.map.getLayer("game"), 
                this.secretLayer = this.map.getLayer("secret"), this.tileDatas = this.tileLayer.getTiles(), 
                this.tiles = {}, this.mapMaxXP = 0, this.isSecretLayerHide = !1, this.player.initGame(), 
                C.initGame(this.mapUpLayer, this.trapPrefab, this), N.initGame(this.mapUpLayer, this.doorPrefab, this), 
                b.initGame(this.mapUpLayer, this.turnDoorPrefab, this), A.initGame(this.mapUpLayer, this.magicDoorPrefab, this), 
                c.initGame(this.mapUpLayer, this.dieWallPrefab, this), L.initGame(this.mapUpLayer, this.armMonsterPrefab, this), 
                w.initGame(this.mapUpLayer, this.bigFacePrefab, this), I.initGame(this.mapUpLayer, this.cloudPrefab, this), 
                M.initGame(this.mapDownLayer, this.wheelPrefab, this), S.initGame(this.mapUpLayer, this.glassWallPrefab, this), 
                T.initGame(this.mapUpLayer, this.boxPrefab, this), P.initGame(this.mapUpLayer, this.slotPrefab, this), 
                D.initGame(this.mapDownLayer, this.coinPrefab, this), k.initGame(this.mapUpLayer, this), 
                E.initGame(this.monsterLayer, this.mapDownLayer), this.RIPTileArr = [];
                var e = User.getStageRIPTileStr(this.level);
                e && (this.RIPTileArr[e] = 1);
                for (var t = 0; t < this.mapSize.height; t++) for (var i = 0; i < this.mapSize.width; i++) {
                    var n = this.getTileAt(i, t);
                    n.isEntry ? (this.startX = i, this.startY = t) : n.isTrap, this.RIPTileArr[i + "." + t] && k.addTile(i, t, this.ripPrefab), 
                    n.getType() != h.COIN && n.getType() != h.XP || (this.mapMaxXP += 1);
                }
                I.sort();
            },
            onEnable: function() {
                var e = this;
                this.openDebugCnt = 0, this.isTempEnable || (setTimeout(function() {
                    e.camara.active = !0;
                }, 0), this.updateShieldCount(), this.player.node.active = !1, this.maskNode.opacity = 100, 
                console.log("onEnable"), this.maskNode.runAction(cc.sequence(cc.fadeOut(.7), cc.callFunc(function() {
                    e.player.node.active = !0, 1 == e.level && (e.player.playerSP.node.scaleX = -e.player.scaleConst), 
                    e.player.playIn(), e.startPlayGame(), e.isReplay || (1 != e.level || User.isGuided("move_left") || GuideMgr.startGuide("move_left"), 
                    5 != e.level || User.isGuided("shield") || (GuideMgr.startGuide("shield"), User.getShieldCount() < 1 && User.addShield(1)), 
                    7 != e.level || User.isGuided("level8") || (e.warningLabel.string = "More traps！  Be careful!", 
                    e.warningDialog.active = !0, User.getShieldCount() < 1 && User.addShield(1)), 34 != e.level || User.isGuided("level34") || (e.warningLabel.string = "More traps！  Be careful!", 
                    e.warningDialog.active = !0, User.getShieldCount() < 1 && User.addShield(1)));
                }))), this.stageTip.string = "STAGE " + this.level, this.stageTip.node.stopAllActions(), 
                this.stageTip.node.opacity = 0, this.stageTip.node.scale = 5, this.stageTip.node.runAction(cc.sequence(cc.spawn(cc.fadeIn(0, 3), cc.scaleTo(.2, 1.5)), cc.delayTime(2), cc.spawn(cc.fadeOut(.3), cc.scaleTo(.2, 0)))), 
                AdHelper.logEvent("level_start", {
                    level: this.level,
                    type: this.isReplay ? "replay" : "play"
                }));
            },
            onDisable: function() {
                this.clearMap();
            },
            onGotoLevel: function(e) {
                var t = this;
                this.preLoad({
                    level: parseInt(e.string)
                }).then(function() {
                    t.node.active = !0;
                }), console.log(e.string);
            },
            onSetSkin: function(e) {
                PageMgr.showLoading(), User.setSkinId(parseInt(e.string)), this.player.setSkinAsync(parseInt(e.string)).then(function() {
                    PageMgr.hideLoading();
                }).catch(function() {
                    PageMgr.hideLoading();
                });
            },
            onSetWeapon: function(e) {
                this.player.setWeapon(parseInt(e.string));
            },
            onSetTiLi: function(e) {
                User.addEnergy(parseInt(e.string));
            },
            onSetGold: function(e) {
                User.addGold(parseInt(e.string));
            },
            hideSecretLayer: function() {
                var e = this;
                if (this.secretLayer && !this.isSecretLayerHide) {
                    this.isSecretLayerHide = !0, console.log("hideSecretLayer");
                    var t = 255, i = cc.repeat(cc.sequence(cc.delayTime(.016), cc.callFunc(function() {
                        (t -= 6) < 0 && (t = 0), e.secretLayer.setTileOpacity(t);
                    })), Math.floor(t / 6));
                    this.secretLayer.node.runAction(cc.sequence(i, cc.hide()));
                    this.tileDatas;
                    for (var n = this.secretLayer.getTiles(), s = 0; s < this.mapSize.height; s++) for (var a = 0; a < this.mapSize.width; a++) {
                        var o = s * this.mapSize.width + a, r = this.getTileAt(a, s), c = this.map.getPropertiesForGID(n[o]), l = null == c ? 0 : parseInt(c.type);
                        r.isWall && l == h.WALL && (console.log("removeTileAt", a, s), this.removeTileAt(a, s));
                    }
                }
            },
            getTileAt: function(e, t) {
                var i = I.getTileAt(e, t) || this.tiles[e + "." + t];
                if (i) return i;
                var n = t * this.mapSize.width + e, s = this.tileDatas[n], a = null, o = 0;
                if (0 == s && this.secretLayer && !this.isSecretLayerHide && (s = this.secretLayer.getTiles()[n]), 
                0 == s || e < 0 || t < 0 || e >= this.mapSize.width || t >= this.mapSize.height) i = new d(); else {
                    switch (o = null == (a = this.map.getPropertiesForGID(s)) ? 0 : parseInt(a.type)) {
                      case h.WALL:
                        i = new u();
                        break;

                      case h.COIN:
                        !this.isRewardLevel && this.level < User.getMaxStage() && !this.isReplay ? (i = new g(), 
                        this.tileLayer.setTileGID(4, e, t)) : (this.removeTileAt(e, t, !0), i = D.addTile(e, t));
                        break;

                      case h.XP:
                        i = new g();
                        break;

                      case h.STAR:
                        i = new p();
                        break;

                      case h.EXITPOINT:
                        this.removeTileAt(e, t, !0), i = this.exit;
                        var r = this.getTilePosition(e, t);
                        i.node.x = r.x, i.node.y = r.y;
                        break;

                      case h.ENTRYPOINT:
                        this.removeTileAt(e, t, !0), i = new m();
                        break;

                      case h.DIEWALL:
                        i = new y();
                        break;

                      case h.TRAP:
                        this.removeTileAt(e, t, !0), i = C.addTile(e, t);
                        break;

                      case h.DOOR:
                        this.removeTileAt(e, t, !0), i = N.addTile(e, t, parseInt(a.subtype));
                        break;

                      case h.TURNWALL:
                        this.removeTileAt(e, t, !0), i = b.addTile(e, t);
                        break;

                      case h.MAGICDOOR:
                        this.removeTileAt(e, t, !0), i = A.addTile(e, t);
                        break;

                      case h.ARMMONSTER:
                        this.removeTileAt(e, t, !0), (i = L.addTile(e, t)).dir = {
                            x: parseInt(a.x),
                            y: parseInt(a.y)
                        };
                        break;

                      case h.BIGFACE:
                        this.removeTileAt(e, t, !0), i = w.addTile(e, t);
                        break;

                      case h.CLOUD:
                        this.removeTileAt(e, t, !0), (i = I.addTile(e, t)).dir = {
                            x: parseInt(a.x),
                            y: parseInt(a.y)
                        };
                        break;

                      case h.WHEEL:
                        this.removeTileAt(e, t, !0), i = M.addTile(e, t, parseInt(a.subtype));
                        break;

                      case h.SPRING:
                        (i = new v()).dir = {
                            x: parseInt(a.x),
                            y: parseInt(a.y)
                        };
                        break;

                      case h.GLASSWALL:
                        i = S.addTile(e, t);
                        break;

                      case h.BOX:
                        this.removeTileAt(e, t, !0), i = T.addTile(e, t, "0" == a.subType ? "free" : "ad");
                        break;

                      case h.SLOT:
                        this.removeTileAt(e, t, !0), i = P.addTile(e, t);
                        break;

                      case h.SECRET:
                        this.removeTileAt(e, t, !0), i = new f();
                        break;

                      case h.RUNMONSTER:
                        i = new _(), E.addMonster(i, this.batPrefab);
                        break;

                      case h.FOLLOWMONSTER:
                        i = new R(), E.addMonster(i, this.lightPrefab);
                        break;

                      case h.FLYMONSTER:
                        i = new B(), E.addMonster(i, this.flyMonsterPrefab, this.rockSpritFrame);
                        break;

                      case h.SNAKE:
                        i = new F(), E.addMonster(i, this.snakePrefab);
                        break;

                      default:
                        i = new d();
                    }
                    i.setType(o), i.setProp(a);
                }
                if (i.tileX = e, i.tileY = t, i.stageLevel = this.level, ((i.mainGame = this).tiles[e + "." + t] = i).init(), 
                i.isCloud) {
                    var c = new d();
                    c.tileX = e, c.tileY = t, (c.mainGame = this).tiles[e + "." + t] = c;
                }
                return i;
            },
            removeTileAt: function(e, t, i) {
                if (e < 0 || t < 0 || e >= this.mapSize.width || t >= this.mapSize.height) console.warn("removeTileAt error", e, t, i); else {
                    this.tileLayer.setTileGID(0, e, t);
                    var n = this.tiles[e + "." + t];
                    n && n.isCoin && D.removeTile(n), i || (this.tiles[e + "." + t] = null);
                }
            },
            hideTileAt: function(e, t) {
                var i = this.tileLayer.getTileAt(e, t);
                i && i.setVisible(!1);
            },
            getTilePosition: function(e, t) {
                return cc.p(e * this.tileSize.width, -t * this.tileSize.height);
            },
            getTileCoord: function(e, t) {
                return {
                    tileX: Math.round(e / this.tileSize.width) - 1,
                    tileY: -(Math.round(t / this.tileSize.height) + 1)
                };
            },
            moveTileCenter: function(e, t) {
                this.player.setPlayerTileCoord(e, t, !0);
            },
            addStar: function() {
                this.starCount++, this.updateStarView();
            },
            addCoin: function() {
                this.coinCount++, this.xpCount++;
            },
            addCoinWithAnim: function(s, a) {
                for (var o = this, r = this.coinNode.getChildByName("coin"), e = r.convertToWorldSpaceAR(cc.v2(0, 0)), c = this.node.convertToNodeSpaceAR(e), l = Math.floor(s / 20), h = Math.floor(s / l), t = function(e) {
                    var t = G.get() || cc.instantiate(r);
                    o.node.addChild(t), t.setPosition(cc.v2(50 * (Math.random() - .5) + a.x, 50 * (Math.random() - .5) + a.y)), 
                    t.scale = 0;
                    var i = cc.callFunc(function() {
                        G.put(t), o.isReplay || (User.addGold(l, !0), 0 == e && User.addGold(s - h * l, !0));
                    }), n = .3 * Math.random();
                    t.runAction(cc.sequence(cc.scaleTo(n, .8), cc.moveTo(.4, c), i));
                }, i = 0; i < h; i++) t(i);
            },
            addShieldWithAnim: function(s, a) {
                var o = this, r = this.protectNode.getChildByName("protect_obj_icon"), e = r.convertToWorldSpaceAR(cc.v2(0, 0)), c = this.node.convertToNodeSpaceAR(e), l = Math.floor(s / 20);
                0 == l && (l = 1);
                for (var h = Math.floor(s / l), t = function(e) {
                    var t = U.get() || cc.instantiate(r);
                    o.node.addChild(t), t.setPosition(cc.v2(0 * (Math.random() - .5) + a.x, 0 * (Math.random() - .5) + a.y)), 
                    t.scale = 0;
                    var i = cc.callFunc(function() {
                        U.put(t), o.isReplay || (User.addShield(l, !0), 0 == e && User.addShield(s - h * l, !0));
                    }), n = .3 * Math.random();
                    t.runAction(cc.sequence(cc.scaleTo(n, .8), cc.moveTo(.4, c), i));
                }, i = 0; i < h; i++) t(i);
            },
            updateCoin: function() {
                this.coinLabal.string = this.coinCount, this.coinLabel.string = User.getKeyValue("goldNum") + this.coinCount;
            },
            addXP: function() {
                this.xpCount++;
            },
            onReplayOver: function() {
                var e = this;
                this.replayOver = !0, setTimeout(function() {
                    e.replayLayerNode.off(cc.Node.EventType.TOUCH_START, e.replaySwitchBottom, e), e.bottomShow || (e.replayNode.runAction(cc.moveTo(.2, cc.v2(0, 0))), 
                    e.bottomShow = !0), e.playPauseBtnNode.getChildByName("stop").active = !1, e.playPauseBtnNode.getChildByName("start").active = !0, 
                    e.replayOverLabel.string = "Replay has finished!", e.replayOverDialog.active = !0;
                }, 2e3);
            },
            onReplaySpeed: function() {
                this.speedRatialCount *= 2, 4 < this.speedRatialCount && (this.speedRatialCount = 1), 
                this.speedRatialLabal.string = "x" + this.speedRatialCount;
            },
            onReplayClose: function() {
                this.onCloseReplayCb && this.onCloseReplayCb(this.isZan), PageMgr.hideDialog("GameMain");
            },
            onReplayShare: function() {
                Utils.shareGame("ShareVideo", {
                    type: 1,
                    stage: this.level,
                    photo: this.replayDataInfo.photo,
                    name: this.replayDataInfo.name
                }, {
                    text: "😎😎😎 My wonderful replay！ Don't you look at it?",
                    from: "replayGameMain",
                    data: this.isRewardLevel ? null : {
                        sharetype: "level_recored",
                        recoreds: this.replayDataInfo,
                        version: Constants.PARAM.VideoVersion,
                        skinId: this.playerSkinId,
                        weaponId: this.playerWeaponId
                    }
                });
            },
            onGameStagePass: function() {
                var t = this;
                if (SoundMgr.playByKey("PassStage"), !this.isReplay) {
                    if (console.log("onGameStagePass"), this.playerControler.removeInput(), this.setGameState(l.LEVELPASS), 
                    this.isPaused = !0, !this.isRewardLevel) {
                        x.taskProgress(x.TaskType.PASS_LEVEL, this.level), 0 == this.continueCnt && x.taskProgress(x.TaskType.NO_HELP_PASS, this.level), 
                        this.xpCount >= this.mapMaxXP && x.taskProgress(x.TaskType.GET_ALL_POINT, this.level), 
                        x.taskProgress(x.TaskType.GET_STAR, this.level, this.starCount), x.taskProgress(x.TaskType.GATHER_POINT, this.level, this.xpCount), 
                        User.updateStageStar(this.level, this.starCount, this.xpCount >= this.mapMaxXP), 
                        User.unLockStage(this.level + 1);
                        var e = Math.floor(.00167 * this.timeAll), i = User.getStagePefectTm(this.level);
                        3 <= this.starCount && (null == i || e < i) && (Utils.UploadStageVideo(this.level, e, this.playerControler.getRecordDatas()), 
                        User.setStagePefectTm(this.level, e));
                    }
                    User.addGold(this.coinCount);
                    var n = User.addExp(this.xpCount), s = this.coinCount;
                    this.coinCount = 0, setTimeout(function() {
                        PageMgr.getPageAsync("ResultPage").then(function(e) {
                            e.getComponent("ResultPage").setData({
                                stageId: t.level,
                                starCount: t.starCount,
                                xpCount: t.xpCount,
                                maxXpCount: t.mapMaxXP,
                                coinCount: s,
                                isLevelUp: n,
                                recoreds: {
                                    isReplay: !0,
                                    level: t.level,
                                    name: User.getPlayerName(),
                                    photo: User.getPlayerPhoto(),
                                    video: t.playerControler.getRecordDatas(),
                                    skinId: User.getSkinId(),
                                    weaponId: User.getWeaponId()
                                }
                            }), t.resultShowCount++, 3 <= t.resultShowCount || 5 < t.level ? (t.level <= 5 || 5 < t.level && t.lastIsVideo) && AdHelper.isInterstitialLoad() ? (AdHelper.showInterstitialAd("result_pass", function() {
                                PageMgr.showPage("ResultPage");
                            },()=>{
                                PageMgr.showPage("ResultPage");
                            }), t.lastIsVideo = !1, t.resultShowCount = 0) : 5 < t.level && !t.lastIsVideo && AdHelper.isVideoLoad() ? (t.resultShowCount = 0, 
                            t.lastIsVideo = !0, AdHelper.showVideoAd("result_pass", function() {
                                PageMgr.showPage("ResultPage");
                            },()=>{
                                PageMgr.showPage("ResultPage");
                            })) : PageMgr.showPage("ResultPage") : PageMgr.showPage("ResultPage");
                        });
                    }, 1e3), AdHelper.logEvent("level_end", {
                        level: this.level,
                        type: "success"
                    });
                }
            },
            onResumeGame: function() {
                this.isPaused = !1, this.playerControler.setupInput();
            },
            onPauseGame: function() {
                var i = this;
                GuideMgr.isGuiding() || (this.isPaused = !0, this.playerControler.removeInput(), 
                PageMgr.getPageAsync("PauseDialog").then(function(e) {
                    var t = e.getComponent("PauseDialog");
                    PageMgr.showLoading(), t.preLoad({
                        stageId: i.level,
                        callback: i.onResumeGame.bind(i)
                    }).then(function() {
                        PageMgr.hideLoading(), PageMgr.showDialog("PauseDialog", !1, !0);
                    }, function(e) {
                        PageMgr.hideLoading();
                    });
                }));
            },
            onReplayGame: function() {
                this.moveTileCenter(this.startX, this.startY), this.timeAll = 0, this.playerControler.setControlType(n.REPLAY), 
                console.log(this.playerControler.getRecordDatas()), this.isPaused = !1, this.setGameState(l.PLAYING), 
                this.playerControler.beganReplay(this.playerControler.getRecordDatas());
            },
            continueGame: function() {
                console.log("continueGame", this.player.tileX, this.player.tileY), this.isPaused = !1, 
                this.player.revive(), this.moveTileCenter(this.player.tileX, this.player.tileY), 
                this.playerControler.setupInput(), this.setGameState(l.READYTOPLAY), w.resetAll(), 
                L.resetAll(), C.resetAll();
            },
            onResultShow: function() {
                var n = this;
                User.addGold(this.coinCount);
                var s = User.addExp(this.xpCount);
                x.taskProgress(x.TaskType.GATHER_POINT, this.level, this.xpCount), PageMgr.getPageAsync("ResultDefeatPage").then(function(e) {
                    var t = e.getComponent("ResultDefeatPage"), i = n.getPlayerPlace();
                    t.setData({
                        stageId: n.level,
                        deathPlace: i,
                        xpCount: n.xpCount,
                        recoreds: {
                            isReplay: !0,
                            level: n.level,
                            name: User.getPlayerName(),
                            photo: User.getPlayerPhoto(),
                            video: n.playerControler.getRecordDatas(),
                            skinId: User.getSkinId(),
                            weaponId: User.getWeaponId()
                        },
                        isLevelUp: s
                    }), n.resultShowCount++, 3 <= n.resultShowCount || 5 < n.level ? (n.level <= 5 || 5 < n.level && n.lastIsVideo) && AdHelper.isInterstitialLoad() ? (AdHelper.showInterstitialAd("result_fail", function() {
                        PageMgr.showPage("ResultDefeatPage");
                    },()=>{
                        PageMgr.showPage("ResultDefeatPage");
                    }), n.lastIsVideo = !1, n.resultShowCount = 0) : 5 < n.level && !n.lastIsVideo && AdHelper.isVideoLoad() ? (n.resultShowCount = 0, 
                    n.lastIsVideo = !0, AdHelper.showVideoAd("result_fail", function() {
                        PageMgr.showPage("ResultDefeatPage");
                    })) : PageMgr.showPage("ResultDefeatPage") : PageMgr.showPage("ResultDefeatPage");
                }), AdHelper.logEvent("level_end", {
                    level: this.level,
                    type: "fail"
                });
            },
            onGameOver: function() {
                var t = this;
                if (this.isReplay) {
                    var e = .00167 * this.timeAll;
                    Math.abs(this.replayTm - e) <= 1 || this.continueGame();
                } else AdHelper.logEvent("stage_game_over", {
                    stage: this.level
                }), this.gameState != l.PLAYERDIE && (this.setGameState(l.PLAYERDIE), this.isPaused = !0, 
                this.player.moveDir = null, this.playerControler.removeInput(), console.log("onGameOver"), 
                User.addGold(this.coinCount), this.coinCount = 0, setTimeout(function() {
                    t.continueCnt < 2 ? (t.continueCnt++, PageMgr.getPageAsync("continueDialog").then(function(e) {
                        e.getComponent("continueDialog").setCallBack(t), PageMgr.showDialog("continueDialog");
                    })) : t.onResultShow();
                }, 1e3));
            },
            update: function(e) {
                if (this.farBackLayer.x = -(this.camara.position.x - this.startPosX) * this.moveScaleX, 
                this.farBackLayer.y = -(this.camara.position.y - this.startPosY) * this.moveScaleY, 
                this.updateCoin(), this.updateShieldCount(), !this.isPaused) {
                    for (var t = 0; t < this.speedRatialCount; t++) this.step(10, this.timeAll), this.timeAll += 10;
                    if (this.isReplay && !this.replayOver && (this.progressCheckTm || (this.progressCheckTm = 0), 
                    this.progressCheckTm -= 10, this.progressCheckTm <= 0)) {
                        this.progressCheckTm = 100;
                        var i = .00167 * this.timeAll;
                        if (0 < this.replayTm) {
                            var n = i / this.replayTm;
                            .9999 <= n && (n = 1, i = this.replayTm, this.onReplayOver()), this.tmProgress.progress = n, 
                            this.tmLabel.string = Utils.formatTimeMS(Math.floor(i));
                        } else this.tmProgress.progress = 1, this.tmLabel.string = Utils.formatTimeMS(0), 
                        this.onReplayOver();
                    }
                }
            },
            step: function(e, t) {
                this.gameState != l.READYTOPLAY && this.gameState != l.PLAYING || (this.playerControler.step(e, t), 
                I.step(e, t), this.player.step(e, t), E.step(e, t)), this.playerControler.quaryDoubleClick() && this.onProtectClick(null, !0), 
                this.protectBar.node.parent.active = this.player.isShieldEquip(), this.protectBar.fillRange = this.player.getShieldPercent(), 
                this.gameState == l.PLAYING && (L.step(e, t), w.step(e, t), A.step(e, t), this.player.stepShieldTime(e)), 
                C.step(e, t), M.step(e, t), k.step(e, t);
                var i = cc.pLerp(this.camara.position, this.player.node.position, .2);
                this.camara.x = Math.round(i.x) + 5, this.camara.y = Math.round(i.y), this.camara.y % 2 == 1 && (this.camara.y += 1), 
                this.camara.x % 2 == 1 && (this.camara.x += 1);
            },
            updateShieldCount: function() {
                var e = User.getShieldCount();
                this.protectNumLabel.string = 0 < e ? "x" + e : "Free";
            },
            onProtectClick: function(e, t) {
                var i = this;
                0 < User.getShieldCount() && !this.player.isShieldEquip() ? (User.decShield(), GuideMgr.isGuideByKey("shield") && (User.setGuided("shield"), 
                GuideMgr.stopGuide(), PageMgr.showTips("Double click on screen is also OK")), this.playerControler.addShield()) : t || this.player.isShieldEquip() || (this.isPaused = !0, 
                this.playerControler.removeInput(), PageMgr.showMask(), PageMgr.getPageAsync("ShopQuickShowDialog").then(function(e) {
                    PageMgr.hideMask(), e.getComponent("ShopQuickShowDialog").preLoad({
                        onClose: function() {
                            i.onResumeGame();
                        },
                        type: 2
                    }), PageMgr.showDialog("ShopQuickShowDialog", !0, !0);
                }, function(e) {
                    PageMgr.hideMask(), i.onResumeGame();
                }));
            },
            addRIPCoin: function() {
                User.cleanStageRIP(this.level), this.coinCount += 10, console.log("addRIPCoin");
            },
            getPlayerPlace: function() {
                return this.player.tileX + "." + this.player.tileY;
            },
            replaySwitchBottom: function() {
                this.replayNode.stopAllActions(), this.bottomShow ? (this.replayNode.runAction(cc.moveTo(.2, cc.v2(0, -120))), 
                this.replayerInfoNode.runAction(cc.moveTo(.2, cc.v2(this.replayerInfoNode.x, 130))), 
                this.bottomShow = !1) : (this.replayNode.runAction(cc.moveTo(.2, cc.v2(0, 0))), 
                this.replayerInfoNode.runAction(cc.moveTo(.2, cc.v2(this.replayerInfoNode.x, 0))), 
                this.bottomShow = !0);
            },
            toHome: function() {
                PageMgr.showPage("HomePage");
            },
            replayPause: function() {
                this.isPaused ? (this.isPaused = !1, this.playerControler.setupInput(), this.playPauseBtnNode.getChildByName("stop").active = !0, 
                this.playPauseBtnNode.getChildByName("start").active = !1) : (this.isPaused = !0, 
                this.playerControler.removeInput(), this.playPauseBtnNode.getChildByName("stop").active = !1, 
                this.playPauseBtnNode.getChildByName("start").active = !0);
            },
            closeDebugNode: function() {
                this.debugNode.active = !1;
            },
            clickDebugMode: function() {
                this.openDebugCnt++, 20 <= this.openDebugCnt && (this.debugNode.active = !0);
            },
            onWarnOkClick: function() {
                this.warningDialog.active = !1, 7 == this.level ? GuideMgr.startGuide("level8") : 34 == this.level && GuideMgr.startGuide("level34");
            },
            clickZan: function() {
                this.isZan || (this.isZan = !0, this.zanNode.runAction(cc.fadeOut(.2)), PageMgr.showTips("You likes " + this.replayerNameLabel.string));
            },
            clearData: function() {
                User.clearData();
            }
        }), cc._RF.pop();
    }, {
        ArmMonsterMgr: "ArmMonsterMgr",
        BaseTile: "BaseTile",
        BigFaceMgr: "BigFaceMgr",
        BoxMgr: "BoxMgr",
        CloudMgr: "CloudMgr",
        CoinMgr: "CoinMgr",
        DieWallMgr: "DieWallMgr",
        DieWallTile: "DieWallTile",
        DoorMgr: "DoorMgr",
        EntryTile: "EntryTile",
        ExitTile: "ExitTile",
        FlyMonsterTile: "FlyMonsterTile",
        FollowMonsterTile: "FollowMonsterTile",
        GlassWallMgr: "GlassWallMgr",
        LevelData: "LevelData",
        MagicDoorMgr: "MagicDoorMgr",
        MonsterMgr: "MonsterMgr",
        PlayerControler: "PlayerControler",
        PlayerTile: "PlayerTile",
        RIPMgr: "RIPMgr",
        RIPTile: "RIPTile",
        RunMonsterTile: "RunMonsterTile",
        SecretTile: "SecretTile",
        SlotMgr: "SlotMgr",
        SnakeMonsterTile: "SnakeMonsterTile",
        SpringTile: "SpringTile",
        StarTile: "StarTile",
        TaskMgr: "TaskMgr",
        TrapMgr: "TrapMgr",
        TurnDoorMgr: "TurnDoorMgr",
        WallTile: "WallTile",
        WheelMgr: "WheelMgr",
        XPTile: "XPTile"
    } ],
    GlassWallMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "fef83bbyd9KwrpC/bpmeyN9", "GlassWallMgr");
        var n = {}, s = new cc.NodePool();
        n.initGame = function(e, t, i) {
            this.layerNode = e, this.prefab = t, this.mainGame = i, this.tileList = [], this.inited = !0;
        }, n.addTile = function(e, t) {
            var i = s.get() || cc.instantiate(this.prefab);
            i.position = this.mainGame.getTilePosition(e, t), this.layerNode.addChild(i);
            var n = i.getComponent("GlassWallTile");
            return this.tileList.push(n), n;
        }, n.removeAll = function(e, t) {
            if (this.inited) {
                for (var i = this.tileList.length - 1; 0 <= i; i--) s.put(this.tileList[i].node);
                this.tileList = [];
            }
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    GlassWallTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "395464X+whL5bROe5m5nBU0", "GlassWallTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {
                anim: cc.Animation
            },
            ctor: function() {
                this.isGlassWall = !0;
            },
            init: function() {
                this.isWalkable = !1;
            },
            onPlayerEnter: function(e) {
                this.isWalkable || this.mainGame.tileLayer.setTileGID(0, this.tileX, this.tileY), 
                this.isWalkable = !0;
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    Global: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "bafbd873vhBnqsRl7mEMGL3", "Global"), window.Global = {
            PLATFORM: {
                FBINSTANT: 1,
                WXINSTANT: 2,
                NATIVE: 3,
                WEB: 4,
                DEBUG: 5
            },
            platform: 5
        }, Global.platform = cc.sys.isNative ? Global.PLATFORM.NATIVE : Global.platform, 
        Global.platform = cc.sys.isBrowser ? Global.PLATFORM.WEB : Global.platform, Global.platform = Global.platform, 
        Global.platform = window.wx ? Global.PLATFORM.WXINSTANT : Global.platform, Global.isWXINSTANT = Global.platform == Global.PLATFORM.WXINSTANT, 
        Global.isFBINSTANT = Global.platform == Global.PLATFORM.FBINSTANT, Global.isDev = DEV, 
        e("enginefix"), window.Constants = e("Constants"), window.PageMgr = e("PageMgr"), 
        window.SoundMgr = e("SoundMgr"), window.DataMgr = e("DataMgr"), window.User = e("User"), 
        window.AdHelper = e("AdHelper"), window.Utils = e("Utils"), window.GuideMgr = e("GuideMgr"), 
        window.AchievementMgr = e("AchievementMgr"), t.exports = window.Global, cc._RF.pop();
    }, {
        AchievementMgr: "AchievementMgr",
        AdHelper: "AdHelper",
        Constants: "Constants",
        DataMgr: "DataMgr",
        GuideMgr: "GuideMgr",
        PageMgr: "PageMgr",
        SoundMgr: "SoundMgr",
        User: "User",
        Utils: "Utils",
        enginefix: "enginefix"
    } ],
    GuideMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "c1330+X7z9N4KGzTYcjE6Dw", "GuideMgr");
        var n = {}, s = 750, a = 1334, o = {}, r = null, c = null, l = null, h = null, d = null, u = null, g = null, p = null, m = null, f = null, y = null, v = null, T = 0, P = !1, S = null;
        o.initView = function(e) {
            s = cc.winSize.width, a = cc.winSize.height, n.move_left = {
                x: -s / 2,
                y: -a / 2 + 300,
                width: s,
                height: a - 600,
                moveS: cc.p(200, -200),
                moveE: cc.p(-100, -200),
                arrowPos: cc.p(40, -85),
                noTouchMask: !0
            }, n.move_up = {
                x: -s / 2,
                y: -a / 2 + 300,
                width: s,
                height: a - 600,
                moveS: cc.p(150, 0),
                moveE: cc.p(150, 200),
                arrowPos: cc.p(25, 60),
                noTouchMask: !0
            }, n.move_right = {
                x: -s / 2,
                y: -a / 2 + 300,
                width: s,
                height: a - 600,
                moveS: cc.p(0, -200),
                moveE: cc.p(200, -200),
                arrowPos: cc.p(130, -30),
                noTouchMask: !0
            }, n.move_down = {
                x: -s / 2,
                y: -a / 2 + 300,
                width: s,
                height: a - 600,
                moveS: cc.p(150, 0),
                moveE: cc.p(150, -200),
                arrowPos: cc.p(30, -130),
                noTouchMask: !0
            }, n.result_freespin = {
                x: -225,
                y: -320,
                width: 450,
                height: 130
            }, n.result_home = {
                x: -s / 2,
                y: a / 2 - 130,
                width: 200,
                height: 130
            }, n.home_shop = {
                x: -70,
                y: -a / 2 + 50,
                width: 140,
                height: 140
            }, n.shop_freeskin = {
                x: -315,
                y: -300,
                width: 300,
                height: 100
            }, n.shield = {
                x: -s / 2,
                y: -a / 2,
                width: 150,
                height: 150,
                doubleClick: !0
            }, n.homeplay = {
                x: 0,
                y: -a / 2 + 360,
                width: 0,
                height: 150,
                doubleClick: !0,
                noMask: !0,
                noTouchMask: !0
            }, n.level8 = {
                x: -s / 2,
                y: -a / 2,
                width: 150,
                height: 150,
                doubleClick: !0,
                noMask: !0,
                noTouchMask: !0
            }, n.level34 = {
                x: -s / 2,
                y: -a / 2,
                width: 150,
                height: 150,
                doubleClick: !0,
                noMask: !0,
                noTouchMask: !0
            }, e.active = !1, c = (r = e).getChildByName("maskLayer");
            var t = r.getChildByName("touchLayer");
            l = t.getChildByName("left"), h = t.getChildByName("right"), d = t.getChildByName("up"), 
            u = t.getChildByName("down"), f = r.getChildByName("jiantou"), y = r.getChildByName("guideArrorw"), 
            (v = r.getChildByName("guide_keys")).active = !cc.sys.isMobile, g = r.getChildByName("tipLayer"), 
            p = g.getChildByName("xinshoudiban"), (m = p.getChildByName("label").getComponent(cc.Label)).string = "", 
            p.on(cc.Node.EventType.TOUCH_START, function() {
                20 <= ++T && (P = !0, o.stopGuide());
            });
        }, o.setTouchArean = function(e, t, i, n) {
            l.x = e, h.x = e + i, u.y = t, d.y = t + n;
        }, o.setMaskArean = function(e, t, i, n) {
            c.x = e, c.y = t, c.width = i, c.height = n;
        }, o.setTip = function(e) {
            m.string = e;
        }, o.startGuide = function(e) {
            if (!P) {
                var t = n[e];
                t ? (S = e, y.active = t.arrowPos, v.active = !cc.sys.isMobile && y.active, o.setMaskArean(t.x, t.y, t.width, t.height), 
                c.active = !t.noMask, f.stopAllActions(), t.moveS ? (f.y = t.moveS.y, f.x = t.moveS.x, 
                f.runAction(cc.repeatForever(cc.sequence(cc.moveTo(1, t.moveS), cc.moveTo(.3, t.moveE), cc.delayTime(1)))), 
                t.moveS.x == t.moveE.x ? (f.rotation = -90, y.rotation = t.moveS.y > t.moveE.y ? 90 : -90) : (f.rotation = 0, 
                y.rotation = t.moveS.x > t.moveE.x ? 180 : 0), t.arrowPos && (y.x = t.arrowPos.x, 
                y.y = t.arrowPos.y)) : t.doubleClick ? (f.y = t.y, f.x = t.x + t.width / 2, f.rotation = 0, 
                f.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.1, .8), cc.scaleTo(.1, 1), cc.scaleTo(.1, .8), cc.scaleTo(.1, 1), cc.delayTime(1))))) : (f.y = t.y - t.height, 
                f.x = t.x + t.width / 2, f.runAction(cc.repeatForever(cc.sequence(cc.moveBy(.5, 0, 50), cc.moveBy(.5, 0, -50))))), 
                r.active = !0, r.opacity = 0, o.setTouchArean(0, 0, 1, 1), setTimeout(function() {
                    t.noTouchMask ? o.setTouchArean(-s / 2, -a / 2, s, a) : o.setTouchArean(t.x, t.y, t.width, t.height), 
                    r.runAction(cc.fadeIn(.1));
                }, 500)) : console.log("guide cfg not find for ===>", e);
            }
        }, o.hideGuide = function() {
            r.active = !1;
        }, o.stopGuide = function() {
            S = null, r.active = !1;
        }, o.isGuideByKey = function(e) {
            return o.isGuiding() && e == S;
        }, o.isGuiding = function() {
            return r.active;
        }, t.exports = o, cc._RF.pop();
    }, {} ],
    HomePage: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "784f9uZ0ntJp41K0pzEi0IF", "HomePage");
        var s = e("TaskMgr");
        cc.Class({
            extends: cc.Component,
            properties: {
                bgNode: cc.Node,
                moonNode: cc.Node,
                topPrefab: cc.Prefab,
                bottomNode: cc.Node,
                playNode: cc.Node,
                challegeNode: cc.Node,
                mountainNode: cc.Node,
                ninjaSP: sp.Skeleton,
                ninjaDialog: cc.Node,
                ninjaDialogLabel: cc.Label,
                energyRecTm: cc.Label,
                energyLabel: cc.Label,
                taskPoint: cc.Node,
                christmasIcon: cc.Node
            },
            setSkinAsync: function() {
                var o = this;
                return new Promise(function(i, n) {
                    var s = User.getSkinId(), a = User.getWeaponId();
                    s == o.skinId && a == o.weaponId || (o.skinId = s, o.weaponId = a, cc.loader.loadRes(DataMgr.getSkinRes(s), sp.SkeletonData, function(e, t) {
                        e ? (console.log(e), n(e)) : (o.ninjaSP.skeletonData = t, setTimeout(function() {
                            o.ninjaSP.setSkin(DataMgr.getSkinName(s));
                            var e = DataMgr.getWeaponCfgById(a);
                            o.ninjaSP.setAttachment(e.slotName, e.attachmentName), o.ninjaSP.setAnimation(0, "RuChang3", !0), 
                            i();
                        }, 0));
                    }));
                });
            },
            preLoad: function() {
                var n = this;
                this.ninjaDialog.active = !1;
                var e = this.node.getComponent(cc.Animation);
                return e.play("homepageshow"), e.sample("homepageshow"), e.stop(), new Promise(function(e, t) {
                    s.getCurTaskData();
                    var i = 0;
                    i += 1, n.setSkinAsync().then(function() {
                        (i -= 1) <= 0 && e();
                    }, function(e) {
                        t(e);
                    });
                });
            },
            onLoad: function() {
                this.animatTm = .2, this.bgNode.scale = cc.winSize.width / 750 > cc.winSize.height / 1334 ? cc.winSize.width / 750 : cc.winSize.height / 1334, 
                this.topBarY = cc.winSize.height / 2 - 60, this.bottomY = -cc.winSize.height / 2 + 120, 
                this.playBtnY = this.playNode.y, this.challegeBtnY = this.challegeNode.y, this.topNode = cc.instantiate(this.topPrefab), 
                this.node.addChild(this.topNode), this.topNode.active = !1, this.bottomNode.scale = cc.winSize.width / 750, 
                this.bottomNode.active = !1, this.playNode.active = !1, this.challegeNode.active = !1, 
                this.isFirstLoad = !0;
            },
            showActivityDialog: function() {
                console.log("showActivityDialog"), this.isFirstLoad && User.isPayReady() && 0 < User.getChristmasLeftTime() && !User.isSkinBuy(8) && 1 < User.getMaxStage() && PageMgr.showDialog("ChristmasSkinDialog");
            },
            showNinjaDialog: function() {
                if (this.entryPointData && this.entryPointData.sharetype && ("level_recored" == this.entryPointData.sharetype || "challenge_recored" == this.entryPointData.sharetype || "match_start" == this.entryPointData.sharetype || "bot_recommond_video" == this.entryPointData.sharetype)) {
                    if ("match_start" == this.entryPointData.sharetype && this.entryPointData.playerId == User.getPlayerID()) return;
                    AdHelper.logEvent("show_ninja_dialog", {
                        sharetyep: this.entryPointData.sharetype
                    }), this.ninjaDialog.scale = .1, this.ninjaDialog.active = !0, this.ninjaDialog.runAction(cc.scaleTo(.2, 1));
                }
            },
            closeNinjaDialog: function() {
                var e = this;
                this.ninjaDialog.runAction(cc.sequence(cc.scaleTo(.2, .1), cc.callFunc(function() {
                    e.ninjaDialog.active = !1;
                })));
            },
            setEntryPoint: function(e) {
                this.entryPointData = e, this.entryPointData && ("level_recored" == e.sharetype ? this.ninjaDialogLabel.string = "Do you want to watch " + e.recoreds.name + "'s wonderful replay?" : "challenge_recored" == e.sharetype ? this.ninjaDialogLabel.string = "Do you want to watch " + e.name + "'s wonderful replay?" : "match_start" == e.sharetype ? this.ninjaDialogLabel.string = "Do you accept the challenge of " + e.playerName + "?" : "bot_recommond_video" == e.sharetype && (this.ninjaDialogLabel.string = "A wonderful replay! See?"));
            },
            sendZan: function(e, t) {
                console.log("sendZan"), console.log(e, t), Utils.sendFbMessage("SharePraise", {
                    name: e,
                    photo: t
                }, {
                    text: User.getPlayerName() + " liked the replay you shared.👍👍👍",
                    from: "dian_zan"
                });
            },
            onChooseNinjaDialog: function() {
                var i = this, n = this.entryPointData;
                this.entryPointData && ("level_recored" == n.sharetype ? Utils.replayGameMain(n.recoreds, function(e) {
                    PageMgr.showPage("HomePage"), e && i.sendZan(n.recoreds.name, n.recoreds.photo);
                }) : "challenge_recored" == n.sharetype ? n.recoreds ? Utils.replayGameChallenge({
                    isPlayBackMod: !0,
                    recordDatas: n.recoreds,
                    photo: n.photo,
                    name: n.name,
                    skinId: n.skinId,
                    weaponId: n.weaponId
                }, function(e) {
                    PageMgr.showPage("HomePage"), e && i.sendZan(n.name, n.photo);
                }) : n.videoId ? (PageMgr.showLoading(), Utils.GetChallengeShareVideo(n.videoId).then(function(t) {
                    PageMgr.hideLoading(), Utils.replayGameChallenge({
                        isPlayBackMod: !0,
                        recordDatas: t.video,
                        photo: t.photo,
                        name: t.name,
                        videoId: n.videoId,
                        skinId: t.skinId,
                        weaponId: t.weaponId
                    }, function(e) {
                        e && i.sendZan(t.name, t.photo), PageMgr.hideLoading(), PageMgr.showPage("HomePage");
                    });
                }, function(e) {
                    PageMgr.hideLoading(), console.log(e);
                })) : n.playerId && (PageMgr.showLoading(), Utils.GetChallengeVideo(n.playerId, !0).then(function(t) {
                    PageMgr.hideLoading(), Utils.replayGameChallenge({
                        isPlayBackMod: !0,
                        recordDatas: t.video,
                        photo: t.photo,
                        name: t.name,
                        playerId: n.playerId,
                        skinId: t.skinId,
                        weaponId: t.weaponId
                    }, function(e) {
                        e && i.sendZan(t.name, t.photo), PageMgr.hideLoading(), PageMgr.showPage("HomePage");
                    });
                }, function() {
                    PageMgr.hideLoading(), PageMgr.showTips("Video lost!"), PageMgr.showPage("HomePage");
                })) : "match_start" == n.sharetype ? Utils.startGameChallenge({
                    entryPointData: n
                }) : "bot_recommond_video" == n.sharetype && (PageMgr.showLoading(), Utils.GetRecommondVideo().then(function(t) {
                    PageMgr.hideLoading(), Utils.replayGameMain(t, function(e) {
                        PageMgr.showPage("HomePage"), e && Utils.PraiseStageVideo(t.stageId, t.playerId);
                    });
                }, function(e) {
                    PageMgr.hideLoading(), PageMgr.showTips("Video lost try latter!!!");
                }))), this.entryPointData = null, this.ninjaDialog.active = !1;
            },
            playEnabelAnimation: function() {
                var e = this;
                this.topNode.y = this.topBarY + 200, this.bottomNode.y = this.bottomY - 200, this.topNode.active = !0, 
                this.bottomNode.active = !0, this.playNode.active = !0, this.challegeNode.active = !0, 
                this.mountainNode.active = !0, this.moonNode.active = !0, this.challegeNode.getChildByName("point").active = !User.getKeyValue("isClickChallenge"), 
                this.topNode.runAction(cc.moveTo(this.animatTm, cc.v2(0, this.topBarY))), this.bottomNode.runAction(cc.moveTo(this.animatTm, cc.v2(0, this.bottomY))), 
                this.playNode.opacity = 0, this.playNode.scale = 1, this.challegeNode.opacity = 0, 
                this.playNode.stopAllActions(), this.playNode.runAction(cc.sequence(cc.delayTime(this.animatTm), cc.fadeIn(.2))), 
                1 == User.getMaxStage() && GuideMgr.startGuide("homeplay"), this.challegeNode.active = 5 < User.getMaxStage(), 
                this.challegeNode.runAction(cc.sequence(cc.delayTime(this.animatTm), cc.fadeIn(.2))), 
                setTimeout(function() {
                    e.ninjaSP.setAnimation(0, "RuChang3", !0), e.showActivityDialog(), e.showNinjaDialog(), 
                    e.isFirstLoad = !1, User.subscribeBot();
                }, 500);
            },
            playExitAnimation: function(e, t) {
                if (t) return this.mountainNode.active = !1, this.moonNode.active = !1, this.playNode.active = !1, 
                this.challegeNode.active = !1, this.topNode.active = !1, this.bottomNode.active = !1, 
                void e();
                this.topNode.runAction(cc.sequence(cc.delayTime(.1), cc.moveTo(this.animatTm, cc.v2(0, this.topBarY + 200)))), 
                this.bottomNode.runAction(cc.sequence(cc.delayTime(.1), cc.moveTo(this.animatTm, cc.v2(0, this.bottomY - 200)), cc.callFunc(function() {
                    e && e();
                }))), this.playNode.runAction(cc.fadeOut(.2)), this.challegeNode.runAction(cc.fadeOut(.2));
            },
            playAnimation: function(t) {
                var i = this, n = this.node.getComponent(cc.Animation);
                n.off("finished"), n.stop(), n.play("homepageshow"), SoundMgr.play("home_begin"), 
                n.playNinja = function() {
                    i.ninjaSP.setSkin(DataMgr.getSkinName(User.getSkinId()));
                    var e = DataMgr.getWeaponCfgById(User.getWeaponId());
                    i.ninjaSP.setAttachment(e.slotName, e.attachmentName), i.ninjaSP.setAnimation(0, "RuChang", !1), 
                    n.once("finished", function() {
                        setTimeout(function() {
                            i.ninjaSP.setAnimation(0, "RuChang2", !1), t ? t() : i.playEnabelAnimation();
                        }, 500);
                    });
                };
            },
            onStartGame: function() {
                var e = this;
                if (this.playNode.getComponent(cc.Button).interactable = !1, GuideMgr.isGuideByKey("homeplay") && GuideMgr.stopGuide(), 
                this.entryPointData && (this.entryPointData = null, this.ninjaDialog.active = !1), 
                User.decEnergy(1)) {
                    
                        window.__adErrorCallback = window.__adFinishedCallback = ()=>{
                            var t = !1, i = function() {
                                t || (t = !0, e.playExitAnimation(function() {
                                    e.playNode.getComponent(cc.Button).interactable = !0, Utils.startGameMain({
                                        level: User.getKeyValue("stageInfo").length,
                                        from: "home"
                                    });
                                }));
                            };
                            window.FBInstant && !User.isShortCreated() ? FBInstant.canCreateShortcutAsync().then(function(e) {
                                e ? (AdHelper.logEvent("createShortcut"), FBInstant.createShortcutAsync().then(function() {
                                    AdHelper.logEvent("createShortcutSuccess"), User.markShortCreated(), i();
                                }).catch(function() {
                                    i();
                                })) : i();
                            }).catch(function() {
                                i();
                            }) : i();
                        }
                    window.__adStartCallback = ()=>{
                    }
                    createVideoAd();
                } else this.playNode.getComponent(cc.Button).interactable = !0, Utils.showGetEnergy();
            },
            onChallengeGame: function() {
                var t = this;
                User.chanllengeBtnClick(), this.challegeNode.getComponent(cc.Button).interactable = !1, 
                this.entryPointData && (this.entryPointData = null, this.ninjaDialog.active = !1), 
                User.chooseFriends({
                    from: "home_challenge"
                }, function(e) {
                    t.playExitAnimation(function() {
                        t.challegeNode.getComponent(cc.Button).interactable = !0, Utils.startGameChallenge({
                            from: "home_challenge",
                            isWithFriend: !e
                        });
                    });
                });
            },
            onEnable: function() {
                this.isFirstLoad || this.playEnabelAnimation(), this.taskPoint.active = !1, AdHelper.logEvent("home_show"), 
                this.christmasIcon.active = 0 < User.getChristmasLeftTime();
            },
            onLottery: function() {
                var t = this;
                PageMgr.getPageAsync("SpinLotteryDialog").then(function(e) {
                    t.mountainNode.active = !1, t.moonNode.active = !1, t.playNode.active = !1, t.challegeNode.active = !1, 
                    t.topNode.active = !1, t.bottomNode.active = !1, e.getComponent("SpinLotteryDialog").setFromHome(), 
                    PageMgr.showDialog("SpinLotteryDialog");
                });
            },
            onMapPage: function() {
                this.openDialog("MapPage");
            },
            onShopPage: function() {
                this.openDialog("ShopPage");
            },
            openDialog: function(e) {
                this.playExitAnimation(function() {
                    PageMgr.showDialog(e);
                }, !0), GuideMgr.isGuideByKey("homeplay") && GuideMgr.stopGuide();
            },
            onDialogClose: function() {
                this.mountainNode.active = !0, this.moonNode.active = !0, this.playNode.active = !0, 
                this.challegeNode.active = !0, this.topNode.active = !0, this.bottomNode.active = !0, 
                this.challegeNode.getChildByName("point").active = !User.getKeyValue("isClickChallenge");
                s.getComplateNum();
                this.setSkinAsync();
            },
            onTaskDialogOpen: function() {
                this.openDialog("AchivementPage");
            },
            testTaskOver: function() {
                s.taskProgress(s.TaskType.PASS_LEVEL, 2);
            },
            onRankPage: function() {
                this.openDialog("RankPage");
            },
            onTest: function() {
                PageMgr.getPageAsync("LevelUpDialog").then(function(e) {
                    var t = e.getComponent("LevelUpDialog");
                    PageMgr.showLoading(), t.preLoad().then(function() {
                        PageMgr.hideLoading(), PageMgr.showDialog("LevelUpDialog", !0);
                    }, function(e) {
                        PageMgr.hideLoading();
                    });
                });
            },
            update: function(e) {
                var t = Math.floor(Date.now() / 1e3);
                if (!this.lastCheckTm || this.lastCheckTm != t) {
                    this.lastCheckTm = t;
                    var i = User.syncEnergyInfo();
                    this.energyLabel.string = "x" + User.getKeyValue("energyNum"), this.energyRecTm.string = 0 < i ? Utils.formatTimeHMS(i) : "";
                }
            }
        }), cc._RF.pop();
    }, {
        TaskMgr: "TaskMgr"
    } ],
    HubMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "c8a96XKD0dGYZNqzZHXvbEp", "HubMgr");
        var n = {}, s = new cc.NodePool();
        n.initGame = function(e, t, i) {
            this.layerNode = e, this.prefab = t, this.mainGame = i, this.tileList = [], this.inited = !0;
        }, n.addTile = function(e, t) {
            var i = s.get() || cc.instantiate(this.prefab);
            i.position = this.mainGame.getTilePosition(e, t), this.layerNode.addChild(i);
            var n = i.getComponent("HubTile");
            return n.tileX = e, n.tileY = t, n.mainGame = this.mainGame, this.tileList.push(n), 
            n;
        }, n.removeTile = function(e) {
            if (this.inited) for (var t = this.tileList.length - 1; 0 <= t; t--) if (this.tileList[t] == e) {
                this.tileList.splice(t, 1), s.put(e.node);
                break;
            }
        }, n.removeAll = function(e, t) {
            if (this.inited) {
                for (var i = this.tileList.length - 1; 0 <= i; i--) s.put(this.tileList[i].node);
                this.tileList = [];
            }
        }, n.resetAll = function(e, t) {
            if (this.inited) for (var i = this.tileList.length - 1; 0 <= i; i--) this.tileList[i].reset();
        }, n.step = function(e, t) {
            this.inited;
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    HubTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7382aVvqM9EC7aFNNi0BK5y", "HubTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {},
            ctor: function() {
                this.isHub = !0;
            },
            onPlayerEnter: function(e) {
                this.mainGame.onGameStagePass(!0, 0 == this.tileX), e.playerSP.node.scaleY = e.scaleConst, 
                e.playerSP.node.scaleX = e.scaleConst * e.moveDir.x, e.playerSP.node.rotation = 0, 
                e.playerSP.node.x = e.posConfig.down.x, e.playerSP.node.y = e.posConfig.down.y;
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    JumpGame: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "8663bf9hL9FRKE6A5dMH+XX", "JumpGame");
        var n = e("AdHelper");
        cc.Class({
            extends: cc.Component,
            properties: {
                img: cc.Sprite,
                gameId: "1250735238360354",
                fromGame: "lastknife"
            },
            start: function() {
                this.node.on("click", this.onSwitchGame.bind(this));
            },
            onEnable: function() {
                return;
            },
            setAdData: function(e) {
            },
            onSwitchGame: function() {
            }
        }), cc._RF.pop();
    }, {
        AdHelper: "AdHelper"
    } ],
    LevelData: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "c731do8M/hIfJD342M78nPt", "LevelData");
        var n = {
            1: "bg_01",
            2: "bg_01",
            3: "bg_01",
            4: "bg_01",
            5: "bg_01",
            6: "bg_02",
            7: "bg_02",
            8: "bg_02",
            9: "bg_02",
            10: "bg_02",
            11: "bg_03",
            12: "bg_03",
            13: "bg_03",
            14: "bg_03",
            15: "bg_03",
            16: "bg_02",
            17: "bg_02",
            18: "bg_02",
            19: "bg_02",
            20: "bg_02",
            21: "bg_04",
            22: "bg_04",
            23: "bg_04",
            24: "bg_04",
            25: "bg_04",
            26: "bg_05",
            27: "bg_05",
            28: "bg_05",
            29: "bg_05",
            30: "bg_05",
            31: "bg_07",
            32: "bg_07",
            33: "bg_07",
            34: "bg_07",
            35: "bg_07"
        };
        t.exports = {
            get: function(e) {
                return n[e] || "bg_01";
            }
        }, cc._RF.pop();
    }, {} ],
    LevelUpDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "4e42cXGf+ZMgonNNVmQ0Ya3", "LevelUpDialog"), cc.Class({
            extends: cc.Component,
            properties: {
                titleLabel: cc.Label,
                playerSP: sp.Skeleton,
                weaponImgArr: [ cc.SpriteFrame ],
                moneyNode: cc.Node,
                weaponNode: cc.Node,
                skinNode: cc.Node,
                itemNumLabel: cc.Label,
                doubleNode: cc.Button,
                claimNode: cc.Node,
                moneyClaimNode: cc.Node,
                weaponSprite: cc.Sprite,
                adClaimNode: cc.Node,
                inviteClaimNode: cc.Node
            },
            preLoad: function() {
                var s = this, e = User.getKeyValue("level");
                return this.levelCfg = DataMgr.getLevelCfgById(e), new Promise(function(i, n) {
                    if (2 == s.levelCfg.rewardType) cc.loader.loadRes(DataMgr.getSkinRes(s.levelCfg.rewardNum), sp.SkeletonData, function(e, t) {
                        e ? n(e) : (s.playerSP.skeletonData = t, i());
                    }); else if (3 == s.levelCfg.rewardType) {
                        var e = DataMgr.getWeaponCfgById(s.levelCfg.rewardNum);
                        cc.loader.loadRes("daoImg/" + e.shopImgName, cc.SpriteFrame, function(e, t) {
                            e ? n(e) : (s.weaponSprite.spriteFrame = t, i());
                        });
                    } else i();
                });
            },
            onEnable: function() {
                if (this.weaponNode.active = !1, this.moneyNode.active = !1, this.skinNode.active = !1, 
                this.claimNode.active = !1, this.moneyClaimNode.active = !1, this.adClaimNode.active = !1, 
                this.inviteClaimNode.active = !1, this.closeStr = "", 1 == this.levelCfg.rewardType) this.moneyNode.active = !0, 
                this.moneyClaimNode.active = !0, this.itemNumLabel.string = this.levelCfg.rewardNum, 
                this.isDouble = !1, this.addReward(), this.doubleNode.interactable = AdHelper.isVideoLoad(), 
                this.closeStr = "Wow! Get " + this.levelCfg.rewardNum + " conis!"; else if (2 == this.levelCfg.rewardType) {
                    0 < DataMgr.getSkinCfgById(this.levelCfg.rewardNum).coinNeed ? this.claimNode.active = !0 : (this.inviteClaimNode.active = !1, 
                    this.adClaimNode.active = cc.sys.isMobile, this.adClaimNode.getComponent(cc.Button).interactable = AdHelper.isVideoLoad()), 
                    this.closeStr = "Wow! Unlocked a new skin!", this.skinNode.active = !0, this.playerSP.setSkin(DataMgr.getSkinName(this.levelCfg.rewardNum));
                    var e = DataMgr.getWeaponCfgById(User.getWeaponId());
                    this.playerSP.setAttachment(e.slotName, e.attachmentName), this.playerSP.setAnimation(0, "RuChang3", !0);
                } else if (3 == this.levelCfg.rewardType) {
                    0 < DataMgr.getWeaponCfgById(this.levelCfg.rewardNum).coinNeed ? this.claimNode.active = !0 : (this.inviteClaimNode.active = !1, 
                    this.adClaimNode.active = cc.sys.isMobile, this.adClaimNode.getComponent(cc.Button).interactable = AdHelper.isVideoLoad()), 
                    this.closeStr = "Wow! Unlocked a new weapons!", this.weaponNode.active = !0;
                }
            },
            onClickExit: function() {
                PageMgr.hideDialog("LevelUpDialog"), PageMgr.showTips(this.closeStr);
            },
            onAdClaim: function() {
                var e = this;
                AdHelper.logEvent("levelupUnlockAd", {
                    type: this.levelCfg.rewardType,
                    num: this.levelCfg.rewardNum
                }), AdHelper.showVideoAd("levelupUnlock", function() {
                    2 == e.levelCfg.rewardType ? (User.skinBuy(e.levelCfg.rewardNum), User.setSkinId(e.levelCfg.rewardNum), 
                    e.closeStr = "Wow! Equipped with a new skin!") : 3 == e.levelCfg.rewardType && (User.weaponBuy(e.levelCfg.rewardNum), 
                    User.setWeaponId(e.levelCfg.rewardNum), e.closeStr = "Wow! Equipped with a new weapon!"), 
                    e.onClickExit();
                });
            },
            onInviteClaim: function() {
                var t = this;
                AdHelper.logEvent("levelup_invite_click"), PageMgr.showMask(), Utils.sendFbMessage("ShareGame", {
                    playerName: User.getPlayerName(),
                    playerPhoto: User.getPlayerPhoto()
                }, {
                    text: "😉😉😉 Never found such a fun game, try it!",
                    from: "levelup"
                }, function() {
                    User.chooseFriends({
                        from: "level_invite"
                    }, function(e) {
                        e ? "SAME_CONTEXT" == e.code && PageMgr.showTips("YOU ALREADY MESSAGED THIS FRIEND.") : (2 == t.levelCfg.rewardType ? (User.skinBuy(t.levelCfg.rewardNum), 
                        User.setSkinId(t.levelCfg.rewardNum), t.closeStr = "Wow! Equipped with a new skin!") : 3 == t.levelCfg.rewardType && (User.weaponBuy(t.levelCfg.rewardNum), 
                        User.setWeaponId(t.levelCfg.rewardNum), t.closeStr = "Wow! Equipped with a new weapon!"), 
                        t.onClickExit());
                    });
                });
            },
            addReward: function() {
                User.addReward(Constants.ITEMTYPE.COIN, this.levelCfg.rewardNum), this.closeStr = "Wow! Get " + 2 * this.levelCfg.rewardNum + " conis!";
            },
            doubleClick: function() {
                var e = this;
                this.isDouble || (AdHelper.logEvent("levelup_double_click"), AdHelper.showVideoAd("doubleLevelUp", function() {
                    e.isDouble = !0, e.itemNumLabel.string = 2 * e.levelCfg.rewardNum, e.itemNumLabel.node.runAction(cc.sequence(cc.scaleTo(.1, 1.5), cc.scaleTo(.2, 1))), 
                    e.addReward(), e.doubleNode.interactable = !1;
                }));
            },
            start: function() {
                this.node.scale = cc.winSize.width / 750;
            }
        }), cc._RF.pop();
    }, {} ],
    ListItem: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "9102cVXYzBCj4wn2Bpb5LQ2", "ListItem"), cc.Class({
            extends: cc.Component,
            updateItem: function(e, t) {}
        }), cc._RF.pop();
    }, {} ],
    ListView: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "4c02bmIer9GSYw0Ulor3BNN", "ListView"), cc.Class({
            extends: cc.ScrollView,
            properties: {
                itemPrefab: cc.Prefab,
                spacing: 0,
                isFixWidth: !1
            },
            onLoad: function() {
                this.isVertical = !0, 0 == this.vertical && (this.isVertical = !1), this.lastIndex = 0, 
                this.listData = [], this.items = [], this.updateTimer = 0, this.lastContentPosY = 0, 
                this.lastContentPosX = 0, this.itemsOffsetY = [], this.content || (this.content = new cc.Node(), 
                this.content.width = this.node.width, this.node.addChild(this.content)), this.itemName = this.itemPrefab.name, 
                this.isVertical ? (this.itemSize = this.itemPrefab.data.height <= 0 ? 100 : this.itemPrefab.data.height, 
                this.bufferZone = this.node.height / 2 + this.itemPrefab.data.height / 2, this.content.y = this.node.height / 2, 
                this.content.anchorY = 1, this.content.anchorX = .5, this.contentOffset = this.itemPrefab.data.height / 2) : (this.itemSize = this.itemPrefab.data.width <= 0 ? 100 : this.itemPrefab.data.width, 
                this.bufferZone = this.node.width / 2 + this.itemPrefab.data.width / 2, this.content.x = -this.node.width / 2, 
                this.contentOffset = this.itemPrefab.data.width / 2, this.content.anchorY = .5, 
                this.content.anchorX = 0), this.isFixWidth && (this.itemSize = this.itemSize * cc.winSize.width / 750), 
                this.spawnCount = Math.ceil(2 * this.bufferZone / this.itemSize + 1), this.onItemClickCB = null;
                for (var e = 0; e < this.spawnCount; e++) {
                    var t = cc.instantiate(this.itemPrefab);
                    this.content.addChild(t), this.isFixWidth && (t.scale = cc.winSize.width / 750), 
                    this.isVertical ? t.y = -(e + .5) * (this.itemSize + this.spacing) : t.x = (e + .5) * (this.itemSize + this.spacing), 
                    t.active = !1, this.items.push(t), t.on("click", this._onItemClick.bind(this));
                }
            },
            onItemClick: function(e) {
                this.onItemClickCB = e;
            },
            _onItemClick: function(e) {
                this.onItemClickCB && this.onItemClickCB(e.currentTarget.getComponent(this.itemName));
            },
            initItems: function() {
                if (this.items) {
                    this.isVertical ? this.scrollToTop(0) : this.scrollToLeft(0), this.update(0);
                    for (var e = 0; e < this.items.length; e++) {
                        var t = this.items[e].getComponent(this.itemName);
                        e < this.listData.length ? (t.updateItem(e, this.listData[e]), this.items[e].active = !0) : this.items[e].active = !1;
                    }
                    this.isVertical ? this.content.height = this.listData.length * (this.itemSize + this.spacing) + this.spacing : this.content.width = this.listData.length * (this.itemSize + this.spacing) + this.spacing;
                }
            },
            removeAllItems: function() {
                for (var e = 0; e < this.items.length; e++) this.items[e].active = !1;
                this.content.stopAllActions(), this.content.y = 0, this.lastContentPosY = 0, this.lastContentPosX = 0;
            },
            getItem: function(e) {
                for (var t = this.items, i = 0; i < t.length; i++) {
                    var n = t[i].getComponent(this.itemName);
                    if (n.itemId == e) return n;
                }
            },
            setItemsData: function(e) {
                var t = this;
                setTimeout(function() {
                    t.listData = e, t.initItems();
                }, 0);
            },
            updateItemsData: function(e) {
                this.listData = e;
                for (var t = 0; t < this.items.length; t++) {
                    var i = this.items[t].getComponent(this.itemName);
                    t < this.listData.length ? (i.updateItem(i.itemId, this.listData[i.itemId]), this.items[t].active = !0) : this.items[t].active = !1;
                }
            },
            addItemsData: function(e) {
                this.listData.push.apply(this.listData, e), this.lastIndex += e.length, this.isVertical ? this.content.height = this.listData.length * (this.itemSize + this.spacing) + this.spacing : this.content.width = this.listData.length * (this.itemSize + this.spacing) + this.spacing;
            },
            requestMoreData: function() {},
            getPositionInView: function(e) {
                var t = e.parent.convertToWorldSpaceAR(e.position);
                return this.node.convertToNodeSpaceAR(t);
            },
            scollToIndex: function(e, t) {
                t || (t = 0);
                var i = 0;
                if (this.isVertical) {
                    var n = this.content.y, s = (e + .5) * (this.itemSize + this.spacing) - this.node.height / 2;
                    this.scrollToOffset(cc.v2(0, s), t, !0), (i = n + s - this.node.height / 2) < 0 && (i = 0);
                } else {
                    var a = this.content.x, o = (e + .5) * (this.itemSize + this.spacing) - this.node.width / 2;
                    this.scrollToOffset(cc.v2(o, 0), t, !0), (i = a + o - this.node.width / 2) < 0 && (i = 0);
                }
                return i;
            },
            update: function(e) {
                if (cc.ScrollView.prototype.update.call(this, e), this.updateTimer += e, this.isVertical) {
                    if (Math.abs(this.lastContentPosY - this.content.y) < this.itemSize / 4) return;
                    this.updateTimer = 0;
                    for (var t = this.items, i = this.content.y < this.lastContentPosY, n = (this.itemSize + this.spacing) * t.length, s = 0; s < t.length; ++s) {
                        var a = this.getPositionInView(t[s]);
                        if (i) for (;a.y + this.contentOffset < -this.bufferZone && t[s].y + n < 0; ) {
                            t[s].setPositionY(t[s].y + n);
                            var o = t[s].getComponent(this.itemName), r = o.itemId - t.length;
                            0 <= r && r < this.listData.length && o.updateItem(r, this.listData[r]), a = this.getPositionInView(t[s]);
                        } else for (;a.y - this.contentOffset > this.bufferZone && t[s].y + this.content.height > n; ) {
                            t[s].setPositionY(t[s].y - n);
                            var c = t[s].getComponent(this.itemName), l = c.itemId + t.length;
                            0 <= l && l < this.listData.length && c.updateItem(l, this.listData[l]), a = this.getPositionInView(t[s]);
                        }
                    }
                    this.lastContentPosY = this.content.y;
                } else {
                    var h = this.content.x > this.lastContentPosX;
                    if (Math.abs(this.lastContentPosX - this.content.x) < this.itemSize / 4) return;
                    this.updateTimer = 0;
                    for (var d = this.items, u = (this.itemSize + this.spacing) * d.length, g = 0; g < d.length; ++g) {
                        var p = this.getPositionInView(d[g]);
                        if (h) for (;p.x - this.contentOffset > this.bufferZone && 0 < d[g].x - u; ) {
                            d[g].setPositionX(d[g].x - u);
                            var m = d[g].getComponent(this.itemName), f = m.itemId - d.length;
                            0 <= f && f < this.listData.length && m.updateItem(f, this.listData[f]), p = this.getPositionInView(d[g]);
                        } else for (;p.x + this.contentOffset < -this.bufferZone && this.content.width - d[g].x > u; ) {
                            d[g].setPositionX(u + d[g].x);
                            var y = d[g].getComponent(this.itemName), v = y.itemId + d.length;
                            0 <= v && v < this.listData.length && y.updateItem(v, this.listData[v]), v > this.listData.length - 10 && this.requestMoreData(), 
                            p = this.getPositionInView(d[g]);
                        }
                    }
                    this.lastContentPosX = this.content.x;
                }
            }
        }), cc._RF.pop();
    }, {} ],
    MagicDoorMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f11d4wKCfRPaY/J8cjqSS7i", "MagicDoorMgr");
        var n = {}, s = new cc.NodePool();
        n.initGame = function(e, t, i) {
            this.layerNode = e, this.prefab = t, this.mainGame = i, this.tileList = [], this.inited = !0;
        }, n.addTile = function(e, t) {
            var i = s.get() || cc.instantiate(this.prefab);
            i.position = this.mainGame.getTilePosition(e, t), i.x += this.mainGame.tileSize.width / 2, 
            i.y -= this.mainGame.tileSize.height / 2, this.layerNode.addChild(i);
            var n = i.getComponent("MagicDoorTile");
            return this.tileList.push(n), n;
        }, n.removeAll = function(e, t) {
            if (this.inited) {
                for (var i = this.tileList.length - 1; 0 <= i; i--) s.put(this.tileList[i].node);
                this.tileList = [];
            }
        }, n.resetAll = function(e, t) {
            if (this.inited) for (var i = this.tileList.length - 1; 0 <= i; i--) this.tileList[i].reset();
        }, n.step = function(t, i) {
            this.inited && this.tileList.forEach(function(e) {
                e.step(t, i);
            });
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    MagicDoorTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "baf516UfytObZaDM3NDpNdo", "MagicDoorTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {
                xuWall: cc.Node,
                shiWall: cc.Node
            },
            ctor: function() {
                this.isTurnDoor = !0, this.isWalkable = !0, this.timeInterval = 1e3;
            },
            init: function() {
                this.isWalkable = !0, this.xuWall.active = this.isWalkable, this.shiWall.active = !this.xuWall.active, 
                this.leftTime = 0, this.isPlayerStand = !1;
            },
            reset: function() {
                this.init();
            },
            onPlayerLeave: function(e) {
                this.isWalkable && (this.isWalkable = !1, this.xuWall.active = this.isWalkable, 
                this.shiWall.active = !this.xuWall.active, this.leftTime = this.timeInterval);
            },
            onPlayerStandOn: function(e) {
                this.isPlayerStand = !0;
            },
            onPlayerStandOff: function(e) {
                this.isPlayerStand = !1;
            },
            step: function(e, t) {
                this.isWalkable || (this.leftTime -= e, this.leftTime <= 0 && (this.leftTime = 0, 
                this.isPlayerStand || (this.isWalkable = !0, this.xuWall.active = this.isWalkable, 
                this.shiWall.active = !this.xuWall.active)));
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    MapPageItem: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "d82e5i6mGFC16/McGQb7wvN", "MapPageItem");
        var n = e("ListItem");
        cc.Class({
            extends: n,
            properties: {
                itemList: [ cc.Node ]
            },
            onEnable: function() {},
            setItemData: function(e, t) {
                if (null != t) {
                    this.itemList[e].active = !0;
                    for (var i = this.itemList[e].getChildByName("starBar"), n = 0; n < 3; ++n) {
                        var s = i.getChildByName("mappage_starlight" + (n + 1));
                        n < t.star && 0 < t.enable ? s.active = !0 : s.active = !1;
                    }
                    0 < t.isClear ? this.itemList[e].getChildByName("gua").active = !0 : this.itemList[e].getChildByName("gua").active = !1;
                    var a = this.itemList[e].getChildByName("mappage_level");
                    a.getChildByName("levelLabel").getComponent(cc.Label).string = t.stageId;
                    var o = this.itemList[e].getComponent(cc.Button);
                    o.interactable = 1 == t.enable, a.getComponent(cc.Sprite)._sgNode.setState(o.interactable ? 0 : 1);
                } else this.itemList[e].active = !1;
            },
            updateItem: function(e, t) {
                this.itemData = t, this.itemId = e;
                for (var i = 0; i < 3; ++i) this.setItemData(i, t[i]);
            },
            onClickItem: function(e, t) {
                var i = this;
                0 < User.getKeyValue("energyNum") ? PageMgr.getPageAsync("BeginShowDialog").then(function(e) {
                    e.getComponent("BeginShowDialog").setData(i.itemData[parseInt(t)]), PageMgr.showDialog("BeginShowDialog", !0, !0);
                }) : Utils.showGetEnergy();
            },
            start: function() {}
        }), cc._RF.pop();
    }, {
        ListItem: "ListItem"
    } ],
    MapPage: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "17f29QuQbhON5cMyD5S9C74", "MapPage");
        var n = e("ListView");
        cc.Class({
            extends: cc.Component,
            properties: {
                topBarPrefab: cc.Prefab,
                bottomNode: cc.Node,
                itemList: n
            },
            playEnableAnimation: function() {
                this.topBar.runAction(cc.moveTo(.5, cc.v2(0, this.topBarY))), this.bottomNode.runAction(cc.moveTo(.5, cc.v2(0, 0)));
            },
            onLoad: function() {
                this.topBar = cc.instantiate(this.topBarPrefab), this.node.addChild(this.topBar), 
                this.topBarY = cc.winSize.height / 2 - 60, this.topBar.y = this.topBarY, this.itemList.node.scale = cc.winSize.width / 750;
            },
            onEnable: function() {
                var t = this;
                this.itemList.setItemsData(User.getStageInfo()), setTimeout(function() {
                    var e = User.getKeyValue("stageInfo").length;
                    t.itemList.scollToIndex(Math.floor(e / 3));
                }, 10);
            },
            start: function() {},
            onToHome: function() {
                PageMgr.hideDialog("MapPage");
                var e = PageMgr.getPage("HomePage");
                e && e.getComponent("HomePage").onDialogClose();
            }
        }), cc._RF.pop();
    }, {
        ListView: "ListView"
    } ],
    MatchResult: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "85b25N8pGVL24Cf/Y0l86ws", "MatchResult"), cc.Class({
            extends: cc.Component,
            properties: {
                playerScore: cc.Label,
                playerPhoto: cc.Sprite,
                playerSp: sp.Skeleton,
                win: cc.Node,
                playerScore2: cc.Label,
                playerPhoto2: cc.Sprite,
                playerSp2: sp.Skeleton,
                win2: cc.Node
            },
            onLoad: function() {
                var a = this;
                this.node.on("pre_capture", function(e) {
                    var n = e.detail;
                    a.playerScore.string = n.score, a.playerScore2.string = n.score2, a.win.active = n.score > n.score2, 
                    a.win2.active = n.score < n.score2;
                    var t = 0, s = function() {
                        4 == ++t && a.node.emit("finished");
                    };
                    n.photo ? cc.loader.load(n.photo, function(e, t) {
                        a.playerPhoto.spriteFrame = new cc.SpriteFrame(t), s();
                    }) : s(), cc.loader.loadRes(DataMgr.getSkinRes(n.avatorId), sp.SkeletonData, function(e, t) {
                        a.playerSp.skeletonData = t, a.playerSp.setAnimation(0, "RuChang3", !0), a.playerSp.setSkin(DataMgr.getSkinName(n.avatorId));
                        var i = DataMgr.getWeaponCfgById(n.weaponId);
                        a.playerSp.setAttachment(i.slotName, i.attachmentName), s();
                    }), n.photo2 ? cc.loader.load(n.photo2, function(e, t) {
                        a.playerPhoto2.spriteFrame = new cc.SpriteFrame(t), s();
                    }) : s(), cc.loader.loadRes(DataMgr.getSkinRes(n.avatorId2), sp.SkeletonData, function(e, t) {
                        a.playerSp2.skeletonData = t, a.playerSp2.setAnimation(0, "RuChang3", !0), a.playerSp2.setSkin(DataMgr.getSkinName(n.avatorId2));
                        var i = DataMgr.getWeaponCfgById(n.weaponId2);
                        a.playerSp2.setAttachment(i.slotName, i.attachmentName), s();
                    });
                });
            }
        }), cc._RF.pop();
    }, {} ],
    MatchStart: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7422bVl1sZLOIbCBGPzkEnD", "MatchStart"), cc.Class({
            extends: cc.Component,
            properties: {
                playerScore: cc.Label,
                playerPhoto: cc.Sprite,
                playerSp: sp.Skeleton
            },
            onLoad: function() {
                var o = this;
                this.node.on("pre_capture", function(e) {
                    var t = e.detail;
                    o.playerScore.string = t.score;
                    var n = t.avatorId, s = t.weaponId, i = 0, a = function() {
                        2 == ++i && o.node.emit("finished");
                    };
                    t.photo ? cc.loader.load(t.photo, function(e, t) {
                        o.playerPhoto.spriteFrame = new cc.SpriteFrame(t), a();
                    }) : a(), cc.loader.loadRes(DataMgr.getSkinRes(n), sp.SkeletonData, function(e, t) {
                        o.playerSp.skeletonData = t, o.playerSp.setAnimation(0, "RuChang3", !0), o.playerSp.setSkin(DataMgr.getSkinName(n));
                        var i = DataMgr.getWeaponCfgById(s);
                        o.playerSp.setAttachment(i.slotName, i.attachmentName), a();
                    });
                });
            }
        }), cc._RF.pop();
    }, {} ],
    MaxLevelDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f6040TUAKlIrY9ujx2uV5r5", "MaxLevelDialog"), cc.Class({
            extends: cc.Component,
            properties: {
                titleLabel: cc.Label,
                playerSP: sp.Skeleton
            },
            preLoad: function(e) {
                var s = this;
                return this.titleLabel.string = "STAGE " + e.stageId, new Promise(function(i, n) {
                    cc.loader.loadRes(DataMgr.getSkinRes(User.getSkinId()), sp.SkeletonData, function(e, t) {
                        e ? n(e) : (s.playerSP.skeletonData = t, i());
                    });
                });
            },
            onEnable: function() {
                this.playerSP.setSkin(DataMgr.getSkinName(User.getSkinId()));
                var e = DataMgr.getWeaponCfgById(User.getWeaponId());
                this.playerSP.setAttachment(e.slotName, e.attachmentName), this.playerSP.setAnimation(0, "RuChang3", !0);
            },
            onClickExit: function() {
                PageMgr.hideDialog("MaxLevelDialog");
            },
            start: function() {
                this.node.scale = cc.winSize.width / 750;
            }
        }), cc._RF.pop();
    }, {} ],
    MonsterMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "967d8D6ysBLQ7Bnt5USmhiz", "MonsterMgr");
        var n = {
            initGame: function(e, t) {
                this.monsterLayer = e, this.mapDownLayer = t, this.batTileList = [], this.removeTileList = [], 
                this.snakeTaget = [], this.followTileList = [];
            },
            addFollowTile: function(e) {
                this.followTileList.push(e);
            },
            onPlayerDirChange: function(e) {
                for (var t = 0; t < this.followTileList.length; ++t) this.followTileList[t].onPlayerChangeDir(e);
            },
            addMonster: function(e, t, i) {
                e.setMonster(this, t, i) && this.batTileList.push(e);
            },
            removeMonster: function(e) {
                this.removeTileList.push(e);
            },
            removeAll: function() {
                if (this.batTileList) for (var e = 0; e < this.batTileList.length; ++e) this.batTileList[e].removeAll();
            },
            step: function(e, t) {
                if (this.batTileList) {
                    for (var i = 0; i < this.batTileList.length; ++i) this.batTileList[i].step(e), this.batTileList[i].isHit();
                    for (var n = 0; n < this.removeTileList.length; n++) for (var s = this.removeTileList[n], a = 0; a < this.batTileList.length; ++a) if (this.batTileList[a].tileX == s.tileX && this.batTileList[a].tileY == s.tileY) {
                        this.batTileList[a].removeAll(), this.batTileList.splice(a, 1);
                        break;
                    }
                    this.removeTileList = [];
                }
            },
            freeze: function() {
                if (this.batTileList) for (var e = 0; e < this.batTileList.length; ++e) this.batTileList[e].onFreeze && this.batTileList[e].onFreeze();
            },
            unFreeze: function() {
                if (this.batTileList) for (var e = 0; e < this.batTileList.length; ++e) this.batTileList[e].onUnFreeze && this.batTileList[e].onUnFreeze();
            }
        };
        t.exports = n, cc._RF.pop();
    }, {} ],
    NewSkinDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f774fd9lndJs77tv1c8k2NM", "NewSkinDialog"), cc.Class({
            extends: cc.Component,
            properties: {
                ninjaSp: sp.Skeleton,
                equipNode: cc.Node,
                coinLabel: cc.Label
            },
            onLoad: function() {
                this.node.scale = cc.winSize.width / 750;
            },
            preLoad: function(a) {
                var o = this;
                this.skinId = a;
                var e = DataMgr.getSkinCfgById(a);
                return this.equipNode.active = 0 == e.coinNeed, this.coinLabel.string = e.coinNeed, 
                this.node.active = !0, this.node.opacity = 0, new Promise(function(n, s) {
                    cc.loader.loadRes(DataMgr.getSkinRes(a), sp.SkeletonData, function(e, t) {
                        if (o.node.active = !1, o.node.opacity = 255, e) console.log(e), s(); else {
                            o.ninjaSp.skeletonData = t, o.ninjaSp.setSkin(DataMgr.getSkinName(a)), o.ninjaSp.setAnimation(0, "RuChang3", !0);
                            var i = DataMgr.getWeaponCfgById(User.getWeaponId());
                            o.ninjaSp.setAttachment(i.slotName, i.attachmentName), n();
                        }
                    });
                });
            },
            onUnlockClick: function() {
                var e = DataMgr.getSkinCfgById(this.skinId);
                User.decGold(e.coinNeed) ? (User.skinBuy(this.skinId), PageMgr.hideDialog("NewSkinDialog"), 
                PageMgr.showTips("Wow! Unlocked a new skin!")) : PageMgr.showTips("Not enough coins");
            },
            onEquipClick: function() {
                User.setSkinId(this.skinId), PageMgr.hideDialog("NewSkinDialog"), PageMgr.showTips("Wow! Equipped with a new skin!");
            },
            onClose: function() {
                PageMgr.hideDialog("NewSkinDialog");
            }
        }), cc._RF.pop();
    }, {} ],
    NewWeaponDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "40304KqNyVPTbJQ9dzaZPb1", "NewWeaponDialog"), cc.Class({
            extends: cc.Component,
            properties: {
                weaponSp: cc.Sprite,
                desLabel: cc.Label,
                coinLabel: cc.Label,
                equipNode: cc.Node
            },
            onLoad: function() {
                this.node.scale = cc.winSize.width / 750;
            },
            preLoad: function(e) {
                var s = this;
                this.weaponId = e, this.node.active = !0, this.node.opacity = 0;
                var t = DataMgr.getWeaponCfgById(e);
                return this.equipNode.active = 0 == t.coinNeed, this.coinLabel.string = t.coinNeed, 
                new Promise(function(i, n) {
                    s.desLabel.string = t.desc, cc.loader.loadRes("daoImg/" + t.shopImgName, cc.SpriteFrame, function(e, t) {
                        s.node.active = !1, s.node.opacity = 255, e ? (console.log(e), n(e)) : (s.weaponSp.spriteFrame = t, 
                        i());
                    });
                });
            },
            onUnlockClick: function() {
                var e = DataMgr.getWeaponCfgById(this.weaponId);
                User.decGold(e.coinNeed) ? (User.weaponBuy(this.weaponId), PageMgr.hideDialog("NewWeaponDialog"), 
                PageMgr.showTips("Wow! Unlocked a new weapon!")) : PageMgr.showTips("Not enough coins");
            },
            onEquipClick: function() {
                User.setWeaponId(this.weaponId), PageMgr.hideDialog("NewWeaponDialog"), PageMgr.showTips("Wow! Equipped with a new weapon!");
            },
            onClose: function() {
                PageMgr.hideDialog("NewWeaponDialog");
            }
        }), cc._RF.pop();
    }, {} ],
    PageMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "9d47ek3KiZFCpcwMGuMTbyZ", "PageMgr");
        var c = {}, r = {}, n = null, s = null, a = 0;
        c.register = function(e, t) {
            r[e] = t;
        }, c.getPage = function(e) {
            return r[e];
        }, c.getPageAsync = function(o, t) {
            return new Promise(function(n, s) {
                if (r[o]) n(r[o]); else {
                    var e = c.showLoading, a = c.hideLoading;
                    t && (e = function(e) {
                        e && e();
                    }, a = function(e) {
                        e && e();
                    }), e(function() {
                        AdHelper.logEvent("load_page", {
                            name: o
                        }), cc.loader.loadRes("prefab/pages/" + o, function(e, t) {
                            if (e) return a(), console.log("getPageAsync err", o), void s(e);
                            AdHelper.logEvent("load_page_finish", {
                                name: o
                            });
                            var i = cc.instantiate(t);
                            i.active = !1, cc.find("Canvas/pages").addChild(i), c.register(o, i), n(i), a();
                        });
                    });
                }
            });
        }, c.loadAndShow = function(n, s, a, o, r) {
            c.showLoading(function() {
                AdHelper.logEvent("load_page", {
                    name: n
                }), cc.loader.loadRes("prefab/pages/" + n, function(e, t) {
                    if (e) return c.hideLoading(), void (a && a(e));
                    AdHelper.logEvent("load_page_finish", {
                        name: n
                    });
                    var i = cc.instantiate(t);
                    i.active = !1, cc.find("Canvas/pages").addChild(i), c.register(n, i), c.hideLoading(), 
                    s ? c.showPage(n) : c.showDialog(n, o, r), a && a(!1, i);
                });
            });
        }, c.showPage = function(e) {
            cc.director.getScheduler().setTimeScale(1), r[e] ? (console.log("showPage==", e), 
            n && n.active && (n.active = !1, n = null), s && s.active && (s.active = !1, s = null), 
            r[e] && !r[e].active && (r[e].active = !0, a++, r[e].setLocalZOrder(a)), r[e] && (n = r[e])) : c.loadAndShow(e, !0);
        }, c.hidePage = function(e) {
            r[e] && r[e].active && (r[e].active = !1, n == r[e] && (n = null));
        }, c.showDialog = function(e, t, i) {
            if (console.log("showDialog==", e), r[e]) return t ? (r[e] && (r[e].active = !0, 
            i && (r[e].opacity = 0, r[e].runAction(cc.fadeIn(.1))), a++, r[e].setLocalZOrder(a)), 
            null) : (s && s.active && (s.active = !1, s = null), r[e] && !r[e].active && (r[e].active = !0, 
            r[e].setLocalZOrder(a), i && (r[e].opacity = 0, r[e].runAction(cc.fadeIn(.1)))), 
            r[e] ? s = r[e] : null);
            c.loadAndShow(e, !1, null, t, i);
        }, c.hideDialog = function(e) {
            r[e] && r[e].active && (r[e].runAction(cc.sequence(cc.fadeOut(.1), cc.callFunc(function() {
                r[e].active = !1, r[e].opacity = 255;
            }))), s == r[e] && (s = null));
        }, c.hideAllDialog = function() {
            s && s.active && (s.active = !1, s = null);
        }, c.showLoading = function(e) {
            console.log("showLoading"), c.showMask(), e && e();
        }, c.hideLoading = function(e) {
            console.log("hideLoading"), c.hideMask(), e && e();
        };
        var o = null;
        c.showMask = function() {
            if (o || ((o = cc.find("Canvas/TouchMask")).getChildByName("loading").runAction(cc.repeatForever(cc.rotateBy(1, 360))), 
            o.getChildByName("loading2").runAction(cc.repeatForever(cc.rotateBy(1, -360)))), 
            !o.active) {
                o.active = !0, o.opacity = 0, o.stopAllActions(), o.runAction(cc.sequence(cc.delayTime(3), cc.fadeIn(.1)));
                var e = o.getChildByName("mask");
                e.opacity = 0, e.runAction(cc.fadeTo(.2, 100));
            }
        }, c.hideMask = function() {
            o && (o.active = !1);
        }, c.showTips = function(e) {
            var t = cc.find("Canvas/ShowTips");
            t.active = !0;
            var i = t.getComponent(cc.Animation);
            i.off("finished"), i.stop();
            var n = t.getChildByName("label").getComponent(cc.Label);
            n.string = e, t.getChildByName("bg").width = n.node.width + 100, i.play("showtips"), 
            i.once("finished", function() {
                setTimeout(function() {
                    t.active = !1;
                }, 3e3);
            });
        }, t.exports = c, cc._RF.pop();
    }, {} ],
    PauseDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "be7eb1V7bBIdpB+vY7vN4pk", "PauseDialog"), cc.Class({
            extends: cc.Component,
            properties: {
                titleLabel: cc.Label,
                playerSP: sp.Skeleton,
                soundToggle: cc.Toggle
            },
            preLoad: function(e) {
                var s = this;
                return this.callback = e.callback, e.stageId ? this.titleLabel.string = "STAGE " + e.stageId : this.titleLabel.string = "CHALLENGE", 
                new Promise(function(i, n) {
                    cc.loader.loadRes(DataMgr.getSkinRes(User.getSkinId()), sp.SkeletonData, function(e, t) {
                        e ? n(e) : (s.playerSP.skeletonData = t, i());
                    });
                });
            },
            onEnable: function() {
                this.soundToggle.isChecked = !User.getKeyValue("soundEnable"), this.playerSP.setSkin(DataMgr.getSkinName(User.getSkinId()));
                var e = DataMgr.getWeaponCfgById(User.getWeaponId());
                this.playerSP.setAttachment(e.slotName, e.attachmentName), this.playerSP.setAnimation(0, "RuChang3", !0);
            },
            onContinueClick: function() {
                PageMgr.hideDialog("PauseDialog"), this.callback && this.callback();
            },
            onClickExit: function() {
                PageMgr.hideDialog("PauseDialog"), PageMgr.showPage("HomePage");
            },
            onSoundSetting: function(e) {
                SoundMgr.setSoundEnable(!this.soundToggle.isChecked);
            },
            start: function() {}
        }), cc._RF.pop();
    }, {} ],
    PlayerControler: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "372657cNSZGBrfU9ydPGcEr", "PlayerControler");
        var n = e("PlayerTile"), o = Constants.DIR, s = Constants.CONTROL_TYPE;
        cc.Class({
            extends: cc.Component,
            properties: {
                player: n
            },
            onEnable: function() {
                this.mod = s.INPUT, this.inputActions = [], this.timeLineDatas = null, this.clickCount = 0, 
                this.lastClickTime = 0, this.clickThreshold = 500;
            },
            setControlType: function(e) {
                this.removeInput(), this.isRecord = !1, e == s.INPUT && this.setupInput(), this.mod = e;
            },
            beganRecord: function() {
                this.isRecord = !0, this.timeLineRecords = [], this.inputActions = [], this.timeAll = 0;
            },
            getRecordDatas: function() {
                return this.timeLineRecords;
            },
            beganReplay: function(e) {
                this.timeLineDatas = e, this.timeAll = 0, this.frameIndex = -1, this.setNextFrame();
            },
            setNextFrame: function() {
                if (this.frameIndex++, this.frameIndex >= this.timeLineDatas.length) console.log("回放完毕"), 
                this.nextAction = null; else {
                    var e = this.timeLineDatas[this.frameIndex];
                    this.nextAction = this.decodeFrame(e);
                }
            },
            receiveInputAction: function(e) {
                GuideMgr.isGuideByKey("level8") && (User.setGuided("level8"), GuideMgr.stopGuide()), 
                GuideMgr.isGuideByKey("level34") && (User.setGuided("level34"), GuideMgr.stopGuide()), 
                GuideMgr.isGuiding() ? GuideMgr.isGuideByKey("move_left") && -1 == e.x ? (User.setGuided("move_left"), 
                GuideMgr.startGuide("move_up"), this.inputActions.push(e)) : GuideMgr.isGuideByKey("move_up") && -1 == e.y ? (User.setGuided("move_up"), 
                GuideMgr.startGuide("move_right"), this.inputActions.push(e)) : GuideMgr.isGuideByKey("move_right") && 1 == e.x ? (User.setGuided("move_right"), 
                GuideMgr.startGuide("move_down"), this.inputActions.push(e)) : GuideMgr.isGuideByKey("move_down") && 1 == e.y && (User.setGuided("move_down"), 
                GuideMgr.stopGuide(), this.inputActions.push(e)) : this.player.isSpringRunning || this.inputActions.push(e);
            },
            encodeFrame: function(e, t) {
                var i = e << 4;
                return "number" == typeof t ? i += t : 0 == t.x && 1 == t.y ? i += 3 : 0 == t.x && -1 == t.y ? i += 2 : 1 == t.x && 0 == t.y ? i += 1 : -1 == t.x && 0 == t.y && (i += 0), 
                i;
            },
            decodeFrame: function(e) {
                var t = 15 & e, i = null;
                return 3 == t ? i = {
                    x: 0,
                    y: 1
                } : 2 == t ? i = {
                    x: 0,
                    y: -1
                } : 1 == t ? i = {
                    x: 1,
                    y: 0
                } : 0 == t && (i = {
                    x: -1,
                    y: 0
                }), {
                    time: e >> 4,
                    dir: i,
                    action: t
                };
            },
            addShield: function() {
                this.player.addShield(), this.mod == s.INPUT ? this.isRecord && this.timeLineRecords.push(this.encodeFrame(this.timeAll, 4)) : this.setNextFrame(), 
                GuideMgr.isGuideByKey("level8") && (User.setGuided("level8"), GuideMgr.stopGuide()), 
                GuideMgr.isGuideByKey("level34") && (User.setGuided("level34"), GuideMgr.stopGuide());
            },
            playAction: function(e) {
                this.player.beginRun(e), this.mod == s.INPUT ? this.isRecord && this.timeLineRecords.push(this.encodeFrame(this.timeAll, e)) : this.setNextFrame();
            },
            step: function(e, t) {
                this.timeAll = t, this.mod == s.REPLAY && this.nextAction && this.nextAction.time == this.timeAll && (this.nextAction.dir ? this.playAction(this.nextAction.dir) : this.nextAction.action && 4 == this.nextAction.action && this.addShield()), 
                this.mod == s.INPUT && null == this.player.moveDir && 0 < this.inputActions.length && this.playAction(this.inputActions.shift());
            },
            setupInput: function() {
                this.removeInput(), this.isMoved = !1, this.mod == s.INPUT && (this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this), 
                this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this), 
                cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this));
            },
            removeInput: function() {
                this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this), this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this), 
                this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this), cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), 
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
            },
            onKeyDown: function(e) {
                switch (e.keyCode) {
                  case cc.KEY.a:
                  case cc.KEY.left:
                    this.receiveInputAction(o.LEFT);
                    break;

                  case cc.KEY.d:
                  case cc.KEY.right:
                    this.receiveInputAction(o.RIGHT);
                    break;

                  case cc.KEY.w:
                  case cc.KEY.up:
                    this.receiveInputAction(o.UP);
                    break;

                  case cc.KEY.s:
                  case cc.KEY.down:
                    this.receiveInputAction(o.DOWN);
                }
            },
            onKeyUp: function(e) {},
            onTouchMove: function(e) {
                var t = e.getStartLocation(), i = e.getLocation(), n = i.x - t.x, s = i.y - t.y;
                if (Math.max(Math.abs(n), Math.abs(s)) < 30 || this.isMoved) return null;
                this.isMoved = !0;
                var a = {
                    x: 0,
                    y: 0
                };
                a = Math.abs(n) > Math.abs(s) ? 0 < n ? o.RIGHT : o.LEFT : 0 < s ? o.UP : o.DOWN, 
                this.receiveInputAction(a);
            },
            onTouchEnd: function(e) {
                if (Date.now() - this.lastClickTime > this.clickThreshold && (this.clickCount = 0), 
                this.isMoved) this.isMoved = !1; else {
                    var t = e.getStartLocation(), i = e.getLocation(), n = i.x - t.x, s = i.y - t.y;
                    if (Math.max(Math.abs(n), Math.abs(s)) < 30) return this.clickCount++, this.lastClickTime = Date.now(), 
                    null;
                    var a = {
                        x: 0,
                        y: 0
                    };
                    a = Math.abs(n) > Math.abs(s) ? 0 < n ? o.RIGHT : o.LEFT : 0 < s ? o.UP : o.DOWN, 
                    this.receiveInputAction(a);
                }
            },
            quaryDoubleClick: function() {
                return 1 < this.clickCount && !(this.clickCount = 0);
            }
        }), cc._RF.pop();
    }, {
        PlayerTile: "PlayerTile"
    } ],
    PlayerTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "5fc75isMqhF75e/atttGfRo", "PlayerTile");
        var h = e("CoinMgr"), n = e("BaseTile"), s = e("MonsterMgr"), d = [], u = [], a = new cc.NodePool(), g = null, p = null, o = Constants.GAME_STATE, r = Constants.PROTECT_TIME, c = Constants.TURN_SCORE_RATE, m = Constants.EFFECT_TYPE;
        cc.Class({
            extends: n,
            properties: {
                playerSP: sp.Skeleton,
                tiao: cc.Node,
                shieldNode: cc.Node,
                weaponAnim: cc.Animation,
                shadowLayer: cc.Node
            },
            ctor: function() {
                this.isWalkable = !1, this.isPlayer = !0, this.moveDir = null, this.moveSpeed = 3, 
                this.scaleConst = .5, this.standOnTile = null, this.lastSafeTile = null, this.lastDir = null, 
                this.isSpringRunning = !1, this.shadowNodes = [], this.turnCoinRate = c;
                for (var e = d.length; e < 20; e++) {
                    var t = new cc.RenderTexture(136, 136, cc.Texture2D.PIXEL_FORMAT_RGBA8888, cc.sys.isBrowser ? gl.DEPTH_STENCIL : gl.DEPTH24_STENCIL8_OES);
                    t.isNeedDraw = !0, d.push(t);
                }
                for (var i = u.length; i < 30; i++) {
                    var n = new cc.RenderTexture(136, 136, cc.Texture2D.PIXEL_FORMAT_RGBA8888, cc.sys.isBrowser ? gl.DEPTH_STENCIL : gl.DEPTH24_STENCIL8_OES);
                    n.isNeedDraw = !0, u.push(n);
                }
            },
            initGame: function() {
                console.log("Player  initGame"), this.isSpringRunning = !1, this.curDir = {
                    x: 0,
                    y: 1
                }, this.lastDir = this.curDir, this.lastTile = null;
                var e = this.mainGame.tileSize.width;
                this.posConfig = {
                    left: {
                        x: -6,
                        y: -e / 2,
                        rotation: 90
                    },
                    right: {
                        x: e + 6,
                        y: -e / 2,
                        rotation: -90
                    },
                    up: {
                        x: e / 2,
                        y: 6,
                        rotation: 180
                    },
                    down: {
                        x: e / 2,
                        y: -e - 6,
                        rotation: 0
                    }
                };
                var t = this.posConfig.down, i = this.playerSP.node;
                i.rotation = t.rotation, i.scaleX = i.scaleY = this.scaleConst, i.x = t.x, i.y = t.y, 
                this.playerSP.setAnimation(0, "DaiJi", !0), this.shieldProtectTime = r, this.shieldLeftTime = 0, 
                this.shieldNode.runAction(cc.repeatForever(cc.rotateBy(2, 300))), this.shieldNode.active = !1;
            },
            setSkinAsync: function(c, l) {
                var h = this;
                return new Promise(function(o, r) {
                    c = c || User.getSkinId(), l = l || User.getWeaponId(), cc.loader.loadRes(DataMgr.getSkinRes(c), sp.SkeletonData, function(e, t) {
                        if (e) r(e); else {
                            if (h.playerSP.skeletonData = t, h.playerSP.setSkin(DataMgr.getSkinName(c)), h.playerSP.curSkinName = DataMgr.getSkinName(c), 
                            h.setWeapon(l), g != c || p != l) {
                                if (g = c, p = l, h.posConfig) {
                                    var i = h.posConfig.down, n = h.playerSP.node;
                                    n.rotation = i.rotation, n.scaleX = n.scaleY = h.scaleConst, n.x = i.x, n.y = i.y;
                                }
                                h.shieldNode.active = !1, h.playerSP.setAnimation(0, "FanGun", !1);
                                for (var s = 0; s < d.length; s++) h.buildShadowCache(d[s]), h.playerSP._sgNode.update(1 / 30);
                                h.playerSP.setAnimation(0, "ChongCi", !1);
                                for (var a = 0; a < u.length; a++) h.buildShadowCache(u[a]), h.playerSP._sgNode.update(1 / 60);
                            }
                            h.playerSP.setAnimation(0, "DaiJi", !0), o();
                        }
                    });
                });
            },
            setWeapon: function(e) {
                var i = this, t = DataMgr.getWeaponCfgById(e);
                this.playerSP.setAttachment(t.slotName, t.attachmentName), this.weaponAnim && cc.loader.loadRes("daoImg/" + t.shopImgName, cc.SpriteFrame, function(e, t) {
                    e || (i.weaponAnim.node.getChildByName("wuqi_01").getComponent(cc.Sprite).spriteFrame = t);
                }), this.weaponEffectType = t.effectType, this.weaponEffectCount = t.count;
            },
            isShieldEquip: function() {
                return 0 < this.shieldLeftTime;
            },
            addShield: function() {
                this.shieldLeftTime = this.shieldProtectTime, this.weaponEffectType == m.PROTECT && (this.shieldLeftTime += this.weaponEffectCount), 
                this.shieldNode.active = !0, this.shieldNode.stopAllActions(), this.shieldNode.runAction(cc.repeatForever(cc.rotateBy(2, 300))), 
                SoundMgr.play("hudun");
            },
            getShieldPercent: function() {
                return this.shieldLeftTime / this.shieldProtectTime;
            },
            removeShield: function() {
                this.shieldLeftTime = 0, this.shieldNode.active = !1;
            },
            playOut: function() {
                this.playerSP.setAnimation(0, "FanGun", !1);
            },
            playIn: function() {
                var e = this;
                setTimeout(function() {
                    e.playerSP.setAnimation(0, "RuChang3", !0);
                }, 1200), setTimeout(function() {
                    e.playerSP.setAnimation(0, "RuChang2", !1);
                }, 700), this.playerSP.setAnimation(0, "RuChang", !1);
            },
            revive: function() {
                this.playerSP.setAnimation(0, "DaiJi", !0), this.lastSafeTile && (this.onPlayerStopRun(this.lastDir), 
                this.tileX = this.lastSafeTile.tileX, this.tileY = this.lastSafeTile.tileY, console.log("player revive in:", this.tileX, this.tileY));
            },
            setPlayerTileCoord: function(e, t, i) {
                var n = this.mainGame.getTilePosition(e, t);
                this.tileX = e, this.tileY = t, this.node.x = n.x, this.node.y = n.y, i && (this.standOnTile = this.mainGame.getTileAt(e + this.curDir.x, t + this.curDir.y), 
                this.lastSafeTile = this.mainGame.getTileAt(e, t));
            },
            setPlayerDeath: function(e, t) {
                t = t || "", console.log("PlayerDeath enermy in:", e.tileX, e.tileY, t), this.onPlayerDeath();
            },
            onPlayerDeath: function() {
                var e = this;
                this.onPlayerStopRun(this.moveDir), SoundMgr.playByKey("PlayerDie"), this.isShieldEquip() ? (this.removeShield(), 
                this.mainGame.setGameState(o.PLAYERDIE), setTimeout(function() {
                    e.mainGame.continueGame();
                }, 100)) : (this.playerSP.setAnimation(0, "dead", !1), this.mainGame.onGameOver());
            },
            stopRun: function(e) {
                this.onPlayerStopRun(e || this.moveDir);
            },
            onPlayerStopRun: function(e) {
                this.tiao && this.tiao.stopAllActions(), this.isSpringRunning = !1, this.moveDir = null, 
                this.playerSP.setAnimation(0, "DaiJi", !0);
                var t = this.playerSP.node, i = null;
                null != e && (-1 == e.x ? i = this.posConfig.left : 1 == e.x ? i = this.posConfig.right : -1 == e.y ? i = this.posConfig.up : 1 == e.y && (i = this.posConfig.down), 
                t.x = i.x, t.y = i.y, t.rotation = i.rotation, 1 == e.x && (t.scaleX = this.scaleConst, 
                this.getUpTile().isWalkable || (t.scaleX = -this.scaleConst)), -1 == e.x && (t.scaleX = -this.scaleConst, 
                this.getUpTile().isWalkable || (t.scaleX = this.scaleConst)), 1 == e.y && (t.scaleX = this.scaleConst, 
                this.getRightTile().isWalkable || (t.scaleX = -this.scaleConst)), -1 == e.y && (t.scaleX = -this.scaleConst, 
                this.getRightTile().isWalkable || (t.scaleX = this.scaleConst)), this.curDir.x = e.x, 
                this.curDir.y = e.y);
            },
            beginRun: function(e) {
                this.onPlayerBeginRun(e);
            },
            onPlayerBeginRun: function(e) {
                if (this.mainGame.gameState == o.READYTOPLAY && this.mainGame.setGameState(o.PLAYING), 
                this.tiao) {
                    this.tiao.stopAllActions(), this.tiao.x = 35, this.tiao.y = -37;
                    var t = .05 / this.moveSpeed;
                    this.tiao.runAction(cc.repeatForever(cc.sequence(cc.moveBy(t, .5 * e.y, .5 * e.x), cc.delayTime(t / 10), cc.moveBy(t, -.5 * e.y, -.5 * e.x), cc.delayTime(t / 10))));
                }
                var i = this.mainGame.mapSize;
                if (!(-1 == e.x && this.tileX <= 0 || 1 == e.x && this.tileX >= i.width - 1 || -1 == e.y && this.tileY <= 0 || 1 == e.y && this.tileY >= i.height - 1)) {
                    this.moveDir = e, this.fangunIndex = -1, this.chongciIndex = -1, 0 == e.x && 0 == this.curDir.x || 0 == e.y && 0 == this.curDir.y ? (this.playerSP.setAnimation(0, "FanGun", !1), 
                    this.fangunIndex = 0) : (this.playerSP.setAnimation(0, "ChongCi", !1), this.chongciIndex = 0), 
                    SoundMgr.play("playerrun");
                    var n = this.playerSP.node;
                    1 == e.x && (n.scaleX = 0 == n.rotation ? this.scaleConst : -this.scaleConst), -1 == e.x && (n.scaleX = 0 == n.rotation ? -this.scaleConst : this.scaleConst), 
                    1 == e.y && (n.scaleX = -90 == n.rotation ? -this.scaleConst : this.scaleConst), 
                    -1 == e.y && (n.scaleX = 90 == n.rotation ? -this.scaleConst : this.scaleConst), 
                    s.onPlayerDirChange({
                        x: e.x,
                        y: e.y
                    });
                }
            },
            step: function(e) {
                if (this.moveDir && (0 != this.moveDir.x || 0 != this.moveDir.y)) {
                    var t = this.mainGame.getTileAt(this.tileX, this.tileY), i = this.getNextTile(this.moveDir), n = this.getTilePosition(), s = i.getTilePosition();
                    if (i == this.standOnTile) return void this.stopRun(this.moveDir);
                    var a = 0 == this.moveDir.x ? n.y : n.x, o = 0 == this.moveDir.x ? s.y : s.x, r = 0 == this.moveDir.x ? this.node.y : this.node.x;
                    if (i.enteringTile && i.enteringTile.isCloud) {
                        var c = i.enteringTile, l = this.moveDir.x * c.moveDir.x + this.moveDir.y * c.moveDir.y != 0, h = c.getNextTile({
                            x: -this.moveDir.x,
                            y: -this.moveDir.y
                        });
                        !l && h.isWalkable && (i = c, 0 == this.moveDir.x ? this.tileX = i.tileX : this.tileY = i.tileY);
                    }
                    this.standOnTile && (this.standOnTile.onPlayerStandOff(this), this.standOnTile = null);
                    var d = this.mainGame.tileSize.width;
                    if (0 == Math.abs(a - r) && Math.abs(o - r) <= d && (i.onBeforeEnter(this), this.lastTile && this.lastTile.onPlayerLeave(this)), 
                    this.moveDir) {
                        var u = this.isSpringRunning ? 1.5 * this.moveSpeed : this.moveSpeed;
                        this.node.x += this.moveDir.x * e * u, this.node.y -= this.moveDir.y * e * u;
                        var g = o - (r = 0 == this.moveDir.x ? this.node.y : this.node.x);
                        i.isWalkable || i.isGlassWall ? ((Math.abs(g) <= e * u / 2 || Math.abs(g) > d) && this.tileX == t.tileX && this.tileY == t.tileY && (this.tileX = i.tileX, 
                        this.tileY = i.tileY, this.node.x = s.x, this.node.y = s.y, i.onPlayerEnter(this), 
                        this.lastTile = t, i.getLeftTile().onPlayerAround(this), i.getRightTile().onPlayerAround(this), 
                        i.getUpTile().onPlayerAround(this), i.getDownTile().onPlayerAround(this)), this.addRunShadow()) : (i.isDieWall || i.isCloud || (this.lastSafeTile = t, 
                        this.lastDir = this.moveDir), this.onPlayerStopRun(this.moveDir), this.lastTile = null, 
                        this.node.x = n.x, this.node.y = n.y, (this.standOnTile = i).onPlayerStandOn(this), 
                        this.mainGame.isChallenge && Math.random() < this.turnCoinRate && this.turnXpToCoin());
                    }
                }
                if (this.standOnTile && this.standOnTile.isCloud) {
                    var p = this.standOnTile, m = p.playerTileOffset;
                    if (0 == m.x) if (0 == p.dir.y) this.node.x = p.node.x + p.cloudNode.x - this.mainGame.tileSize.height / 2; else {
                        var f = 1 == m.y ? -.5 : 1.5;
                        this.node.y = p.node.y + p.cloudNode.y + f * this.mainGame.tileSize.height;
                    }
                    if (0 == m.y) if (0 == p.dir.x) this.node.y = p.node.y + p.cloudNode.y + this.mainGame.tileSize.height / 2; else {
                        var y = -1 == m.x ? -1.5 : .5;
                        this.node.x = p.node.x + p.cloudNode.x + y * this.mainGame.tileSize.height;
                    }
                    if (this.tileX != p.tileX + m.x || this.tileY != p.tileY + m.y) {
                        this.tileX = p.tileX + m.x, this.tileY = p.tileY + m.y, this.lastTile && this.lastTile.onPlayerLeave(this);
                        var v = this.mainGame.getTileAt(this.tileX, this.tileY);
                        v.onPlayerEnter(this), v.getLeftTile().onPlayerAround(this), v.getRightTile().onPlayerAround(this), 
                        v.getUpTile().onPlayerAround(this), v.getDownTile().onPlayerAround(this), this.lastTile = v;
                        var T = this.mainGame.getTileAt(this.tileX + p.moveDir.x, this.tileY + p.moveDir.y);
                        this.onBeforeEnter(T);
                    }
                }
            },
            turnXpToCoin: function() {
                var e = this, t = 1;
                this.weaponEffectType == m.TURNCOIN && (t += this.weaponEffectCount);
                var i = this.tileY - t, n = this.tileY + t, s = this.tileX - t, a = this.tileX + t;
                i < 0 && (i = 0), n >= this.mainGame.mapSize.height && (n = this.mainGame.mapSize.height - 1), 
                s < 0 && (s = 0), a >= this.mainGame.mapSize.width && (a = this.mainGame.mapSize.width - 1);
                for (var o = i; o <= n; o++) for (var r = s; r <= a; r++) {
                    var c = this.mainGame.getTileAt(r, o);
                    if (c.isXP) {
                        var l = h.addTile(c.tileX, c.tileY);
                        l.init(), this.mainGame.setTileAt(c.tileX, c.tileY, l);
                    }
                }
                this.weaponAnim.node.x = this.node.x + 34, this.weaponAnim.node.y = this.node.y - 34, 
                this.weaponAnim.node.active = !0, this.weaponAnim.once("finished", function() {
                    e.weaponAnim.node.active = !1;
                }), this.weaponAnim.play();
            },
            buildShadowCache: function(e) {
                cc.sys.isBrowser && e.setAutoDraw(!1), cc.macro.ENABLE_CULLING = !1, e.beginWithClear(0, 0, 0, 0, 0, 0);
                var t = this.node.x, i = this.node.y;
                if (this.node.y = 102, this.node.x = 34, this.node._sgNode.visit(), e.end(), cc.macro.ENABLE_CULLING = !0, 
                this.node.x = t, this.node.y = i, !e.parent) {
                    var n = cc._renderContext;
                    e.sprite.setBlendFunc(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA);
                }
            },
            addRunShadow: function() {
                var t = this, e = null;
                if (0 <= this.fangunIndex && (this.fangunIndex++, this.fangunIndex >= d.length && (this.fangunIndex = d.length - 1), 
                e = d[this.fangunIndex]), 0 <= this.chongciIndex && (this.chongciIndex++, this.chongciIndex >= u.length && (this.chongciIndex = u.length - 1), 
                e = u[this.chongciIndex]), e) {
                    var i = a.get();
                    i || ((i = new cc.Node()).anchorY = .45, i.addComponent(cc.Sprite));
                    var n = this.playerSP.node;
                    i.scaleX = 0 < n.scaleX ? 1 : -1, i.scaleY = 0 < n.scaleY ? -1 : 1, i.rotation = n.rotation, 
                    i.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(e._texture), this.shadowLayer.addChild(i), 
                    i.x = this.node.x + 34, i.y = this.node.y - 34, this.shadowNodes.push(i), i.opacity = 150, 
                    i.runAction(cc.sequence(cc.fadeOut(.3), cc.callFunc(function() {
                        var e = t.shadowNodes.indexOf(i);
                        0 <= e && t.shadowNodes.splice(e, 1), a.put(i);
                    })));
                }
            },
            stepShieldTime: function(e) {
                0 < this.shieldLeftTime && (this.shieldLeftTime -= e, this.shieldLeftTime <= 0 && this.removeShield());
            },
            jump: function(e) {
                for (var t = 0; t < this.shadowNodes.length; t++) this.shadowNodes[t].y += e;
            },
            onBeforeEnter: function(e) {
                if (this.standOnTile && this.standOnTile.isCloud) {
                    var t = this.standOnTile, i = t.getNextTile(t.moveDir);
                    if ((i.isCloud || i.isWalkable) && !e.isWalkable && !e.isGlassWall && !e.isCloud) {
                        if (console.log("onBeforeEnter"), t.isInMoveState && (t.moveDir.x * t.playerTileOffset.x == 1 || t.moveDir.y * t.playerTileOffset.y == 1)) return void t.stopMove();
                        this.standOnTile.onPlayerStandOff(this), e.isDieWall ? (this.setPlayerDeath(e, "DieWall"), 
                        this.standOnTile = null) : (this.standOnTile = e, this.onPlayerStopRun(t.moveDir));
                    }
                }
            },
            onCloudHit: function(e) {
                var t = this.getNextTile(e.moveDir);
                (t.isWalkable || t.isGlassWall) && (this.standOnTile && this.onPlayerStandOff(this.standOnTile), 
                this.standOnTile = e, this.stopRun({
                    x: -e.moveDir.x,
                    y: -e.moveDir.y
                }), e.onPlayerStandOn(this));
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile",
        CoinMgr: "CoinMgr",
        MonsterMgr: "MonsterMgr"
    } ],
    ProjectStarter: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "ab2e8btsf1Cm6PEJJYHzgkJ", "ProjectStarter"), e("GameConfig");
        var n = {};
        window.sendReport = function(e) {
            if (console.log(e), o.platform == o.PLATFORM.FBINSTANT) try {
                if (n[e.message]) return;
                n[e.message] = !0;
                var t = {
                    game: "LASTNINJA",
                    version: GameVersion,
                    type: "code_error",
                    msg: e.message + "\n" + e.stack,
                    url: e.source,
                    line: e.line,
                    col: e.colno,
                    error: e.stack
                }, i = new XMLHttpRequest();
                i.open("POST", "https://client-report.capjoy.com:1443/api/v1/logs/"), i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
                i.send(JSON.stringify(t)), console.log("sendReported");
            } catch (e) {}
        }, window.addEventListener && window.addEventListener("error", function(e) {
            sendReport({
                message: e.message,
                source: e.filename,
                stack: e.error && e.error.stack,
                line: e.lineno,
                colno: e.colno
            });
        });
        var o = e("Global"), r = e("DataMgr"), c = e("AdHelper");
        cc.Class({
            extends: cc.Component,
            preStartGame: function() {
                var e = this;
                this.isGameStart = !0;
                var t = PageMgr.getPage("HomePage").getComponent("HomePage");
                PageMgr.showPage("HomePage"), t.preLoad().then(function() {
                    PageMgr.getPage("GameMain").getComponent("GameMain").preLoad({
                        level: User.getKeyValue("stageInfo").length,
                        from: "home"
                    }).then(function() {
                        e.startGame();
                    });
                });
            },
            entryGame: function() {
                console.log("=======entryGame=======");
                var e = null, t = PageMgr.getPage("HomePage").getComponent("HomePage");
                if (t.playAnimation(), o.isFBINSTANT) {
                    var i = FBInstant.player.getID();
                    o.isFBINSTANT && (e = FBInstant.getEntryPointData()), console.log("entryPointData", e);
                    var n = "facebook";
                    if (e && (n = e.from || e.type, t.setEntryPoint(e), e.switchGameInfo && User.isNewUser())) {
                        var s = new XMLHttpRequest();
                        s.open("POST", "https://fb-api.capjoy.com/fbapi/v0/ads/report/" + e.switchGameInfo.appId + "/435134576951080/" + i), 
                        s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), s.onreadystatechange = function() {
                            4 == s.readyState && console.log("ad report ", s.responseText);
                        };
                        var a = "v=" + window.GameVersion;
                        s.send(a);
                    }
                    c.logEvent("entry_game", {
                        from: n,
                        isNew: User.isNewUser() ? 1 : 0,
                        index: User.getVersion(),
                        days: User.getLoginDayCount()
                    });
                }
                User.markOldUser();
            },
            onLoad: function() {
                var e = this;
                this.isFbInit = !1, this.isUserInit = !1, this.isDataLoadFinish = !1, this.isLoadFinish = !1, 
                this.isGameStart = !1, this.progress = 0, o.isFBINSTANT || User.load(function() {
                    e.isUserInit = !0;
                }), this.preLoadDatas(function() {
                    e.preLoadSounds(function() {
                        e.loadAllPages();
                    });
                }), cc.sys.os == cc.sys.OS_IOS && SoundMgr.preLoad("iosidle", function(e, t) {
                    e ? cc.log(e) : cc.audioEngine.play(t, !0, 0);
                }), o.isDev && this.showDebugConsole(), cc.director.setDisplayStats(!1), GuideMgr.initView(cc.find("Canvas/GuideLayer")), 
                AchievementMgr.init(cc.find("Canvas/AchiTips"));
            },
            showDebugConsole: function() {
                if (window.document && cc.sys.isMobile) {
                    var e = document.createElement("script");
                    e.async = !0, e.src = "vconsole.min.js";
                    e.addEventListener("load", function() {
                        new VConsole();
                    }, !1), document.body.appendChild(e);
                }
            },
            preLoadDatas: function(s) {
                var a = this;
                cc.loader.loadResDir("config", function(e, t, i) {
                    for (var n = 0; n < t.length; n++) r.register(i[n].substring(7), t[n]);
                    a.isDataLoadFinish = !0, s();
                });
            },
            preLoadSounds: function(e) {
                var t = [ "home_begin" ];
                0 == t.length && e();
                for (var i = 0, n = 0; n < t.length; n++) SoundMgr.preLoad(t[n], function() {
                    ++i == t.length && e();
                });
            },
            loadAllPages: function() {
                var n = this;
                cc.loader.loadResDir("prefab/preload", function(e, t) {
                    for (var i = 0; i < t.length; i++) n.register(t[i]);
                    n.isLoadFinish = !0;
                });
            },
            startGame: function() {
                var e = this;
                o.platform == o.PLATFORM.FBINSTANT ? (this.setProgress(1), FBInstant.startGameAsync().then(function() {
                    c.loadAsync(), c.loadVideoAsync(), e.entryGame(), FBInstant.onPause(function() {}), 
                    e.tickContextChange(), User.initPay(), User.sendDataDaily(), e.setPush();
                }).catch(function(e) {
                    console.log(e);
                })) : this.entryGame();
            },
            setProgress: function(e) {
                this.isFbInit && FBInstant.setLoadingProgress(80 + 20 * e);
            },
            tickContextChange: function() {
                var i = this;
                setInterval(function() {
                    if (i.contextId != FBInstant.context.getID()) {
                        i.contextId = FBInstant.context.getID();
                        var e = "contextural_rank." + i.contextId, t = function() {
                            console.log("updateAsync LEADERBOARD"), FBInstant.updateAsync({
                                action: "LEADERBOARD",
                                name: e
                            });
                        };
                        console.log("tickContextChange", i.contextId), FBInstant.getLeaderboardAsync(e).then(function(e) {
                            return e.setScoreAsync(window.lastScore, "");
                        }).then(function() {
                            return [ t() ];
                        }).catch(t);
                    }
                }, 3e3);
            },
            register: function(e) {
                var t = cc.instantiate(e);
                t.active = !1, this.node.addChild(t), PageMgr.register(t.name, t);
            },
            update: function(e) {
                var n = this;
                !this.isFbInit && window.FBINIT && (this.isFbInit = !0, User.load(function() {
                    var e = window.FBInstant;
                    if (e) {
                        var t = e.getPlatform(), i = User.isNewUser();
                        if ("WEB" === t && i) return;
                    }
                    n.isUserInit = !0;
                })), this.isGameStart ? this.enabled = !1 : this.isUserInit && this.isLoadFinish && this.isDataLoadFinish && this.preStartGame();
            },
            getDay4Data: function() {
                for (var e = User.getLevel(), t = [ {
                    level: 2
                }, {
                    level: 5
                }, {
                    level: 8
                }, {
                    level: 10
                }, {
                    level: 12
                }, {
                    level: 15
                }, {
                    level: 17
                }, {
                    level: 20
                }, {
                    level: 23
                }, {
                    level: 25
                }, {
                    level: 28
                }, {
                    level: 1e3
                } ], i = t[0], n = 0; n < t.length; n++) e > i.level && e < t[n].level && (i = t[n]);
                return i;
            },
            setPush: function() {
                console.log(FBInstant.player.getID());
                var e = this.getDay4Data(), t = {
                    bg: "img_jpg_" + e.level,
                    t: "text_txt_" + e.level,
                    tm: -1,
                    da: {
                        t: "PLAY",
                        u: "game_play",
                        pld: {
                            type: "hours96_da"
                        }
                    },
                    bts: [ {
                        t: "PLAY",
                        u: "game_play",
                        pld: {
                            type: "hours96"
                        }
                    } ]
                }, i = {
                    bg: "img_120",
                    t: "text_120",
                    tm: 432e3,
                    da: {
                        t: "WATCH",
                        u: "game_play",
                        pld: {
                            type: "hours120_da",
                            sharetype: "bot_recommond_video"
                        }
                    },
                    bts: [ {
                        t: "WATCH",
                        u: "game_play",
                        pld: {
                            type: "hours120",
                            sharetype: "bot_recommond_video"
                        }
                    } ]
                }, n = [ [ {
                    bg: "img_48",
                    t: "text_48",
                    tm: -1,
                    da: {
                        t: "WATCH",
                        u: "game_play",
                        pld: {
                            type: "hours48_da",
                            sharetype: "bot_recommond_video"
                        }
                    },
                    bts: [ {
                        t: "WATCH",
                        u: "game_play",
                        pld: {
                            type: "hours48",
                            sharetype: "bot_recommond_video"
                        }
                    } ]
                } ], [ t ] ], s = {};
                s.data = n, s.nickname = FBInstant.player.getName();
                var a = User.getMaxStage();
                s.playerInfo = {
                    head: FBInstant.player.getPhoto(),
                    score: a
                };
                var o = {
                    target: [],
                    tpl: [ {
                        bg: "head_" + FBInstant.player.getID(),
                        t: FBInstant.player.getName() + " has joined the game!",
                        tm: 0,
                        bts: [ {
                            t: "CHALLENGE",
                            u: "game_play",
                            pld: {
                                type: "friendjoin"
                            }
                        } ]
                    } ]
                };
                1 == a && (s.newFriend = o), User.getConnectedPlayers(function(e) {
                    for (var t = 0; t < e.length && (e[t].getID() != FBInstant.player.getID() && o.target.push(e[t].getID()), 
                    !(8 <= t)); t++) ;
                    0 == e.length && n.push([ i ]), console.log("sessionData new", JSON.stringify(s).length), 
                    FBInstant.setSessionData(s);
                });
            }
        }), cc._RF.pop();
    }, {
        AdHelper: "AdHelper",
        DataMgr: "DataMgr",
        GameConfig: "GameConfig",
        Global: "Global"
    } ],
    RIPMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "bc37d36l01JToSM8SdCLZi3", "RIPMgr");
        var n = {
            initGame: function(e, t) {
                this.ripLayer = e, this.mainGame = t, this.tileList = [], this.inited = !0, this.removeList = [];
            },
            addTile: function(e, t, i) {
                var n = cc.instantiate(i);
                n.position = this.mainGame.getTilePosition(e, t), this.ripLayer.addChild(n);
                var s = n.getComponent("RIPTile");
                return s.tileX = e, s.tileY = t, s.setMgr(this), this.tileList.push(s), s;
            },
            removeAll: function(e, t) {
                if (this.inited) {
                    for (var i = this.tileList.length - 1; 0 <= i; i--) this.tileList[i].node.removeFromParent();
                    this.tileList = [], this.removeList = [];
                }
            },
            resetAll: function(e, t) {
                if (this.inited) for (var i = this.tileList.length - 1; 0 <= i; i--) this.tileList[i].reset();
            },
            step: function(e, t) {
                var i = this;
                if (this.inited) {
                    this.tileList.forEach(function(e) {
                        e.isHit(i.mainGame.player);
                    });
                    for (var n = 0; n < this.removeList.length; ++n) for (var s = 0; s < this.tileList.length; ++s) if (this.tileList[s].tileX == this.removeList[n].x && this.tileList[s].tileY == this.removeList[n].y) {
                        this.tileList[s].node.removeFromParent(), this.tileList.splice(s, 1);
                        break;
                    }
                }
            },
            removeTile: function(e, t) {
                this.removeList.push({
                    x: e,
                    y: t
                });
            }
        };
        t.exports = n, cc._RF.pop();
    }, {} ],
    RIPTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "2e224nCdztEkZ+kim9LXpHo", "RIPTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {},
            ctor: function() {
                this.isHited = !1;
            },
            reset: function() {},
            setMgr: function(e) {
                this.Mgr = e;
            },
            isHit: function(e) {
                var t = this;
                if (!this.isHited && e.tileX == this.tileX && e.tileY == this.tileY) {
                    this.isHited = !0, SoundMgr.playByKey("MubeiGet");
                    var i = this.node.getComponent(cc.Animation);
                    i.off("finished"), i.play("ripget"), i.on("finished", function() {
                        t.Mgr.mainGame.addRIPCoin(t), t.Mgr.removeTile(t.tileX, t.tileY);
                    });
                }
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    RankItem: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "af0281htfVEmproY6oGqNlq", "RankItem"), cc.Class({
            extends: cc.Component,
            properties: {
                rankNumPic: cc.Sprite,
                iconFrame: cc.Sprite,
                nameLabel: cc.Label,
                scoreLabel: cc.Label,
                rankLabel: cc.Label,
                playBtn: cc.Node,
                frontRankFrame: [ cc.SpriteFrame ],
                recBtn: cc.Node,
                bgNode: cc.Node,
                btnLabel: cc.Label,
                zanIconNode: cc.Node,
                zanLabel: cc.Label
            },
            onLoad: function() {
                this.defaultIconFrame = this.iconFrame.spriteFrame;
            },
            onClickPlay: function() {
                this.isMine ? Utils.shareGame("ShareGame", null, {
                    text: "This game is awesome! You should try it!",
                    from: "rank_share"
                }) : (PageMgr.showMask(), User.playWithFriends({
                    from: "rank_play",
                    playerId: this.data.playerId
                }, function(e) {
                    PageMgr.hideMask(), e || (PageMgr.hideDialog("RankPage"), Utils.startGameChallenge({
                        from: "rankitems"
                    }));
                }));
            },
            onClickREC: function() {
                var t = this;
                console.log("onClickREC"), PageMgr.showLoading(), Utils.GetChallengeVideo(this.data.playerId, this.data.isFriends).then(function(e) {
                    PageMgr.hideLoading(), Utils.replayGameChallenge({
                        isPlayBackMod: !0,
                        recordDatas: e.video,
                        photo: e.photo,
                        name: e.name,
                        skinId: e.skinId,
                        weaponId: e.weaponId,
                        playerId: e.playerId,
                        version: e.version
                    }, function(e) {
                        e && (t.data.praise += 1, Utils.PraiseChallengeVideo(t.data.playerId, t.data.isFriends), 
                        t.updateItem(t.itemId, t.data));
                    });
                }, function() {
                    PageMgr.hideLoading(), PageMgr.showTips("Video lost!");
                });
            },
            updateItem: function(e, i) {
                var n = this;
                this.itemId = e, this.data = i, this.isMine = Global.platform == Global.PLATFORM.FBINSTANT && i.playerId == FBInstant.player.getID(), 
                this.bgNode.opacity = this.isMine ? 125 : 0, this.btnLabel.string = this.isMine ? "SHARE" : "PLAY", 
                this.zanLabel.string = i.praise, 0 < i.praise ? (this.zanLabel.node.color = new cc.color(250, 107, 28), 
                this.zanIconNode.color = new cc.color(250, 107, 28)) : (this.zanLabel.node.color = new cc.color(35, 58, 110), 
                this.zanIconNode.color = new cc.color(35, 58, 110)), i.score <= 0 ? this.recBtn.active = !1 : this.recBtn.active = !0, 
                i.isFriends, this.playBtn.active = !1, i.rank <= 3 ? (this.rankNumPic.node.active = !0, 
                this.rankLabel.node.active = !1, this.rankNumPic.spriteFrame = this.frontRankFrame[i.rank - 1]) : (this.rankNumPic.node.active = !1, 
                this.rankLabel.node.active = !0, this.rankLabel.string = i.rank), this.iconFrame.spriteFrame = this.defaultIconFrame, 
                i.photo && cc.loader.load(i.photo, function(e, t) {
                    e || n.data != i || (n.iconFrame.spriteFrame = new cc.SpriteFrame(t));
                }), this.nameLabel.string = i.nickName, this.scoreLabel.string = i.score;
            },
            start: function() {}
        }), cc._RF.pop();
    }, {} ],
    RankPage: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "b78eeGO3uFJZrtI+SiBuu/d", "RankPage");
        var n = e("ListView");
        cc.Class({
            extends: cc.Component,
            properties: {
                friendList: n,
                worldList: n,
                worldBtn: cc.Node,
                friendBtn: cc.Node,
                loadingNode: cc.Node
            },
            onLoad: function() {
                this.isFriend = !0, this.friendsData = [], this.worldsData = [], this.setBtnActive(this.worldBtn, !1), 
                this.setBtnActive(this.friendBtn, !0);
            },
            setBtnActive: function(e, t) {
                e.getChildByName("active").active = !1, e.getChildByName("unactive").active = !1, 
                t ? e.getChildByName("active").active = !0 : e.getChildByName("unactive").active = !0;
            },
            onEnable: function() {
                this.isFriend = !1, this.onWorld(), this.loadingNode.active = !0, this.loadingNode.getChildByName("loading1").runAction(cc.repeatForever(cc.rotateBy(1, 360))), 
                this.loadingNode.getChildByName("loading2").runAction(cc.repeatForever(cc.rotateBy(1, -360))), 
                this.requestData(!1, 0), this.requestData(!0, 0);
            },
            onFriends: function() {
                this.isFriend = !0, this.setBtnActive(this.worldBtn, !1), this.setBtnActive(this.friendBtn, !0), 
                this.friendList.node.runAction(cc.moveTo(.2, 0, this.worldList.node.y)), this.worldList.node.runAction(cc.moveTo(.2, -this.node.width, this.friendList.node.y));
            },
            onWorld: function() {
                this.isFriend = !1, this.setBtnActive(this.worldBtn, !0), this.setBtnActive(this.friendBtn, !1), 
                this.worldList.node.runAction(cc.moveTo(.2, 0, this.worldList.node.y)), this.friendList.node.runAction(cc.moveTo(.2, this.node.width, this.friendList.node.y));
            },
            requestData: function(e, t) {
                var i = this;
                e ? Utils.getWeekRankList().then(function(e) {
                    i.friendsData = e, i.friendList.setItemsData(e), i.loadingNode.active && (i.loadingNode.active = !1);
                }, function(e) {
                    i.friendList.setItemsData(datas), i.loadingNode.active && (i.loadingNode.active = !1);
                }) : Utils.getGlobleRankList().then(function(e) {
                    i.worldsData = e, i.worldList.setItemsData(e);
                });
            },
            start: function() {},
            onToHome: function() {
                PageMgr.hideDialog("RankPage");
                var e = PageMgr.getPage("HomePage");
                e && e.getComponent("HomePage").onDialogClose();
            }
        }), cc._RF.pop();
    }, {
        ListView: "ListView"
    } ],
    ReplayDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "c58cbSwliFInIooXi1Gie7K", "ReplayDialog");
        var n = e("ListView");
        cc.Class({
            extends: cc.Component,
            properties: {
                perfectList: n,
                loadingNode: cc.Node
            },
            preLoad: function(e) {
                return this.stageId = e.stageId, new Promise(function(e, t) {
                    e();
                });
            },
            onEnable: function() {
                var t = this;
                this.loadingNode.active = !0, this.loadingNode.getChildByName("loading1").runAction(cc.repeatForever(cc.rotateBy(1, 360))), 
                this.loadingNode.getChildByName("loading2").runAction(cc.repeatForever(cc.rotateBy(1, -360))), 
                this.perfectList.setItemsData([]), Utils.getStagePerfectArr(this.stageId).then(function(e) {
                    t.loadingNode.active && (t.loadingNode.active = !1), t.perfectList.setItemsData(e);
                }, function(e) {
                    t.loadingNode.active && (t.loadingNode.active = !1), reject(e);
                });
            },
            onClickExit: function() {
                PageMgr.hideDialog("ReplayDialog");
            },
            start: function() {
                this.node.scale = cc.winSize.width / 750;
            }
        }), cc._RF.pop();
    }, {
        ListView: "ListView"
    } ],
    ReplayItem: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "1743buZmEFFRoxk3kwmT0xR", "ReplayItem"), cc.Class({
            extends: cc.Component,
            properties: {
                iconSprite: cc.Sprite,
                nameLabel: cc.Label,
                timeLabel: cc.Label,
                zanIconNode: cc.Node,
                zanLabel: cc.Label
            },
            updateItem: function(e, i) {
                var n = this;
                this.itemId = e, this.data = i, this.zanLabel.string = i.praise, 0 < i.praise ? (this.zanLabel.node.color = new cc.color(250, 107, 28), 
                this.zanIconNode.color = new cc.color(250, 107, 28)) : (this.zanLabel.node.color = new cc.color(35, 58, 110), 
                this.zanIconNode.color = new cc.color(35, 58, 110)), i.photo && cc.loader.load(i.photo, function(e, t) {
                    e || n.data != i || (n.iconSprite.spriteFrame = new cc.SpriteFrame(t));
                }), this.nameLabel.string = i.name, this.timeLabel.string = Utils.formatTimeMS(i.playTm);
            },
            onClickVCR: function() {
                var t = this;
                PageMgr.showLoading(), Utils.GetStageVideo(this.data.stageId, this.data.playerId,this.itemId).then(function(e) {
                    PageMgr.hideLoading(), null != e && 0 < Object.keys(e).length && Utils.replayGameMain(e, function(e) {
                        e && (t.data.praise += 1, Utils.PraiseStageVideo(t.data.stageId, t.data.playerId), 
                        t.updateItem(t.itemId, t.data));
                    });
                }, function(e) {
                    console.log(e), PageMgr.hideLoading();
                });
            },
            start: function() {
                this.node.getChildByName("zan").active = false;
            }
        }), cc._RF.pop();
    }, {} ],
    ResultChallengePage: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "acd2dOgHthCIJ0a6csPspSp", "ResultChallengePage");
        var n = e("ListView");
        cc.Class({
            extends: cc.Component,
            properties: {
                scoreLabel: cc.Label,
                friendList: n
            },
            setData: function(n) {
                var s = this;
                this.data = n, window.lastScore = n.score, this.friendsData = [], this.isLevelUp = User.addExp(n.xpCount), 
                this.friendList.setItemsData(this.friendsData), Utils.getWeekRankList(!0).then(function(e) {
                    s.friendsData = e;
                    for (var t = 0; t < e.length; t++) if (e[t].playerId == User.getPlayerID()) {
                        if (e[t].score < n.score) {
                            e[t].score = n.score, e.sort(function(e, t) {
                                return t.score - e.score;
                            });
                            for (var i = 0; i < e.length; ++i) e[i].rank = i + 1;
                            Utils.UploadChallegeVideo(n.score, s.data.recoreds);
                        }
                        break;
                    }
                    e.length <= 0 && e.push({
                        playerId: User.getPlayerID(),
                        photo: User.getPlayerPhoto(),
                        nickName: User.getPlayerName(),
                        rank: 1,
                        score: n.score,
                        isFriends: !0
                    }), s.friendList.setItemsData(e);
                });
            },
            onEnable: function() {
                this.node.stopAllActions(), this.scoreLabel.node.stopAllActions(), this.playAnimation(), 
                window.FBInstant && !User.isShortCreated() && FBInstant.canCreateShortcutAsync().then(function(e) {
                    e && (AdHelper.logEvent("createShortcut"), FBInstant.createShortcutAsync().then(function() {
                        AdHelper.logEvent("createShortcutSuccess"), User.markShortCreated();
                    }).catch(function() {}));
                }), AchievementMgr.onChallengeScore(this.data.score);
            },
            playAnimation: function() {
                this.scoreLabel.string = 0, this.scoreLabel.node.runAction(cc.sequence(cc.numberTo(1, this.data.score), cc.callFunc(function() {})));
            },
            onClickReplay: function() {
                var i = function(e) {
                    PageMgr.hideLoading(), Utils.startGameChallenge({
                        from: "challengeResult",
                        isWithFriend: !e
                    });
                };
                PageMgr.showLoading();
                var e = User.getRecommondId();
                e && .8 < Math.random() ? User.playWithGroup({
                    from: "challengeResult",
                    contextId: e
                }, i) : User.getConnectedPlayers(function(e) {
                    if (1 < e.length && .8 < Math.random()) {
                        AdHelper.logEvent("recommond_player");
                        var t = e[Math.floor(Math.random() * e.length)];
                        User.playWithFriends({
                            from: "challengeResult",
                            playerId: t.getID()
                        }, i);
                    } else User.chooseFriends({
                        from: "challengeResult"
                    }, i);
                });
            },
            onClickBack: function() {
                PageMgr.showPage("HomePage");
            },
            start: function() {},
            update: function(e) {},
            shareGame: function() {
                var t = this;
                PageMgr.showMask(), Utils.UploadChallegeShareVideo(this.data.score, this.data.recoreds).then(function(e) {
                    PageMgr.hideMask(), Utils.shareGame("ShareVideo", {
                        tyep: 2,
                        photo: User.getPlayerPhoto(),
                        name: User.getPlayerName(),
                        score: t.data.score
                    }, {
                        text: "😎😎😎 My wonderful replay！ Do you want to try it?",
                        from: "result_challenge_share",
                        data: {
                            sharetype: "challenge_recored",
                            videoId: e,
                            photo: User.getPlayerPhoto(),
                            name: User.getPlayerName(),
                            version: Constants.PARAM.VideoVersion,
                            skinId: User.getSkinId(),
                            weaponId: User.getWeaponId()
                        }
                    });
                }, function(e) {
                    PageMgr.hideMask();
                });
            }
        }), cc._RF.pop();
    }, {
        ListView: "ListView"
    } ],
    ResultDefeatPage: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f65cfj0XY9M8LHIOcoRzikz", "ResultDefeatPage");
        Constants.FREE_LOTTERY_TM;
        cc.Class({
            extends: cc.Component,
            properties: {
                titleLabel: cc.Label,
                energyNode: cc.Node,
                energyNum: cc.Label,
                nextButton: cc.Button,
                wdfbtn: cc.Node,
                redPoint: cc.Node
            },
            setData: function(e) {
                (this.data = e).deathPlace && User.setStageDeathPlace(e.stageId, e.deathPlace), 
                this.isLevelUp = e.isLevelUp, this.redPoint.active = 50 < User.getVersion(), this.node.stopAllActions(), 
                this.energyNum.node.stopAllActions(), this.titleLabel.string = "STAGE " + this.data.stageId, 
                this.energyNum.string = "x" + (User.getKeyValue("energyNum") + 1), this.energyUpdate = !1, 
                4 < this.data.stageId ? (this.wdfbtn.active = !0, User.isPerformBlink() && (this.wdfbtn.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.5, 1.2), cc.scaleTo(.5, 1)))), 
                this.blinkPB = !0)) : this.wdfbtn.active = !1, this.energyNode.stopAllActions(), 
                this.energyNode.x = 0;
            },
            onEnable: function() {
                this.playAnimation(), window.FBInstant && !User.isShortCreated() && FBInstant.canCreateShortcutAsync().then(function(e) {
                    e && (AdHelper.logEvent("createShortcut"), FBInstant.createShortcutAsync().then(function() {
                        AdHelper.logEvent("createShortcutSuccess"), User.markShortCreated();
                    }).catch(function() {}));
                }), User.subscribeBot(), AdHelper.logEvent("level_result_show", {
                    type: "fail"
                });
            },
            playAnimation: function() {
                var e = this;
                this.energyNum.node.runAction(cc.sequence(cc.scaleTo(.2, 1.5), cc.delayTime(.1), cc.callFunc(function() {
                    e.energyNum.string = "x" + User.getKeyValue("energyNum");
                }), cc.scaleTo(.2, 1), cc.callFunc(function() {})));
            },
            update: function(e) {
                this.energyUpdate && (this.energyNum.string = "x" + User.getKeyValue("energyNum"));
            },
            onClickReplay: function() {
                User.decEnergy(1) ? (
                ()=>{
                    window.__adErrorCallback = window.__adFinishedCallback = ()=>{
                        Utils.startGameMain({
                            level: this.data.stageId,
                            from: "home"
                        })
                    }
                window.__adStartCallback = ()=>{
                }
                createVideoAd();
                })() : (Utils.showGetEnergy(), this.energyUpdate = !0);
            },
            onClickBack: function() {
                PageMgr.showPage("HomePage");
            },
            onClickPerfect: function() {
                var t = this;
                this.redPoint.active = !1, this.blinkPB && (User.setPerformBlinOver(), this.blinkPB = !1, 
                this.wdfbtn.stopAllActions()), PageMgr.getPageAsync("ReplayDialog").then(function(e) {
                    e.getComponent("ReplayDialog").preLoad({
                        stageId: t.data.stageId
                    }), PageMgr.showDialog("ReplayDialog", !0, !0);
                });
            },
            start: function() {},
            shareGame: function() {
                var e = {
                    sharetype: "level_recored",
                    recoreds: this.data.recoreds,
                    version: Constants.PARAM.VideoVersion
                };
                1e3 <= JSON.stringify(e).length && (e = {}), Utils.shareGame("ShareVideo", {
                    type: 1,
                    stage: this.data.stageId,
                    photo: User.getPlayerPhoto(),
                    name: User.getPlayerName()
                }, {
                    text: "😎😎😎 My wonderful replay！ Don't you look at it?",
                    from: "resultDefeatPage",
                    data: e
                });
            }
        }), cc._RF.pop();
    }, {} ],
    ResultPage: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "78378MP4ldGCKqmD4TVu9VJ", "ResultPage");
        Constants.FREE_LOTTERY_TM;
        var n = e("RewardLevelData");
        cc.Class({
            extends: cc.Component,
            properties: {
                titleLabel: cc.Label,
                starNode: cc.Node,
                dotProgressNode: cc.Node,
                collectNode: cc.Node,
                resultNode: cc.Node,
                bottomBtn: cc.Node,
                wdfbtn: cc.Node,
                redPoint: cc.Node
            },
            setData: function(e) {
                this.data = e, (this.data.progress = 0) < e.maxXpCount && (this.data.progress = e.xpCount / e.maxXpCount, 
                1 < this.data.progress && (this.data.progress = 1)), this.isLevelUp = this.data.isLevelUp, 
                4 < this.data.stageId ? this.wdfbtn.active = !0 : this.wdfbtn.active = !1, this.collectNode.stopAllActions(), 
                this.titleLabel.string = "STAGE " + this.data.stageId;
                for (var t = 0; t < 3; ++t) {
                    var i = this.starNode.getChildByName("resultpage_star_" + (t + 1));
                    i.active = !1, i.stopAllActions();
                }
                this.collectNode.x = 0, this.progressBar = this.dotProgressNode.getComponent(cc.ProgressBar), 
                this.node.stopAllActions(), this.progressBar.progress = 0, this.resultNode.active = !1, 
                this.collectNode.active = !0, this.startProgress = !1, this.bottomBtn.active = !1, 
                this.redPoint.active = 3 == this.data.starCount && 5 < this.data.stageId && 50 < User.getVersion();
            },
            onEnable: function() {
                this.playAnimation(), window.FBInstant && !User.isShortCreated() && FBInstant.canCreateShortcutAsync().then(function(e) {
                    e && (AdHelper.logEvent("createShortcut"), FBInstant.createShortcutAsync().then(function() {
                        AdHelper.logEvent("createShortcutSuccess"), User.markShortCreated();
                    }).catch(function() {}));
                }), AdHelper.logEvent("level_result_show", {
                    type: "success"
                }), User.subscribeBot();
            },
            onAnimationOver: function() {
                var i = this;
                this.bottomBtn.active = !0, this.bottomBtn.opacity = 0, this.bottomBtn.runAction(cc.fadeIn(.2));
                var n = {
                    3: 5,
                    15: 3,
                    21: 5,
                    27: 4
                }, s = {
                    6: 5,
                    11: 4,
                    18: 5,
                    24: 7,
                    31: 5
                };
                console.log(n[this.data.stageId], User.isSkinBuy(n[this.data.stageId]));
                var e = DataMgr.getUnLockInfo(this.data.stageId);
                (n[this.data.stageId] || e && "skin" == e.type) && !User.isSkinBuy(n[this.data.stageId]) ? (PageMgr.showLoading(), 
                PageMgr.getPageAsync("TrySkinDialog", !0).then(function(e) {
                    var t = e.getComponent("TrySkinDialog");
                    t.setTryCb(function() {
                        i.trySkinId = n[i.data.stageId];
                    }), t.preLoad(n[i.data.stageId]).then(function() {
                        PageMgr.hideLoading(), PageMgr.showDialog("TrySkinDialog");
                    }).catch(function() {
                        PageMgr.hideLoading();
                    });
                })) : (s[this.data.stageId] || e && "weapon" == e.type) && !User.isWeaponBuy(s[this.data.stageId]) && PageMgr.getPageAsync("TryWeaponDialog").then(function(e) {
                    var t = e.getComponent("TryWeaponDialog");
                    t.setTryCb(function() {
                        i.tryWeaponId = s[i.data.stageId];
                    }), t.preLoad(s[i.data.stageId]).then(function() {
                        PageMgr.hideLoading(), PageMgr.showDialog("TryWeaponDialog");
                    }).catch(function(e) {
                        console.log(e), PageMgr.hideLoading();
                    });
                }), AchievementMgr.onPassLevel(this.data.stageId);
            },
            onClickPerfect: function() {
                var t = this;
                PageMgr.getPageAsync("ReplayDialog").then(function(e) {
                    e.getComponent("ReplayDialog").preLoad({
                        stageId: t.data.stageId
                    }), PageMgr.showDialog("ReplayDialog", !0, !0);
                });
            },
            starAnimation: function(e) {
                var t = this, i = this.starNode.getChildByName("resultpage_star_1"), n = this.starNode.getChildByName("resultpage_star_2"), s = this.starNode.getChildByName("resultpage_star_3");
                if (0 < this.data.starCount) {
                    i.active = !0, i.scale = 4;
                    i.runAction(cc.sequence(cc.scaleTo(.15, 1), cc.delayTime(.15), cc.callFunc(function() {
                        1 < t.data.starCount ? (n.active = !0, n.scale = 4, n.runAction(cc.sequence(cc.scaleTo(.15, 1), cc.delayTime(.15), cc.callFunc(function() {
                            2 < t.data.starCount ? (s.active = !0, s.scale = 4, s.runAction(cc.sequence(cc.scaleTo(.2, 1), cc.callFunc(function() {
                                e && e();
                            })))) : e && e();
                        })))) : e && e();
                    })));
                } else e && e();
            },
            playAnimation: function() {
                var e = this;
                this.starAnimation(function() {
                    e.startProgress = !0;
                });
            },
            onClickNext: function() {
                window.__adErrorCallback = window.__adFinishedCallback = ()=>{
                    var t = this;
                    if (this.data.stageId < Constants.PARAM.MapStageMax) {
                        var e = n.get(this.data.stageId);
                        e && !User.isRewardPlayed(this.data.stageId) ? User.markRewardPlayed(this.data.stageId) : e = null, 
                        Utils.startGameMain({
                            level: e ? this.data.stageId : this.data.stageId + 1,
                            from: "result",
                            skinId: this.trySkinId,
                            weaponId: this.tryWeaponId,
                            specialMap: e
                        }), this.trySkinId = null, this.tryWeaponId = null;
                    } else PageMgr.getPageAsync("MaxLevelDialog").then(function(e) {
                        e.getComponent("MaxLevelDialog").preLoad({
                            stageId: t.data.stageId
                        }).then(function() {
                            PageMgr.showDialog("MaxLevelDialog", !0, !0);
                        });
                    });
                }
                window.__adStartCallback = ()=>{
                }
                createVideoAd();
            },
            onClickBack: function() {
                this.collectNode.stopAllActions(), this.node.stopAllActions(), PageMgr.showPage("HomePage");
            },
            start: function() {},
            update: function(e) {
                var t = this;
                this.startProgress && this.progressBar.progress < this.data.progress && (this.progressBar.progress += 2 * e, 
                this.progressBar.progress >= this.data.progress && (this.startProgress = !1, 1 <= this.data.progress ? this.collectNode.runAction(cc.sequence(cc.scaleTo(.2, 1.2), cc.scaleTo(.2, 1), cc.moveBy(.3, cc.v2(620, 0)), cc.callFunc(function() {
                    t.resultNode.active = !0;
                }), cc.delayTime(.1), cc.callFunc(function() {
                    t.resultNode.runAction(cc.sequence(cc.scaleTo(.2, 1.5), cc.scaleTo(.2, 1), cc.callFunc(function() {
                        User.addReward(Constants.ITEMTYPE.COIN, 25), t.onAnimationOver();
                    })));
                }))) : this.onAnimationOver()));
            },
            shareGame: function() {
                this.redPoint.active = !1;
                var e = {
                    sharetype: "level_recored",
                    recoreds: this.data.recoreds,
                    version: Constants.PARAM.VideoVersion
                };
                1e3 <= JSON.stringify(e).length && (e = {}), Utils.shareGame("ShareVideo", {
                    type: 1,
                    stage: this.data.stageId,
                    photo: User.getPlayerPhoto(),
                    name: User.getPlayerName()
                }, {
                    text: "😎😎😎 My wonderful replay！ Don't you look at it?",
                    from: "resultPage",
                    data: e
                });
            }
        }), cc._RF.pop();
    }, {
        RewardLevelData: "RewardLevelData"
    } ],
    ResultRankItem: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "e4576CvcRJKY7kJDaxMS4e0", "ResultRankItem"), cc.Class({
            extends: cc.Component,
            properties: {
                rankNumPic: cc.Sprite,
                iconFrame: cc.Sprite,
                scoreLabel: cc.Label,
                rankLabel: cc.Label,
                playBtn: cc.Node,
                frontRankFrame: [ cc.SpriteFrame ],
                recBtn: cc.Node,
                bgNode: cc.Node,
                btnLabel: cc.Label,
                zanIconNode: cc.Node,
                zanLabel: cc.Label
            },
            onLoad: function() {
                this.defaultIconFrame = this.iconFrame.spriteFrame;
            },
            onClickPlay: function() {
                this.isMine ? Utils.shareGame("ShareVideo", {
                    type: 2,
                    photo: User.getPlayerPhoto(),
                    name: User.getPlayerName(),
                    score: this.data.score
                }, {
                    text: "😎😎😎 My wonderful replay！ Don't you look at it?",
                    from: "resultPageRank",
                    data: {
                        sharetype: "challenge_recored",
                        playerId: User.getPlayerID(),
                        photo: User.getPlayerPhoto(),
                        name: User.getPlayerName(),
                        skinId: User.getSkinId(),
                        weaponId: User.getWeaponId()
                    }
                }) : (PageMgr.showMask(), User.playWithFriends({
                    from: "rank_play",
                    playerId: this.data.playerId
                }, function(e) {
                    PageMgr.hideMask(), e || (PageMgr.hideDialog("RankPage"), Utils.startGameChallenge({
                        from: "rank_challenge"
                    }));
                }));
            },
            onClickREC: function() {
                var t = this;
                console.log("onClickREC"), PageMgr.showLoading(), Utils.GetChallengeVideo(this.data.playerId, !0).then(function(e) {
                    PageMgr.hideLoading(), Utils.replayGameChallenge({
                        isPlayBackMod: !0,
                        recordDatas: e.video,
                        photo: e.photo,
                        name: e.name,
                        skinId: e.skinId,
                        weaponId: e.weaponId,
                        playerId: e.playerId
                    }, function(e) {
                        e && (t.data.praise += 1, Utils.PraiseChallengeVideo(t.data.playerId, !0), t.updateItem(t.itemId, t.data));
                    });
                }, function() {
                    PageMgr.hideLoading(), PageMgr.showTips("Video lost!");
                });
            },
            updateItem: function(e, i) {
                var n = this;
                this.itemId = e, this.data = i, this.isMine = Global.platform == Global.PLATFORM.FBINSTANT && i.playerId == FBInstant.player.getID(), 
                this.bgNode.opacity = this.isMine ? 125 : 0, this.btnLabel.string = this.isMine ? "SHARE" : "PLAY", 
                this.zanLabel.string = i.praise, 0 < i.praise ? (this.zanLabel.node.color = new cc.color(250, 107, 28), 
                this.zanIconNode.color = new cc.color(250, 107, 28)) : (this.zanLabel.node.color = new cc.color(35, 58, 110), 
                this.zanIconNode.color = new cc.color(35, 58, 110)), i.score <= 0 ? this.recBtn.active = !1 : this.recBtn.active = !0, 
                i.rank <= 3 ? (this.rankNumPic.node.active = !0, this.rankLabel.node.active = !1, 
                this.rankNumPic.spriteFrame = this.frontRankFrame[i.rank - 1]) : (this.rankNumPic.node.active = !1, 
                this.rankLabel.node.active = !0, this.rankLabel.string = i.rank), this.iconFrame.spriteFrame = this.defaultIconFrame, 
                i.photo && cc.loader.load(i.photo, function(e, t) {
                    e || n.data != i || (n.iconFrame.spriteFrame = new cc.SpriteFrame(t));
                }), this.scoreLabel.string = i.score;
            },
            start: function() {}
        }), cc._RF.pop();
    }, {} ],
    RewardLevelData: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "0bf0cg5bppA0a2ifvNP2yNO", "RewardLevelData");
        var n = {};
        t.exports = {
            get: function(e) {
                return n[e] || null;
            }
        }, cc._RF.pop();
    }, {} ],
    RewardShowDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "c9412LlxGpPeaJS5vclHYjT", "RewardShowDialog");
        var n = e("Utils"), s = e("PageMgr");
        cc.Class({
            extends: cc.Component,
            properties: {
                itemIcon: cc.Sprite,
                itemShowIcon: cc.Sprite,
                itemNumLabel: cc.Label,
                doubleBtn: cc.Button,
                itemShowArr: [ cc.SpriteFrame ],
                itemIconArr: [ cc.SpriteFrame ],
                videoIcon: cc.Node,
                friendIcon: cc.Node
            },
            onEnable: function() {
                this.type = "video", this.videoIcon.active = !0, this.friendIcon.active = !1, SoundMgr.playByKey("RewardShow"), 
                AdHelper.logEvent("reward_collect_show", {
                    type: this.type
                }), this.doubleBtn.interactable = AdHelper.isVideoLoad(), this.doubleBtn.node.active = cc.sys.isMobile;
            },
            setData: function(e, t) {
                this.data = e, this.doubleBtn.node.active = !t, e.itemType == Constants.ITEMTYPE.COIN ? (this.itemShowIcon.spriteFrame = this.itemShowArr[0], 
                this.itemIcon.spriteFrame = this.itemIconArr[0]) : e.itemType == Constants.ITEMTYPE.PROTECT && (this.itemShowIcon.spriteFrame = this.itemShowArr[1], 
                this.itemIcon.spriteFrame = this.itemIconArr[1]), this.itemNumLabel.string = e.num, 
                this.callback = e.callback;
            },
            close: function() {
                s.hideDialog("RewardShowDialog"), this.callback && this.callback();
            },
            addReward: function(e) {
                var t = e ? 2 : 1;
                User.addReward(this.data.itemType, this.data.num * t);
            },
            doubleClick: function() {
                var e = this, t = function() {
                    AdHelper.logEvent("reward_collect_click", {
                        double: "true",
                        type: e.type
                    }), e.itemNumLabel.string = 2 * e.data.num, e.itemNumLabel.node.runAction(cc.sequence(cc.scaleTo(.1, 1.5), cc.scaleTo(.2, 1))), 
                    e.addReward(!0), e.doubleBtn.interactable = !1, e.close();
                };
                "video" == this.type ? AdHelper.showVideoAd("reward_collect", t) : "invite" == this.type && User.chooseFriends({
                    from: "reward_collect"
                }, function(e) {
                    e ? "SAME_CONTEXT" == e.code && s.showTips("YOU ALREADY MESSAGED THIS FRIEND.") : (t(), 
                    n.sendFbMessage("ShareGame", {
                        playerName: User.getPlayerName(),
                        playerPhoto: User.getPlayerPhoto()
                    }, {
                        text: "😉😉😉 Never found such a fun game, try it!",
                        from: "reward_collect"
                    }));
                });
            },
            singleClick: function() {
                AdHelper.logEvent("reward_collect_click", {
                    double: "false",
                    type: this.type
                }), this.addReward(!1), this.close();
            }
        }), cc._RF.pop();
    }, {
        PageMgr: "PageMgr",
        Utils: "Utils"
    } ],
    RunMonsterTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "785aeKjLm5Oeqzfx4ykjwJl", "RunMonsterTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {},
            ctor: function() {
                this.isFreezon = !1, this.isDied = !1;
            },
            init: function() {
                this._super();
                var e = cc.instantiate(this.prefab), t = this.getTilePosition();
                return this.activeNode = e, this.activeNodeOffsetX = this.activeNode.x, this.activeNodeOffsetY = this.activeNode.y, 
                this.activeNode.x = t.x + this.activeNodeOffsetX, this.activeNode.y = t.y + this.activeNodeOffsetY, 
                this.activeTileX = this.tileX, this.activeTileY = this.tileY, this.monsterMgr.monsterLayer.addChild(this.activeNode), 
                this.activeNode.getComponent(cc.Animation).play(), 0 == this.moveDir.y && 0 < this.moveDir.x && (this.activeNode.scaleX = -this.activeNode.scaleX), 
                !0;
            },
            setProp: function(e) {
                this._super(e), null != e.dir && this.setDir(e.dir);
            },
            setDir: function(e) {
                var t = null;
                3 == e ? t = {
                    x: 0,
                    y: 1
                } : 2 == e ? t = {
                    x: 0,
                    y: -1
                } : 1 == e ? t = {
                    x: 1,
                    y: 0
                } : 0 == e && (t = {
                    x: -1,
                    y: 0
                }), this.oriDir = t, this.moveDir = this.oriDir, this.moveSpeed = .5, this.stepGap = 2, 
                this.pauseFlag = !1, this.pauseTime = 0;
            },
            setMonster: function(e, t) {
                return this.prefab = t, this.monsterMgr = e, !0;
            },
            isHit: function() {
                var e = this;
                if (!this.activeNode) return !1;
                if (this.isDied) return !1;
                var t = this.mainGame.player;
                if (t.tileX == this.activeTileX && t.tileY == this.activeTileY) {
                    if (this.isFreezon) {
                        this.activeNode.getComponent(cc.Animation).stop(), this.activeNode.getComponent(cc.Sprite).spriteFrame = null;
                        var i = this.activeNode.getChildByName("bingkai").getComponent(cc.Animation);
                        i.off("finished"), i.play("icebreak"), i.on("finished", function() {
                            e.monsterMgr.removeMonster(e);
                        }), AchievementMgr.onKillBat();
                    } else t.setPlayerDeath(this, "RunMonster"), this.monsterMgr.removeMonster(this);
                    return this.isDied = !0;
                }
            },
            removeAll: function() {
                this.activeNode && this.activeNode.removeFromParent();
            },
            step: function(e) {
                if (!this.isFreezon && !this.isDied) {
                    if (this.pauseFlag) {
                        if (this.pauseTime < 35) return this.pauseTime += 1, void (0 == this.moveDir.y && 20 == this.pauseTime && (this.activeNode.scaleX = -this.activeNode.scaleX));
                        this.pauseTime = 0, this.pauseFlag = !1;
                    }
                    if (this.moveDir && (0 != this.moveDir.x || 0 != this.moveDir.y)) {
                        var t = this.mainGame.getTileAt(this.activeTileX, this.activeTileY), i = this.mainGame.getTileAt(this.activeTileX + this.moveDir.x, this.activeTileY + this.moveDir.y), n = t.getTilePosition(), s = i.getTilePosition(), a = 0 == this.moveDir.x ? s.y + this.activeNodeOffsetY : s.x + this.activeNodeOffsetX;
                        this.activeNode.x += this.moveDir.x * e * this.moveSpeed, this.activeNode.y -= this.moveDir.y * e * this.moveSpeed;
                        var o = a - (0 == this.moveDir.x ? this.activeNode.y : this.activeNode.x);
                        i.isWalkable ? Math.abs(o) <= e * this.moveSpeed / 2 && (this.activeTileX = i.tileX, 
                        this.activeTileY = i.tileY, this.activeNode.x = s.x + this.activeNodeOffsetX, this.activeNode.y = s.y + this.activeNodeOffsetY) : (this.pauseFlag = !0, 
                        this.moveDir.x = -this.moveDir.x, this.moveDir.y = -this.moveDir.y, this.activeNode.x = n.x + this.activeNodeOffsetX, 
                        this.activeNode.y = n.y + this.activeNodeOffsetY);
                    }
                }
            },
            onFreeze: function() {
                this.isFreezon = !0, this.activeNode && (this.activeNode.getChildByName("bingkai").active = !0, 
                this.activeNode.getComponent(cc.Animation).pause());
            },
            onUnFreeze: function() {
                this.isDied || (this.isFreezon = !1, this.activeNode && (this.activeNode.getChildByName("bingkai").active = !1, 
                this.activeNode.getComponent(cc.Animation).resume()));
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    ScoreBuffMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "6ca80xS6DBHD5olUSLa6Xna", "ScoreBuffMgr");
        var n = {}, s = new cc.NodePool(), a = Constants.DOUBLE_SCORE_TIME, o = Constants.EFFECT_TYPE;
        n.initGame = function(e, t, i) {
            this.layerNode = e, this.prefab = t, this.mainGame = i, this.tileList = [], this.inited || (this.inited = !0, 
            this.FREEZE_TIME = a, this.leftTime = 0);
        }, n.resetAll = function(e, t) {
            this.inited && (this.leftTime = 0);
        }, n.addTile = function(e, t) {
            var i = s.get() || cc.instantiate(this.prefab);
            i.position = this.mainGame.getTilePosition(e, t), i.x += this.mainGame.tileSize.width / 2, 
            i.y -= this.mainGame.tileSize.height / 2, this.layerNode.addChild(i);
            var n = i.getComponent("ScoreBuffTile");
            return n.tileX = e, n.tileY = t, this.tileList.push(n), n;
        }, n.removeTile = function(e) {
            if (this.inited) for (var t = this.tileList.length - 1; 0 <= t; t--) if (this.tileList[t] == e) {
                this.tileList.splice(t, 1), s.put(e.node);
                break;
            }
        }, n.removeAll = function(e, t) {
            if (this.inited) {
                for (var i = this.tileList.length - 1; 0 <= i; i--) s.put(this.tileList[i].node);
                this.tileList = [];
            }
        }, n.addBuff = function() {
            this.leftTime = this.FREEZE_TIME;
            var e = this.mainGame.player;
            e.weaponEffectType == o.DOUBLESCORE && (this.leftTime += e.weaponEffectCount);
        }, n.isBuffActive = function() {
            return 0 < this.leftTime;
        }, n.getBuffTimePercent = function() {
            return this.leftTime / this.FREEZE_TIME;
        }, n.removeBuff = function() {}, n.step = function(e, t) {
            this.inited && (this.leftTime <= 0 || (this.leftTime -= e, this.leftTime <= 0 && (this.leftTime = 0, 
            n.removeBuff())));
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    ScoreBuffTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "514b6ubI9VF4KWLDW2zPoEj", "ScoreBuffTile");
        var n = e("ScoreBuffMgr"), s = e("BaseTile");
        cc.Class({
            extends: s,
            properties: {},
            ctor: function() {
                this.isScoreBuff = !0;
            },
            onPlayerEnter: function(e) {
                this.mainGame.removeTileAt(this.tileX, this.tileY), n.addBuff(), SoundMgr.play("getScore");
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile",
        ScoreBuffMgr: "ScoreBuffMgr"
    } ],
    ScrollPageView: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "fdc9dq4Z9pCZp0Q/CppTtyS", "ScrollPageView");
        var a = cc.Enum({
            Unified: 0,
            Free: 1
        }), o = cc.Enum({
            Horizontal: 0,
            Vertical: 1
        }), n = cc.Enum({
            PAGE_TURNING: 0
        }), s = cc.Class({
            extends: cc.ScrollView,
            ctor: function() {
                this._curPageIdx = 0, this._lastPageIdx = 0, this._pages = [], this._scrollCenterOffsetX = [], 
                this._scrollCenterOffsetY = [];
            },
            properties: {
                sizeMode: {
                    default: a.Unified,
                    type: a,
                    notify: function() {
                        this._syncSizeMode();
                    }
                },
                direction: {
                    default: o.Horizontal,
                    type: o,
                    notify: function() {
                        this._syncScrollDirection();
                    }
                },
                scrollThreshold: {
                    default: .5,
                    type: cc.Float,
                    slide: !0,
                    range: [ 0, 1, .01 ]
                },
                autoPageTurningThreshold: {
                    default: 100,
                    type: cc.Float
                },
                pageTurningEventTiming: {
                    default: .1,
                    type: cc.Float,
                    range: [ 0, 1, .01 ]
                },
                indicator: {
                    default: null,
                    type: cc.PageViewIndicator,
                    notify: function() {
                        this.indicator && this.indicator.setPageView(this);
                    }
                },
                pageTurningSpeed: {
                    default: .3,
                    type: cc.Float
                },
                pageWidth: 280,
                pageEvents: {
                    default: [],
                    type: cc.Component.EventHandler
                }
            },
            statics: {
                SizeMode: a,
                Direction: o,
                EventType: n
            },
            __preload: function() {
                this.node.on("size-changed", this._updateAllPagesSize, this);
            },
            onEnable: function() {
                this._super(), this.node.on("scroll-ended-with-threshold", this._dispatchPageTurningEvent, this);
            },
            onDisable: function() {
                this._super(), this.node.off("scroll-ended-with-threshold", this._dispatchPageTurningEvent, this);
            },
            onLoad: function() {
                this._initPages(), this.indicator && this.indicator.setPageView(this);
            },
            onDestroy: function() {
                this.node.off("size-changed", this._updateAllPagesSize, this);
            },
            getCurrentPageIndex: function() {
                return this._curPageIdx;
            },
            setCurrentPageIndex: function(e) {
                this.scrollToPage(e, !0);
            },
            getPages: function() {
                return this._pages;
            },
            addPage: function(e) {
                e && -1 === this._pages.indexOf(e) && this.content && (this.content.addChild(e), 
                this._pages.push(e), this._updatePageView());
            },
            insertPage: function(e, t) {
                t < 0 || !e || -1 !== this._pages.indexOf(e) || !this.content || (this._pages.length <= t ? this.addPage(e) : (this._pages.splice(t, 0, e), 
                this.content.addChild(e), this._updatePageView()));
            },
            removePage: function(e) {
                if (e && this.content) {
                    var t = this._pages.indexOf(e);
                    -1 !== t ? this.removePageAtIndex(t) : cc.warnID(4300, e.name);
                }
            },
            removePageAtIndex: function(e) {
                var t = this._pages;
                if (!(e < 0 || e >= t.length)) {
                    var i = t[e];
                    i && (this.content.removeChild(i), t.splice(e, 1), this._updatePageView());
                }
            },
            removeAllPages: function() {
                if (this.content) {
                    for (var e = this._pages, t = 0, i = e.length; t < i; t++) this.content.removeChild(e[t]);
                    this._pages.length = 0, this._updatePageView();
                }
            },
            scrollToPage: function(e, t) {
                e < 0 || e >= this._pages.length || (t = void 0 !== t ? t : .3, this._curPageIdx = e, 
                this.scrollToOffset(this._moveOffsetValue(e), t, !0), this.indicator && this.indicator._changedState());
            },
            getScrollEndedEventTiming: function() {
                return this.pageTurningEventTiming;
            },
            _syncScrollDirection: function() {
                this.horizontal = this.direction === o.Horizontal, this.vertical = this.direction === o.Vertical;
            },
            _syncSizeMode: function() {
                if (this.content) {
                    var e = this.content.getComponent(cc.Layout);
                    if (e) {
                        if (0 === this._pages.length) e.padding = 0; else {
                            var t = this._pages[this._pages.length - 1];
                            this.sizeMode === a.Free && (this.direction === o.Horizontal ? (e.paddingLeft = (this.node.width - this._pages[0].width) / 2, 
                            e.paddingRight = (this.node.width - t.width) / 2) : this.direction === o.Vertical && (e.paddingTop = (this.node.height - this._pages[0].height) / 2, 
                            e.paddingBottom = (this.node.height - t.height) / 2));
                        }
                        e.updateLayout();
                    }
                }
            },
            _updatePageView: function() {
                var e = this._pages.length;
                this._curPageIdx >= e && (this._curPageIdx = 0 === e ? 0 : e - 1, this._lastPageIdx = this._curPageIdx);
                for (var t = 0; t < e; ++t) this._pages[t].setSiblingIndex(t), this.direction === o.Horizontal ? this._scrollCenterOffsetX[t] = Math.abs(this.content.x + this._pages[t].x) : this._scrollCenterOffsetY[t] = Math.abs(this.content.y + this._pages[t].y);
                var i = this.content.getComponent(cc.Layout);
                i && i.enabled && i.updateLayout(), this.indicator && this.indicator._refresh();
            },
            _updateAllPagesSize: function() {
                if (this.sizeMode === a.Unified) for (var e = this._pages, t = this.node.getContentSize(), i = 0, n = e.length; i < n; i++) e[i].setContentSize(t);
            },
            _initPages: function() {
                if (this.content) {
                    for (var e = this.content.children, t = 0; t < e.length; ++t) {
                        var i = e[t];
                        0 <= this._pages.indexOf(i) || this._pages.push(i);
                    }
                    this._syncScrollDirection(), this._syncSizeMode(), this._updatePageView();
                }
            },
            _dispatchPageTurningEvent: function() {
                this._lastPageIdx !== this._curPageIdx && (this._lastPageIdx = this._curPageIdx, 
                cc.Component.EventHandler.emitEvents(this.pageEvents, this, n.PAGE_TURNING), this.node.emit("page-turning", this));
            },
            _isScrollable: function(e, t, i) {
                if (this.sizeMode === a.Free) {
                    var n, s;
                    if (this.direction === o.Horizontal) return n = this._scrollCenterOffsetX[t], s = this._scrollCenterOffsetX[i], 
                    Math.abs(e.x) >= Math.abs(n - s) * this.scrollThreshold;
                    if (this.direction === o.Vertical) return n = this._scrollCenterOffsetY[t], s = this._scrollCenterOffsetY[i], 
                    Math.abs(e.y) >= Math.abs(n - s) * this.scrollThreshold;
                } else {
                    if (this.direction === o.Horizontal) return Math.abs(e.x) >= this.pageWidth * this.scrollThreshold;
                    if (this.direction === o.Vertical) return Math.abs(e.y) >= this.node.height * this.scrollThreshold;
                }
            },
            _isQuicklyScrollable: function(e) {
                if (this.direction === o.Horizontal) {
                    if (Math.abs(e.x) > this.autoPageTurningThreshold) return !0;
                } else if (this.direction === o.Vertical && Math.abs(e.y) > this.autoPageTurningThreshold) return !0;
                return !1;
            },
            _moveOffsetValue: function(e) {
                var t = cc.p(0, 0);
                return this.sizeMode === a.Free ? this.direction === o.Horizontal ? t.x = this._scrollCenterOffsetX[e] : this.direction === o.Vertical && (t.y = this._scrollCenterOffsetY[e]) : this.direction === o.Horizontal ? t.x = e * this.pageWidth : this.direction === o.Vertical && (t.y = e * this._scrollCenterOffsetY[0]), 
                t;
            },
            _getDragDirection: function(e) {
                return this.direction === o.Horizontal ? 0 === e.x ? 0 : 0 < e.x ? 1 : -1 : this.direction === o.Vertical ? 0 === e.y ? 0 : e.y < 0 ? 1 : -1 : void 0;
            },
            _handleReleaseLogic: function(e) {
                var t = this._startBounceBackIfNeeded(), i = cc.pSub(this._touchBeganPosition, this._touchEndPosition);
                if (t) {
                    var n = this._getDragDirection(i);
                    if (0 === n) return;
                    this._curPageIdx = 0 < n ? this._pages.length - 3 : 0, this.indicator && this.indicator._changedState();
                } else {
                    var s = this._curPageIdx, a = s + this._getDragDirection(i), o = this.pageTurningSpeed * Math.abs(s - a);
                    if (a < this._pages.length) {
                        if (this._isScrollable(i, s, a)) return void this.scrollToPage(a, o);
                        var r = this._calculateTouchMoveVelocity();
                        if (this._isQuicklyScrollable(r)) return void this.scrollToPage(a, o);
                    }
                    this.scrollToPage(s, o);
                }
            },
            _onTouchBegan: function(e, t) {
                this._touchBeganPosition = e.touch.getLocation(), this._super(e, t);
            },
            _onTouchMoved: function(e, t) {
                this._super(e, t);
            },
            _onTouchEnded: function(e, t) {
                this._touchEndPosition = e.touch.getLocation(), this._super(e, t);
            },
            _onTouchCancelled: function(e, t) {
                this._touchEndPosition = e.touch.getLocation(), this._super(e, t);
            },
            _onMouseWheel: function() {}
        });
        t.exports = s, cc._RF.pop();
    }, {} ],
    SecretTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f3c2fv3gaxLHpMVlSQsBLoa", "SecretTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {
                anim: cc.Animation
            },
            ctor: function() {
                this.isSecret = !0, this.isHide = !1;
            },
            init: function() {
                this.isHide = !1;
            },
            onPlayerEnter: function(e) {
                this.isHide || (this.isHide = !0, this.mainGame.hideSecretLayer());
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    ShareGame: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "18356HnqMtB7YpW6VI6aezQ", "ShareGame"), cc.Class({
            extends: cc.Component,
            properties: {
                playerName: cc.Label,
                playerPhoto: cc.Sprite
            },
            onLoad: function() {
                var i = this;
                this.node.on("pre_capture", function(e) {
                    e.detail;
                    i.playerName.string = User.getPlayerName(), User.getPlayerPhoto() ? cc.loader.load(User.getPlayerPhoto(), function(e, t) {
                        i.playerPhoto.spriteFrame = new cc.SpriteFrame(t), i.node.emit("finished");
                    }) : i.node.emit("finished");
                });
            }
        }), cc._RF.pop();
    }, {} ],
    SharePraise: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f2804UMW7NNdaiNeI4kh5IE", "SharePraise"), cc.Class({
            extends: cc.Component,
            properties: {
                playerName1: cc.Label,
                playerPhoto1: cc.Sprite,
                playerName2: cc.Label,
                playerPhoto2: cc.Sprite
            },
            onLoad: function() {
                var a = this;
                this.node.on("pre_capture", function(e) {
                    var t = e.detail;
                    a.playerName1.string = User.getPlayerName(), a.playerName2.string = t.name;
                    var i = 0, n = function() {
                        2 == ++i && a.node.emit("finished");
                    }, s = User.getPlayerPhoto();
                    s ? cc.loader.load(s, function(e, t) {
                        a.playerPhoto1.spriteFrame = new cc.SpriteFrame(t), n();
                    }) : n(), t.photo ? cc.loader.load(t.photo, function(e, t) {
                        a.playerPhoto2.spriteFrame = new cc.SpriteFrame(t), n();
                    }) : n();
                });
            }
        }), cc._RF.pop();
    }, {} ],
    ShareResult: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "1cf20/DFWhBlZfiAJGzUy0N", "ShareResult"), cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                var t = this;
                this.node.on("pre_capture", function(e) {
                    e.detail;
                    t.node.emit("finished");
                });
            },
            start: function() {}
        }), cc._RF.pop();
    }, {} ],
    ShareVideo: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "aee1cid4n1L3adwLlNgmJpp", "ShareVideo"), cc.Class({
            extends: cc.Component,
            properties: {
                playerName: cc.Label,
                playerPhoto: cc.Sprite,
                playerSp: sp.Skeleton,
                stageLabel: cc.Label,
                stageNode: cc.Node,
                challengeNode: cc.Node,
                challengeScoreLabel: cc.Label
            },
            onLoad: function() {
                var s = this;
                this.node.on("pre_capture", function(e) {
                    var t = e.detail;
                    s.playerName.string = t.name, 1 == t.type ? (s.stageNode.active = !0, s.challengeNode.active = !1, 
                    s.stageLabel.string = t.stage) : (s.stageNode.active = !1, s.challengeNode.active = !0, 
                    s.challengeScoreLabel.string = t.score);
                    var i = 0, n = function() {
                        2 == ++i && s.node.emit("finished");
                    };
                    t.photo ? cc.loader.load(t.photo, function(e, t) {
                        s.playerPhoto.spriteFrame = new cc.SpriteFrame(t), n();
                    }) : n(), cc.loader.loadRes(DataMgr.getSkinRes(User.getSkinId()), sp.SkeletonData, function(e, t) {
                        s.playerSp.skeletonData = t, setTimeout(function() {
                            s.playerSp.setAnimation(0, "RuChang3", !0), s.playerSp.setSkin(DataMgr.getSkinName(User.getSkinId()));
                            var e = DataMgr.getWeaponCfgById(User.getWeaponId());
                            s.playerSp.setAttachment(e.slotName, e.attachmentName), n();
                        }, 20);
                    });
                });
            }
        }), cc._RF.pop();
    }, {} ],
    ShopCoinPageItem: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "0919d/THRZM84sUOW4cMtoe", "ShopCoinPageItem");
        var n = e("ListItem");
        cc.Class({
            extends: n,
            properties: {
                titleLabel: cc.Label,
                iconArr: [ cc.SpriteFrame ],
                itemDescLabel: cc.Label,
                moneyLabel: cc.Label,
                iconSprite: cc.Sprite,
                itemNode: cc.Node,
                btnLabel: cc.Label,
                btnSprite: cc.Sprite,
                spinBtn: cc.Node,
                buyBtnNode: cc.Node,
                shieldBtn: cc.Node,
                shiedlAdBtn: cc.Node
            },
            onEnable: function() {},
            updateItem: function(e, t) {
                if (this.itemData = t, this.itemId = e, this.titleLabel.string = t.title, this.iconSprite.spriteFrame = this.iconArr[t.icon], 
                4 == t.type ? this.iconSprite.node.scale = 1.6 : this.iconSprite.node.scale = 1, 
                this.spinBtn.active = !1, this.buyBtnNode.active = !1, this.shieldBtn.active = !1, 
                this.shiedlAdBtn.active = !1, 2 == t.type) this.spinBtn.active = !0; else if (4 == t.type) {
                    this.shieldBtn.active = !1, 200 <= User.getKeyValue("goldNum") ? (this.shieldBtn.active = !0, 
                    10 <= User.getShieldCount() ? this.shieldBtn.getComponent(cc.Button).interactable = !1 : this.shieldBtn.getComponent(cc.Button).interactable = !0) : this.shiedlAdBtn.active = !0;
                } else this.buyBtnNode.active = !0, 1 == t.type ? AdHelper.isVideoLoad() ? this.buyBtnNode.getComponent(cc.Button).interactable = !0 : this.buyBtnNode.getComponent(cc.Button).interactable = !1 : this.buyBtnNode.getComponent(cc.Button).interactable = !0;
                this.itemNode.active = !1, null != t.descStr ? (this.itemDescLabel.node.active = !0, 
                this.itemDescLabel.string = t.descStr) : (this.itemDescLabel.node.active = !1, 1 != t.type && 3 != t.type || (this.itemNode.active = !0, 
                this.moneyLabel.string = t.money)), null != t.btnIcon ? (this.btnSprite.node.active = !0, 
                this.btnLabel.node.active = !1) : (this.btnSprite.node.active = !1, this.btnLabel.node.active = !0, 
                this.btnLabel.string = t.btnDesc);
            },
            onClickItem: function(e, t) {
                var n = this;
                if (1 == this.itemData.type) AdHelper.showVideoAd("shopItem_type" + this.itemData.type, function() {
                    1 == n.itemData.type && PageMgr.getPageAsync("RewardShowDialog").then(function(e) {
                        var t = e.getComponent("RewardShowDialog"), i = {};
                        i.num = n.itemData.money, i.itemType = 1, i.callback = function() {
                            AdHelper.isVideoLoad() ? this.buyBtnNode.getComponent(cc.Button).interactable = !0 : this.buyBtnNode.getComponent(cc.Button).interactable = !1;
                        }.bind(n), t.setData(i), PageMgr.showDialog("RewardShowDialog", !0, !0);
                    });
                }); else if (3 == this.itemData.type) {
                    var s = this.itemData.money;
                    AdHelper.logEvent("shop_pay_click", {
                        id: this.itemData.productId
                    }), User.isPayReady() ? User.purchase(this.itemData.productId, function() {
                        PageMgr.getPageAsync("RewardShowDialog").then(function(e) {
                            var t = e.getComponent("RewardShowDialog"), i = {};
                            i.num = s, i.itemType = 1, i.callback = function() {}.bind(n), t.setData(i, !0), 
                            PageMgr.showDialog("RewardShowDialog", !0, !0);
                        });
                    }) : PageMgr.showDialog("PayTipDialog", !0);
                } else 4 == this.itemData.type && (User.decGold(200, !0) ? (AdHelper.logEvent("shop_buy_sheild"), 
                PageMgr.getPageAsync("RewardShowDialog").then(function(e) {
                    var t = e.getComponent("RewardShowDialog"), i = {
                        num: 1,
                        itemType: 2
                    };
                    i.callback = function() {
                        10 <= User.getShieldCount() && (this.shieldBtn.getComponent(cc.Button).interactable = !1);
                    }.bind(n), t.setData(i, !0), PageMgr.showDialog("RewardShowDialog", !0, !0);
                },()=>{
                    PageMgr.showTips("Sorry, no ad available!")
                    PageMgr.hideMask();
                })) : PageMgr.showTips("Not enough coins!"));
            },
            onClickShieldAd: function() {
                var n = this;
                PageMgr.showMask(), AdHelper.showVideoAd("shopItem_shield_ad" + this.itemData.type, function() {
                    PageMgr.hideMask(), PageMgr.getPageAsync("RewardShowDialog").then(function(e) {
                        var t = e.getComponent("RewardShowDialog"), i = {
                            num: 1,
                            itemType: 2
                        };
                        i.callback = function() {
                            10 <= User.getShieldCount() && (this.shieldBtn.getComponent(cc.Button).interactable = !1);
                        }.bind(n), t.setData(i, !0), PageMgr.showDialog("RewardShowDialog", !0, !0);
                    });
                },()=>{
                    PageMgr.showTips("Sorry, no ad available!")
                    PageMgr.hideMask();
                });
            },
            update: function(e) {
                this.itemData && 1 == this.itemData.type ? this.buyBtnNode.getComponent(cc.Button).interactable = AdHelper.isVideoLoad() : this.itemData && 4 == this.itemData.type && (this.shiedlAdBtn.getComponent(cc.Button).interactable = AdHelper.isVideoLoad());
            },
            start: function() {}
        }), cc._RF.pop();
    }, {
        ListItem: "ListItem"
    } ],
    ShopPage: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "77b597acs9El7o4DCcxfQbe", "ShopPage");
        var n = e("ListView"), a = [ {
            id: 1,
            type: 1,
            title: "FREE COINS",
            icon: 0,
            money: 200,
            btnDesc: "FREE",
            btnIcon: 2
        }, {
            id: 2,
            type: 4,
            title: "SHIELD",
            icon: 8,
            descStr: "1 SHIELD",
            btnIcon: 2
        }, {
            id: 3,
            type: 2,
            title: "FREE SPIN",
            icon: 1,
            descStr: "1 SPIN",
            btnIcon: 1
        } ], r = [ {
            id: 1,
            type: 1,
            title: "FREE COINS",
            icon: 0,
            money: 200,
            btnDesc: "FREE",
            btnIcon: 2
        }, {
            id: 2,
            type: 4,
            title: "SHIELD",
            icon: 8,
            descStr: "1 SHIELD",
            btnIcon: 2
        }, {
            id: 3,
            type: 2,
            title: "FREE SPIN",
            icon: 1,
            descStr: "1 SPIN",
            btnIcon: 1
        } ];
        cc.Class({
            extends: cc.Component,
            properties: {
                topBarPrefab: cc.Prefab,
                bottomNode: cc.Node,
                skinList: n,
                skillList: n,
                coinList: n,
                toggle1: cc.Toggle,
                toggle2: cc.Toggle,
                toggle3: cc.Toggle
            },
            playEnableAnimation: function() {
                this.topBar.runAction(cc.moveTo(.5, cc.v2(0, this.topBarY))), this.bottomNode.runAction(cc.moveTo(.5, cc.v2(0, 0)));
            },
            onLoad: function() {
                this.topBar = cc.instantiate(this.topBarPrefab), this.node.addChild(this.topBar), 
                this.topBarY = cc.winSize.height / 2 - 60, this.topBar.y = this.topBarY, this.bottomNode.scale = cc.winSize.width / 750;
            },
            onEnable: function() {
                for (var i = this, e = 0; e < a.length; e++) a[e].productId && (a[e].btnDesc = User.getPrice(a[e].productId, a[e].btnDesc));
                var o = User.getMaxStage(), n = function(node) {
                    const curId = User.getSkinId();
                    for (var e = [], t = User.getSkinInfo(), i = 0; i < t.length; i++) {
                        var n = t[i], s = DataMgr.getSkinCfgById(n.id), a = 1 == n.buy || 0 == s.collectType && 0 == s.coinNeed;
                        e.push({
                            skinId: n.id,
                            isSelected: n.id == curId,
                            isUnlock: 1 == n.buy || o >= s.unlockLevel,
                            unlockLevel: s.unlockLevel,
                            isBuy: a,
                            coinNeed: s.coinNeed,
                            shopPageNode: node,
                            collectType: s.collectType
                        });
                    }
                    return e;
                }, s = function(node) {
                    for (var e = [], t = User.getWeaponInfo(), i = User.getWeaponId(), n = 0; n < t.length; n++) {
                        var s = t[n], a = DataMgr.getWeaponCfgById(s.id);
                        e.push({
                            id: s.id,
                            isSelected: s.id == i,
                            isUnlock: o >= a.unlockLevel,
                            unlockLevel: a.unlockLevel,
                            shopPageNode: node,
                            isBuy: 1 == s.buy,
                            coinNeed: a.coinNeed,
                            desc: a.desc,
                            star: a.star
                        });
                    }
                    return e;
                };
                this.skinList.setItemsData(n(this.node)), this.skillList.setItemsData(s(this.node)), 
                User.isPayReady() ? this.coinList.setItemsData(a) : this.coinList.setItemsData(r), 
                this.toggleId = "0", this.toggle1.isChecked = !1, this.toggle2.isChecked = !0, this.toggle3.isChecked = !1, 
                this.onToggleClick(null, "3"), this.node.off("weaponSelected"), this.node.on("weaponSelected", function(e) {
                    var t = e.detail.id;
                    User.setWeaponId(t), i.skillList.updateItemsData(s(i.node)), i.skinList.updateItemsData(n(i.node));
                });
                this.node.off("skinSelected")
                this.node.on("skinSelected",function (e) {
                    var t = e.detail.id;
                    User.setSkinId(t);
                    i.skillList.updateItemsData(s(i.node)), i.skinList.updateItemsData(n(i.node));
                })
            },
            start: function() {},
            onToHome: function() {
                PageMgr.hideDialog("ShopPage");
                var e = PageMgr.getPage("HomePage");
                e && e.getComponent("HomePage").onDialogClose();
            },
            onToggleClick: function(e, t) {
                t != this.toggleId && (this.skinList.node.active = !1, this.skillList.node.active = !1, 
                this.coinList.node.active = !1, "1" == t ? (this.skinList.node.active = !0, this.skinList.scollToIndex(0)) : "2" == t ? (this.skillList.node.active = !0, 
                this.skillList.scollToIndex(0)) : (this.coinList.node.active = !0, this.coinList.scollToIndex(0)), 
                this.toggleId = t);
            },
            test: function() {
                this.skillList.scollToIndex(7);
            }
        }), cc._RF.pop();
    }, {
        ListView: "ListView"
    } ],
    ShopQuickShowDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "58b05iZoapAHLI/WVNILpOJ", "ShopQuickShowDialog");
        var n = e("ListView"), s = [ {
            id: 1,
            type: 1,
            title: "FREE COINS",
            icon: 0,
            money: 200,
            btnDesc: "FREE"
        }, {
            id: 3,
            type: 2,
            title: "FREE SPIN",
            icon: 1,
            descStr: "1 SPIN",
            btnIcon: 1
        } ], a = [ {
            id: 1,
            type: 1,
            title: "FREE COINS",
            icon: 0,
            money: 200,
            btnDesc: "FREE"
        }, {
            id: 3,
            type: 2,
            title: "FREE SPIN",
            icon: 1,
            descStr: "1 SPIN",
            btnIcon: 1
        } ], o = [ {
            id: 2,
            type: 4,
            title: "SHIELD",
            icon: 8,
            descStr: "1 SHIELD",
            btnIcon: 2
        }, {
            id: 3,
            type: 2,
            title: "FREE SPIN",
            icon: 1,
            descStr: "1 SPIN",
            btnIcon: 1
        } ];
        cc.Class({
            extends: cc.Component,
            properties: {
                coinList: n
            },
            preLoad: function(e) {
                this.onCloseFun = e.onClose, this.type = e.type;
            },
            onLoad: function() {
                this.node.scale = cc.winSize.width / 750;
            },
            onEnable: function() {
                1 == this.type ? User.isPayReady() ? this.coinList.setItemsData(s) : this.coinList.setItemsData(a) : this.coinList.setItemsData(o);
            },
            start: function() {},
            onClose: function() {
                PageMgr.hideDialog("ShopQuickShowDialog"), this.onCloseFun && this.onCloseFun();
            }
        }), cc._RF.pop();
    }, {
        ListView: "ListView"
    } ],
    ShopSkillPageItem: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "fdd59rCSmxAj7EcQIZop3oh", "ShopSkillPageItem");
        var n = e("ListItem");
        cc.Class({
            extends: n,
            properties: {
                label: cc.Label,
                selectBtn: cc.Button,
                moneyLabel: cc.Label,
                buyNode: cc.Node,
                iconArr: [ cc.SpriteFrame ],
                iconSprite: cc.Sprite,
                descLabel: cc.Label,
                starLayout: cc.Layout,
                starPrefeb: cc.Prefab,
                adNode: cc.Node
            },
            onLoad: function() {
                this.starPool = new cc.NodePool();
                for (var e = 0; e < 5; ++e) {
                    var t = cc.instantiate(this.starPrefeb);
                    this.starPool.put(t);
                }
            },
            onEnable: function() {},
            updateItem: function(e, t) {
                this.itemData = t, this.itemId = e, this.shopPageNode = t.shopPageNode, this.descLabel.string = t.desc || "", 
                this.iconSprite.spriteFrame = this.iconArr[t.id - 1];
                var i = this.starLayout.node.children;
                if (i.length != t.star) for (var n = i.length, s = 0; s < n || s < t.star; ++s) if (s >= t.star) this.starPool.put(i[i.length - 1]); else if (n <= s) {
                    var a = this.starPool.get();
                    this.starLayout.node.addChild(a);
                }
                this.selectBtn.node.active = !1, this.buyNode.active = !1, this.adNode.active = !1, 
                t.isSelected ? (this.selectBtn.node.active = !0, this.label.string = "SELECTED", 
                this.selectBtn.interactable = !1) : t.isUnlock ? t.isBuy ? (this.selectBtn.node.active = !0, 
                this.label.string = "SELECT", this.selectBtn.interactable = !0) : 0 < t.coinNeed ? (this.buyNode.active = !0, 
                this.moneyLabel.string = t.coinNeed) : (this.adNode.active = !0, AdHelper.isVideoLoad() ? this.adNode.getComponent(cc.Button).interactable = !0 : this.adNode.getComponent(cc.Button).interactable = !1) : (this.selectBtn.node.active = !0, 
                this.selectBtn.interactable = !1, this.label.string = "UNLOCKS AT LV" + t.unlockLevel);
            },
            onClickItem: function(e, t) {
                this.shopPageNode.emit("weaponSelected", {
                    id: this.itemData.id
                }), AdHelper.logEvent("shop_weapon_selected", {
                    id: this.itemData.id
                });
            },
            onAdClick: function(e) {
                var t = this;
                !this.itemData.isBuy && this.itemData.isUnlock ? (AdHelper.logEvent("shop_weapon_ad", {
                    id: this.itemData.id
                }), AdHelper.showVideoAd("weaponunlock", function() {
                    User.weaponBuy(t.itemData.id), t.itemData.isBuy = !0, t.updateItem(t.itemId, t.itemData);
                })) : PageMgr.showTips("Had unlock");
            },
            onBuyClick: function(e) {
                !this.itemData.isBuy && this.itemData.isUnlock && User.decGold(this.itemData.coinNeed) ? (AdHelper.logEvent("shop_weapon_buy", {
                    id: this.itemData.id
                }), User.weaponBuy(this.itemData.id), this.itemData.isBuy = !0, this.updateItem(this.itemId, this.itemData)) : PageMgr.showTips("Not enough coins");
            },
            start: function() {},
            update: function(e) {
                this.adNode.getComponent(cc.Button).interactable = AdHelper.isVideoLoad();
            }
        }), cc._RF.pop();
    }, {
        ListItem: "ListItem"
    } ],
    ShopSkinPageItem: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "47c606TJppMs6aXQ4h07249", "ShopSkinPageItem");
        var n = e("ListItem");
        cc.Class({
            extends: n,
            properties: {
                label: cc.Label,
                ninjaSp: sp.Skeleton,
                titleLabe: cc.Label,
                animation: cc.Animation,
                selectBtn: cc.Button,
                moneyLabel: cc.Label,
                buyNode: cc.Node,
                adNode: cc.Node
            },
            onEnable: function() {},
            updateItem: function(n, s) {
                var a = this;
                if (this.itemData = s, this.itemId = n, this.titleLabe.string = s.skinId, this.shopPageNode = s.shopPageNode, 
                cc.loader.loadRes(DataMgr.getSkinRes(s.skinId), sp.SkeletonData, function(e, t) {
                    if (e) console.log(e); else {
                        if (n != a.itemId) return;
                        a.ninjaSp.skeletonData = t, a.ninjaSp.setSkin(DataMgr.getSkinName(s.skinId)), a.jumpSet ? (a.ninjaSp.setAnimation(0, "FanGun", !1), 
                        a.ninjaSp.addAnimation(0, "RuChang3", !0), a.jumpSet = !1) : a.ninjaSp.setAnimation(0, "RuChang3", !0);
                        var i = DataMgr.getWeaponCfgById(User.getWeaponId());
                        a.ninjaSp.setAttachment(i.slotName, i.attachmentName);
                    }
                }), this.selectBtn.node.active = !1, this.buyNode.active = !1, this.adNode.active = !1, 
                s.isSelected) this.selectBtn.node.active = !0, this.animation.play(), this.label.string = "SELECTED", 
                this.selectBtn.interactable = !1; else if (this.animation.stop(), s.isUnlock) if (s.isBuy) this.selectBtn.node.active = !0, 
                this.label.string = "SELECT", this.selectBtn.interactable = !0; else if (0 < s.coinNeed) {
                    this.buyNode.active = !0, this.moneyLabel.string = s.coinNeed;
                    var e = this.buyNode.getChildByName("coin"), t = this.buyNode.getChildByName("price");
                    e.active = !0, t.x = 38, s.productId && User.isPayReady() && (e.active = !1, t.x = 0, 
                    this.moneyLabel.string = User.getPrice(s.productId, "$0.99"));
                } else this.adNode.active = !0, AdHelper.isVideoLoad() ? this.adNode.getComponent(cc.Button).interactable = !0 : this.adNode.getComponent(cc.Button).interactable = !1; else this.selectBtn.node.active = !0, 
                this.selectBtn.interactable = !1, this.label.string = "UNLOCKS AT LV" + s.unlockLevel;
            },
            onClickItem: function(e, t) {
                this.shopPageNode.emit("skinSelected", {
                    id: this.itemData.skinId
                }), AdHelper.logEvent("shop_skin_selected"), this.jumpSet = !0;
            },
            onAdClick: function(e) {
                var t = this;
                !this.itemData.isBuy && this.itemData.isUnlock ? (AdHelper.logEvent("shop_skin_ad_unlock"), 
                AdHelper.showVideoAd("skinunlock", function() {
                    User.skinBuy(t.itemData.skinId), t.itemData.isBuy = !0, t.updateItem(t.itemId, t.itemData);
                })) : PageMgr.showTips("Had unlock");
            },
            onBuyClick: function(e) {
                var t = this;
                this.itemData.productId && User.isPayReady() ? User.purchase(this.itemData.productId, function() {
                    User.skinBuy(t.itemData.skinId), t.itemData.isBuy = !0, t.updateItem(t.itemId, t.itemData);
                }) : !this.itemData.isBuy && this.itemData.isUnlock && User.decGold(this.itemData.coinNeed) ? (AdHelper.logEvent("shop_skin_buy", {
                    id: this.itemData.skinId
                }), User.skinBuy(this.itemData.skinId), this.itemData.isBuy = !0, this.updateItem(this.itemId, this.itemData)) : PageMgr.showTips("Not enough coins");
            },
            start: function() {},
            update: function(e) {
                this.adNode.getComponent(cc.Button).interactable = AdHelper.isVideoLoad();
            }
        }), cc._RF.pop();
    }, {
        ListItem: "ListItem"
    } ],
    SlotMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "e67edUn4rJGdJtHtmYHoS4j", "SlotMgr");
        var n = {}, s = new cc.NodePool();
        n.initGame = function(e, t, i) {
            this.layerNode = e, this.prefab = t, this.mainGame = i, this.tileList = [], this.inited = !0;
        }, n.addTile = function(e, t) {
            var i = s.get() || cc.instantiate(this.prefab);
            i.position = this.mainGame.getTilePosition(e, t), this.layerNode.addChild(i);
            var n = i.getComponent("SlotTile");
            return n.tileX = e, n.tileY = t, n.mainGame = this.mainGame, this.tileList.push(n), 
            n;
        }, n.removeTile = function(e) {
            if (this.inited) for (var t = this.tileList.length - 1; 0 <= t; t--) if (this.tileList[t] == e) {
                this.tileList.splice(t, 1), s.put(e.node);
                break;
            }
        }, n.removeAll = function(e, t) {
            if (this.inited) {
                for (var i = this.tileList.length - 1; 0 <= i; i--) s.put(this.tileList[i].node);
                this.tileList = [];
            }
        }, n.resetAll = function(e, t) {
            if (this.inited) for (var i = this.tileList.length - 1; 0 <= i; i--) this.tileList[i].reset();
        }, n.step = function(e, t) {
            this.inited;
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    SlotTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "fa8ae17BnFP7byOCU6aWJY8", "SlotTile");
        var n = e("BaseTile"), s = e("SloteList"), a = !1;
        cc.Class({
            extends: n,
            properties: {
                freeNode: cc.Node,
                adNode: cc.Node,
                coinNode: cc.Node,
                coinLabel: cc.Label,
                slotAnim: cc.Animation,
                btnNode: cc.Node,
                lightNode: cc.Node,
                slotLists: [ s ]
            },
            ctor: function() {
                this.isBox = !0, this.isWalkable = !1, this.anim = null, this.spinType = "free", 
                this.isOpened = !1, this.coinCost = 50;
            },
            init: function() {
                this.coinLabel.string = "x" + this.coinCost, AdHelper.isVideoLoad() ? this.spinType = "ad" : 200 < User.getGold() ? this.spinType = "coin" : this.spinType = "ad", 
                User.isFirstPlay() && !a && (this.spinType = "free"), this.adNode.active = "ad" == this.spinType, 
                this.freeNode.active = "free" == this.spinType, this.coinNode.active = "coin" == this.spinType, 
                this.isOpened = !1, this.lightNode.stopAllActions(), this.lightNode.opacity = 0, 
                this.node.getChildByName("tipNode").opacity = 0, this.slotAnim.setCurrentTime(.01, "resultslot"), 
                this.slotAnim.sample("resultslot");
            },
            onEnable: function() {
                var e = this;
                console.log("idleSpin"), this.scheduleOnce(function() {
                    e.slotLists[0].idleScroll(.5), e.slotLists[1].idleScroll(1), e.slotLists[2].idleScroll(.75);
                });
            },
            addReward: function(e) {
                var t = this;
                switch (console.log(e), e.type) {
                  case "mian":
                    User.addEnergy(3 * e.count);
                    var i = this.node.getChildByName("tipNode");
                    i.y = 0, i.runAction(cc.sequence(cc.fadeIn(.3), cc.delayTime(1), cc.spawn(cc.moveBy(1, 0, 100), cc.fadeOut(1))));
                    break;

                  case "dun":
                    this.mainGame.addShieldWithAnim(e.count, cc.v2(-150, 270)), this.mainGame.addShieldWithAnim(e.count, cc.v2(0, 270)), 
                    this.mainGame.addShieldWithAnim(e.count, cc.v2(150, 270));
                    break;

                  case "gold":
                    this.mainGame.addCoinWithAnim(e.count, cc.v2(-150, 270)), this.mainGame.addCoinWithAnim(e.count, cc.v2(0, 270)), 
                    this.mainGame.addCoinWithAnim(e.count, cc.v2(150, 270));
                    break;

                  case "box":
                    for (var n = 0; n < this.slotLists.length; n++) this.slotLists[n].getCurrentItem().openBox();
                    this.scheduleOnce(function() {
                        t.mainGame.addCoinWithAnim(e.count, cc.v2(-150, 270)), t.mainGame.addCoinWithAnim(e.count, cc.v2(0, 270)), 
                        t.mainGame.addCoinWithAnim(e.count, cc.v2(150, 270));
                    }, .3);
                }
                AdHelper.logEvent("slot_reward", {
                    type: e.type
                });
            },
            startSpin: function() {
                var i = this;
                SoundMgr.play("slot_spin_start");
                var n = "free" == this.spinType ? Math.random() < .2 : "coin" == this.spinType ? Math.random() < .1 : Math.random() < .4;
                AdHelper.logEvent("slot_start", {
                    type: this.spinType
                });
                var s = [ Utils.randomInt(4), Utils.randomInt(4), Utils.randomInt(4) ], e = Utils.randomInt(4);
                if (n) s = [ e, e, e ]; else if (s[0] == s[0] && s[1] == s[1] && s[2] == s[2]) for (;s[1] == s[0]; ) s[1] = Utils.randomInt(4);
                this.lightNode.stopAllActions(), this.lightNode.opacity = 0, this.slotAnim.once("finished", function() {
                    for (var e = function(t) {
                        i.slotLists[t].scorllToIndex(s[t], function() {
                            if (SoundMgr.play("slot_stop"), t == i.slotLists.length - 1) {
                                if (i.slotAnim.play("resultspinback"), n) {
                                    SoundMgr.play("slot_multiplier_x3");
                                    var e = i.slotLists[0].getCurrentData();
                                    i.lightNode.opacity = 100, i.lightNode.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 100)))), 
                                    i.scheduleOnce(function() {
                                        i.addReward(e);
                                    }, 1);
                                }
                                i.isOpened = !1, "free" == i.spinType && (a = !0), AdHelper.isVideoLoad() ? i.spinType = "ad" : 200 < User.getGold() ? i.spinType = "coin" : i.spinType = "ad", 
                                i.adNode.active = "ad" == i.spinType, i.freeNode.active = "free" == i.spinType, 
                                i.coinNode.active = "coin" == i.spinType;
                            }
                        }, t + 2);
                    }, t = 0; t < i.slotLists.length; t++) e(t);
                }), this.slotAnim.play("resultslot");
            },
            onBeforeEnter: function(e) {
                var t = this;
                this.isOpened || (this.isOpened = !0, this.btnNode.runAction(cc.sequence(cc.moveBy(.1, 0, 15), cc.moveBy(.1, 0, -15), cc.callFunc(function() {
                    AdHelper.logEvent("slot_click", {
                        type: t.spinType
                    }), "ad" == t.spinType ? AdHelper.isVideoLoad() ? AdHelper.showVideoAd("slot_ad", function() {
                        t.startSpin();
                    }) : (t.isOpened = !1, PageMgr.showTips("No ad available!")) : "coin" == t.spinType ? User.decGold(t.coinCost) ? t.startSpin() : (t.isOpened = !1, 
                    PageMgr.showTips("Not enough coins!")) : t.startSpin();
                }))));
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile",
        SloteList: "SloteList"
    } ],
    SloteList: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "46cba9yw5JGj58ieXZ7sRBZ", "SloteList");
        var n = [ {
            type: "mian",
            count: 1
        }, {
            type: "dun",
            count: 1
        }, {
            type: "gold",
            count: 100
        }, {
            type: "box",
            count: 100
        } ];
        cc.Class({
            extends: cc.Component,
            properties: {
                itemPrefab: cc.Prefab,
                content: cc.Node
            },
            onLoad: function() {
                this.items = [], this.itemHeight = this.itemPrefab.data.height, this.moveSpeed = 0, 
                this.datas = n, this.dir = -1;
                for (var e = 0; e < 5; e++) {
                    var t = cc.instantiate(this.itemPrefab);
                    this.content.addChild(t), t.y = -(e - 1) * this.itemHeight * this.dir, this.items.push(t.getComponent("SlotoItem")), 
                    this.items[e].updateData(this.datas[e % this.datas.length], e % this.datas.length);
                }
            },
            onEnable: function() {
                this.isScrolling = !1, this.isIdleScrolling = !1;
            },
            setCurrentIndex: function(e) {
                this.curIndex = e, this.content.y = this.itemHeight * e * this.dir;
                for (var t = 0; t < this.items.length; t++) {
                    this.items[t].node.y = -(t + e) * this.itemHeight * this.dir;
                    var i = (e + t) % this.datas.length;
                    this.items[t].updateData(this.datas[i], i);
                }
            },
            getCurrentData: function() {
                return this.datas[this.curIndex];
            },
            getCurrentItem: function() {
                return this.items[this.curIndex - 1];
            },
            idleScroll: function(e) {
                this.isIdleScrolling = !0, this.moveSpeed = e || 1;
            },
            scorllToIndex: function(e, t, i) {
                this.curIndex = e, this.moveSpeed = .2 * this.itemHeight, this.isScrolling = !0, 
                this.isIdleScrolling = !1;
                var n = 1;
                i && (n += i);
                var s = this.itemHeight * this.datas.length, a = Math.floor(this.content.y / s) * s;
                this.desY = a + this.dir * (n * this.datas.length * this.itemHeight + (e - 1) * this.itemHeight), 
                this.finishCb = t || function() {};
            },
            update: function(e) {
                if (this.isIdleScrolling || this.isScrolling) {
                    if (this.content.y += this.moveSpeed * this.dir, 1 == this.dir && this.items[0].node.y + this.content.y > 1.5 * this.itemHeight || -1 == this.dir && this.items[0].node.y + this.content.y < 1.5 * -this.itemHeight) {
                        var t = this.items.shift(), i = this.items[this.items.length - 1];
                        t.node.y = i.node.y - this.itemHeight * this.dir;
                        var n = (i.index + 1) % this.datas.length;
                        t.updateData(this.datas[n], n), this.items.push(t);
                    }
                    this.isScrolling && Math.abs(this.content.y - this.desY) < 30 && (this.isScrolling = !1, 
                    this.content.y = this.desY, this.finishCb());
                }
            }
        }), cc._RF.pop();
    }, {} ],
    SlotoItem: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "5d435+0PXhNaLiuPW2ZekGD", "SlotoItem"), cc.Class({
            extends: cc.Component,
            properties: {
                dunNode: cc.Node,
                goldNode: cc.Node,
                mianNode: cc.Node,
                boxNode: cc.Node,
                boxAnim: cc.Animation
            },
            updateData: function(e, t) {
                this.data != e && (this.index = t, this.data = e, this.mianNode.active = "mian" == e.type, 
                this.goldNode.active = "gold" == e.type, this.dunNode.active = "dun" == e.type, 
                this.boxNode.active = "box" == e.type);
            },
            openBox: function() {
                this.boxAnim.setCurrentTime(0, "boxfree"), this.boxAnim.play("boxfree");
            },
            closeBox: function() {
                this.boxAnim.setCurrentTime(.01, "boxfree"), this.boxAnim.sample("boxfree");
            }
        }), cc._RF.pop();
    }, {} ],
    SnakeMonsterTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "d01c6hWS2JFPrR74f/pA372", "SnakeMonsterTile");
        var n = e("BaseTile"), r = 0, c = 2, s = 4;
        cc.Class({
            extends: n,
            properties: {},
            ctor: function() {
                this.status = r, this.moveSpeed = 3, this.moveDir = null, this.isFreezon = !1;
            },
            removeAll: function() {
                this.activeNode && (this.activeNode.removeFromParent(), this.activeNode = null), 
                this.blinkNode && (this.blinkNode.stopAllActions(), this.blinkNode.removeFromParent(), 
                this.blinkNode = null);
            },
            setProp: function(e) {
                this._super(e), this.subType = e.subType, 3 != this.subType && (this.isWalkable = !1);
            },
            init: function() {
                var o = this;
                this._super(), this.mainGame.removeTileAt(this.tileX, this.tileY, !0), this.subType, 
                2 == this.subType && (this.monsterMgr.snakeTaget["snake_" + this.getProp("tagId")] = this), 
                1 == this.subType && (this.mainGame.mapDownLayer.off("snake_monster_active_" + this.getProp("tagId")), 
                this.mainGame.mapDownLayer.on("snake_monster_active_" + this.getProp("tagId"), function(e) {
                    if (o.status == r && o.getProp("tagId") == e.detail.id) {
                        o.status = c;
                        var t = o.monsterMgr.snakeTaget["snake_" + o.getProp("tagId")], i = o.getTilePosition(), n = t.getTilePosition();
                        o.activeNode = cc.instantiate(o.snakePrefab), o.activeNode.x = i.x, o.activeNode.y = i.y, 
                        o.moveDir = {
                            x: 1,
                            y: 0
                        }, t.tileX < o.tileX && (o.activeNode.scaleX = -1, o.activeNode.x += 68, o.moveDir = {
                            x: -1,
                            y: 0
                        }), t.tileY < o.tileY && (o.activeNode.rotation = -90, o.activeNode.y -= 68, o.moveDir = {
                            x: 0,
                            y: -1
                        }), t.tileY > o.tileY && (o.activeNode.rotation = 90, o.activeNode.scaleY = -1, 
                        o.moveDir = {
                            x: 0,
                            y: 1
                        }), t.tileX != o.tileX ? o.activeNode.width = Math.abs(i.x - n.x) + 68 : o.activeNode.width = Math.abs(i.y - n.y) + 68, 
                        o.snakeNode = o.activeNode.getChildByName("Snake");
                        var s = o.activeNode.getChildByName("snakeblink");
                        o.blinkNode = cc.instantiate(s), o.blinkNode.active = !0;
                        var a = o.activeNode.convertToWorldSpaceAR(s);
                        o.blinkNode.x = a.x, o.blinkNode.y = a.y, o.blinkNode.rotation = o.activeNode.rotation, 
                        o.blinkNode.scaleX = o.activeNode.scaleX, o.blinkNode.scaleY = o.activeNode.scaleY, 
                        o.moveOffset = 0, o.mainGame.mapDownLayer.addChild(o.activeNode), o.startTm = 500, 
                        o.snakeTile = [], o.snakeTile.push({
                            tileX: o.tileX,
                            tileY: o.tileY
                        }), o.blinkNode.runAction(cc.repeatForever(cc.blink(1, 3))), o.mainGame.monsterLayer.addChild(o.blinkNode);
                    }
                }));
            },
            setMonster: function(e, t) {
                return this.monsterMgr = e, this.snakePrefab = t, !0;
            },
            isHit: function() {
                if (1 == this.subType && this.status == c) for (var e = this.mainGame.player, t = 0; t < this.snakeTile.length; t++) if (e.tileX == this.snakeTile[t].tileX && e.tileY == this.snakeTile[t].tileY) return e.setPlayerDeath(this, "SnakeMonster"), 
                this.status = s, this.snakeTile = [], this.activeNode.removeFromParent(), this.activeNode = null, 
                this.blinkNode && (this.blinkNode.stopAllActions(), this.blinkNode.removeFromParent(), 
                this.blinkNode = null), !0;
            },
            onPlayerEnter: function(e) {
                3 == this.subType && this.status == r && (this.isFreezon || (this.status = c, this.mainGame.mapDownLayer.emit("snake_monster_active_" + this.getProp("tagId"), {
                    id: this.getProp("tagId")
                })));
            },
            step: function(e) {
                if (1 == this.subType && this.status == c) if (0 < this.startTm) this.startTm -= e; else {
                    this.blinkNode && (this.blinkNode.stopAllActions(), this.blinkNode.removeFromParent(), 
                    this.blinkNode = null), this.snakeNode.x += e * this.moveSpeed, this.moveOffset += e * this.moveSpeed;
                    var t = this.snakeTile[this.snakeTile.length - 1], i = this.getTilePosition(), n = this.mainGame.getTilePosition(t.tileX + this.moveDir.x, t.tileY + this.moveDir.y);
                    0 <= this.moveOffset - Math.abs(i.x - n.x + i.y - n.y) && (this.snakeTile.push({
                        tileX: t.tileX + this.moveDir.x,
                        tileY: t.tileY + this.moveDir.y
                    }), this.moveOffset >= this.snakeNode.width && this.snakeTile.splice(0, 1)), this.moveOffset >= this.snakeNode.width + this.activeNode.width && (this.status = s, 
                    this.activeNode.removeFromParent(), this.activeNode = null, console.log("snake removeFromParent"));
                }
            },
            onFreeze: function() {
                this.isFreezon = !0, 1 == this.subType && this.status == c && (this.status = s, 
                this.snakeTile = [], this.activeNode.removeFromParent(), this.activeNode = null);
            },
            onUnFreeze: function() {
                this.isFreezon = !1;
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    SoundMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "cb77baMvr5LEriYIauncdpl", "SoundMgr");
        var n = {}, s = "sounds/";
        n.BGM = "background", n.CLICK = "btn_click";
        var a = Constants.SOUND_WRAP, o = {};
        n.register = function(e, t) {
            o[e] = t;
        };
        var r = {}, c = function(e) {
            r[e] && (clearInterval(r[e]), r[e] = null);
            var t = cc.audioEngine.getVolume(e);
            r[e] = setInterval(function() {
                t += .01, cc.audioEngine.setVolume(e, t), 1 <= t && (clearInterval(r[e]), r[e] = null);
            }, 100);
        }, l = function(e) {
            r[e] && (clearInterval(r[e]), r[e] = null);
            var t = cc.audioEngine.getVolume(e);
            r[e] = setInterval(function() {
                if ((t -= .1) <= 0) return clearInterval(r[e]), r[e] = null, void cc.audioEngine.setVolume(e, 0);
                cc.audioEngine.setVolume(e, t);
            }, 100);
        }, h = {}, d = {}, u = {}, g = 1, p = 0;
        n.setSoundEnable = function(e) {
            for (var t in g = e ? 1 : 0, d) cc.audioEngine.setVolume(d[t], g);
            User.setSoundEnable(e);
        }, n.setMusicEnable = function(e) {
            for (var t in p = e ? 1 : 0, u) e ? c(u[t]) : l(u[t]);
            User.setMusicEnable(e);
        }, n.isSoundEnable = function() {
            return 1 == g;
        }, n.isMusicEnable = function() {
            return 1 == p;
        }, n.preLoad = function(i, n) {
            h[i] || o[i] || (h[i] = !0, cc.loader.loadRes(s + i, function(e, t) {
                h[i] = !1, e ? cc.log(e) : o[i] = t, n && n(e, t);
            }));
        }, n.playBackgroud = function() {
            if (!h[n.BGM]) {
                var i = 1 * p;
                if (o[n.BGM]) return u[n.BGM] = cc.audioEngine.play(o[n.BGM], !0, 0), void (0 < i && c(u[n.BGM]));
                h[n.BGM] = !0, cc.loader.loadRes(s + n.BGM, function(e, t) {
                    h[n.BGM] = !1, e ? cc.log(e) : (o[n.BGM] = t, u[n.BGM] = cc.audioEngine.play(t, !0, 0), 
                    0 < i && c(u[n.BGM]));
                });
            }
        }, n.playClick = function() {
            n.play(n.CLICK);
        }, n.playByKey = function(e) {
            n.play(a[e]);
        }, n.play = function(i, n) {
            null == i || "" == i || h[i] || 0 == g || (null == n && (n = !1), o[i] ? d[i] = cc.audioEngine.play(o[i], n, 1 * g) : (h[i] = !0, 
            cc.loader.loadRes(s + i, function(e, t) {
                h[i] = !1, e ? cc.log(e) : (o[i] = t, d[i] = cc.audioEngine.play(o[i], n, 1 * g));
            })));
        }, n.stop = function(e) {
            cc.audioEngine.stop(d[e]);
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    SpinBtn: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "2e3a70Nb6tNZqW4+WFDY9z6", "SpinBtn");
        var o = Constants.FREE_LOTTERY_TM;
        cc.Class({
            extends: cc.Component,
            properties: {
                watchAdNode: cc.Node,
                freeNode: cc.Node,
                freeCountdown: cc.Label,
                freeNumLabel: cc.Label,
                mapAnimation: cc.Animation
            },
            onEnable: function() {
                this.freeBtnEnable = !1, this.lastCheckTm = 0, this.watchAdNode.active = !0, this.freeNode.active = !1;
            },
            lottery: function() {
                PageMgr.getPageAsync("SpinLotteryDialog").then(function(e) {
                    PageMgr.showDialog("SpinLotteryDialog", !0), e.getComponent("SpinLotteryDialog").lotteryOne();
                });
            },
            onClickFreeLottery: function() {
                this.freeBtnEnable && (this.lottery(), User.setFreeLotteryTime(), this.freeBtnEnable = !1, 
                this.lastCheckTm = 0, this.watchAdNode.active = !0, this.freeNode.active = !1);
            },
            onClickWatchAdLottery: function() {
                var e = this;
                AdHelper.showVideoAd("watchAdLottery", function() {
                    e.lottery();
                });
            },
            start: function() {},
            update: function(e) {
                if (this.lastCheckTm -= e, this.watchAdNode.getComponent(cc.Button).interactable = AdHelper.isVideoLoad(), 
                !this.freeBtnEnable && this.lastCheckTm <= 0) {
                    this.lastCheckTm = .5;
                    var t = Date.now(), i = User.getKeyValue("lotteryTicket"), n = User.getKeyValue("lastFreeLotteryTm"), s = User.getKeyValue("freeLotteryNum"), a = (s < o.length ? n + 6e4 * o[s] : n + 6e4 * o[o.length - 1]) - t;
                    a <= 0 || 0 < i ? (this.freeBtnEnable = !0, this.watchAdNode.active = !1, this.freeNode.active = !0, 
                    this.freeNumLabel.string = "YOU HAVE " + (i + 1) + " FREE SPIN", this.mapAnimation.play(), 
                    this.animatPlay = !0) : (this.freeCountdown.string = "NEXT FREE SPIN IN " + Utils.formatTime(Math.floor(a / 1e3)), 
                    this.animatPlay && (this.mapAnimation.setCurrentTime(0), this.mapAnimation.stop(), 
                    this.animatPlay = !1));
                }
            }
        }), cc._RF.pop();
    }, {} ],
    SpinLotteryDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "31024TFLi5JFKr/PtPS+9G9", "SpinLotteryDialog");
        var l = e("DataMgr"), h = e("TaskMgr");
        cc.Class({
            extends: cc.Component,
            properties: {
                itemPrefab: cc.Prefab,
                lotteryPanNode: cc.Node,
                closeNode: cc.Node,
                topBarPrefab: cc.Prefab,
                bottomNode: cc.Node,
                toHomeBtn: cc.Node,
                closeBtn: cc.Node,
                spinBtn: cc.Node
            },
            playEnableAnimation: function() {
                var e = this;
                this.topBar.runAction(cc.moveTo(.5, cc.v2(0, this.topBarY))), this.bottomNode.runAction(cc.sequence(cc.moveTo(.5, cc.v2(0, 0)), cc.callFunc(function() {
                    e.lotteryOne();
                })));
            },
            onLoad: function() {
                this.topBar = cc.instantiate(this.topBarPrefab), this.node.addChild(this.topBar), 
                this.topBarY = cc.winSize.height / 2 - 60, this.topBar.y = this.topBarY;
                for (var e = l.getLotteryCfg(), t = 0; t < e.length && t < 8; t++) {
                    var i = e[t], n = cc.instantiate(this.itemPrefab), s = n.getChildByName("protect"), a = n.getChildByName("secret"), o = n.getChildByName("coinItem");
                    if (s.active = !1, a.active = !1, o.active = !1, i.itemType == Constants.ITEMTYPE.COIN) o.active = !0, 
                    o.getChildByName("label").getComponent(cc.Label).string = i.num; else i.itemType == Constants.ITEMTYPE.PROTECT ? s.active = !0 : i.itemType == Constants.ITEMTYPE.SECRET && (a.active = !0);
                    n.rotation = 45 * t - 22.5, this.lotteryPanNode.addChild(n);
                }
                this.lotteryScript = this.node.getComponent("SpinLottery");
            },
            close: function() {
                PageMgr.hideDialog("SpinLotteryDialog");
            },
            toHome: function() {
                PageMgr.hideDialog("SpinLotteryDialog");
                var e = PageMgr.getPage("HomePage");
                e && e.getComponent("HomePage").onDialogClose();
            },
            onEnable: function() {
                var e = PageMgr.getPage("HomePage");
                if (this.isHome = e.active, this.isHome) {
                    var t = PageMgr.getPage("ShopPage");
                    t && (this.isHome = !t.active);
                }
                this.isHome ? (this.toHomeBtn.active = !0, this.closeBtn.active = !1) : (this.toHomeBtn.active = !1, 
                this.closeBtn.active = !0), this.spinBtn.active = !0;
            },
            lotteryOne: function(e) {
                for (var n = this, s = l.getLotteryCfg(), t = 0, i = 0; i < s.length && i < 8; i++) {
                    t += s[i].weight;
                }
                for (var a = Math.floor(Math.random() * t), o = 0, r = 0, c = 0; c < s.length && c < 8; c++) {
                    if (a <= (r += s[c].weight)) {
                        o = c;
                        break;
                    }
                }
                this.toHomeBtn.active = !1, this.closeBtn.active = !1, this.spinBtn.active = !1, 
                h.taskProgress(h.TaskType.LOTTERY, 0), this.lotteryScript.run(o, function() {
                    PageMgr.getPageAsync("RewardShowDialog").then(function(e) {
                        var t = e.getComponent("RewardShowDialog"), i = {};
                        i.num = s[o].num, i.itemType = s[o].itemType, i.callback = function() {
                            this.spinBtn.active = !0, this.isHome ? this.toHomeBtn.active = !0 : this.closeBtn.active = !0;
                        }.bind(n), t.setData(i), PageMgr.showDialog("RewardShowDialog", !0, !0);
                    });
                }), AchievementMgr.onSpinLottery();
            },
            setFromHome: function() {
                this.isHome = !0;
            }
        }), cc._RF.pop();
    }, {
        DataMgr: "DataMgr",
        TaskMgr: "TaskMgr"
    } ],
    SpinLottery: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "3f3e8h/HFVFiY9uJV7iRUhV", "SpinLottery"), cc.Class({
            extends: cc.Component,
            properties: {
                spinNode: {
                    default: null,
                    type: cc.Node
                },
                wheelNode: {
                    default: null,
                    type: cc.Node
                },
                maxSpeed: {
                    default: 10,
                    type: cc.Float,
                    max: 15,
                    min: 2,
                    tooltip: "最大速度转每秒"
                },
                duration: {
                    default: 2,
                    type: cc.Float,
                    max: 5,
                    min: 1,
                    tooltip: "减速前旋转时间"
                },
                acc: {
                    default: 10,
                    type: cc.Float,
                    max: 10,
                    min: 1,
                    tooltip: "加速度"
                },
                gearNum: {
                    default: 8,
                    type: cc.Integer,
                    tooltip: "齿轮个数"
                },
                sharpNode: {
                    default: null,
                    type: cc.Node,
                    tooltip: "中签位置闪一闪"
                }
            },
            onEnable: function() {
                this.wheelState = 0, this.curSpeed = 0, this.spinTime = 0, this.defaultAngle = 360 / this.gearNum / 2, 
                this.gearAngle = 360 / this.gearNum, this.wheelNode.rotation = this.defaultAngle, 
                this.finalAngle = 0, this.targetId = 0, this.decAngle = 1080, this.spinNodeSpeed = 0, 
                this.spinNodeRotationMax = -20, this.spinNodeMoveTm = 0, this.lastSpinMoveTm = 0, 
                this.sharpNode && (this.sharpNode.active = !1);
            },
            run: function(e, t) {
                0 === this.wheelState && (this.sharpNode && (this.sharpNode.active = !1), (null == e || e >= this.gearNum) && (e = Math.floor(Math.random() * this.gearNum)), 
                this.curDecAngle = this.decAngle, this.wheelState = 1, this.curSpeed = 0, this.spinTime = 0, 
                this.targetId = parseInt(e), this.finalAngle = (360 - this.targetId * this.gearAngle + this.defaultAngle + (40 * Math.random() - 20)) % 360, 
                this.sharpAngle = -this.defaultAngle + this.targetId * this.gearAngle, this.cb = t);
            },
            update: function(e) {
                var t = this;
                (this.spinNode.rotation < 0 || this.spinNodeSpeed < 0) && (this.spinNodeMoveTm <= 0 ? (this.spinNodeSpeed += 50 * e, 
                this.spinNodeMoveTm = 0) : this.spinNodeMoveTm -= e, this.spinNodeSpeed < -1 && (this.spinNodeSpeed = -1), 
                this.spinNode.rotation += this.spinNodeSpeed, 0 < this.spinNode.rotation && (this.spinNode.rotation = 0), 
                this.spinNode.rotation < -40 && (this.spinNode.rotation = -40)), 0 !== this.wheelState && (1 == this.wheelState ? (this.spinTime += e, 
                this.wheelNode.rotation -= this.curSpeed, this.wheelNode.rotation < 0 && (this.wheelNode.rotation += 360), 
                this.curSpeed <= this.maxSpeed ? this.curSpeed += this.acc * e : (this.curSpeed = this.maxSpeed, 
                this.spinTime >= this.duration && Math.abs(this.wheelNode.rotation - this.finalAngle) <= this.maxSpeed + 1 && (this.wheelNode.rotation = this.finalAngle, 
                this.maxSpeed = this.curSpeed, this.wheelState = 2))) : 2 == this.wheelState && (this.curSpeed = this.maxSpeed * this.curDecAngle / this.decAngle, 
                this.curSpeed < .2 && (this.curSpeed = .2), this.wheelNode.rotation -= this.curSpeed, 
                this.wheelNode.rotation < 0 && (this.wheelNode.rotation += 360), this.curDecAngle -= this.curSpeed, 
                this.curDecAngle <= .001 && (this.wheelNode.rotation = this.finalAngle, this.curSpeed = 0, 
                this.wheelState = 0, null != this.sharpNode ? (this.sharpNode.active = !0, this.sharpNode.rotation = this.sharpAngle, 
                this.sharpNode.opacity = 255, this.sharpNode.runAction(cc.sequence(cc.blink(1.5, 3), cc.callFunc(function() {
                    t.cb && t.cb();
                })))) : this.cb && this.cb())), this.lastSpinMoveTm -= e, Math.floor(this.wheelNode.rotation / this.gearAngle) != Math.floor((this.wheelNode.rotation + this.curSpeed) % 360 / this.gearAngle) ? this.lastSpinMoveTm <= 0 ? (this.lastSpinMoveTm = .2, 
                this.spinNodeSpeed = -this.curSpeed, this.spinNodeMoveTm = .15, this.spinNodeMoveStatus = !1) : this.spinNodeMoveStatus = !0 : this.lastSpinMoveTm <= 0 && this.spinNodeMoveStatus && (this.lastSpinMoveTm = .2, 
                this.spinNodeSpeed = -this.curSpeed, this.spinNodeMoveTm = .15, this.spinNodeMoveStatus = !1));
            }
        }), cc._RF.pop();
    }, {} ],
    SpringTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f1891FeExJHYaQRbVK4x7Ko", "SpringTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {},
            ctor: function() {
                this.isSpring = !0, this.dir = null;
            },
            onPlayerEnter: function(e) {
                null == e.moveDir && console.warn("Spring Player Error", this.tileX, this.tileY), 
                e.isSpringRunning = !0, 0 != e.moveDir.x ? e.beginRun({
                    x: 0,
                    y: this.dir.y
                }) : 0 != e.moveDir.y && e.beginRun({
                    x: this.dir.x,
                    y: 0
                });
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    StarTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f0297gZso9MxrqjtJ9zhV+j", "StarTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {},
            ctor: function() {
                this.isStar = !0, this.startY = 0, this.detalY = .3, this.maxOffsetY = 10;
            },
            init: function() {
                var e = this.mainGame.tileLayer.getTileAt(this.tileX, this.tileY);
                this.node = e, this.startY = e.y, this.mainGame.unschedule(this.update.bind(this), 0), 
                this.mainGame.schedule(this.update.bind(this), 0);
            },
            onPlayerEnter: function(e) {
                this.mainGame.removeTileAt(this.tileX, this.tileY), this.mainGame.addStar(), SoundMgr.playByKey("YuFuGet");
            },
            update: function() {
                this.node.y += this.detalY, this.node.y <= this.startY - this.maxOffsetY ? (this.node.y = this.startY - this.maxOffsetY, 
                this.detalY = -this.detalY) : this.node.y >= this.startY + this.maxOffsetY && (this.node.y = this.startY + this.maxOffsetY, 
                this.detalY = -this.detalY), this.node.scaleY = 1 - .1 * Math.abs(this.node.y - this.startY) / this.maxOffsetY;
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    TaskDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "438f9vj8SNCK6GVy6Pdi7o4", "TaskDialog");
        var h = e("TaskMgr");
        cc.Class({
            extends: cc.Component,
            properties: {
                itemListNode: cc.Node,
                itemPrefab: cc.Prefab,
                topBarPrefab: cc.Prefab,
                bottomNode: cc.Node
            },
            playEnableAnimation: function() {
                this.topBar.runAction(cc.moveTo(.5, cc.v2(0, this.topBarY))), this.bottomNode.runAction(cc.moveTo(.5, cc.v2(0, 0)));
            },
            onLoad: function() {
                this.itemList = [], this.topBar = cc.instantiate(this.topBarPrefab), this.topBarY = cc.winSize.height / 2 - 60, 
                this.topBar.y = this.topBarY, this.node.addChild(this.topBar);
            },
            onEnable: function() {
                for (var e = 0; e < this.itemList.length; ++e) this.itemList[e].removeFromParent();
                for (var t = h.getCurTaskData(), i = DataMgr.getTaskCfg(), n = 0; n < t.length; n++) {
                    var s = t[n], a = i[s.id.toString()];
                    if (null == this.itemList[n]) {
                        var o = cc.instantiate(this.itemPrefab);
                        this.itemList.push(o);
                    }
                    this.itemList[n].getComponent("TaskItem").setData(this, s, a), this.itemListNode.addChild(this.itemList[n]);
                }
                this.isAnimation = !1;
            },
            start: function() {},
            onToHome: function() {
                PageMgr.hideDialog("TaskDialog");
                var e = PageMgr.getPage("HomePage");
                e && e.getComponent("HomePage").onDialogClose();
            },
            getReward: function(e) {
                for (var t = this, i = -1, n = 0; n < this.itemList.length; ++n) if (this.itemList[n].getComponent("TaskItem").getTaskId() == e) {
                    i = n;
                    break;
                }
                if (i < 0) console.log("getReward opPos < 0"); else {
                    var s = h.getReward(e);
                    if (null == s) this.itemList[i].runAction(cc.sequence(cc.moveBy(.2, cc.v2(-800, 0)), cc.callFunc(function() {
                        t.itemList[i].removeFromParent(), t.itemListNode.getComponent(cc.Layout).updateLayout();
                    }))); else {
                        var a = this.itemList[i], o = DataMgr.getTaskCfg(), r = cc.instantiate(this.itemPrefab);
                        r.x = a.x + this.itemListNode.x, r.y = a.y + this.itemListNode.y;
                        var c = h.getCurTaskData(), l = a.getComponent("TaskItem");
                        r.getComponent("TaskItem").setData(this, l.data, l.cfg), a.getChildByName("root").x = 800, 
                        a.getComponent("TaskItem").setData(this, c[i], o[s.toString()]), this.node.addChild(r), 
                        r.runAction(cc.sequence(cc.moveBy(.2, cc.v2(800, 0)), cc.callFunc(function() {
                            t.itemList[i].getComponent(cc.Animation).play(), r.removeFromParent();
                        })));
                    }
                }
            }
        }), cc._RF.pop();
    }, {
        TaskMgr: "TaskMgr"
    } ],
    TaskItem: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "62ecew8WWRMOpLiwV6EoCaJ", "TaskItem"), cc.Class({
            extends: cc.Component,
            properties: {
                moneyLabel: cc.Label,
                progressNode: cc.Node,
                descLabel: cc.Label,
                progressLabel: cc.Label,
                rewardBtn: cc.Button,
                taskIconSprite: cc.Sprite,
                taskIconArr: [ cc.SpriteFrame ],
                taskIconBgAnim: cc.Animation,
                taskIconLevelLabel: cc.Label
            },
            setData: function(e, t, i) {
                this.taskDialog = e, this.data = t, this.cfg = i, this.id = this.data.id, this.taskIconSprite.spriteFrame = this.taskIconArr[i.icon - 1], 
                1 == i.icon ? (this.taskIconLevelLabel.string = i.require1, this.taskIconLevelLabel.node.active = !0) : this.taskIconLevelLabel.node.active = !1, 
                this.descLabel.string = i.taskDesc, this.progressLabel.string = this.data.targetNum.toString() + "/" + this.cfg.targetNum.toString();
                var n = this.progressNode.getComponent(cc.ProgressBar);
                n.progress = this.data.targetNum / this.cfg.targetNum, this.moneyLabel.string = this.cfg.rewardNum, 
                n.progress < 1 ? (this.rewardBtn.interactable = !1, this.taskIconBgAnim.stop()) : (this.rewardBtn.interactable = !0, 
                this.taskIconBgAnim.play()), this.isAnimation = !1;
            },
            getTaskId: function() {
                return this.id;
            },
            onGetReward: function() {
                var n = this;
                this.data.targetNum < this.cfg.targetNum || this.isAnimation || (this.isAnimation = !0, 
                AdHelper.logEvent("task_get_reward", {
                    id: this.id
                }), console.log("onGetReward"), PageMgr.getPageAsync("RewardShowDialog").then(function(e) {
                    var t = e.getComponent("RewardShowDialog"), i = {};
                    i.num = n.cfg.rewardNum, i.itemType = n.cfg.rewardType, i.callback = function() {
                        this.taskDialog.getReward(this.data.id);
                    }.bind(n), t.setData(i), PageMgr.showDialog("RewardShowDialog", !0, !0);
                }));
            },
            start: function() {}
        }), cc._RF.pop();
    }, {} ],
    TaskMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "6668e6uPCtMZ6dJ7tpyp9Qj", "TaskMgr");
        var n = {
            TaskType: {
                PASS_LEVEL: 1,
                NO_HELP_PASS: 2,
                GATHER_POINT: 3,
                BATTLE_SCORE: 4,
                PLAY_BATTLE: 5,
                GET_ALL_POINT: 6,
                GET_STAR: 7,
                LOTTERY: 8
            }
        };
        n.getCurTaskData = function() {
            var e = User.getTaskData();
            if (null != e && null != e.curTaskList && 3 <= e.curTaskList.length) return e.curTaskList;
            null == e && (e = {}), null == e.curTaskList && (e.curTaskList = []), null == e.complateTaskList && (e.complateTaskList = {});
            for (var t = {}, i = 0; i < e.curTaskList.length; ++i) t[e.curTaskList[i].id.toString()] = 1;
            for (var n = DataMgr.getPriortyTaskCfg(), s = 0, a = e.curTaskList.length; a < 3; ++a) {
                for (var o = null, r = s; r < n.length; r++) {
                    s = r + 1;
                    var c = n[r];
                    if (null == t[c.id.toString()] && null == e.complateTaskList[c.id.toString()]) {
                        e.curTaskList.push({
                            id: c.id.toString(),
                            targetNum: 0
                        }), o = c.id;
                        break;
                    }
                }
                if (null == o) break;
            }
            return User.saveTaskData(e), e.curTaskList;
        }, n.taskProgress = function(e, t, i) {
            null == i && (i = 1);
            for (var n = User.getTaskData(), s = !1, a = DataMgr.getTaskCfg(), o = 0; o < (n.curTaskList || []).length; ++o) {
                var r = n.curTaskList[o], c = a[r.id.toString()];
                if (0 != c.require1) {
                    if (0 == c.require1Symbal && t != c.require1) continue;
                    if (0 < c.require1Symbal && t < c.require1) continue;
                    if (c.require1Symbal < 0 && t > c.require1) continue;
                }
                c.taskType == e && r.targetNum < c.targetNum && (r.targetNum += i, r.targetNum > c.targetNum && (r.targetNum = c.targetNum), 
                s = !0);
            }
            s && User.saveTaskData(n);
        }, n.getComplateNum = function() {
            var e = 0, t = User.getTaskData();
            if (!t.curTaskList) return 0;
            for (var i = DataMgr.getTaskCfg(), n = 0; n < t.curTaskList.length; ++n) {
                var s = i[t.curTaskList[n].id.toString()];
                t.curTaskList[n].targetNum >= s.targetNum && e++;
            }
            return e;
        }, n.getReward = function(e) {
            for (var t = User.getTaskData(), i = {}, n = 0; n < t.curTaskList.length; ++n) i[t.curTaskList[n].id.toString()] = 1;
            for (var s = DataMgr.getPriortyTaskCfg(), a = null, o = 0; o < s.length; o++) {
                var r = s[o];
                if (null == i[r.id.toString()] && null == t.complateTaskList[r.id.toString()]) {
                    a = r.id;
                    break;
                }
            }
            for (var c = 0; c < t.curTaskList.length; ++c) if (t.curTaskList[c].id.toString() == e.toString()) {
                t.complateTaskList[e.toString()] = 1, null == a ? t.curTaskList.splice(c, 1) : t.curTaskList[c] = {
                    id: a.toString(),
                    targetNum: 0
                };
                break;
            }
            return User.saveTaskData(t), a;
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    TopBar: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "27ce7yK/vtDNYO/jgNUdOkX", "TopBar"), cc.Class({
            extends: cc.Component,
            properties: {
                energyLabel: cc.Label,
                goldLabel: cc.Label,
                levelLabel: cc.Label,
                expProgress: cc.Node,
                energyRecTm: cc.Label
            },
            onLoad: function() {
                this.topBarY = cc.winSize.height / 2 - 80, this.node.scale = cc.winSize.width / 750;
            },
            onEnable: function() {
                this.flushData(), this.clickCleanCnt = 0;
            },
            addReward: function(s, a, o) {
                var r = this;
                return new Promise(function(e, t) {
                    if (s == Constants.ITEMTYPE.COIN) if (o) {
                        var i = r.goldLabel.node.parent.convertToWorldSpaceAR(r.goldLabel.node.position), n = o.parent.convertToNodeSpaceAR(i);
                        o.runAction(cc.sequence(cc.moveTo(.4, n), cc.callFunc(function() {
                            o.removeFromParent(), r.goldLabel.node.runAction(cc.sequence(cc.scaleTo(.2, 1.5), cc.delayTime(.1), cc.callFunc(function() {
                                User.addGold(a), r.goldLabel.string = Utils.numToKMBStr(User.getKeyValue("goldNum"));
                            }), cc.scaleTo(.2, 1), cc.callFunc(function() {
                                e();
                            })));
                        })));
                    } else r.goldLabel.node.runAction(cc.sequence(cc.scaleTo(.2, 1.5), cc.delayTime(.1), cc.callFunc(function() {
                        User.addGold(a), r.goldLabel.string = Utils.numToKMBStr(User.getKeyValue("goldNum"));
                    }), cc.scaleTo(.2, 1), cc.callFunc(function() {
                        e();
                    }))); else User.addReward(s, a), e();
                });
            },
            addMoneyAndAnimal: function(e) {
                var t = this;
                this.goldLabel.node.runAction(cc.sequence(cc.scaleTo(.2, 1.5), cc.delayTime(.1), cc.callFunc(function() {
                    User.addGold(e), t.goldLabel.string = Utils.numToKMBStr(User.getKeyValue("goldNum"));
                }), cc.scaleTo(.2, 1)));
            },
            flushData: function() {
                this.lastCheckTm = 0, this.goldLabel.string = Utils.numToKMBStr(User.getKeyValue("goldNum"));
                var e = User.getKeyValue("level"), t = User.getKeyValue("lvlExp");
                this.levelLabel.string = e;
                var i = DataMgr.getLevelCfg()[e - 1].lvlexp;
                0 < i && (this.expProgress.getComponent(cc.ProgressBar).progress = t / i);
            },
            start: function() {},
            update: function(e) {
                var t = Math.floor(Date.now() / 1e3);
                if (!this.lastCheckTm || this.lastCheckTm != t) {
                    this.lastCheckTm = t;
                    var i = User.syncEnergyInfo();
                    this.energyLabel.string = User.getKeyValue("energyNum"), this.energyRecTm.string = 0 < i ? Utils.formatTimeHMS(i) : "", 
                    this.goldLabel.string = Utils.numToKMBStr(User.getKeyValue("goldNum"));
                }
            },
            onCleanData: function() {
                window.DEV && (this.clickCleanCnt += 1), 10 <= this.clickCleanCnt && (User.clearData(), 
                PageMgr.showTips("CleanDataOver........."));
                var e = PageMgr.getPage("ShopPage");
                if (!e || !e.active) {
                    var t = PageMgr.getPage("HomePage");
                    t && t.active ? t.getComponent("HomePage").openDialog("ShopPage") : (PageMgr.hideAllDialog(), 
                    PageMgr.showDialog("ShopPage"));
                }
            },
            onToShop: function() {}
        }), cc._RF.pop();
    }, {} ],
    TrapMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "26b4doO6KVCxq7bwC6PnsfA", "TrapMgr");
        var n = {}, s = new cc.NodePool();
        n.initGame = function(e, t, i) {
            this.trapLayer = e, this.trapPrefab = t, this.mainGame = i, this.tileList = [], 
            this.inited = !0;
        }, n.addTile = function(e, t) {
            var i = s.get() || cc.instantiate(this.trapPrefab);
            i.position = this.mainGame.getTilePosition(e, t), this.trapLayer.addChild(i);
            var n = i.getComponent("TrapTile");
            return this.tileList.push(n), n;
        }, n.removeAll = function(e, t) {
            if (this.inited) {
                for (var i = this.tileList.length - 1; 0 <= i; i--) s.put(this.tileList[i].node);
                this.tileList = [];
            }
        }, n.resetAll = function(e, t) {
            if (this.inited) for (var i = this.tileList.length - 1; 0 <= i; i--) this.tileList[i].reset();
        }, n.step = function(t, i) {
            var n = this;
            this.inited && this.tileList.forEach(function(e) {
                e.step(t, i), e.isHit(n.mainGame.player) && n.mainGame.player.setPlayerDeath(n, "Trap");
            });
        }, n.freeze = function() {
            this.inited && this.tileList.forEach(function(e) {
                e.onFreeze();
            });
        }, n.unFreeze = function() {
            this.inited && this.tileList.forEach(function(e) {
                e.onUnFreeze();
            });
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    TrapTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "4bcc6x0l85GBJBBcKyLZ0k4", "TrapTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {
                leftNode: cc.Node,
                rightNode: cc.Node,
                upNode: cc.Node,
                downNode: cc.Node,
                freezeNode: cc.Node,
                spriteFrames: [ cc.SpriteFrame ]
            },
            ctor: function() {
                this.isWalkable = !1, this.isTrap = !0, this.isFreezeState = !1;
            },
            init: function() {
                var e = this;
                this.leftNode.active = (this.getLeftTile().isWalkable || this.getLeftTile().isCloud || this.getLeftTile().isGlassWall) && !this.getLeftTile().isExit, 
                this.rightNode.active = (this.getRightTile().isWalkable || this.getRightTile().isCloud || this.getRightTile().isGlassWall) && !this.getRightTile().isExit, 
                this.upNode.active = (this.getUpTile().isWalkable || this.getUpTile().isCloud || this.getUpTile().isGlassWall) && !this.getUpTile().isExit, 
                this.downNode.active = (this.getDownTile().isWalkable || this.getDownTile().isCloud || this.getDownTile().isGlassWall) && !this.getDownTile().isExit, 
                this.leftAnim = this.leftNode.getChildByName("attack").getComponent(cc.Animation), 
                this.leftAnim.onOpen = function() {
                    e.isLeftOpen = !0, e.isLeftPlaying = !1, SoundMgr.play("trapout");
                }, this.leftAnim.onClose = function() {
                    e.isLeftOpen = !1;
                }, this.rightAnim = this.rightNode.getChildByName("attack").getComponent(cc.Animation), 
                this.rightAnim.onOpen = function() {
                    e.isRightOpen = !0, e.isRightPlaying = !1, SoundMgr.play("trapout");
                }, this.rightAnim.onClose = function() {
                    e.isRightOpen = !1;
                }, this.upAnim = this.upNode.getChildByName("attack").getComponent(cc.Animation), 
                this.upAnim.onOpen = function() {
                    e.isUpOpen = !0, e.isUpPlaying = !1, SoundMgr.play("trapout");
                }, this.upAnim.onClose = function() {
                    e.isUpOpen = !1;
                }, this.downAnim = this.downNode.getChildByName("attack").getComponent(cc.Animation), 
                this.downAnim.onOpen = function() {
                    e.isDownOpen = !0, e.isDownPlaying = !1, SoundMgr.play("trapout");
                }, this.downAnim.onClose = function() {
                    e.isDownOpen = !1;
                }, this.reset(), this.isFreezeState = !1, this.freezeNode.active = this.isFreezeState;
            },
            setFrame: function(e) {
                this.leftNode.getChildByName("trap").getComponent(cc.Sprite).spriteFrame = this.spriteFrames[e], 
                this.rightNode.getChildByName("trap").getComponent(cc.Sprite).spriteFrame = this.spriteFrames[e], 
                this.upNode.getChildByName("trap").getComponent(cc.Sprite).spriteFrame = this.spriteFrames[e], 
                this.downNode.getChildByName("trap").getComponent(cc.Sprite).spriteFrame = this.spriteFrames[e];
            },
            reset: function() {
                this.isLeftOpen = !1, this.isRightOpen = !1, this.isUpOpen = !1, this.isDownOpen = !1, 
                this.isRightPlaying = !1, this.isLeftPlaying = !1, this.isDownPlaying = !1, this.isUpPlaying = !1, 
                this.rightAnimState = null, this.leftAnimState = null, this.upAnimState = null, 
                this.downAnimState = null, this.rightAnim.setCurrentTime(0, "trapAttackright"), 
                this.rightAnim.sample("trapAttackright"), this.rightAnim.stop(), this.leftAnim.setCurrentTime(0, "trapAttackleft"), 
                this.leftAnim.sample("trapAttackleft"), this.leftAnim.stop(), this.downAnim.setCurrentTime(0, "trapAttackdown"), 
                this.downAnim.sample("trapAttackdown"), this.downAnim.stop(), this.upAnim.setCurrentTime(0, "trapAttackup"), 
                this.upAnim.sample("trapAttackup"), this.upAnim.stop(), this.setFrame(1);
            },
            onPlayerAround: function(e) {
                var t = this;
                if (!this.isFreezeState) if (this.tileX == e.tileX - 1) {
                    if (this.isRightOpen || !this.rightNode.active) return;
                    this.isRightPlaying || (this.isRightPlaying = !0, this.rightAnimState = this.rightAnim.play("trapAttackright"), 
                    this.rightAnim.pause(), this.rightAnim.off("finished"), this.rightAnim.once("finished", function() {
                        t.rightAnimState = null;
                    }));
                } else if (this.tileX == e.tileX + 1) {
                    if (this.isLeftOpen || !this.leftNode.active) return;
                    this.isLeftPlaying || (this.isLeftPlaying = !0, this.leftAnimState = this.leftAnim.play("trapAttackleft"), 
                    this.leftAnim.pause(), this.leftAnim.off("finished"), this.leftAnim.once("finished", function() {
                        t.leftAnimState = null;
                    }));
                } else if (this.tileY == e.tileY - 1) {
                    if (this.isDownOpen || !this.downNode.active) return;
                    this.isDownPlaying || (this.isDownPlaying = !0, this.downAnimState = this.downAnim.play("trapAttackdown"), 
                    this.downAnim.pause(), this.downAnim.off("finished"), this.downAnim.once("finished", function() {
                        t.downAnimState = null;
                    }));
                } else if (this.tileY == e.tileY + 1) {
                    if (this.isUpOpen || !this.upNode.active) return;
                    this.isUpPlaying || (this.isUpPlaying = !0, this.upAnimState = this.upAnim.play("trapAttackup"), 
                    this.upAnim.pause(), this.upAnim.off("finished"), this.upAnim.once("finished", function() {
                        t.upAnimState = null;
                    }));
                }
            },
            onFreeze: function() {
                this.reset(), this.isFreezeState = !0, this.freezeNode.active = this.isFreezeState, 
                this.setFrame(0);
            },
            onUnFreeze: function() {
                this.isFreezeState = !1, this.freezeNode.active = this.isFreezeState, this.setFrame(1);
            },
            isHit: function(e) {
                var t = e.tileX, i = e.tileY;
                return this.isUpOpen && this.tileX == t && this.tileY == i + 1 || this.isDownOpen && this.tileX == t && this.tileY == i - 1 || this.isLeftOpen && this.tileY == i && this.tileX == t + 1 || this.isRightOpen && this.tileY == i && this.tileX == t - 1;
            },
            step: function(e, t) {
                this.rightAnimState && this.rightAnimState.update(1 / 60), this.leftAnimState && this.leftAnimState.update(1 / 60), 
                this.downAnimState && this.downAnimState.update(1 / 60), this.upAnimState && this.upAnimState.update(1 / 60);
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    TrySkinDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "a1d03gAQGZCUJCkpKYYbjtA", "TrySkinDialog"), cc.Class({
            extends: cc.Component,
            properties: {
                ninjaSp: sp.Skeleton
            },
            onLoad: function() {
                this.node.scale = cc.winSize.width / 750;
            },
            preLoad: function(a) {
                var o = this;
                return this.skinId = a, this.node.active = !0, this.node.opacity = 0, new Promise(function(n, s) {
                    cc.loader.loadRes(DataMgr.getSkinRes(a), sp.SkeletonData, function(e, t) {
                        if (o.node.active = !1, o.node.opacity = 255, e) console.log(e), s(); else {
                            o.ninjaSp.skeletonData = t, o.ninjaSp.setSkin(DataMgr.getSkinName(a)), o.ninjaSp.setAnimation(0, "RuChang3", !0);
                            var i = DataMgr.getWeaponCfgById(User.getWeaponId());
                            o.ninjaSp.setAttachment(i.slotName, i.attachmentName), n();
                        }
                    });
                });
            },
            onTryClick: function() {
                var e = this;
                AdHelper.logEvent("try_skin", {
                    id: this.skinId
                });
                Utils.showShareOrAd("try_skin", function() {
                    e.close_cb && e.close_cb(), PageMgr.hideDialog("TrySkinDialog"), PageMgr.showTips("Equipped with a new skin");
                });
            },
            onClose: function() {
                PageMgr.hideDialog("TrySkinDialog");
            },
            setTryCb: function(e) {
                this.close_cb = e;
            }
        }), cc._RF.pop();
    }, {} ],
    TryWeaponDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "940ccckbX5ANYp3CrylEJkb", "TryWeaponDialog"), cc.Class({
            extends: cc.Component,
            properties: {
                weaponSp: cc.Sprite,
                desLabel: cc.Label
            },
            onLoad: function() {
                this.node.scale = cc.winSize.width / 750;
            },
            preLoad: function(t) {
                var s = this;
                return this.weaponId = t, this.node.active = !0, this.node.opacity = 0, new Promise(function(i, n) {
                    var e = DataMgr.getWeaponCfgById(t);
                    s.desLabel.string = "", cc.loader.loadRes("daoImg/" + e.shopImgName, cc.SpriteFrame, function(e, t) {
                        s.node.active = !1, s.node.opacity = 255, e ? (console.log(e), n(e)) : (s.weaponSp.spriteFrame = t, 
                        i());
                    });
                });
            },
            onTryClick: function() {
                var e = this;
                AdHelper.logEvent("try_weapon", {
                    id: this.weaponId
                }), Utils.showShareOrAd("try_weapon", function() {
                    e.close_cb && e.close_cb(), PageMgr.hideDialog("TryWeaponDialog"), PageMgr.showTips("Equipped with a new weapon");
                });
            },
            onClose: function() {
                PageMgr.hideDialog("TryWeaponDialog");
            },
            setTryCb: function(e) {
                this.close_cb = e;
            }
        }), cc._RF.pop();
    }, {} ],
    TurnDoorMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "74e61ARDeNEUozzmx4jQIM1", "TurnDoorMgr");
        var n = {}, s = new cc.NodePool();
        n.initGame = function(e, t, i) {
            this.turnDoorLayer = e, this.turnDoorPrefab = t, this.mainGame = i, this.tileList = [], 
            this.inited = !0;
        }, n.addTile = function(e, t) {
            var i = s.get() || cc.instantiate(this.turnDoorPrefab);
            i.position = this.mainGame.getTilePosition(e, t), this.turnDoorLayer.addChild(i);
            var n = i.getComponent("TurnDoorTile");
            return this.tileList.push(n), n;
        }, n.removeAll = function(e, t) {
            if (this.inited) {
                for (var i = this.tileList.length - 1; 0 <= i; i--) s.put(this.tileList[i].node);
                this.tileList = [];
            }
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    TurnDoorTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "43ee4O9+rxNUoxyVBMvLxVG", "TurnDoorTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {
                xuWall: cc.Node,
                shiWall: cc.Node
            },
            ctor: function() {
                this.isTurnDoor = !0, this.isWalkable = !0;
            },
            init: function() {
                this.isWalkable = !0, this.xuWall.active = this.isWalkable, this.shiWall.active = !this.xuWall.active;
            },
            onPlayerLeave: function(e) {
                this.isWalkable && (this.isWalkable = !1, this.xuWall.active = this.isWalkable, 
                this.shiWall.active = !this.xuWall.active);
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    User: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "1c533BAPW5G/5VBJFn8NQSQ", "User");
        for (var n = e("SoundMgr"), r = e("AdHelper"), d = e("md5"), s = e("Constants"), c = {
            name: "alpha go",
            createTime: Date.now(),
            isShortCreated: !1,
            isNewUser: !0,
            soundEnable: !0,
            musicEnable: !0,
            lastSendFriendsTime: 0,
            guide: {},
            groupContexts: [],
            payInfo: {},
            taskData: {
                curTaskList: []
            },
            energyNum: s.PARAM.EneryIncressMax,
            energyTime: 0,
            goldNum: 0,
            level: 1,
            lvlExp: 0,
            dataVersion: 1,
            stageInfo: [ {
                stageId: 1,
                star: 0,
                isClear: 0,
                deathPlace: null,
                playTm: null
            } ],
            shieldCount: 2,
            skinId: 1,
            weaponId: 1,
            lastFreeLotteryTm: Date.now(),
            freeLotteryNum: 0,
            lotteryTicket: 0,
            rankScore: 0,
            weaponInfo: [ {
                id: 1,
                buy: 1
            } ],
            skinInfo: [ {
                id: 1,
                buy: 1
            } ],
            isClickChallenge: !1,
            clickPerfVideo: 0,
            achievements: {},
            achiCount: {},
            boxes: {},
            rewardLevels: {}
        }, a = [], o = 1532934e3, l = Math.floor(Date.now() / 1e3), h = {}; o < l; ) 0, 
        o += 604800;
        var u = {
            firstInit: function() {
                c.dataVersion = 1;
            },
            getRecommondId: function() {
                return 0 == c.groupContexts.length ? null : c.groupContexts[Math.floor(Math.random() * c.groupContexts.length)];
            },
            addGroupId: function(e) {
                0 <= c.groupContexts.indexOf(e) || (c.groupContexts.push(e), u.save());
            },
            isGuided: function(e) {
                return c.guide[e];
            },
            chanllengeBtnClick: function() {
                c.isClickChallenge || (c.isClickChallenge = !0, u.save());
            },
            setGuided: function(e) {
                c.guide[e] = !0, r.logEvent("guide", {
                    step: e
                }), u.save();
            },
            markOldUser: function() {
                console.log("markOldUser"), c.isNewUser ? (c.isNewUser = !1, u.save()) : g = !1;
            },
            isNewUser: function() {
                return c.isNewUser;
            }
        }, g = !0;
        u.isFirstPlay = function() {
            return g;
        }, u.getLoginDayCount = function() {
            return Math.floor((Date.now() - c.createTime) / 864e5);
        }, u.getVersion = function() {
            var t = 0;
            if (!Global.isFBINSTANT) return t;
            var e = FBInstant.player.getID();
            try {
                t = parseInt(e.substring(e.length - 2, e.length));
            } catch (e) {
                return t;
            }
            return t;
        }, u.isPerformBlink = function() {
            return 0 == c.clickPerfVideo;
        };
        var p = !(u.setPerformBlinOver = function() {
            c.clickPerfVideo += 1, u.save();
        }), m = {};
        u.initPay = function() {
            FBInstant.getSupportedAPIs().indexOf("payments.purchaseAsync") && (FBInstant.payments.onReady(function() {
                p = !0;
            }), FBInstant.payments.getCatalogAsync().then(function(e) {
                for (var t = 0; t < e.length; t++) m[e[t].productID] = e[t].price;
            }).catch(function(e) {}), FBInstant.payments.getPurchasesAsync().then(function(e) {
                for (var t in e) FBInstant.payments.consumePurchaseAsync(e[t].purchaseToken).then(function() {}).catch(function(e) {});
            }));
        }, u.isPayReady = function() {
            return !Global.isFBINSTANT || p;
        }, u.getPrice = function(e, t) {
            return m[e] || t;
        }, u.purchase = function(t, i, n) {
            p ? (PageMgr.showLoading(), r.logEvent("pay_purchase", {
                id: t
            }), FBInstant.payments.purchaseAsync({
                productID: t,
                developerPayload: "ninja go"
            }).then(function(e) {
                r.logEvent("pay_purchase_success", {
                    id: t
                }), FBInstant.payments.consumePurchaseAsync(e.purchaseToken).then(function() {
                    r.logEvent("pay_consume_success", {
                        id: t
                    }), PageMgr.hideLoading(), i && i();
                }).catch(function(e) {
                    PageMgr.hideLoading(), n && n(e.message), r.logEvent("pay_consume_error", {
                        code: e.code,
                        message: e.message
                    });
                }), c.payInfo.push({
                    paymentID: e.paymentID,
                    signedRequest: e.signedRequest
                }), u.save();
            }).catch(function(e) {
                PageMgr.hideLoading(), n && n(e.message), r.logEvent("pay_purchase_error", {
                    code: e.code,
                    message: e.message
                });
            })) : Global.isFBINSTANT ? n && n("pay not ready") : i();
        }, u.setSoundEnable = function(e) {
            c.soundEnable != e && (c.soundEnable = e, u.save());
        }, u.setMusicEnable = function(e) {
            c.musicEnable != e && (c.musicEnable = e, u.save());
        }, u.load = function(t) {
            var e = null;
            Global.isFBINSTANT ? FBInstant.player.getDataAsync([ "data" ]).then(function(e) {
                if (void 0 !== e.data) try {
                    u.setData(JSON.parse(e.data));
                } catch (e) {
                    console.log(e);
                }
                u.isLoad = !0, t && t();
            }) : ((e = cc.sys.localStorage.getItem("data_lastninja")) && u.setData(JSON.parse(e)), 
            u.isLoad = !0, t && t());
        }, u.setData = function(t) {
            t.dataVersion = t.dataVersion || 0, Object.keys(t).forEach(function(e) {
                c[e] = t[e];
            }), u.firstInit(), n.setMusicEnable(c.musicEnable), n.setSoundEnable(c.soundEnable);
        }, u.clearData = function() {
            Global.isFBINSTANT && FBInstant.player.setDataAsync({
                data: JSON.stringify({})
            }), cc.sys.localStorage.removeItem("data_lastninja");
        }, u.save = function() {
            u.isLoad && (Global.isFBINSTANT ? FBInstant.player.setDataAsync({
                data: JSON.stringify(c)
            }) : cc.sys.localStorage.setItem("data_lastninja", JSON.stringify(c)));
        }, u.getRankName = function() {
            return "rank_hight_score_global_1";
        }, u.getFriendRankName = function() {
            return "week_1";
        }, u.setRankScore = function(e, t, i, n) {
            Global.isFBINSTANT && FBInstant.getLeaderboardAsync(e).then(function(e) {
                return e.setScoreAsync(t, i || "");
            }).then(function() {
                n && n();
            }).catch(function(e) {
                console.log("error", e), r.logEvent("rankset_fail", {
                    code: e.code
                }), n && n(e);
            });
        }, u.getMyRank = function(i, n) {
            if (Global.isFBINSTANT) FBInstant.getLeaderboardAsync(i).then(function(e) {
                return e.getPlayerEntryAsync();
            }).then(function(e) {
                var t = {
                    playerId: e.getPlayer().getID(),
                    photo: e.getPlayer().getPhoto(),
                    nickName: e.getPlayer().getName(),
                    rank: e.getRank(),
                    score: e.getScore(),
                    costomData: e.getExtraData()
                };
                n(t, i);
            }); else {
                for (var e = [], t = 1; t < 30; t++) e.push({
                    playerId: "id",
                    nickName: "name",
                    rank: t,
                    fbRank: t,
                    score: t,
                    isFriends: isFriends
                });
                n(e, i);
            }
        }, u.isBlocked = function(e) {
            return 0 <= a.indexOf(e || FBInstant.player.getID());
        }, u.getRankDataList = function(n, t, s, a, o) {
            if (Global.isFBINSTANT) {
                FBInstant.getLeaderboardAsync(n).then(function(e) {
                    return o ? e.getConnectedPlayerEntriesAsync() : e.getEntriesAsync(t, s);
                }).then(function(e) {
                    for (var t = [], i = 0; i < e.length; i++) u.isBlocked(e[i].getPlayer().getID()) || (s++, 
                    t.push({
                        playerId: e[i].getPlayer().getID(),
                        photo: e[i].getPlayer().getPhoto(),
                        nickName: e[i].getPlayer().getName(),
                        rank: s,
                        fbRank: e[i].getRank(),
                        score: e[i].getScore(),
                        costomData: e[i].getExtraData(),
                        isFriends: o
                    }));
                    h[n] = t, a(t, n);
                }).catch(function(e) {
                    console.log(e), r.logEvent("ranklist_fail", {
                        code: e.code
                    }), a(h[n] || [], n, e);
                });
            } else {
                for (var e = [], i = 1; i < 30; i++) e.push({
                    playerId: "id",
                    nickName: "testnames",
                    rank: i,
                    fbRank: i,
                    score: i,
                    isFriends: o
                });
                a(e, n);
            }
        };
        var f = !0;
        u.canSendMessage = function() {
            return Global.isFBINSTANT && f && "SOLO" != FBInstant.context.getType();
        }, u.chooseFriends = function(t, i) {
            Global.isFBINSTANT ? (r.logEvent("choose_list", {
                from: t.from
            }), PageMgr.showMask(), FBInstant.context.chooseAsync({
                filters: [ "NEW_CONTEXT_ONLY" ]
            }).then(function() {
                PageMgr.hideMask(), r.logEvent("choose_list_success", {
                    from: t.from
                }), i && i(), f = !0, "GROUP" == FBInstant.context.getType() && u.addGroupId(FBInstant.context.getID());
            }).catch(function(e) {
                PageMgr.hideMask(), r.logEvent("choose_list_fail", {
                    from: t.from,
                    code: e.code
                }), i && i(e), f = !1;
            })) : (PageMgr.hideMask(), i && i());
        }, u.playWithFriends = function(t, i) {
            Global.isFBINSTANT ? (r.logEvent("choose_play", {
                from: t.from
            }), PageMgr.showMask(), FBInstant.context.createAsync(t.playerId).then(function() {
                PageMgr.hideMask(), r.logEvent("choose_play_success", {
                    from: t.from
                }), i && i(), f = !0;
            }).catch(function(e) {
                PageMgr.hideMask(), r.logEvent("choose_play_fail", {
                    from: t.from,
                    code: e.code
                }), i && i(e);
            })) : (PageMgr.hideMask(), i && i());
        }, u.playWithGroup = function(t, i) {
            Global.isFBINSTANT ? (r.logEvent("choose_group", {
                from: t.from
            }), PageMgr.showMask(), FBInstant.context.switchAsync(t.contextId).then(function() {
                PageMgr.hideMask(), r.logEvent("choose_group_success", {
                    from: t.from
                }), i && i(), f = !0;
            }).catch(function(e) {
                PageMgr.hideMask(), r.logEvent("choose_group_fail", {
                    from: t.from,
                    code: e.code
                }), i && i(e);
            })) : (PageMgr.hideMask(), i && i());
        }, u.sendToFriends = function(t, i) {
            if (Global.isFBINSTANT) {
                var e = t.data || {};
                e.from = t.from || "default";
                var n = t.template || e.from;
                f = !1, FBInstant.updateAsync({
                    action: "CUSTOM",
                    cta: t.cta || "Play",
                    template: n,
                    text: t.text || "This game is funny,play with me",
                    image: t.image,
                    data: e,
                    strategy: t.strategy || "IMMEDIATE",
                    notification: t.notification || "NO_PUSH"
                }).then(function() {
                    r.logEvent("send_message_success", {
                        from: t.from
                    }), i && i();
                }).catch(function(e) {
                    i && i(e), r.logEvent("send_message_fail", {
                        from: t.from,
                        code: e.code
                    });
                });
            } else i && i();
        }, u.shareGame = function(t, i) {
            if (Global.isFBINSTANT) {
                var e = t.data || {};
                e.from = t.from, FBInstant.shareAsync({
                    intent: "SHARE",
                    image: t.image,
                    text: t.text,
                    data: e
                }).then(function() {
                    r.logEvent("game_share_success", {
                        from: t.from
                    }), AchievementMgr.onShareGame(), i && i();
                }).catch(function(e) {
                    console.log("err", e), r.logEvent("game_share_fail", {
                        from: t.from,
                        code: e.code
                    }), i && i(e);
                });
            } else i && i();
        }, u.subscribeBot = function(e) {
            window.FBInstant ? FBInstant.player.canSubscribeBotAsync().then(function() {
                r.logEvent("subscribeBot"), FBInstant.player.subscribeBotAsync().then(function() {
                    r.logEvent("subscribeBotSuccess"), e && e();
                }).catch(function() {
                    e && e();
                });
            }).catch(function() {
                e && e();
            }) : e && e();
        }, u.isShortCreated = function() {
            return c.isShortCreated;
        }, u.markShortCreated = function() {
            c.isShortCreated = !0, u.save();
        }, u.getContextID = function() {
            return Global.isFBINSTANT ? FBInstant.context.getID() : "123";
        }, u.getPlayerID = function() {
            return Global.isFBINSTANT ? FBInstant.player.getID() : "123000";
        }, u.getPlayerName = function() {
            return Global.isFBINSTANT ? FBInstant.player.getName() : "GDPlayer";
        }, u.getPlayerPhoto = function() {
            return Global.isFBINSTANT ? FBInstant.player.getPhoto() : "./c.png";
        };
        var y = null, v = [];
        u.getConnectedPlayers = function(e) {
            if (Global.isFBINSTANT) {
                if (y) return void e(y);
                if (v.push(e), 1 < v.length) return;
                FBInstant.player.getConnectedPlayersAsync().then(function(t) {
                    y = t, v.forEach(function(e) {
                        e(t);
                    }), v = [];
                }, function(e) {
                    console.log(e), v.forEach(function(e) {
                        e([]);
                    }), v = [];
                });
            } else e([]);
        }, u.sendDataDaily = function() {
            864e5 < Date.now() - c.lastSendFriendsTime && (c.lastSendFriendsTime = Date.now(), 
            u.save(), u.getConnectedPlayers(function(e) {
                FBInstant.logEvent("player_friend_count", 1, {
                    count: e.length
                }), window.part1 = "3415", window.part2 = "a003e21f95e", window.part3 = "4673f549", 
                window.part4 = "86d63c7e2";
                for (var t = window.part1, i = window.part2, n = window.part3, s = window.part4, a = {
                    action: "friends",
                    playerId: FBInstant.player.getID(),
                    payload: []
                }, o = 0; o < e.length; o++) a.payload.push(e[o].getID());
                var r = JSON.stringify(a), c = d(r + t + i + n + s), l = new XMLHttpRequest();
                l.open("POST", "https://fb-bot.capjoy.com/api/v0/upload_40"), l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), 
                l.onreadystatechange = function() {
                    l.readyState;
                };
                var h = "data=" + r + "&sign=" + c;
                l.send(h);
            }), FBInstant.logEvent("WebRenderType", 1, {
                type: cc._renderType
            }), FBInstant.logEvent("GpuInfo", 1, {
                maxTextureSize: cc.configuration.getMaxTextureSize(),
                maxTextureUnits: cc.configuration.getMaxTextureUnits(),
                nPot: cc.configuration.supportsNPOT() ? 1 : 0,
                vao: cc.configuration.supportsShareableVAO() ? 1 : 0,
                version: cc.configuration.getValue("gl.version")
            }), FBInstant.logEvent("user_info", 1, {
                level: u.getLevel(),
                maxStage: u.getMaxStage(),
                shieldCount: this.getShieldCount(),
                goldNum: Math.floor(c.goldNum / 100)
            }));
        }, u.getMaxScore = function() {
            return u.getMaxStage();
        }, u.getThanksgivingLeftTime = function() {
            return Math.floor(1543046400 - Date.now() / 1e3);
        }, u.getChristmasLeftTime = function() {
            return Math.floor(1545897600 - Date.now() / 1e3);
        }, u.getNewYearLeftTime = function() {
            return Date.now() < 15460704e5 ? -1 : Math.floor(1546502400 - Date.now() / 1e3);
        }, u.isAchievementGained = function(e) {
            return 0 < c.achievements[e];
        }, u.markAchievementGained = function(e) {
            c.achievements[e] = 1, this.save();
        }, u.isAchievementCollected = function(e) {
            return 2 == c.achievements[e];
        }, u.markAchievementCollected = function(e) {
            c.achievements[e] = 2;
        }, u.addAchiCounter = function(e) {
            return c.achiCount[e] = c.achiCount[e] || 0, c.achiCount[e]++, this.save(), c.achiCount[e];
        }, u.getTaskData = function() {
            return c.taskData;
        }, u.saveTaskData = function(e) {
            c.taskData = e, u.save();
        }, u.syncEnergyInfo = function() {
            var e = Math.floor(Date.now() / 1e3);
            if (c.energyNum >= s.PARAM.EneryIncressMax) return c.energyTime = e, 0;
            if (e > c.energyTime) {
                var t = e - c.energyTime, i = Math.floor(t / s.PARAM.EneryIncressTm);
                return i + c.energyNum >= s.PARAM.EneryIncressMax ? (c.energyTime = e, c.energyNum = s.PARAM.EneryIncressMax, 
                0) : (c.energyTime += i * s.PARAM.EneryIncressTm, c.energyNum += i, c.energyTime + s.PARAM.EneryIncressTm - e);
            }
            return c.energyTime + s.PARAM.EneryIncressTm - e;
        }, u.addEnergy = function(e) {
            u.syncEnergyInfo(), c.energyNum += e, u.save();
        }, u.decEnergy = function(e) {
            return u.syncEnergyInfo(), c.energyNum >= e && (c.energyNum -= e, u.save(), !0);
        }, u.addGold = function(e, t) {
            c.goldNum += e, AchievementMgr.onCoinChange(c.goldNum), t || u.save();
        }, u.getGold = function() {
            return c.goldNum;
        }, u.decGold = function(e, t) {
            return !(c.goldNum < e) && (c.goldNum -= e, t || u.save(), !0);
        }, u.addShield = function(e) {
            c.shieldCount += e, u.save();
        }, u.decShield = function() {
            return !(c.shieldCount < 1) && (c.shieldCount -= 1, u.save(), !0);
        }, u.getShieldCount = function(e) {
            return c.shieldCount;
        }, u.getSkinId = function() {
            return c.skinId;
        }, u.setSkinId = function(e) {
            c.skinId = e, u.save();
        }, u.getWeaponId = function() {
            return c.weaponId;
        }, u.setWeaponId = function(e) {
            c.weaponId = e, u.save();
        }, u.getMaxStage = function() {
            return c.stageInfo.length;
        }, u.getLevel = function() {
            return c.level;
        }, u.getKeyValue = function(e) {
            return c[e];
        }, u.updateStageStar = function(e, t, i) {
            if (e > c.stageInfo.length) return !1;
            var n = !1;
            return t > c.stageInfo[e - 1].star && (c.stageInfo[e - 1].star = t, n = !0), i && 0 == c.stageInfo[e - 1].isClear && (c.stageInfo[e - 1].isClear = 1, 
            n = !0), !!n && (u.save(), !0);
        }, u.unLockStage = function(e) {
            return c.stageInfo.length + 1 == e && (!(e > s.PARAM.MapStageMax) && (c.stageInfo.push({
                stageId: parseInt(e),
                star: 0,
                isClear: 0,
                deathPlace: null,
                playTm: null
            }), u.save(), !0));
        }, u.getStageInfo = function() {
            for (var e = [], t = [], i = 0; i < s.PARAM.MapStageMax; ++i) {
                var n = {
                    stageId: i + 1,
                    enable: 0,
                    star: 0,
                    isClear: 0
                };
                c.stageInfo[i] && (n.enable = 1, n.star = c.stageInfo[i].star, n.isClear = c.stageInfo[i].isClear), 
                t.push(n), 3 <= t.length && (e.push(t), t = []);
            }
            return 0 < t.length && e.push(t), e;
        }, u.getStageRIPTileStr = function(e) {
            return c.stageInfo[e - 1] ? c.stageInfo[e - 1].deathPlace : null;
        }, u.cleanStageRIP = function(e) {
            c.stageInfo[e - 1] && (c.stageInfo[e - 1].deathPlace = null, u.save());
        }, u.setStageDeathPlace = function(e, t) {
            c.stageInfo[e - 1] && (c.stageInfo[e - 1].deathPlace = t, u.save());
        }, u.getStagePefectTm = function(e) {
            return c.stageInfo[e - 1] ? c.stageInfo[e - 1].playTm : null;
        }, u.setStagePefectTm = function(e, t) {
            c.stageInfo[e - 1] && (c.stageInfo[e - 1].playTm = t, u.save());
        }, u.setFreeLotteryTime = function() {
            0 < c.lotteryTicket ? c.lotteryTicket -= 1 : (c.lastFreeLotteryTm = Date.now(), 
            c.freeLotteryNum += 1), u.save();
        }, u.refillEnergy = function() {
            return !!this.decGold(1e3, !0) && (c.energyNum = s.PARAM.EneryIncressMax, c.energyTime = 0, 
            u.save(), !0);
        }, u.addExp = function(e) {
            if (!e || e <= 0) return !1;
            e *= 1;
            for (var t = DataMgr.getLevelCfg(), i = c.level, n = c.lvlExp, s = !1, a = i; a <= t.length; ++a) {
                var o = t[a - 1].lvlexp;
                if (n + e < o) {
                    n += e;
                    break;
                }
                if (e -= o - n, i >= t.length) {
                    n = o;
                    break;
                }
                i = a + 1, s = !(n = 0);
            }
            return c.level = i, c.lvlExp = n, u.save(), s;
        }, u.addReward = function(e, t) {
            e == Constants.ITEMTYPE.COIN ? u.addGold(t) : e == Constants.ITEMTYPE.PROTECT && (c.shieldCount += t), 
            u.save();
        }, u.setRankScore = function(e) {
            return !(c.rankScore >= e) && (c.rankScore = e, u.save(), !0);
        }, u.getWeaponInfo = function() {
            var e = DataMgr.getWeaponCfgArr();
            if (c.weaponInfo.length >= e.length) return c.weaponInfo;
            for (var t = 0; t < e.length; t++) t >= c.weaponInfo.length && c.weaponInfo.push({
                id: e[t].id,
                buy: 0
            });
            return u.save(), c.weaponInfo;
        }, u.getSkinInfo = function() {
            var e = DataMgr.getSkinCfgArr();
            if (c.skinInfo.length >= e.length) return c.skinInfo;
            for (var t = 0; t < e.length; t++) t >= c.skinInfo.length && c.skinInfo.push({
                id: e[t].id,
                buy: 0
            });
            return u.save(), c.skinInfo;
        }, u.isSkinBuy = function(e) {
            if (c.skinInfo[e - 1] || (u.getSkinInfo(), c.skinInfo[e - 1])) return 1 == c.skinInfo[e - 1].buy;
        }, u.skinBuy = function(e) {
            if (c.skinInfo[e - 1] || (u.getSkinInfo(), c.skinInfo[e - 1])) return c.skinInfo[e - 1].buy = 1, 
            u.save(), !0;
        }, u.isWeaponBuy = function(e) {
            return !(!c.weaponInfo[e - 1] && (u.getWeaponInfo(), !c.weaponInfo[e - 1])) && 1 == c.weaponInfo[e - 1].buy;
        }, u.weaponBuy = function(e) {
            return !(!c.weaponInfo[e - 1] && (u.getWeaponInfo(), !c.weaponInfo[e - 1])) && (c.weaponInfo[e - 1].buy = 1, 
            u.save(), !0);
        }, u.isBoxOpened = function(e) {
            return c.boxes[e];
        }, u.markBoxOpened = function(e) {
            c.boxes[e] = !0, u.save();
        }, u.isRewardPlayed = function(e) {
            return c.rewardLevels[e];
        }, u.markRewardPlayed = function(e) {
            c.rewardLevels[e] = !0, u.save();
        }, t.exports = u, cc._RF.pop();
    }, {
        AdHelper: "AdHelper",
        Constants: "Constants",
        SoundMgr: "SoundMgr",
        md5: "md5"
    } ],
    Utils: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "50c28+kwNlJEpYIl6xVJzG1", "Utils");
        var l = {}, h = [];
        l.formatTime = function(e) {
            var t = e % 60 < 10 ? ":0" + e % 60 : ":" + e % 60;
            return t = ((e = Math.floor(e / 60)) % 60 < 10 ? ":0" + e % 60 : ":" + e % 60) + t, 
            t = ((e = Math.floor(e / 60)) < 10 ? "0" + e : e) + t;
        }, l.formatTimeHMS = function(e) {
            var t = "";
            return 3600 <= e && (t += Math.floor(e / 3600).toString() + "h"), 60 <= e && (t += Math.floor(e % 3600 / 60).toString() + "m"), 
            t += Math.floor(e % 60).toString() + "s";
        }, l.formatTimeMS = function(e) {
            var t = e % 60 < 10 ? ":0" + e % 60 : ":" + e % 60;
            return t = ((e = Math.floor(e / 60)) % 60 < 10 ? "0" + e % 60 : "" + e % 60) + t;
        };
        var a = window.gl;
        l.captureScreen = function(e, r, c, l, t, h) {
            var i = e._sgNode || e, d = a || cc._renderContext;
            r = Math.floor(r), c = Math.floor(c);
            var u = new cc.RenderTexture(r, c, cc.Texture2D.PIXEL_FORMAT_RGBA8888, cc.sys.isBrowser ? d.DEPTH_STENCIL : d.DEPTH24_STENCIL8_OES);
            cc.sys.isBrowser && u.setAutoDraw(!0);
            var n = e.y;
            e.scaleY = -e.scaleY, e.y = c;
            var s = cc.macro.ENABLE_CULLING;
            cc.macro.ENABLE_CULLING = !1, u.beginWithClear(0, 0, 0, 255, 0, 0), i.visit(), u.end(), 
            cc.macro.ENABLE_CULLING = s, e.scaleY = -e.scaleY, e.y = n, cc.sys.isBrowser && (u.scaleY = -1), 
            t && t();
            var g = "";
            cc.sys.isBrowser ? setTimeout(function() {
                try {
                    var t = null, i = null;
                    if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) g = u.sprite.getTexture().getHtmlElementObj().toDataURL("image/png"); else {
                        var e = u.sprite.getTexture()._glID, n = c - (h = h || 0);
                        t = d.getParameter(d.FRAMEBUFFER_BINDING);
                        var s = d.createFramebuffer();
                        i = s, d.bindFramebuffer(d.FRAMEBUFFER, s), d.framebufferTexture2D(d.FRAMEBUFFER, d.COLOR_ATTACHMENT0, d.TEXTURE_2D, e, 0);
                        var a = new Uint8Array(r * n * 4);
                        d.readPixels(0, 0, r, n, d.RGBA, d.UNSIGNED_BYTE, a), d.deleteFramebuffer(s), i = null;
                        var o = document.createElement("canvas");
                        o.id = "captureCanvas", o.width = r, o.height = n, o.getContext("2d").putImageData(new ImageData(Uint8ClampedArray.from(a), r, n), 0, 0), 
                        g = o.toDataURL("image/webp");
                    }
                    l && l(g, u);
                } catch (e) {
                    console.log(e), i && (d.deleteFramebuffer(i), i = null), t && (d.bindFramebuffer(d.FRAMEBUFFER, t), 
                    t = null), l && l(g, u);
                }
            }, 0) : l && l(g, u);
        }, l.shareImage = function(e, s, a) {
            var o = document.createElement("canvas");
            o.id = "captureCanvas", PageMgr.showMask(), cc.loader.loadRes(e, function(e, t) {
                if (e) a(); else {
                    var i = t.getHtmlElementObj();
                    o.width = i.width, o.height = i.height, o.getContext("2d").drawImage(i, 0, 0, i.width, i.height);
                    var n = o.toDataURL("image/webp");
                    s.image = n, User.shareGame(s, function(e) {
                        PageMgr.hideMask(), a(e);
                    });
                }
            });
        };
        var c = {};
        l.getImageAsync = function(o, r) {
            return new Promise(function(t, n) {
                var e = c[o], s = cc.director.getScene(), a = function(e) {
                    s.addChild(e), e.active = !0, e.y = -1e3, setTimeout(function() {
                        e.y = 0, l.captureScreen(e, e.width, e.height, t, function() {
                            s.removeChild(e);
                        });
                    }, 0);
                };
                e ? "function" == typeof r ? (r(e), a(e)) : (e.off("finished"), e.on("finished", function() {
                    a(e);
                }), e.emit("pre_capture", r)) : cc.loader.loadRes("prefab/share/" + o, function(e, t) {
                    if (e) n(new Error("load prefab fail --\x3e" + o)); else {
                        var i = cc.instantiate(t);
                        c[o] = i, s.addChild(i), i.active = !1, "function" == typeof r ? (r(i), a(i)) : (i.off("finished"), 
                        i.on("finished", function() {
                            s.removeChild(i), a(i);
                        }), i.emit("pre_capture", r));
                    }
                });
            });
        }, l.sendFbMessage = function(e, t, i, n) {
            n = n || function() {}, User.canSendMessage() ? (AdHelper.logEvent("send_message", {
                from: i.from
            }), l.getImageAsync(e, t).then(function(e) {
                console.log("send_message", i), i.image = e, User.sendToFriends(i, function(e) {
                    e && console.log(e), n(e);
                });
            }).catch(function(e) {
                console.log(e), n(e);
            })) : n();
        }, l.shareGame = function(e, t, i, n) {
            n = n || function() {}, Global.platform == Global.PLATFORM.FBINSTANT ? (PageMgr.showMask(), 
            AdHelper.logEvent("game_share_click", {
                from: i.from
            }), l.getImageAsync(e, t).then(function(e) {
                i.image = e, User.shareGame(i, function(e) {
                    PageMgr.hideMask(), n(e);
                });
            }).catch(function(e) {
                console.log(e), PageMgr.hideMask(), n(e);
            })) : n();
        }, l.showShareOrAd = function(e, t, i) {
            AdHelper.isVideoLoad() ? AdHelper.showVideoAd(e, t, i) : t && t();
        }, l.numToKMBStr = function(e, t, i) {
            if ((e = parseInt(e)) < 1e3) return e.toString();
            i || (i = 6), i < 3 && (i = 3);
            for (var n = [], s = [ "K", "M", "B", "T" ], a = 0; 0 < e; a++) {
                for (var o = 0; o < 3 && 0 < e && (n.push(e % 10), !((e = Math.floor(e / 10)) <= 0)); o++) ;
                0 < e && a < s.length && n.push(s[a]);
            }
            for (var r = "", c = 0; 0 <= i && c < n.length; c++) {
                var l = n[n.length - c - 1];
                if (0 <= l && l <= 9) r += l.toString(), i -= 1; else {
                    if (i < 3) {
                        r += l;
                        break;
                    }
                    t || (r += ",");
                }
            }
            return r;
        }, l.startGameMain = function(t, i) {
                AdHelper.logEvent("startGameMain", {
                    from: t.from
                }), PageMgr.showLoading(), PageMgr.getPageAsync("GameMain", !0).then(function(e) {
                    e.getComponent("GameMain").preLoad(t).then(function() {
                        PageMgr.hideLoading(), i ? i(function() {
                            PageMgr.showPage("GameMain");
                        }) : PageMgr.showPage("GameMain");
                    }).catch(function(e) {
                        console.log(e), PageMgr.hideLoading();
                    });
                }).catch(function(e) {
                    console.log(e), PageMgr.hideLoading();
                });
        }, l.replayGameMain = function(i, n) {
            if (parseInt(i.version) < 3) return PageMgr.showTips("Video lost!"), void (n && n());
            PageMgr.showLoading(), PageMgr.getPageAsync("GameMain", !0).then(function(e) {
                var t = e.getComponent("GameMain");
                i.onCloseReplay = n, t.preLoad(i).then(function() {
                    PageMgr.hideLoading(), PageMgr.showDialog("GameMain", !0);
                }).catch(function(e) {
                    console.log(e), PageMgr.hideLoading();
                });
            }).catch(function(e) {
                console.log(e), PageMgr.hideLoading();
            });
        }, l.replayGameChallenge = function(i, n) {
            PageMgr.showLoading(), PageMgr.getPageAsync("GameChallenge", !0).then(function(e) {
                e.zIndex = -100, e.active = !0;
                var t = e.getComponent("GameChallenge");
                i.onCloseReplay = n, t.preLoad(i).then(function() {
                    PageMgr.hideLoading(), PageMgr.showDialog("GameChallenge", !0), t.beginGame();
                }).catch(function(e) {
                    console.log(e), PageMgr.hideLoading();
                });
            }).catch(function(e) {
                console.log(e), PageMgr.hideLoading();
            });
        }, l.startGameChallenge = function(i, n) {
            AdHelper.logEvent("startGameChallenge", {
                from: i.from
            }), l.getWeekRankList(!0), PageMgr.showLoading(), PageMgr.getPageAsync("GameChallenge", !0).then(function(e) {
                e.zIndex = -100, e.active = !0;
                var t = e.getComponent("GameChallenge");
                t.preLoad(i).then(function() {
                    PageMgr.hideLoading(), n ? n(function() {
                        PageMgr.showPage("GameChallenge"), t.beginGame();
                    }) : (PageMgr.showPage("GameChallenge"), t.beginGame());
                }).catch(function(e) {
                    console.log(e), PageMgr.hideLoading();
                });
            }).catch(function(e) {
                console.log(e), PageMgr.hideLoading();
            });
        }, l.showGetEnergy = function() {
            User.getGold() < 1e3 && User.isPayReady() ? PageMgr.showDialog("BuyEnergyDialog", !0, !0) : PageMgr.showDialog("FillEnergyDialog", !0, !0);
        }, l.randomInt = function(e) {
            return Math.floor(Math.random() * e);
        }, l.randomSelectOne = function(e) {
            return e[l.randomInt(e.length)];
        }, l.PraiseChallengeVideo = function(e, t) {
            var i = {};
            i.playerId = e, i.type = t ? 1 : 2, l.RequestNinjaApi("praise_challenge_video", i), 
            AchievementMgr.onLikeVideo();
        }, l.PraiseStageVideo = function(e, t) {
            var i = {};
            i.playerId = t, i.stageId = e, l.RequestNinjaApi("praise_stage_video", i), AchievementMgr.onLikeVideo();
        }, l.GetStageVideo = function(e, t, index) {
            var i = {};
            return i.index = index, i.playerId = t, i.stageId = e, new Promise(function(e, t) {
                l.RequestNinjaApi("get_stage_video", i).then(function(t) {
                    if (t.video) try {
                        t.video = JSON.parse(t.video);
                    } catch (e) {
                        console.log("format  GetStageVideo video error!!"), t.video = [];
                    }
                    t.level = t.stageId, t.photo && (t.photo = t.photo, "null" == t.photo && (t.photo = null)), 
                    t.isReplay = !0, e(t);
                }, function(e) {
                    console.log(e), t(e);
                });
            });
        }, l.getStagePerfectArr = function(o) {
            return new Promise(function(s, a) {
                var n = {};
                n.stageId = o, n.playerList = t, l.RequestNinjaApi("get_stage_perfect", n).then(function(e) {
                    e || (e = []);
                    s(e);
                }, function(e) {
                    a(e);
                });
            });
        }, l.UploadStageVideo = function(e, t, i) {
            if (!(e <= 4)) {
                var n = {};
                n.playerId = User.getPlayerID(), n.stageId = e, n.playTm = t, n.video = JSON.stringify(i), 
                n.photo = User.getPlayerPhoto(), n.name = User.getPlayerName(), n.skinId = User.getSkinId(), 
                n.weaponId = User.getWeaponId(), n.version = Constants.PARAM.VideoVersion, l.RequestNinjaApi("upload_stage_video", n);
            }
        }, l.UploadChallegeVideo = function(e, t) {
            var i = {};
            i.playerId = User.getPlayerID(), i.video = JSON.stringify(t), i.photo = User.getPlayerPhoto(), 
            i.name = User.getPlayerName(), i.score = e, i.skinId = User.getSkinId(), i.weaponId = User.getWeaponId(), 
            i.version = Constants.PARAM.VideoVersion, l.RequestNinjaApi("upload_challenge_video", i);
        }, l.GetChallengeVideo = function(e, t) {
            var n = {};
            return n.playerId = e, n.type = t ? 1 : 2, new Promise(function(e, i) {
                l.RequestNinjaApi("get_challenge_video", n).then(function(t) {
                    if (t.video) try {
                        t.video = JSON.parse(t.video);
                    } catch (e) {
                        console.log("format  GetStageVideo video error!!"), t.video = [], i("video error");
                    } else i("video error");
                    t.photo && (t.photo = t.photo, "null" == t.photo && (t.photo = null)), t.name && (t.name = t.name), 
                    e(t);
                }, function(e) {
                    console.log(e), i(e);
                });
            });
        }, l.GetRecommondVideo = function() {
            var t = {};
            return t.stageId = User.getMaxStage(), t.stageId < 5 && (t.stageId = 5), new Promise(function(e, i) {
                l.RequestNinjaApi("get_recommand_video", t).then(function(t) {
                    if (t && t.video) try {
                        t.video = JSON.parse(t.video);
                    } catch (e) {
                        console.log("format  GetRecommondVideo video error!!"), t.video = null;
                    }
                    !t || !t.video || Object.keys(t.video).length <= 0 ? i("video lost!") : (t.level = t.stageId, 
                    t.photo && (t.photo = t.photo, "null" == t.photo && (t.photo = null)), t.isReplay = !0, 
                    e(t));
                }, function(e) {
                    console.log(e), i("video lost!");
                });
            });
        }, l.UploadChallegeShareVideo = function(e, t) {
            var n = {};
            return n.playerId = User.getPlayerID(), n.video = JSON.stringify(t), n.photo = User.getPlayerPhoto(), 
            n.name = User.getPlayerName(), n.score = e, n.skinId = User.getSkinId(), n.weaponId = User.getWeaponId(), 
            n.version = Constants.PARAM.VideoVersion, new Promise(function(t, i) {
                l.RequestNinjaApi("upload_challenge_share", n).then(function(e) {
                    e.id && 0 < e.id ? t(e.id) : i("upload video failed");
                }, function(e) {
                    console.log(e), i(e);
                });
            });
        }, l.GetChallengeShareVideo = function(e) {
            var t = {};
            return t.id = e, new Promise(function(e, i) {
                l.RequestNinjaApi("get_challenge_share", t).then(function(t) {
                    if (t.video) try {
                        t.video = JSON.parse(t.video);
                    } catch (e) {
                        console.log("format  GetStageVideo video error!!"), t.video = [], i("video error");
                    } else i("video error");
                    t.photo && (t.photo = t.photo, "null" == t.photo && (t.photo = null)), t.name && (t.name = t.name), 
                    null == t ? i("data had removed") : e(t);
                }, function(e) {
                    console.log(e), i(e);
                });
            });
        }, l.getWeekRankList = function(t) {
            return new Promise(function(c, e) {
                t && 0 < h.length ? c(h) : User.getConnectedPlayers(function(e) {
                    for (var t = [], r = {}, i = 0; i < e.length; i++) t.push(e[i].getID()), r[e[i].getID()] = e[i];
                    t.push(User.getPlayerID());
                    var n = {
                        type: 1
                    };
                    n.playerList = t, l.RequestNinjaApi("get_challenge_rank", n).then(function(e) {
                        var t = [], i = 0, n = !1;
                        if (e) for (var s = 0; s < e.length; s++) 0 < e[s].playerId && (delete r[e[s].playerId], 
                        e[s].playerId == User.getPlayerID() && (n = !0), i++, t.push({
                            playerId: e[s].playerId,
                            photo: e[s].photo,
                            nickName: e[s].name,
                            rank: i,
                            score: e[s].score,
                            isFriends: !0,
                            praise: e[s].praise
                        }));
                        for (var a in n || (i++, t.push({
                            playerId: User.getPlayerID(),
                            photo: User.getPlayerPhoto(),
                            nickName: User.getPlayerName(),
                            rank: i,
                            score: 0,
                            isFriends: !0,
                            praise: 0
                        })), r) {
                            var o = r[a];
                            i++, t.push({
                                playerId: o.getID(),
                                photo: o.getPhoto(),
                                nickName: o.getName(),
                                rank: i,
                                score: 0,
                                isFriends: !0,
                                praise: 0
                            });
                        }
                        c(h = t);
                    }, function() {
                        c([]);
                    });
                }, function() {
                    c([]);
                });
            });
        }, l.getGlobleRankList = function() {
            return new Promise(function(s, e) {
                var t = {
                    type: 2
                };
                l.RequestNinjaApi("get_challenge_rank", t).then(function(e) {
                    var t = [], i = 0;
                    if (e) for (var n = 0; n < e.length; n++) 0 < e[n].playerId && (i++, t.push({
                        playerId: e[n].playerId,
                        photo: e[n].photo,
                        nickName: e[n].name,
                        rank: i,
                        score: e[n].score,
                        isFriends: !1,
                        praise: e[n].praise
                    }));
                    s(t);
                }, function() {
                    s([]);
                });
            });
        }, l.RequestNinjaApi = function(s, a) {
            let ret = null;
            switch (s){
                case "upload_stage_video":
                    const videos = JSON.parse(cc.sys.localStorage.getItem("videos_"+a.stageId) || "[]");
                    videos.push(a);
                    cc.sys.localStorage.setItem("videos_" + a.stageId, JSON.stringify(videos));
                    break;
                case "get_stage_perfect":
                    ret = JSON.parse(cc.sys.localStorage.getItem("videos_"+a.stageId) || "[]")
                    break;
                case "get_stage_video":
                    ret = JSON.parse(cc.sys.localStorage.getItem("videos_"+a.stageId) || "[{}]")[a.index]
                    break;
            }
            return {then:(a,_)=>{
                a && a(ret);
            }}
        }, t.exports = l, cc._RF.pop();
    }, {} ],
    VersionControl: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "c6ecbyYtopPQq7419LnPsdI", "VersionControl"), cc.Class({
            extends: cc.Component,
            properties: {
                indexStart: 0,
                indexEnd: 0
            },
            onLoad: function() {
                var e = User.getVersion();
                this.node.active = e >= this.indexStart && e < this.indexEnd;
            }
        }), cc._RF.pop();
    }, {} ],
    WallTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f11f8JW1WxF8ohaIXlKmqQ6", "WallTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {},
            ctor: function() {
                this.isWalkable = !1, this.isWall = !0;
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    WheelMgr: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7e128wgJWRKXYEa9AkIS+Ke", "WheelMgr");
        var n = {}, a = new cc.NodePool();
        n.initGame = function(e, t, i) {
            this.layerNode = e, this.prefab = t, this.mainGame = i, this.tileList = [], this.inited = !0;
        }, n.addTile = function(e, t, i) {
            var n = a.get() || cc.instantiate(this.prefab);
            n.position = this.mainGame.getTilePosition(e, t), this.layerNode.addChild(n);
            var s = n.getComponent("WheelTile");
            return s.subtype = i, this.tileList.push(s), s;
        }, n.removeAll = function(e, t) {
            if (this.inited) {
                for (var i = this.tileList.length - 1; 0 <= i; i--) a.put(this.tileList[i].node);
                this.tileList = [];
            }
        }, n.step = function(t, i) {
            this.inited && this.tileList.forEach(function(e) {
                e.step(t, i);
            });
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    WheelTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "d9b8aL4XxdMcYA1cOjVzc1n", "WheelTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {
                wheelNode: cc.Node,
                wheel1Node: cc.Node,
                wheel2Node: cc.Node,
                wheel3Node: cc.Node
            },
            ctor: function() {
                this.isWalkable = !1, this.isWheel = !0, this.rotationSpeed = .1;
            },
            init: function() {
                this.rotationSpeed = .1;
                var e = this.subtype;
                this.wheelNode.scale = .5, 3 < e && (e -= 3, this.wheelNode.scale = 1), this.wheel1Node.active = 1 == e, 
                this.wheel2Node.active = 2 == e, this.wheel3Node.active = 3 == e;
            },
            step: function(e, t) {
                this.wheelNode.rotation += e * this.rotationSpeed;
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    XPTile: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "5175dHZ9c1FVImZ52Eg00lq", "XPTile");
        var n = e("BaseTile");
        cc.Class({
            extends: n,
            properties: {},
            ctor: function() {
                this.isXP = !0;
            },
            onPlayerEnter: function(e) {
                this.mainGame.removeTileAt(this.tileX, this.tileY), this.mainGame.addXP();
            }
        }), cc._RF.pop();
    }, {
        BaseTile: "BaseTile"
    } ],
    continueDialog: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "9b994XI92ZI9bgGg+LLKQvM", "continueDialog"), cc.Class({
            extends: cc.Component,
            properties: {
                contentNode: cc.Node,
                shareBtn: cc.Node,
                adBtn: cc.Node,
                continueLabel: cc.Label
            },
            setCallBack: function(e) {
                this.gameMain = e, AdHelper.logEvent("continue_show", {
                    from: this.gameMain.getName(),
                    hasVideo: AdHelper.isVideoLoad(),
                    count: this.gameMain.continueCnt
                });
            },
            onEnable: function() {
                var e = this, t = this.getComponent(cc.Animation);
                setTimeout(function() {
                    t.setCurrentTime(0), t.play("continue");
                }, 0), t.off("finished"), t.on("finished", function() {
                    e.onNoThanks();
                }), t.tickUp = function() {
                    SoundMgr.playByKey("ContinueTick");
                }, this.continueLabel.string = 3 - this.gameMain.continueCnt, this.contentNode.scale = 4, 
                this.contentNode.runAction(cc.scaleTo(.1, 1));
                var i = this.contentNode.getChildByName("continueWatchBtn");
                this.shareBtn.active = !1, i.getComponent(cc.Button).interactable = AdHelper.isVideoLoad();
            },
            onNoThanks: function() {
                AdHelper.logEvent("continue_nothanks_click"), this.onBackClick();
            },
            onBackClick: function() {
                this.getComponent(cc.Animation).off("finished"), PageMgr.hideDialog("continueDialog"), 
                this.gameMain && this.gameMain.onResultShow();
            },
            continueGame: function() {
                var e = this;
                this.continueLabel.node.parent.runAction(cc.sequence(cc.scaleTo(.5, 2), cc.callFunc(function() {
                    e.continueLabel.string = 2 - e.gameMain.continueCnt;
                }), cc.scaleTo(.5, 1), cc.callFunc(function() {
                    PageMgr.hideDialog("continueDialog"), e.gameMain.continueGame();
                })));
            },
            onInviteClick: function() {
                var t = this;
                AdHelper.logEvent("continue_invite_click", {
                    count: this.gameMain.continueCnt
                });
                var i = this.getComponent(cc.Animation);
                i.pause("continue"), PageMgr.showMask(), Utils.sendFbMessage("ShareGame", {
                    playerName: User.getPlayerName(),
                    playerPhoto: User.getPlayerPhoto()
                }, {
                    text: "😉😉😉 Never found such a fun game, try it!",
                    from: "continue"
                }, function() {
                    User.chooseFriends({
                        from: "continue_invite"
                    }, function(e) {
                        if (e) return i.resume("continue"), void ("SAME_CONTEXT" == e.code && PageMgr.showTips("YOU ALREADY MESSAGED THIS FRIEND."));
                        t.continueGame();
                    });
                });
            },
            onAdContinue: function() {
                var e = this;
                AdHelper.logEvent("continue_ad_click", {
                    count: this.gameMain.continueCnt
                }), this.getComponent(cc.Animation).pause("continue"), AdHelper.showVideoAd("continue_ad", function() {
                    e.continueGame();
                },()=>{
                    PageMgr.showTips("Sorry, no ad available!")
                    this.getComponent(cc.Animation).resume("continue")
                });
                setTimeout(()=>{
                    this.node.getChildByName("skipButton").active = true;
                    this.node.getChildByName("skipButton").opacity = 255;
                }, 1000)
            },
            onDiamonClick: function() {
                AdHelper.logEvent("continue_diamon_click", {
                    count: this.gameMain.continueCnt
                });
                var t = this.getComponent(cc.Animation);
                if (t.pause("continue"), User.decGold(200)) this.continueGame(); else if (User.isPayReady() && (0 < User.getThanksgivingLeftTime() || 0 < User.getChristmasLeftTime() || 0 < User.getNewYearLeftTime())) {
                    User.getChristmasLeftTime() ? "ChristmasCoinDialog" : 0 < User.getNewYearLeftTime() && "NewYearCoinDialog", 
                    PageMgr.getPageAsync("BuyCoinDialog").then(function(e) {
                        e.getComponent("BuyCoinDialog").onCloseCB = function() {
                            t.resume("continue");
                        }, PageMgr.showDialog("BuyCoinDialog", !0);
                    });
                } else PageMgr.showMask(), PageMgr.getPageAsync("ShopQuickShowDialog").then(function(e) {
                    PageMgr.hideMask(), e.getComponent("ShopQuickShowDialog").preLoad({
                        onClose: function() {
                            t.resume("continue");
                        },
                        type: 1
                    }), PageMgr.showDialog("ShopQuickShowDialog", !0, !0);
                }, function(e) {
                    PageMgr.hideMask(), t.resume("continue");
                });
            },
            start: function() {}
        }), cc._RF.pop();
    }, {} ],
    enginefix: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "cd6e4zd4nJK0rr0u8Ivn/AW", "enginefix"), cc.FillTo = cc.ActionInterval.extend({
            _dstRatial: 0,
            _startRatial: 0,
            _diffRatial: 0,
            ctor: function(e, t) {
                cc.ActionInterval.prototype.ctor.call(this), void 0 !== t && this.initWithDuration(e, t);
            },
            initWithDuration: function(e, t) {
                return !!cc.ActionInterval.prototype.initWithDuration.call(this, e) && (this._dstRatial = t || 0, 
                !0);
            },
            clone: function() {
                var e = new cc.FillTo();
                return this._cloneDecoration(e), e.initWithDuration(this._duration, this._dstRatial), 
                e;
            },
            startWithTarget: function(e) {
                cc.ActionInterval.prototype.startWithTarget.call(this, e);
                var t = e.getComponent(cc.Sprite);
                this._startRatial = t.fillRange, this._diffRatial = this._dstRatial - this._startRatial;
            },
            reverse: function() {
                cc.logID(1016);
            },
            update: function(e) {
                (e = this._computeEaseTime(e), this.target) && (this.target.getComponent(cc.Sprite).fillRange = this._startRatial + this._diffRatial * e);
            }
        }), cc.fillTo = function(e, t) {
            return new cc.FillTo(e, t);
        }, cc.FillBy = cc.ActionInterval.extend({
            _ratial: 0,
            _startRatial: 0,
            ctor: function(e, t) {
                cc.ActionInterval.prototype.ctor.call(this), void 0 !== t && this.initWithDuration(e, t);
            },
            initWithDuration: function(e, t) {
                return !!cc.ActionInterval.prototype.initWithDuration.call(this, e) && (this._ratial = t || 0, 
                !0);
            },
            clone: function() {
                var e = new cc.FillBy();
                return this._cloneDecoration(e), e.initWithDuration(this._duration, this._ratial), 
                e;
            },
            startWithTarget: function(e) {
                cc.ActionInterval.prototype.startWithTarget.call(this, e), this._startRatial = e.getComponent(cc.Sprite).fillRange;
            },
            update: function(e) {
                e = this._computeEaseTime(e), this.target && (this.target.getComponent(cc.Sprite).fillRange = this._startRatial + this._ratial * e);
            },
            reverse: function() {
                var e = new cc.FillBy(this._duration, -this._ratial);
                return this._cloneDecoration(e), this._reverseEaseList(e), e;
            }
        }), cc.fillBy = function(e, t) {
            return new cc.FillBy(e, t);
        }, cc.NumberTo = cc.ActionInterval.extend({
            _dstNum: 0,
            _startNum: 0,
            _diffRatial: 0,
            ctor: function(e, t) {
                cc.ActionInterval.prototype.ctor.call(this), void 0 !== t && this.initWithDuration(e, t);
            },
            initWithDuration: function(e, t) {
                return !!cc.ActionInterval.prototype.initWithDuration.call(this, e) && (this._dstNum = t || 0, 
                !0);
            },
            clone: function() {
                var e = new cc.NumberTo();
                return this._cloneDecoration(e), e.initWithDuration(this._duration, this._dstNum), 
                e;
            },
            startWithTarget: function(e) {
                cc.ActionInterval.prototype.startWithTarget.call(this, e);
                var t = e.getComponent(cc.Label);
                this._startNum = parseInt(t.string), this._diffNum = this._dstNum - this._startNum;
            },
            reverse: function() {
                cc.logID(1016);
            },
            update: function(e) {
                (e = this._computeEaseTime(e), this.target) && (this.target.getComponent(cc.Label).string = this._startNum + Math.round(this._dstNum * e));
            }
        }), cc.numberTo = function(e, t) {
            return new cc.NumberTo(e, t);
        }, cc.NumberBy = cc.ActionInterval.extend({
            _num: 0,
            _startNum: 0,
            ctor: function(e, t) {
                cc.ActionInterval.prototype.ctor.call(this), void 0 !== t && this.initWithDuration(e, t);
            },
            initWithDuration: function(e, t) {
                return !!cc.ActionInterval.prototype.initWithDuration.call(this, e) && (this._num = t || 0, 
                !0);
            },
            clone: function() {
                var e = new cc.NumberBy();
                return this._cloneDecoration(e), e.initWithDuration(this._duration, this._num), 
                e;
            },
            startWithTarget: function(e) {
                cc.ActionInterval.prototype.startWithTarget.call(this, e), this._startNum = parseInt(e.getComponent(cc.Label).string);
            },
            update: function(e) {
                e = this._computeEaseTime(e), this.target && (this.target.getComponent(cc.Label).string = this._startNum + Math.round(this._num * e));
            },
            reverse: function() {
                var e = new cc.FillBy(this._duration, -this._num);
                return this._cloneDecoration(e), this._reverseEaseList(e), e;
            }
        }), cc.numberBy = function(e, t) {
            return new cc.NumberBy(e, t);
        }, cc._RF.pop();
    }, {} ],
    en: [ function(e, t, i) {
        "use strict";
        cc._RF.push(t, "91bd1ZCd2tNN4uKocgWT0uc", "en"), window.i18n || (window.i18n = {}), 
        window.i18n.languages || (window.i18n.languages = {}), window.i18n.languages.en = {}, 
        cc._RF.pop();
    }, {} ],
    md5: [ function(require, module, exports) {
        (function(process, global) {
            "use strict";
            cc._RF.push(module, "de9ab8c2BxGla6uj84xhtDD", "md5");
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            };
            !function() {
                function t(e) {
                    if (e) d[0] = d[16] = d[1] = d[2] = d[3] = d[4] = d[5] = d[6] = d[7] = d[8] = d[9] = d[10] = d[11] = d[12] = d[13] = d[14] = d[15] = 0, 
                    this.blocks = d, this.buffer8 = l; else if (a) {
                        var t = new ArrayBuffer(68);
                        this.buffer8 = new Uint8Array(t), this.blocks = new Uint32Array(t);
                    } else this.blocks = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
                    this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0, 
                    this.finalized = this.hashed = !1, this.first = !0;
                }
                var r = "input is invalid type", e = "object" == ("undefined" == typeof window ? "undefined" : _typeof(window)), i = e ? window : {};
                i.JS_MD5_NO_WINDOW && (e = !1);
                var s = !e && "object" == ("undefined" == typeof self ? "undefined" : _typeof(self)), h = !i.JS_MD5_NO_NODE_JS && "object" == (void 0 === process ? "undefined" : _typeof(process)) && process.versions && process.versions.node;
                h ? i = global : s && (i = self);
                var f = !i.JS_MD5_NO_COMMON_JS && "object" == (void 0 === module ? "undefined" : _typeof(module)) && module.exports, o = "function" == typeof define && define.amd, a = !i.JS_MD5_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer, n = "0123456789abcdef".split(""), u = [ 128, 32768, 8388608, -2147483648 ], y = [ 0, 8, 16, 24 ], c = [ "hex", "array", "digest", "buffer", "arrayBuffer", "base64" ], p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), d = [], l;
                if (a) {
                    var A = new ArrayBuffer(68);
                    l = new Uint8Array(A), d = new Uint32Array(A);
                }
                !i.JS_MD5_NO_NODE_JS && Array.isArray || (Array.isArray = function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e);
                }), !a || !i.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function(e) {
                    return "object" == (void 0 === e ? "undefined" : _typeof(e)) && e.buffer && e.buffer.constructor === ArrayBuffer;
                });
                var b = function(i) {
                    return function(e) {
                        return new t(!0).update(e)[i]();
                    };
                }, v = function() {
                    var i = b("hex");
                    h && (i = w(i)), i.create = function() {
                        return new t();
                    }, i.update = function(e) {
                        return i.create().update(e);
                    };
                    for (var e = 0; e < c.length; ++e) {
                        var n = c[e];
                        i[n] = b(n);
                    }
                    return i;
                }, w = function w(t) {
                    var e = eval("require('crypto')"), i = eval("require('buffer').Buffer"), s = function(n) {
                        if ("string" == typeof n) return e.createHash("md5").update(n, "utf8").digest("hex");
                        if (null == n) throw r;
                        return n.constructor === ArrayBuffer && (n = new Uint8Array(n)), Array.isArray(n) || ArrayBuffer.isView(n) || n.constructor === i ? e.createHash("md5").update(new i(n)).digest("hex") : t(n);
                    };
                    return s;
                };
                t.prototype.update = function(e) {
                    if (!this.finalized) {
                        var t, i = void 0 === e ? "undefined" : _typeof(e);
                        if ("string" !== i) {
                            if ("object" !== i) throw r;
                            if (null === e) throw r;
                            if (a && e.constructor === ArrayBuffer) e = new Uint8Array(e); else if (!(Array.isArray(e) || a && ArrayBuffer.isView(e))) throw r;
                            t = !0;
                        }
                        for (var n, s, o = 0, c = e.length, l = this.blocks, h = this.buffer8; o < c; ) {
                            if (this.hashed && (this.hashed = !1, l[0] = l[16], l[16] = l[1] = l[2] = l[3] = l[4] = l[5] = l[6] = l[7] = l[8] = l[9] = l[10] = l[11] = l[12] = l[13] = l[14] = l[15] = 0), 
                            t) if (a) for (s = this.start; o < c && s < 64; ++o) h[s++] = e[o]; else for (s = this.start; o < c && s < 64; ++o) l[s >> 2] |= e[o] << y[3 & s++]; else if (a) for (s = this.start; o < c && s < 64; ++o) (n = e.charCodeAt(o)) < 128 ? h[s++] = n : (n < 2048 ? h[s++] = 192 | n >> 6 : (n < 55296 || 57344 <= n ? h[s++] = 224 | n >> 12 : (n = 65536 + ((1023 & n) << 10 | 1023 & e.charCodeAt(++o)), 
                            h[s++] = 240 | n >> 18, h[s++] = 128 | n >> 12 & 63), h[s++] = 128 | n >> 6 & 63), 
                            h[s++] = 128 | 63 & n); else for (s = this.start; o < c && s < 64; ++o) (n = e.charCodeAt(o)) < 128 ? l[s >> 2] |= n << y[3 & s++] : (n < 2048 ? l[s >> 2] |= (192 | n >> 6) << y[3 & s++] : (n < 55296 || 57344 <= n ? l[s >> 2] |= (224 | n >> 12) << y[3 & s++] : (n = 65536 + ((1023 & n) << 10 | 1023 & e.charCodeAt(++o)), 
                            l[s >> 2] |= (240 | n >> 18) << y[3 & s++], l[s >> 2] |= (128 | n >> 12 & 63) << y[3 & s++]), 
                            l[s >> 2] |= (128 | n >> 6 & 63) << y[3 & s++]), l[s >> 2] |= (128 | 63 & n) << y[3 & s++]);
                            this.lastByteIndex = s, this.bytes += s - this.start, 64 <= s ? (this.start = s - 64, 
                            this.hash(), this.hashed = !0) : this.start = s;
                        }
                        return 4294967295 < this.bytes && (this.hBytes += this.bytes / 4294967296 << 0, 
                        this.bytes = this.bytes % 4294967296), this;
                    }
                }, t.prototype.finalize = function() {
                    if (!this.finalized) {
                        this.finalized = !0;
                        var e = this.blocks, t = this.lastByteIndex;
                        e[t >> 2] |= u[3 & t], 56 <= t && (this.hashed || this.hash(), e[0] = e[16], e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0), 
                        e[14] = this.bytes << 3, e[15] = this.hBytes << 3 | this.bytes >>> 29, this.hash();
                    }
                }, t.prototype.hash = function() {
                    var e, t, i, n, s, a, o = this.blocks;
                    this.first ? t = ((t = ((e = ((e = o[0] - 680876937) << 7 | e >>> 25) - 271733879 << 0) ^ (i = ((i = (-271733879 ^ (n = ((n = (-1732584194 ^ 2004318071 & e) + o[1] - 117830708) << 12 | n >>> 20) + e << 0) & (-271733879 ^ e)) + o[2] - 1126478375) << 17 | i >>> 15) + n << 0) & (n ^ e)) + o[3] - 1316259209) << 22 | t >>> 10) + i << 0 : (e = this.h0, 
                    t = this.h1, i = this.h2, t = ((t += ((e = ((e += ((n = this.h3) ^ t & (i ^ n)) + o[0] - 680876936) << 7 | e >>> 25) + t << 0) ^ (i = ((i += (t ^ (n = ((n += (i ^ e & (t ^ i)) + o[1] - 389564586) << 12 | n >>> 20) + e << 0) & (e ^ t)) + o[2] + 606105819) << 17 | i >>> 15) + n << 0) & (n ^ e)) + o[3] - 1044525330) << 22 | t >>> 10) + i << 0), 
                    t = ((t += ((e = ((e += (n ^ t & (i ^ n)) + o[4] - 176418897) << 7 | e >>> 25) + t << 0) ^ (i = ((i += (t ^ (n = ((n += (i ^ e & (t ^ i)) + o[5] + 1200080426) << 12 | n >>> 20) + e << 0) & (e ^ t)) + o[6] - 1473231341) << 17 | i >>> 15) + n << 0) & (n ^ e)) + o[7] - 45705983) << 22 | t >>> 10) + i << 0, 
                    t = ((t += ((e = ((e += (n ^ t & (i ^ n)) + o[8] + 1770035416) << 7 | e >>> 25) + t << 0) ^ (i = ((i += (t ^ (n = ((n += (i ^ e & (t ^ i)) + o[9] - 1958414417) << 12 | n >>> 20) + e << 0) & (e ^ t)) + o[10] - 42063) << 17 | i >>> 15) + n << 0) & (n ^ e)) + o[11] - 1990404162) << 22 | t >>> 10) + i << 0, 
                    t = ((t += ((e = ((e += (n ^ t & (i ^ n)) + o[12] + 1804603682) << 7 | e >>> 25) + t << 0) ^ (i = ((i += (t ^ (n = ((n += (i ^ e & (t ^ i)) + o[13] - 40341101) << 12 | n >>> 20) + e << 0) & (e ^ t)) + o[14] - 1502002290) << 17 | i >>> 15) + n << 0) & (n ^ e)) + o[15] + 1236535329) << 22 | t >>> 10) + i << 0, 
                    t = ((t += ((n = ((n += (t ^ i & ((e = ((e += (i ^ n & (t ^ i)) + o[1] - 165796510) << 5 | e >>> 27) + t << 0) ^ t)) + o[6] - 1069501632) << 9 | n >>> 23) + e << 0) ^ e & ((i = ((i += (e ^ t & (n ^ e)) + o[11] + 643717713) << 14 | i >>> 18) + n << 0) ^ n)) + o[0] - 373897302) << 20 | t >>> 12) + i << 0, 
                    t = ((t += ((n = ((n += (t ^ i & ((e = ((e += (i ^ n & (t ^ i)) + o[5] - 701558691) << 5 | e >>> 27) + t << 0) ^ t)) + o[10] + 38016083) << 9 | n >>> 23) + e << 0) ^ e & ((i = ((i += (e ^ t & (n ^ e)) + o[15] - 660478335) << 14 | i >>> 18) + n << 0) ^ n)) + o[4] - 405537848) << 20 | t >>> 12) + i << 0, 
                    t = ((t += ((n = ((n += (t ^ i & ((e = ((e += (i ^ n & (t ^ i)) + o[9] + 568446438) << 5 | e >>> 27) + t << 0) ^ t)) + o[14] - 1019803690) << 9 | n >>> 23) + e << 0) ^ e & ((i = ((i += (e ^ t & (n ^ e)) + o[3] - 187363961) << 14 | i >>> 18) + n << 0) ^ n)) + o[8] + 1163531501) << 20 | t >>> 12) + i << 0, 
                    t = ((t += ((n = ((n += (t ^ i & ((e = ((e += (i ^ n & (t ^ i)) + o[13] - 1444681467) << 5 | e >>> 27) + t << 0) ^ t)) + o[2] - 51403784) << 9 | n >>> 23) + e << 0) ^ e & ((i = ((i += (e ^ t & (n ^ e)) + o[7] + 1735328473) << 14 | i >>> 18) + n << 0) ^ n)) + o[12] - 1926607734) << 20 | t >>> 12) + i << 0, 
                    t = ((t += ((a = (n = ((n += ((s = t ^ i) ^ (e = ((e += (s ^ n) + o[5] - 378558) << 4 | e >>> 28) + t << 0)) + o[8] - 2022574463) << 11 | n >>> 21) + e << 0) ^ e) ^ (i = ((i += (a ^ t) + o[11] + 1839030562) << 16 | i >>> 16) + n << 0)) + o[14] - 35309556) << 23 | t >>> 9) + i << 0, 
                    t = ((t += ((a = (n = ((n += ((s = t ^ i) ^ (e = ((e += (s ^ n) + o[1] - 1530992060) << 4 | e >>> 28) + t << 0)) + o[4] + 1272893353) << 11 | n >>> 21) + e << 0) ^ e) ^ (i = ((i += (a ^ t) + o[7] - 155497632) << 16 | i >>> 16) + n << 0)) + o[10] - 1094730640) << 23 | t >>> 9) + i << 0, 
                    t = ((t += ((a = (n = ((n += ((s = t ^ i) ^ (e = ((e += (s ^ n) + o[13] + 681279174) << 4 | e >>> 28) + t << 0)) + o[0] - 358537222) << 11 | n >>> 21) + e << 0) ^ e) ^ (i = ((i += (a ^ t) + o[3] - 722521979) << 16 | i >>> 16) + n << 0)) + o[6] + 76029189) << 23 | t >>> 9) + i << 0, 
                    t = ((t += ((a = (n = ((n += ((s = t ^ i) ^ (e = ((e += (s ^ n) + o[9] - 640364487) << 4 | e >>> 28) + t << 0)) + o[12] - 421815835) << 11 | n >>> 21) + e << 0) ^ e) ^ (i = ((i += (a ^ t) + o[15] + 530742520) << 16 | i >>> 16) + n << 0)) + o[2] - 995338651) << 23 | t >>> 9) + i << 0, 
                    t = ((t += ((n = ((n += (t ^ ((e = ((e += (i ^ (t | ~n)) + o[0] - 198630844) << 6 | e >>> 26) + t << 0) | ~i)) + o[7] + 1126891415) << 10 | n >>> 22) + e << 0) ^ ((i = ((i += (e ^ (n | ~t)) + o[14] - 1416354905) << 15 | i >>> 17) + n << 0) | ~e)) + o[5] - 57434055) << 21 | t >>> 11) + i << 0, 
                    t = ((t += ((n = ((n += (t ^ ((e = ((e += (i ^ (t | ~n)) + o[12] + 1700485571) << 6 | e >>> 26) + t << 0) | ~i)) + o[3] - 1894986606) << 10 | n >>> 22) + e << 0) ^ ((i = ((i += (e ^ (n | ~t)) + o[10] - 1051523) << 15 | i >>> 17) + n << 0) | ~e)) + o[1] - 2054922799) << 21 | t >>> 11) + i << 0, 
                    t = ((t += ((n = ((n += (t ^ ((e = ((e += (i ^ (t | ~n)) + o[8] + 1873313359) << 6 | e >>> 26) + t << 0) | ~i)) + o[15] - 30611744) << 10 | n >>> 22) + e << 0) ^ ((i = ((i += (e ^ (n | ~t)) + o[6] - 1560198380) << 15 | i >>> 17) + n << 0) | ~e)) + o[13] + 1309151649) << 21 | t >>> 11) + i << 0, 
                    t = ((t += ((n = ((n += (t ^ ((e = ((e += (i ^ (t | ~n)) + o[4] - 145523070) << 6 | e >>> 26) + t << 0) | ~i)) + o[11] - 1120210379) << 10 | n >>> 22) + e << 0) ^ ((i = ((i += (e ^ (n | ~t)) + o[2] + 718787259) << 15 | i >>> 17) + n << 0) | ~e)) + o[9] - 343485551) << 21 | t >>> 11) + i << 0, 
                    this.first ? (this.h0 = e + 1732584193 << 0, this.h1 = t - 271733879 << 0, this.h2 = i - 1732584194 << 0, 
                    this.h3 = n + 271733878 << 0, this.first = !1) : (this.h0 = this.h0 + e << 0, this.h1 = this.h1 + t << 0, 
                    this.h2 = this.h2 + i << 0, this.h3 = this.h3 + n << 0);
                }, t.prototype.hex = function() {
                    this.finalize();
                    var e = this.h0, t = this.h1, i = this.h2, s = this.h3;
                    return n[e >> 4 & 15] + n[15 & e] + n[e >> 12 & 15] + n[e >> 8 & 15] + n[e >> 20 & 15] + n[e >> 16 & 15] + n[e >> 28 & 15] + n[e >> 24 & 15] + n[t >> 4 & 15] + n[15 & t] + n[t >> 12 & 15] + n[t >> 8 & 15] + n[t >> 20 & 15] + n[t >> 16 & 15] + n[t >> 28 & 15] + n[t >> 24 & 15] + n[i >> 4 & 15] + n[15 & i] + n[i >> 12 & 15] + n[i >> 8 & 15] + n[i >> 20 & 15] + n[i >> 16 & 15] + n[i >> 28 & 15] + n[i >> 24 & 15] + n[s >> 4 & 15] + n[15 & s] + n[s >> 12 & 15] + n[s >> 8 & 15] + n[s >> 20 & 15] + n[s >> 16 & 15] + n[s >> 28 & 15] + n[s >> 24 & 15];
                }, t.prototype.toString = t.prototype.hex, t.prototype.digest = function() {
                    this.finalize();
                    var e = this.h0, t = this.h1, i = this.h2, n = this.h3;
                    return [ 255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255, 255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255, 255 & i, i >> 8 & 255, i >> 16 & 255, i >> 24 & 255, 255 & n, n >> 8 & 255, n >> 16 & 255, n >> 24 & 255 ];
                }, t.prototype.array = t.prototype.digest, t.prototype.arrayBuffer = function() {
                    this.finalize();
                    var e = new ArrayBuffer(16), t = new Uint32Array(e);
                    return t[0] = this.h0, t[1] = this.h1, t[2] = this.h2, t[3] = this.h3, e;
                }, t.prototype.buffer = t.prototype.arrayBuffer, t.prototype.base64 = function() {
                    for (var e, t, i, n = "", s = this.array(), a = 0; a < 15; ) e = s[a++], t = s[a++], 
                    i = s[a++], n += p[e >>> 2] + p[63 & (e << 4 | t >>> 4)] + p[63 & (t << 2 | i >>> 6)] + p[63 & i];
                    return e = s[a], n + (p[e >>> 2] + p[e << 4 & 63] + "==");
                };
                var _ = v();
                f ? module.exports = _ : (i.md5 = _, o && define(function() {
                    return _;
                }));
            }(), cc._RF.pop();
        }).call(this, require("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
        _process: 1
    } ]
}, {}, [ "Constants", "GameConfig", "Global", "ProjectStarter", "ColorSprite", "CommonUtils", "EventLoger", "JumpGame", "ListItem", "ListView", "ScrollPageView", "SpinLottery", "VersionControl", "enginefix", "BeginShowDialog", "LevelData", "MapPageItem", "RankItem", "ReplayItem", "ResultRankItem", "RewardLevelData", "RewardShowDialog", "ShopCoinPageItem", "ShopSkillPageItem", "ShopSkinPageItem", "SpinBtn", "ArmMonsterMgr", "BigFaceMgr", "BoxMgr", "CloudMgr", "CoinMgr", "DieWallMgr", "DoorMgr", "FreezeMgr", "GameBackground", "GameChallenge", "GameMain", "GlassWallMgr", "HubMgr", "MagicDoorMgr", "MonsterMgr", "PlayerControler", "RIPMgr", "ScoreBuffMgr", "SlotMgr", "SloteList", "SlotoItem", "TrapMgr", "TurnDoorMgr", "WheelMgr", "ArmMonsterTile", "BaseTile", "BigFaceTile", "BoxTile", "CloudTile", "CoinTile", "DieWallTile", "DoorTile", "EntryTile", "ExitTile", "FlyMonsterTile", "FollowMonsterTile", "FreezeTile", "GlassWallTile", "HubTile", "MagicDoorTile", "PlayerTile", "RIPTile", "RunMonsterTile", "ScoreBuffTile", "SecretTile", "SlotTile", "SnakeMonsterTile", "SpringTile", "StarTile", "TrapTile", "TurnDoorTile", "WallTile", "WheelTile", "XPTile", "AchievementMgr", "AdHelper", "DataMgr", "GuideMgr", "PageMgr", "SoundMgr", "TaskMgr", "User", "Utils", "md5", "AchivementItem", "AchivementPage", "BuyCoinDialog", "BuyEnergyDialog", "FillEnergyDialog", "HomePage", "LevelUpDialog", "MapPage", "MaxLevelDialog", "NewSkinDialog", "NewWeaponDialog", "PauseDialog", "RankPage", "ReplayDialog", "ResultChallengePage", "ResultDefeatPage", "ResultPage", "ShopPage", "ShopQuickShowDialog", "SpinLotteryDialog", "TaskDialog", "TaskItem", "TopBar", "TrySkinDialog", "TryWeaponDialog", "ChristmasSkinDialog", "continueDialog", "MatchResult", "MatchStart", "ShareGame", "SharePraise", "ShareResult", "ShareVideo", "en" ]);