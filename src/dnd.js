
'use strict';

/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
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
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    let div = document.createElement('div'),
        w = Math.floor(window.innerWidth * Math.random()) + 1,
        h = Math.floor(window.innerHeight * Math.random()) + 1,
        l = Math.floor(window.innerWidth * Math.random()) + 1,
        t = Math.floor(window.innerHeight * Math.random()) + 1,
        color = `#${genColor()}${genColor()}${genColor()}`;

    function genColor() {
        return Math.ceil(Math.random() * 255).toString(16);
    }

    div.classList.add('draggable-div');
    div.style.position = 'absolute';
    div.style.width = w / 2 + 'px';
    div.style.height = h / 2 + 'px';
    div.style.left = l / 2 + 'px';
    div.style.top = t / 2 + 'px';
    div.style['background-color'] = color;
    // div.style.backgroundColor = color;

    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */


function addListeners(target) {
    let isMovable = false;

    target.addEventListener('mousedown', (e) => {
        let listDiv = document.querySelectorAll('.draggable-div');

        isMovable = true;
        listDiv.forEach(div => {
            div.style.zIndex = 'auto';
        });
        e.target.style.opacity = '0.5';
        e.target.style.zIndex = '1';
    });
    target.addEventListener('mouseup', (e) => {
        isMovable = false;
        e.target.style.opacity = '1';
    });
    document.addEventListener('mousemove', (e) => {
        if (isMovable) {
            target.style.left = e.pageX - e.currentTarget.offsetWidth / 2 + 'px';
            target.style.top = e.pageY - e.currentTarget.offsetHeight / 2 + 'px';
        }
    })
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
