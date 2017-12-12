
'use strict';

/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
let delayPromise = seconds => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            if (false) return reject(new Error("DEFINITELY WON'T EVER BE REJECTED"));
            resolve();
        }, seconds * 1000);
    });
};

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    const url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    return new Promise((resolve, reject) => {
        if (false) return reject(new Error("DEFINITELY WON'T EVER BE REJECTED"));
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.send();
        xhr.addEventListener('load', () => {
            let gotArr = JSON.parse(xhr.responseText);

            // ===============  ??????? почему так не сортирует ??????
            // gotArr.sort((a, b) => a.name > b.name);
            // ===============  ??????? почему так не сортирует ??????

            // let arr2 = [];

            let arr2 = gotArr.map(obj => obj.name);
            // gotArr.forEach(obj => arr2.push(obj.name));

            // for (let obj of gotArr) {
            //     arr2.push(obj.name);
            // }

            // for (let i = 0; i < gotArr.length; i++) {
            //     arr2.push(gotArr[i].name);
            // }
            let arr3 = arr2.sort();
            // let finalArr = [];

            let finalArr = arr3.map(elem => ({ name: elem }));

            // arr3.forEach(elem => finalArr.push({ name: elem }));

            // for (let elem of arr3) {
            //     finalArr.push({ name: elem });
            // }

            // for (let k = 0; k < arr3.length; k++) {
            //     finalArr.push({ name: arr3[k] });
            // }

            resolve(finalArr);
        });
    });
}
loadAndSortTowns();

export {
    delayPromise,
    loadAndSortTowns
};
