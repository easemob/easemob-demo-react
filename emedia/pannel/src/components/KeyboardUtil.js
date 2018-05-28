var _util = require('../../../webrtc/src/components/Util');
var _logger = _util.tagLogger("KeyboardUtil");


var Keysyms = require("./Keysyms");

var keysyms = new Keysyms();

function e(e) {
    var n = {
        536: 350,
        537: 351,
        538: 354,
        539: 355
    }[e];
    return n || e
}
function n(e, n) {
    var r = {};
    for (var o in n)
        parseInt(o) !== KEYS_M.M_Shift_L && (r[o] = n[o]);
    var l = 0;
    for (var s in n)
        r[s] && ++l;
    return t(e, r) ? l > e.length : l > 0
}
function t(e, n) {
    if (0 === e.length)
        return !1;
    for (var t = 0; t < e.length; ++t)
        if (!n[e[t]])
            return !1;
    return !0
}
function r(n) {
    var t;
    if (n.char && 1 === n.char.length ? t = n.char.charCodeAt(0) : n.charCode ? t = n.charCode : n.keyCode && "keypress" === n.type && (t = n.keyCode),
            t) {
        var r = keysyms.fromUnicode(e(t));
        if (r)
            return r
    }
    return n.keyCode || n.which ? keysyms.lookup(l(n)) : null
}
function l(e) {
    var n = e.shiftKey
        , t = e.keyCode || e.which;
    if ("number" != typeof t)
        return null;
    if (t >= 48 && t <= 57)
        return t;
    if (t >= 65 && t <= 90)
        return n ? t : t + 32;
    if (t >= 96 && t <= 105)
        return KEYS_M.M_KP_0 + (t - 96);
    switch (t) {
        case 32:
            return KEYS_M.M_space;
        case 106:
            return KEYS_M.M_KP_Multiply;
        case 107:
            return KEYS_M.M_KP_Add;
        case 108:
            return KEYS_M.M_KP_Separator;
        case 109:
            return KEYS_M.M_KP_Subtract;
        case 110:
            return KEYS_M.M_KP_Decimal;
        case 111:
            return KEYS_M.M_KP_Divide;
        case 43:
            return KEYS_M.M_plus;
        case 61:
            return "=" === e.key ? KEYS_M.M_equal : "+" === e.key ? KEYS_M.M_plus : KEYS_M.M_equal;
        case 187:
            return "=" === e.key ? KEYS_M.M_equal : "+" === e.key ? KEYS_M.M_plus : (e.ctrlKey || e.metaKey) && !1 === e.shiftKey ? KEYS_M.M_equal : KEYS_M.M_plus;
        case 188:
            return KEYS_M.M_comma;
        case 189:
            return KEYS_M.M_minus;
        case 190:
            return KEYS_M.M_period
    }
    return s({
        keyCode: t
    })
}
function s(e) {
    if (!e.keyCode)
        return null;
    var n = e.keyCode;
    if (n >= 112 && n <= 135)
        return KEYS_M.M_F1 + n - 112;
    switch (n) {
        case 8:
            return KEYS_M.M_BackSpace;
        case 13:
            return KEYS_M.M_Return;
        case 9:
            return KEYS_M.M_Tab;
        case 27:
            return KEYS_M.M_Escape;
        case 46:
            return KEYS_M.M_Delete;
        case 36:
            return KEYS_M.M_Home;
        case 35:
            return KEYS_M.M_End;
        case 33:
            return KEYS_M.M_Page_Up;
        case 34:
            return KEYS_M.M_Page_Down;
        case 45:
            return KEYS_M.M_Insert;
        case 37:
            return KEYS_M.M_Left;
        case 38:
            return KEYS_M.M_Up;
        case 39:
            return KEYS_M.M_Right;
        case 40:
            return KEYS_M.M_Down;
        case 16:
            return KEYS_M.M_Shift_L;
        case 17:
            return KEYS_M.M_Control_L;
        case 18:
            return KEYS_M.M_Alt_L;
        case 224:
            return KEYS_M.M_Meta_L;
        case 225:
            return KEYS_M.M_ISO_Level3_Shift;
        case 91:
            return KEYS_M.M_Super_L;
        case 92:
            return KEYS_M.M_Super_R;
        case 93:
            return KEYS_M.M_Menu;
        default:
            return null
    }
}

module.exports = _util.prototypeExtend({
    hasShortcutModifier: n,
    hasCharModifier: t,
    ModifierSync: function(e) {
        function l(e, n) {
            function t(e) {
                return {
                    keysym: keysyms.lookup(e),
                    type: a[e] ? "keydown" : "keyup"
                }
            }
            var r = [];
            return void 0 !== e.ctrlKey && e.ctrlKey !== a[KEYS_M.M_Control_L] && n !== KEYS_M.M_Control_L && (a[KEYS_M.M_Control_L] = e.ctrlKey,
                r.push(t(KEYS_M.M_Control_L))),
            void 0 !== e.altKey && e.altKey !== a[KEYS_M.M_Alt_L] && n !== KEYS_M.M_Alt_L && (a[KEYS_M.M_Alt_L] = e.altKey,
                r.push(t(KEYS_M.M_Alt_L))),
            void 0 !== e.altGraphKey && e.altGraphKey !== a[KEYS_M.M_ISO_Level3_Shift] && n !== KEYS_M.M_ISO_Level3_Shift && (a[KEYS_M.M_ISO_Level3_Shift] = e.altGraphKey,
                r.push(t(KEYS_M.M_ISO_Level3_Shift))),
            void 0 !== e.shiftKey && e.shiftKey !== a[KEYS_M.M_Shift_L] && n !== KEYS_M.M_Shift_L && (a[KEYS_M.M_Shift_L] = e.shiftKey,
                r.push(t(KEYS_M.M_Shift_L))),
            void 0 !== e.metaKey && e.metaKey !== a[KEYS_M.M_Meta_L] && n !== KEYS_M.M_Meta_L && (a[KEYS_M.M_Meta_L] = e.metaKey,
                r.push(t(KEYS_M.M_Meta_L))),
                r
        }
        function s(e, n) {
            var t = r(e)
                , i = t ? t.keysym : null;
            return null !== i && void 0 !== a[i] && (a[i] = n),
                l(e, i)
        }
        e || (e = navigator && /mac/i.exec(navigator.platform) ? [KEYS_M.M_Alt_L] : navigator && /win/i.exec(navigator.platform) ? [KEYS_M.M_Alt_L, KEYS_M.M_Control_L] : navigator && /linux/i.exec(navigator.platform) ? [KEYS_M.M_ISO_Level3_Shift] : []);
        var a = {};
        return a[KEYS_M.M_Control_L] = !1,
            a[KEYS_M.M_Alt_L] = !1,
            a[KEYS_M.M_ISO_Level3_Shift] = !1,
            a[KEYS_M.M_Shift_L] = !1,
            a[KEYS_M.M_Meta_L] = !1,
            {
                keydown: function(e) {
                    return s(e, !0)
                },
                keyup: function(e) {
                    return s(e, !1)
                },
                syncAny: function(e) {
                    return l(e)
                },
                hasShortcutModifier: function() {
                    return n(e, a)
                },
                activeCharModifier: function() {
                    return t(e, a) ? e : null
                }
            }
    },
    getKey: function(e) {
        return "keyCode"in e && "key"in e ? e.key + ":" + e.keyCode : "keyCode"in e ? e.keyCode : e.key
    },
    getKeysym: r,
    keysymFromEvent: l,
    nonCharacterKey: s,
    substituteCodepoint: e
});

var KEYS_M = {
    M_VoidSymbol: 16777215,
    M_BackSpace: 65288,
    M_Tab: 65289,
    M_Linefeed: 65290,
    M_Clear: 65291,
    M_Return: 65293,
    M_Pause: 65299,
    M_Scroll_Lock: 65300,
    M_Sys_Req: 65301,
    M_Escape: 65307,
    M_Delete: 65535,
    M_Home: 65360,
    M_Left: 65361,
    M_Up: 65362,
    M_Right: 65363,
    M_Down: 65364,
    M_Prior: 65365,
    M_Page_Up: 65365,
    M_Next: 65366,
    M_Page_Down: 65366,
    M_End: 65367,
    M_Begin: 65368,
    M_Select: 65376,
    M_Print: 65377,
    M_Execute: 65378,
    M_Insert: 65379,
    M_Undo: 65381,
    M_Redo: 65382,
    M_Menu: 65383,
    M_Find: 65384,
    M_Cancel: 65385,
    M_Help: 65386,
    M_Break: 65387,
    M_Mode_switch: 65406,
    M_script_switch: 65406,
    M_Num_Lock: 65407,
    M_KP_Space: 65408,
    M_KP_Tab: 65417,
    M_KP_Enter: 65421,
    M_KP_F1: 65425,
    M_KP_F2: 65426,
    M_KP_F3: 65427,
    M_KP_F4: 65428,
    M_KP_Home: 65429,
    M_KP_Left: 65430,
    M_KP_Up: 65431,
    M_KP_Right: 65432,
    M_KP_Down: 65433,
    M_KP_Prior: 65434,
    M_KP_Page_Up: 65434,
    M_KP_Next: 65435,
    M_KP_Page_Down: 65435,
    M_KP_End: 65436,
    M_KP_Begin: 65437,
    M_KP_Insert: 65438,
    M_KP_Delete: 65439,
    M_KP_Equal: 65469,
    M_KP_Multiply: 65450,
    M_KP_Add: 65451,
    M_KP_Separator: 65452,
    M_KP_Subtract: 65453,
    M_KP_Decimal: 65454,
    M_KP_Divide: 65455,
    M_KP_0: 65456,
    M_KP_1: 65457,
    M_KP_2: 65458,
    M_KP_3: 65459,
    M_KP_4: 65460,
    M_KP_5: 65461,
    M_KP_6: 65462,
    M_KP_7: 65463,
    M_KP_8: 65464,
    M_KP_9: 65465,
    M_F1: 65470,
    M_F2: 65471,
    M_F3: 65472,
    M_F4: 65473,
    M_F5: 65474,
    M_F6: 65475,
    M_F7: 65476,
    M_F8: 65477,
    M_F9: 65478,
    M_F10: 65479,
    M_F11: 65480,
    M_L1: 65480,
    M_F12: 65481,
    M_L2: 65481,
    M_F13: 65482,
    M_L3: 65482,
    M_F14: 65483,
    M_L4: 65483,
    M_F15: 65484,
    M_L5: 65484,
    M_F16: 65485,
    M_L6: 65485,
    M_F17: 65486,
    M_L7: 65486,
    M_F18: 65487,
    M_L8: 65487,
    M_F19: 65488,
    M_L9: 65488,
    M_F20: 65489,
    M_L10: 65489,
    M_F21: 65490,
    M_R1: 65490,
    M_F22: 65491,
    M_R2: 65491,
    M_F23: 65492,
    M_R3: 65492,
    M_F24: 65493,
    M_R4: 65493,
    M_F25: 65494,
    M_R5: 65494,
    M_F26: 65495,
    M_R6: 65495,
    M_F27: 65496,
    M_R7: 65496,
    M_F28: 65497,
    M_R8: 65497,
    M_F29: 65498,
    M_R9: 65498,
    M_F30: 65499,
    M_R10: 65499,
    M_F31: 65500,
    M_R11: 65500,
    M_F32: 65501,
    M_R12: 65501,
    M_F33: 65502,
    M_R13: 65502,
    M_F34: 65503,
    M_R14: 65503,
    M_F35: 65504,
    M_R15: 65504,
    M_Shift_L: 65505,
    M_Shift_R: 65506,
    M_Control_L: 65507,
    M_Control_R: 65508,
    M_Caps_Lock: 65509,
    M_Shift_Lock: 65510,
    M_Meta_L: 65511,
    M_Meta_R: 65512,
    M_Alt_L: 65513,
    M_Alt_R: 65514,
    M_Super_L: 65515,
    M_Super_R: 65516,
    M_Hyper_L: 65517,
    M_Hyper_R: 65518,
    M_ISO_Level3_Shift: 65027,
    M_space: 32,
    M_exclam: 33,
    M_quotedbl: 34,
    M_numbersign: 35,
    M_dollar: 36,
    M_percent: 37,
    M_ampersand: 38,
    M_apostrophe: 39,
    M_quoteright: 39,
    M_parenleft: 40,
    M_parenright: 41,
    M_asterisk: 42,
    M_plus: 43,
    M_comma: 44,
    M_minus: 45,
    M_period: 46,
    M_slash: 47,
    M_0: 48,
    M_1: 49,
    M_2: 50,
    M_3: 51,
    M_4: 52,
    M_5: 53,
    M_6: 54,
    M_7: 55,
    M_8: 56,
    M_9: 57,
    M_colon: 58,
    M_semicolon: 59,
    M_less: 60,
    M_equal: 61,
    M_greater: 62,
    M_question: 63,
    M_at: 64,
    M_A: 65,
    M_B: 66,
    M_C: 67,
    M_D: 68,
    M_E: 69,
    M_F: 70,
    M_G: 71,
    M_H: 72,
    M_I: 73,
    M_J: 74,
    M_K: 75,
    M_L: 76,
    M_M: 77,
    M_N: 78,
    M_O: 79,
    M_P: 80,
    M_Q: 81,
    M_R: 82,
    M_S: 83,
    M_T: 84,
    M_U: 85,
    M_V: 86,
    M_W: 87,
    M_X: 88,
    M_Y: 89,
    M_Z: 90,
    M_bracketleft: 91,
    M_backslash: 92,
    M_bracketright: 93,
    M_asciicircum: 94,
    M_underscore: 95,
    M_grave: 96,
    M_quoteleft: 96,
    M_a: 97,
    M_b: 98,
    M_c: 99,
    M_d: 100,
    M_e: 101,
    M_f: 102,
    M_g: 103,
    M_h: 104,
    M_i: 105,
    M_j: 106,
    M_k: 107,
    M_l: 108,
    M_m: 109,
    M_n: 110,
    M_o: 111,
    M_p: 112,
    M_q: 113,
    M_r: 114,
    M_s: 115,
    M_t: 116,
    M_u: 117,
    M_v: 118,
    M_w: 119,
    M_x: 120,
    M_y: 121,
    M_z: 122,
    M_braceleft: 123,
    M_bar: 124,
    M_braceright: 125,
    M_asciitilde: 126,
    M_nobreakspace: 160,
    M_exclamdown: 161,
    M_cent: 162,
    M_sterling: 163,
    M_currency: 164,
    M_yen: 165,
    M_brokenbar: 166,
    M_section: 167,
    M_diaeresis: 168,
    M_copyright: 169,
    M_ordfeminine: 170,
    M_guillemotleft: 171,
    M_notsign: 172,
    M_hyphen: 173,
    M_registered: 174,
    M_macron: 175,
    M_degree: 176,
    M_plusminus: 177,
    M_twosuperior: 178,
    M_threesuperior: 179,
    M_acute: 180,
    M_mu: 181,
    M_paragraph: 182,
    M_periodcentered: 183,
    M_cedilla: 184,
    M_onesuperior: 185,
    M_masculine: 186,
    M_guillemotright: 187,
    M_onequarter: 188,
    M_onehalf: 189,
    M_threequarters: 190,
    M_questiondown: 191,
    M_Agrave: 192,
    M_Aacute: 193,
    M_Acircumflex: 194,
    M_Atilde: 195,
    M_Adiaeresis: 196,
    M_Aring: 197,
    M_AE: 198,
    M_Ccedilla: 199,
    M_Egrave: 200,
    M_Eacute: 201,
    M_Ecircumflex: 202,
    M_Ediaeresis: 203,
    M_Igrave: 204,
    M_Iacute: 205,
    M_Icircumflex: 206,
    M_Idiaeresis: 207,
    M_ETH: 208,
    M_Eth: 208,
    M_Ntilde: 209,
    M_Ograve: 210,
    M_Oacute: 211,
    M_Ocircumflex: 212,
    M_Otilde: 213,
    M_Odiaeresis: 214,
    M_multiply: 215,
    M_Oslash: 216,
    M_Ooblique: 216,
    M_Ugrave: 217,
    M_Uacute: 218,
    M_Ucircumflex: 219,
    M_Udiaeresis: 220,
    M_Yacute: 221,
    M_THORN: 222,
    M_Thorn: 222,
    M_ssharp: 223,
    M_agrave: 224,
    M_aacute: 225,
    M_acircumflex: 226,
    M_atilde: 227,
    M_adiaeresis: 228,
    M_aring: 229,
    M_ae: 230,
    M_ccedilla: 231,
    M_egrave: 232,
    M_eacute: 233,
    M_ecircumflex: 234,
    M_ediaeresis: 235,
    M_igrave: 236,
    M_iacute: 237,
    M_icircumflex: 238,
    M_idiaeresis: 239,
    M_eth: 240,
    M_ntilde: 241,
    M_ograve: 242,
    M_oacute: 243,
    M_ocircumflex: 244,
    M_otilde: 245,
    M_odiaeresis: 246,
    M_division: 247,
    M_oslash: 248,
    M_ooblique: 248,
    M_ugrave: 249,
    M_uacute: 250,
    M_ucircumflex: 251,
    M_udiaeresis: 252,
    M_yacute: 253,
    M_thorn: 254,
    M_ydiaeresis: 255
};