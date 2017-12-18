
'use strict';

// import { loadAndSortTowns } from './index.js';

/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    // return loadAndSortTowns();
    // return require('./index.js').loadAndSortTowns();
    const url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.send();
        xhr.addEventListener('load', () => {
            if (xhr.status !== 200) return reject(new Error('Не удалось загрузить города'));
            resolve(JSON.parse(xhr.responseText).sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;

                return 0;
            }));
        });
    });
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let errorBlock = homeworkContainer.querySelector('#error-block');
let errorP = homeworkContainer.querySelector('#error-p');
let errorButton = homeworkContainer.querySelector('#error-button');
// let townsPromise = loadTowns();

loadTowns()
    .then(towns => {
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';
        filterInput.addEventListener('keyup', () =>{
            let value = this.value.trim();

            filterResult.innerHTML = '';
            if (value !== '') {
                let content;

                towns.forEach(town => {
                    if (isMatching(town.name, value)) {
                        content += `<li>${town.name}</li>`;
                    }
                });
                filterResult.innerHTML = content;
            }
        });
    })
    .catch(err => {
        loadingBlock.style.display = 'none';
        errorBlock.style.display = 'block';
        errorP.textContent = err.message;
        errorButton.addEventListener('click', () => {
            location.reload();
        })
    });

export {
    loadTowns,
    isMatching
};
