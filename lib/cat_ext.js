_.map = function(array, callbackFn) {
    if (!array) return;
    const isArray = Array.isArray(array);
    if (isArray) {
        return array.map((index, item) => {
            return callbackFn(index, item);
        });
    } else {
        const newArray = [];
        const targetLength = array.length;
        for (let index = 0; index < targetLength; index++) {
            const item = array[index];
            const result = callbackFn(item, index);
            newArray.push(result);
        }
        return newArray;
    }
};
_.each = function(array, callbackFn) {
    if (!array) return;
    const isArray = Array.isArray(array);
    if (isArray) {
        return array.forEach((item, index) => {
            callbackFn(item, index);
        });
    } else {
        const targetLength = array.length;
        for (let index = 0; index < targetLength; index++) {
            const item = array[index];
            callbackFn(item, index);
        }
        return array;
    }
};
_.sortBy = function(array, callbackFn) {
    return array.sort(callbackFn);
};
_.keys = function(object) {
    if (!object) return;
    return Object.keys(object);
};
_.values = function(object) {
    if (!object) return;
    return Object.values(object);
};
_.entries = function(object) {
    if (!object) return;
    return Object.entries(object);
};
_.merge = function(object1, object2) {
    return Object.assign(object1, object2);
};
_.isEmpty = function(object) {
    return !object ? true : object.length == undefined || object.length == 0;
};
_.random = function(begin, end) {
    if (end < begin) end = begin;
    return begin + Math.floor(Math.random() * (end - begin));
};
const utf8 = {
    encode: function(str) {
        const encode = new TextEncoder('utf-8');
        const uint8Array = encode.encode(str);
        return uint8Array.buffer;
    },
    decode: function(data) {
        const view = new Uint8Array(data);
        const encode = new TextDecoder('utf-8');
        const str = encode.decode(view);
        return str;
    }
};
const gbk = {
    encode: function(str) {
        const encode = new TextEncoder('gbk');
        const uint8Array = encode.encode(str);
        return uint8Array.buffer;
    },
    decode: function(data) {
        const view = new Uint8Array(data);
        const encode = new TextDecoder('gbk');
        const str = encode.decode(view);
        return str;
    }
};
const local = {
    get: async function(siteKey, key) {
        return localStorage.getItem(siteKey + '_' + key);
    },
    set: async function(siteKey, key, value) {
        return localStorage.setItem(siteKey + '_' + key, value);
    },
    remove: async function(siteKey, key) {
        return localStorage.removeItem(siteKey + '_' + key);
    },
};
function _randStr(len, withNum) {
    var _str = '';
    let containsNum = withNum === undefined ? true : withNum;
    for (var i = 0; i < len; i++) {
        let idx = _.random(0, containsNum ? charStr.length - 1 : charStr.length - 11);
        _str += charStr[idx];
    }
    return _str;
}
async function js2Proxy(dynamic, siteType, site, url, headers) {
    let hd = Object.keys(headers).length == 0 ? '_' : encodeURIComponent(JSON.stringify(headers));
    return (dynamic ? 'js2p://_WEB_/' : 'http://127.0.0.1:13333/jp/') + _randStr(6) + '/' + siteType + '/' + site + '/' + hd + '/' + encodeURIComponent(url);
}
function md5X(str) {
    return Crypto.MD5(str).toString();
}

function bodyStringify(data) {
    const keys = Object.keys(data);
    const pairs = keys.map((key) => {
        return key + '=' + data[key];
    });
    return pairs.join('&');
}

async function req(url, opt) {
    try {
        var data = opt ? opt.data || null : null;
        var postType = opt ? opt.postType || null : null;
        var returnBuffer = opt ? opt.buffer || 0 : 0;
        var timeout = opt ? opt.timeout || 5000 : 5000;
        var redirect = (opt ? opt.redirect || 1 : 1) == 1;

        var headers = opt ? opt.headers || {} : {};
        if (postType == 'form') {
            headers['Content-Type'] = 'application/x-www-form-urlencoded';

            if (data != null) {
                data = bodyStringify(data);
            }
        } else if (postType == 'form-data') {
            headers['Content-Type'] = 'multipart/form-data';
            data = toFormData(data);
        }
        let respType = returnBuffer == 1 || returnBuffer == 2 ? 'arraybuffer' : undefined;
        var resp = await axios(url, {
            responseType: respType,
            method: opt ? opt.method || 'get' : 'get',
            headers: headers,
            data: data,
            timeout: timeout,
            maxRedirects: !redirect ? 0 : null,
            // httpsAgent: https.Agent({
            //     rejectUnauthorized: false,
            // }),
        });
        var data = resp.data;

        var resHeader = {};
        for (const hks of resp.headers) {
            var v = hks[1];
            resHeader[hks[0]] = Array.isArray(v) ? (v.length == 1 ? v[0] : v) : v;
        }

        if (!returnBuffer) {
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }
        } else if (returnBuffer == 1) {
            return { code: resp.status, headers: resHeader, content: data };
        } else if (returnBuffer == 2) {
            return { code: resp.status, headers: resHeader, content: data.toString('base64') };
        } else if (returnBuffer == 3) {
            var stream = opt.stream;
            if (stream['onResp']) await stream['onResp']({ code: resp.status, headers: resHeader });
            if (stream['onData']) {
                data.on('data', async (data) => {
                    await stream['onData'](data);
                });
                data.on('end', async () => {
                    if (stream['onDone']) await stream['onDone']();
                });
            } else {
                if (stream['onDone']) await stream['onDone']();
            }
            return 'stream...';
        }
        return { code: resp.status, headers: resHeader, content: data };
    } catch (error) {
        console.error(error);
    }
    return { headers: {}, content: '' };
}

// async function req(reqUrl, params) {
//     const options = params;
//     if (params) {
//         const redirect = params.redirect;
//         if (redirect == 0) {
//             options.redirect = 'manual';
//         } else {
//             options.redirect = 'follow';
//         }
//     }
//     if (params && params.data) {
//         if (params.postType == 'form') {
//             const formData = new FormData();
//             Object.keys(params.data).map((key) => {
//               formData.append(key, params.data[key]);
//             });
//             options.body = formData;
//             options.data = undefined;
//         } else if (typeof(params.data) != 'string') {
//             const type = params.headers['Content-Type'];
//             if (type && type.includes('/json')) {
//                 options.body = JSON.stringify(params.data);
//             }
//             options.data = undefined;
//         } else {
//             options.body = params.data;
//             options.data = undefined;
//         }
//     }
//     options.mode = 'cors';
//     const request = new Request(reqUrl, options);
//     return new Promise((resolve, reject) => {
//         fetch(request)
//             .then((response) => {
//                 return getResponseText(response);
//             })
//             .then((data) => {
//                 resolve(data);
//             })
//             .catch((error) => {
//                 reject(error);
//             })
//     });
// }

// async function getResponseText(response) {
//     const respText = await response.text();
//     let headers = {};
//     response.headers.forEach((value, key)=> {
//         headers[key] = value;
//     });
//     let setCookie = response.headers.getSetCookie();
//     if (setCookie.length > 0) {
//         headers['set-cookie'] = setCookie;
//     }
//     return new Promise((resolve, reject) => {
//         resolve({
//             content: respText,
//             headers: headers,
//         })
//     });
// }