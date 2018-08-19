export const updateObject = (oldObject, updatedProperties) => ({
    ...oldObject,
    ...updatedProperties
});

export const objectToArray = obj => {
    return obj ? Object.keys(obj).map(i => obj[i]) : null;
};

export const objectWithKeysToArray = obj => {
    return obj ? Object.keys(obj).map(i => [i, obj[i]]) : null;
};
