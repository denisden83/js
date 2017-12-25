'use strict';

import {
    createWindow,
    closeWindow,
    createCookie,
    deleteCookie
} from './index';

/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

function getCookies() {
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .reduce((prev, current) => {
            let [name, value] = current.split('=');

            prev[name] = value;

            return prev;
        }, {});
}

function newRow(name, value) {
    let row = document.createElement('tr'),
        colName = document.createElement('td'),
        colValue = document.createElement('td'),
        colBtn = document.createElement('td'),
        button = document.createElement('button');

    colName.textContent = name;
    colValue.textContent = value;
    button.textContent = 'X';
    row.appendChild(colName);
    row.appendChild(colValue);
    row.appendChild(colBtn);
    colBtn.appendChild(button);
    button.addEventListener('click', () => {
        row.remove();
        deleteCookie(name);
    });
    listTable.appendChild(row);
}

function loadAllCookies() {
    let cookies = getCookies();

    listTable.innerHTML = '';
    Object.keys(cookies).forEach(name => newRow(name, cookies[name]));
}

filterNameInput.addEventListener('keyup', function() {
    let value = filterNameInput.value;

    listTable.innerHTML = '';
    if (value === '') {
        loadAllCookies();
    } else {
        let cookies = getCookies();

        Object.keys(cookies).forEach(name => {
            if (isMatching(name, value) || isMatching(cookies[name], value)) {
                newRow(name, cookies[name]);
            }
        });
    }
});

addButton.addEventListener('click', () => {
    let name = addNameInput.value,
        value = addValueInput.value;

    createCookie(name, value);
    filterNameInput.dispatchEvent(new Event('keyup'));

});

loadAllCookies();
