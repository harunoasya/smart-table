import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);


export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                        const option = document.createElement('option');
                        option.value = name;
                        option.textContent = name;
                        return option;                               // @todo: создать и вернуть тег опции
                      })
        )
     })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        console.log('State:', state);
        if (action && action.name !== 'clear') {
          state.page = 1;}
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            const input = action.parentElement.querySelector(`[data-field="${field}"]`);
            if (input) {
                input.value = '';
                state[field] = '';
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
      return data.filter(row => {
    const totalFrom = Number(state.totalFrom) || -Infinity;
    const totalTo = Number(state.totalTo) || Infinity;

    const inRange = row.total >= totalFrom && row.total <= totalTo;

    return compare(row, state) && inRange;
});
}}