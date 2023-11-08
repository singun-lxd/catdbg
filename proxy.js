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
            mapResult['prevObject'] = undefined;
            mapResult['length'] = undefined;
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

function load(html, keepScripts = false) {
    const domItems = $.parseHTML(html, null, keepScripts);
    const $loadContailed = $('#load_container');
    $loadContailed.empty();
    for (const domItem of domItems) {
        if (!_handleDomItem(domItem)) {
            continue;
        }
        $loadContailed.append(domItem);
    }
    return $loadContailed;
}

function _handleDomItem(domItem) {
    if (domItem.localName == 'title') {
        return false;
    }
    if (domItem.localName == 'link' && 
        domItem.attributes.type && domItem.attributes.type.value == 'text/css') {
        return false;
    }
    if (domItem.localName == 'script' && domItem.attributes.src) {
        return false;
    }
    return true;
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
                if (typeof(data) != 'string') {
                    data = JSON.stringify(data);
                }
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