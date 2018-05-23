var _util = require('../../../webrtc/src/components/Util');
var _logger = _util.tagLogger("KeyEventDecoder");

var Keysyms = require("./Keysyms");
var KeyboardUtil = require("./KeyboardUtil");

var keysyms = new Keysyms();
var keyboardUtil = new KeyboardUtil();
var modifierSync = keyboardUtil.ModifierSync();


module.exports = _util.prototypeExtend({
    //modifierSync:
    //verifyCharModifier:
    __init__: function () {
        this.verifyCharModifier = this.VerifyCharModifier(this.TrackKeyState(this.EscapeModifiers(this.onKey)));
    },

    decoder: function(e, n) {
        e = this.modifierSync;
        n = this.verifyCharModifier;
        var l = this.keyboardUtil;

        function t(e) {
            for (var t = 0; t < e.length; ++t)
                n(e[t])
        }
        function r(t, r) {
            var i = {
                type: r
            }
                , o = l.getKey(t);
            o && (i.keyId = o);
            var s = l.getKeysym(t)
                , a = e.hasShortcutModifier() || !!e.activeCharModifier();
            s && ("keydown" !== r || l.nonCharacterKey(t) || a) && (i.keysym = s);
            var u = !(16 === t.keyCode || "Shift" === t.key) && ("keydown" !== r || e.hasShortcutModifier() || !!l.nonCharacterKey(t))
                , c = "keydown" === r && e.activeCharModifier() && !l.nonCharacterKey(t)
                , d = e.activeCharModifier();
            if (d && s) {
                for (var f = !1, p = 0; p < d.length; ++p)
                    d[p] === s.keysym && (f = !0);
                "keypress" !== r || f || (i.escape = e.activeCharModifier())
            }
            return c && n({
                type: "stall"
            }),
                n(i),
                u
        }
        return {
            keydown: function(n) {
                return t(e.keydown(n)),
                    r(n, "keydown")
            },
            keypress: function(e) {
                return r(e, "keypress")
            },
            keyup: function(n) {
                return t(e.keyup(n)),
                    r(n, "keyup")
            },
            syncModifiers: function(n) {
                t(e.syncAny(n))
            },
            releaseAll: function() {
                n({
                    type: "releaseall"
                })
            }
        }
    },


    VerifyCharModifier: function(e) {
        function n() {
            if (!r)
                for (var i = function() {
                    clearTimeout(r),
                        r = null,
                        n()
                }; 0 !== t.length; ) {
                    var o = t[0];
                    switch (t = t.splice(1),
                        o.type) {
                        case "stall":
                            return void (r = setTimeout(i, 5));
                        case "keydown":
                            0 !== t.length && "keypress" === t[0].type && (!t[0].escape || o.keysym && o.keysym.keysym === t[0].keysym.keysym || (o.escape = t[0].escape),
                                o.keysym = t[0].keysym,
                                t = t.splice(1))
                    }
                    "stall" !== o.type && e(o)
                }
        }
        var t = []
            , r = null;
        return function(e) {
            t.push(e),
                n()
        }
    },
    TrackKeyState: function(e) {
        var n = [];
        return function(t) {
            var r = 0 !== n.length ? n[n.length - 1] : null;
            switch (t.type) {
                case "keydown":
                    r && t.keyId && r.keyId === t.keyId || (r = {
                        keyId: t.keyId,
                        keysyms: {}
                    },
                        n.push(r)),
                    t.keysym && (r.keysyms[t.keysym.keysym] = t.keysym,
                        r.ignoreKeyPress = !0,
                        e(t));
                    break;
                case "keypress":
                    r || (r = {
                        keyId: t.keyId,
                        keysyms: {}
                    },
                        n.push(r)),
                    t.keysym || console.log("keypress with no keysym:", t),
                    t.keysym && !r.ignoreKeyPress && (r.keysyms[t.keysym.keysym] = t.keysym,
                        t.type = "keydown",
                        e(t));
                    break;
                case "keyup":
                    if (0 === n.length)
                        return;
                    for (var i = null, o = 0; o !== n.length; ++o)
                        if (n[o].keyId === t.keyId) {
                            i = o;
                            break
                        }
                    null === i && (i = n.length - 1);
                    var l = n.splice(i, 1)[0]
                        , s = function() {
                        function e() {}
                        return function(n) {
                            return e.prototype = n,
                                new e
                        }
                    }();
                    for (var a in l.keysyms) {
                        var u = s(t);
                        u.keysym = l.keysyms[a],
                            e(u)
                    }
                    break;
                case "releaseall":
                    for (o = 0; o < n.length; ++o)
                        for (var a in n[o].keysyms) {
                            var c = n[o].keysyms[a];
                            e({
                                keyId: 0,
                                keysym: c,
                                type: "keyup"
                            })
                        }
                    n = []
            }
        }
    },

    EscapeModifiers: function(e) {
        return function(n) {
            if ("keydown" === n.type && void 0 !== n.escape) {
                for (t = 0; t < n.escape.length; ++t)
                    e({
                        type: "keyup",
                        keyId: 0,
                        keysym: keysyms.lookup(n.escape[t])
                    });
                e(n);
                for (var t = 0; t < n.escape.length; ++t)
                    e({
                        type: "keydown",
                        keyId: 0,
                        keysym: keysyms.lookup(n.escape[t])
                    })
            } else
                e(n)
        }
    }
});