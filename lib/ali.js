function _0x4aa5(_0x48caa3, _0x315644) {
    const _0x2164f9 = _0x574f();
    return _0x4aa5 = function(_0x5e2b05, _0x179281) {
        _0x5e2b05 = _0x5e2b05 - 0x164;
        let _0x164327 = _0x2164f9[_0x5e2b05];
        return _0x164327;
    },
    _0x4aa5(_0x48caa3, _0x315644);
} (function(_0x5f4666, _0x55a733) {
    const _0x4589e5 = _0x4aa5,
    _0xd355a0 = _0x5f4666();
    while ( !! []) {
        try {
            const _0x1e1fc1 = -parseInt(_0x4589e5(0x174)) / 0x1 + -parseInt(_0x4589e5(0x168)) / 0x2 + -parseInt(_0x4589e5(0x167)) / 0x3 + parseInt(_0x4589e5(0x17e)) / 0x4 * (parseInt(_0x4589e5(0x17b)) / 0x5) + parseInt(_0x4589e5(0x164)) / 0x6 + parseInt(_0x4589e5(0x16c)) / 0x7 + parseInt(_0x4589e5(0x181)) / 0x8 * ( - parseInt(_0x4589e5(0x177)) / 0x9);
            if (_0x1e1fc1 === _0x55a733) break;
            else _0xd355a0['push'](_0xd355a0['shift']());
        } catch(_0x265350) {
            _0xd355a0['push'](_0xd355a0['shift']());
        }
    }
} (_0x574f, 0x20821));
const _0x179281 = (function() {
    let _0x4eda66 = !![];
    return function(_0x55af6d, _0x22e5f4) {
        const _0x4a4b00 = _0x4eda66 ?
        function() {
            const _0x5ab790 = _0x4aa5;
            if (_0x22e5f4) {
                const _0x1659b9 = _0x22e5f4[_0x5ab790(0x169)](_0x55af6d, arguments);
                return _0x22e5f4 = null,
                _0x1659b9;
            }
        }: function() {};
        return _0x4eda66 = ![],
        _0x4a4b00;
    };
} ()),
_0x5e2b05 = _0x179281(this,
function() {
    const _0x11faca = _0x4aa5;
    let _0x2fa19b;
    try {
        const _0x3ff2b9 = Function('return\x20(fu' + 'nction()\x20' + (_0x11faca(0x16a) + _0x11faca(0x176) + _0x11faca(0x17a) + '\x20)') + ');');
        _0x2fa19b = _0x3ff2b9();
    } catch(_0x25b157) {
        _0x2fa19b = window;
    }
    const _0x3c5f06 = _0x2fa19b['console'] = _0x2fa19b['console'] || {},
    _0x39a2bd = [_0x11faca(0x16e), _0x11faca(0x17d), 'info', 'error', _0x11faca(0x17f), _0x11faca(0x183), 'trace'];
    for (let _0x3fb5be = 0x0; _0x3fb5be < _0x39a2bd[_0x11faca(0x173)]; _0x3fb5be++) {
        const _0x47f835 = _0x179281[_0x11faca(0x16f) + 'r'][_0x11faca(0x165)][_0x11faca(0x175)](_0x179281),
        _0xdc762c = _0x39a2bd[_0x3fb5be],
        _0x525bd5 = _0x3c5f06[_0xdc762c] || _0x47f835;
        _0x47f835['__proto__'] = _0x179281['bind'](_0x179281),
        _0x47f835[_0x11faca(0x172)] = _0x525bd5[_0x11faca(0x172)]['bind'](_0x525bd5),
        _0x3c5f06[_0xdc762c] = _0x47f835;
    }
});
_0x5e2b05();
// import {
//     _
// }
// from 'assets://js/lib/cat.js';
// import {
//     initSome,
//     setToken,
//     getVod,
//     playerContent,
//     playerContentByFlag
// }
// from './ali_api.js';
const aliPattern = /(www.aliyundrive.com|www.alipan.com)\/s\/([^\/]+)(\/folder\/([^\/]+))?/;
async function initAli(_0x413000) {
    await initSome(),
    setToken(_0x413000);
}
async function detailContent(_0x4bc326) {
    const _0x1a33eb = _0x4aa5;
    let _0x54bbc1 = _0x4bc326['match'](aliPattern),
    _0x7888de = await parseVod(_0x54bbc1, _0x4bc326);
    const _0x9e9dd1 = {};
    _0x9e9dd1[_0x1a33eb(0x178)] = [_0x7888de];
    let _0x197b45 = JSON['stringify'](_0x9e9dd1);
    return _0x197b45;
}
async function parseVod(_0x10689f, _0x1108c0) {
    if (_['isEmpty'](_0x10689f)) return {};
    let _0x474eae = _0x10689f[0x2],
    _0x36fe63 = _0x10689f['length'] > 0x4 ? _0x10689f[0x4] : '';
    return await getVod(_0x474eae, _0x1108c0, _0x36fe63);
}
async function playContent(_0x52c526, _0x421b73, _0x4f10f8) {
    const _0x3b573d = _0x4aa5;
    let _0x4fe837 = _0x421b73['split']('+');
    _0x52c526 = _0x52c526['split']('#')[0x0];
    let _0x2e68e0 = _0x52c526 == '原画' ? await playerContent(_0x4fe837) : await playerContentByFlag(_0x4fe837, _0x52c526);
    return console[_0x3b573d(0x186)](_0x3b573d(0x16b) + _0x3b573d(0x17c) + _0x3b573d(0x185)),
    console[_0x3b573d(0x186)](_0x2e68e0),
    _0x2e68e0;
}
function _0x574f() {
    const _0x44da7e = ['prototype', 'isEmpty', '374088ntufPj', '121556CEjSKd', 'apply', '{}.constru', '-----playC', '1731275IhHZho', 'vod_play_u', 'log', 'constructo', 'match', '普画#', 'toString', 'length', '125186RUUvVq', 'bind', 'ctor(\x22retu', '3744KZBwKz', 'list', '原画#', 'rn\x20this\x22)(', '577405PyhvtD', 'ontent----', 'warn', '4TSKBsq', 'exception', 'push', '2832JFmsUo', 'join', 'table', '$$$', '---', 'debug', '1369626tULFbE'];
    _0x574f = function() {
        return _0x44da7e;
    };
    return _0x574f();
}
function detailContentVodPlayFrom(_0xbe55e7) {
    const _0x3fa4bc = _0x4aa5;
    let _0x305855 = [];
    if (_0xbe55e7[_0x3fa4bc(0x173)] < 0x2) return ['原画', '普画'][_0x3fa4bc(0x182)](_0x3fa4bc(0x184));
    for (let _0x241caf = 0x1; _0x241caf <= _0xbe55e7[_0x3fa4bc(0x173)]; _0x241caf++) {
        _0x305855['push'](_0x3fa4bc(0x179) + _0x241caf),
        _0x305855[_0x3fa4bc(0x180)](_0x3fa4bc(0x171) + _0x241caf);
    }
    return _0x305855[_0x3fa4bc(0x182)](_0x3fa4bc(0x184));
}
async function detailContentVodPlayUrl(_0x2b2389) {
    const _0x3ba1ef = _0x4aa5;
    let _0x2f0a10 = [];
    for (var _0x954556 of _0x2b2389) {
        let _0x5a95a4 = _0x954556[_0x3ba1ef(0x170)](aliPattern);
        if (!_[_0x3ba1ef(0x166)](_0x5a95a4)) {
            let _0x139a04 = await parseVod(_0x5a95a4, _0x954556);
            _0x2f0a10['push'](_0x139a04[_0x3ba1ef(0x16d) + 'rl']);
        }
    }
    return _0x2f0a10[_0x3ba1ef(0x182)](_0x3ba1ef(0x184));
}
// export {
//     initAli,
//     detailContent,
//     playContent,
//     detailContentVodPlayFrom,
//     detailContentVodPlayUrl,
//     aliPattern
// };