export const updateObject = (oldObject, updatedProperties) => ({
    ...oldObject,
    ...updatedProperties
});

export const objectToArray = obj => {
    return obj ? Object.keys(obj).map(i => obj[i]) : null;
};

export const objectToArrayWithKey = obj => {
    return obj
        ? Object.keys(obj).map(i => {
              return { ...obj[i], key: i };
          })
        : null;
};

export const objectWithKeysToArray = obj => {
    return obj ? Object.keys(obj).map(i => [i, obj[i]]) : null;
};

export const getArrayWithoutItem = (array, itemToRemove) => {
    let newArray = [];
    for (let item of array) {
        if (item !== itemToRemove) {
            newArray.push(item);
        }
    }
    return newArray;
};

export const removeAttributesFromObject = (object, keys) => {
    const newObject = {};
    Object.keys(object).map(key => {
        if (keys.indexOf(key) === -1) {
            newObject[key] = { ...object[key] };
        }
        return null;
    });
    return newObject;
};
