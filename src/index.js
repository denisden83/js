'use strict';

/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */

function map(array, fn) {
    let newArr = [];

    for (let i = 0; i < array.length; i++) {
        newArr.push(fn(array[i], i, array));
        // newArr[i] = fn(array[i], i, array);
    }

    return newArr;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    let previousValue;

    if (initial !== undefined) {

        previousValue = initial;
        for (let i = 0; i < array.length; i++) {
            previousValue = fn(previousValue, array[i], i, array);
        }

    } else {

        previousValue = array[0];
        for (let i = 1; i < array.length; i++) {
            previousValue = fn(previousValue, array[i], i, array)
        }

    }

    return previousValue;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    // return obj.hasOwnProperty(prop);
    return prop in obj;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {

    return Object.keys(obj);
    // let newArr = [];
    //
    // for (let key in obj) {
    //     // if (!obj.hasOwnProperty(key)) {
    //     //     continue;
    //     // }
    //     newArr.push(key);
    // }
    //
    // return newArr;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {

    return Object.keys(obj).map(key => key.toUpperCase());
    // let newArr = [];
    //
    // for (let key in obj) {
    //     // if (!obj.hasOwnProperty(key)) {
    //     //     continue;
    //     // }
    //     newArr.push(key.toUpperCase());
    // }
    //
    // return newArr;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from = 0, to = array.length) {
    let newArr = [];

    from = from < 0 ? from + array.length : from;
    from = from < 0 ? 0 : from;
    to = to > array.length ? array.length : to;
    to = to < 0 ? to + array.length : to;
    for (let i = from; i < to; i++) {
        newArr.push(array[i]);
    }

    return newArr;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = Math.pow(value, 2);

            return true;
        }
    });
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
