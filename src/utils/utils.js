import { days as daysModel } from "../firebase/common/models";

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

export const findIndexOfObjectByValueInArray = (array, attr, value) => {
    for (let x = 0; x < array.length; x++) {
        if (array[x][attr] === value) {
            return x;
        }
    }
    return -1;
};

export const getCurrentDay = () => {
    const days = daysModel;
    const today = new Date();
    const dayNumber =
        today.getDay() > 0 && today.getDay() < 6 ? today.getDay() - 1 : 1;
    return days[dayNumber];
};
