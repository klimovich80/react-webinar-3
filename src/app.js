import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const [isCartOpen, setCartOpen] = useState(false);

  const list = store.getState().list;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onCartOpen: useCallback(() => {
      setCartOpen(true);
      //store.addItem();
    }, [store]),

    onCartClose: useCallback(() => {
      setCartOpen(false);
    }, []),
  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS' />
      <Cart
        store={store}
        isCartOpen={isCartOpen}
        onCartClose={callbacks.onCartClose}
        isCartItem={true}
      />
      <Controls
        onCartOpen={callbacks.onCartOpen}
      />
      <List
        list={list}
        onDeleteItem={callbacks.onDeleteItem}
        isCartItem={false}
      />
    </PageLayout>
  );
}

export default App;
