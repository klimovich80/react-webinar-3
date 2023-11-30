
import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
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
    console.log(newState);
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem(item) {
    const itemExist = this.doesExist(item.code);
    itemExist
      ? itemExist.quantity += 1
      : this.setState({
        ...this.state,
        list: [...this.state.list, {
          code: item.code,
          title: item.title,
          price: item.price,
          quantity: 1
        }]
      });
    console.log(this.state.list);
  };

  doesExist(code) {
    return this.state.list.find(item => item.code === code)
  }

  findTotal() {
    const total = this.state.list.reduce(function (result, item) {
      return result + (item.price * item.quantity)
    }, 0);
    return total;
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };
}

export default Store;
