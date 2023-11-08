Object.defineProperty(HTMLElement.prototype, 'attribs', {
    configurable: true,
    enumerable: true,
    'get': function() {
        const attribs = {};
        const attribCount = this.attributes.length;
        for (let index = 0; index < attribCount; index++) {
            const item = this.attributes.item(index);
            attribs[item.nodeName] = item.value;
        }
        return attribs;
    },
    'set': function(value) {
    },
});
Object.defineProperty(HTMLElement.prototype, 'children', {
    configurable: true,
    enumerable: true,
    'get': function() {
        return this.childNodes;
    },
    'set': function(value) {
    },
});
const _ = {
    map: function(array, callbackFn) {
        const isArray = Array.isArray(array);
        const mapResult = array.map((index, item) => {
            if (isArray) {
                return callbackFn(index, item);
            }
            return callbackFn(item, index);
        });
        if (!isArray) {
            if (mapResult['prevObject']) {
                delete mapResult.prevObject;
            }
            if (mapResult['length']) {
                delete mapResult.length;
            }
        }
        return mapResult;
    },
    each: function(array, callbackFn) {
        return array.each((index, item) => {
            callbackFn(item, index);
        });
    },
    keys: function(object) {
        return Object.keys(object);
    },
    values: function(object) {
        return Object.values(object);
    },
};
function load(html) {
    const domItems = $.parseHTML(html);
    const $loadContailed = $('#load_container');
    $loadContailed.empty();
    for (const domItem of domItems) {
        $loadContailed.append(domItem);
    }
    return $loadContailed;
}
async function req(reqUrl, params) {
    if (!params) {
        params = {};
    }
    if (params.headers['User-Agent']) {
        params.headers['User-Agent'] = undefined;
    }
    if (params.headers['Referer']) {
        params.headers['Referer'] = undefined;
    }
    return new Promise((resolve, reject) => {
        $.ajax({
            method: params.method | 'get',
            url: reqUrl,
            headers: params.headers,
            data: params.data,
            success: (data) => {
                resolve({
                    content: data,
                });
            },
            error: (exception) => {
                reject(exception);
            },
       });
    });
}