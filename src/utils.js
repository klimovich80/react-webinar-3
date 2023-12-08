/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'

  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Возвращает количество страниц для отображения массива числа
 * @param step {Number}
 * @param total {Number}
 * @returns {Number}
 */
export function pagesQuantity(step, total) {
  return Math.ceil(total / step);
}

/**
 * Возвращает количество страниц для отображения массива числа
 * @param current {Number}
 * @param total {Number}
 * @returns {Array}
 */
export function pagination(firstPage, current, total) {

  const pages = [];
  const dots = `...`;
  const noDotsLimit = 5;

  pages.push(firstPage)
  if (total === firstPage) {
    return pages
  }
  if (current > total) {
    current = total
  }
  if (total <= noDotsLimit) {
    for (i = 2; i <= total; i++) {
      pages.push(i)
    }
    return pages
  }
  if (current === firstPage) {
    pages.push(current + 1)
    pages.push(current + 2)
    pages.push(dots)
  }
  if (current === firstPage + 1) {
    pages.push(current)
    pages.push(current + 1)
    pages.push(dots)
  }
  if (current === firstPage + 2) {
    pages.push(current - 1)
    pages.push(current)
    pages.push(current + 1)
    pages.push(dots)
  }
  if (current >= firstPage + 3 && current < (total - 2)) {
    pages.push(dots)
    pages.push(current - 1)
    pages.push(current)
    pages.push(current + 1)
    pages.push(dots)
  }
  if (current === (total - 2) && current != total) {
    pages.push(dots)
    pages.push(current - 1)
    pages.push(current)
    pages.push(current + 1)
  }
  if (current === (total - 1) && current != total) {
    pages.push(dots)
    pages.push(current - 1)
    pages.push(current)
  }
  if (current === total) {
    pages.push(dots)
    pages.push(current - 2)
    pages.push(current - 1)
  }
  pages.push(total)
  return pages
}