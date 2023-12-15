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
_.keys = function(object) {
    if (!object) return;
    return Object.keys(object);
};
_.values = function(object) {
    if (!object) return;
    return Object.values(object);
};
_.isEmpty = function(object) {
    return !object ? true : object.length == 0;
};

async function req(reqUrl, params) {
    const options = params;
    if (params) {
        const redirect = params.redirect;
        if (redirect == 0) {
            options.redirect = 'manual';
        } else {
            options.redirect = 'follow';
        }
    }
    if (params && params.data) {
        if (params.postType == 'form') {
            const formData = new FormData();
            Object.keys(params.data).map((key) => {
              formData.append(key, params.data[key]);
            });
            options.body = formData;
            options.data = undefined;
        } else {
            options.body = params.data;
            options.data = undefined;
        }
    }
    options.mode = 'cors';
    const request = new Request(reqUrl, options);
    return new Promise((resolve, reject) => {
        fetch(request)
            .then((response) => {
                return getResponseText(response);
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

async function getResponseText(response) {
    const respText = await response.text();
    let headers = {};
    response.headers.forEach((value, key)=> {
        headers[key] = value;
    });
    let setCookie = response.headers.getSetCookie();
    if (setCookie.length > 0) {
        headers['set-cookie'] = setCookie;
    }
    return new Promise((resolve, reject) => {
        resolve({
            content: respText,
            headers: headers,
        })
    });
}