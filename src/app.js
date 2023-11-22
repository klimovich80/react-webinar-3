import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;

  // функция отмены выделения ранее выбраных элементов
  const deSelectList = () => {
    const listElements = document.querySelectorAll('.Item')
    listElements.forEach(element => {
      element.classList.remove('Item_selected')
    })
  };

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => {
                  //отменяем выделение предыдущего элемента
                  deSelectList();
                  //выделяем нужный
                  store.selectItem(item.code);
                  //показываем количество кликов по элементу списка
                  console.log(item)
                }}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{
                  item.selectCount ?
                    item.title + ` | Выделяли ${item.selectCount} раз` :
                    item.title
                }</div>
                <div className='Item-actions'>
                  <button onClick={() => {
                    store.deleteItem(item.code)
                  }}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
