_.map = function(array, callbackFn) {
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
    return array.each((index, item) => {
        callbackFn(item, index);
    });
};
_.keys = function(object) {
    return Object.keys(object);
};
_.values = function(object) {
    return Object.values(object);
};

async function req(reqUrl, params) {
    const options = params;
    if (params) {
        options.body = params.data;
    }
    const request = new Request(reqUrl, options);
    return new Promise((resolve, reject) => {
        fetch(request)
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                resolve({
                    content: data,
                });
            })
            .catch((error) => {
                reject(error);
            })
    });
}