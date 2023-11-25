/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.uid = this.state.list.length + 1; //уникальный порядковый номер для каждого нового элемента
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.uid, title: 'Новая запись' }],
      uid: this.uid += 1,
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          !item.selectCount ?
            item.selectCount = 1 :
            item.selected ?
              item.selectCount += 1 :
              item.selectCount = item.selectCount
        } else {
          item.selected = false;
        }
        return item;
      })
    })
  }

  pluralFunc(count, pluralArray) {

    const restFromHundred = count %= 100;
    const restFromTen = count %= 10;
    const [one, many, twoFour] = pluralArray;

    if (restFromHundred >= 10 && restFromHundred < 20) {
      return many;
    } else if (restFromTen === 1) {
      return one;
    } else if (restFromTen === 0 || restFromTen > 4) {
      return many;
    } else {
      return twoFour;
    }
  }
}

export default Store;
