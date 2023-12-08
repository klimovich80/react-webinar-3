import { memo, useCallback, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Navigation from '../../components/navigation';
import { pagesQuantity } from '../../utils';
import { INITIAL_PAGE, STEP } from '../../constants';
import ItemInfo from '../../components/itemInfo';

function Main() {
  const navigate = useNavigate();

  const store = useStore();
  const [recentPage, setRecentPage] = useState(INITIAL_PAGE)
  const [itemTitle, setItemTitle] = useState('Название товара')

  useEffect(() => {
    store.actions.catalog.load(recentPage - 1, STEP)
      .catch(err => console.log(err))
  }, [recentPage]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Возврат на главную
    backToMain: useCallback(() => navigate('/')),
    // Навигация по страницам
    selectPage: useCallback((data) => setRecentPage(Number(data)))

  }

  const renders = {
    item: useCallback((item) => {
      return <Item
        item={item}
        onAdd={callbacks.addToBasket}
      />
    }, [callbacks.addToBasket]),
  };

  return (
    <Routes>
      <Route path='/'
        element={(
          <PageLayout>
            <Head title='Магазин' />
            <BasketTool
              onBackToMain={callbacks.backToMain}
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
            />
            <List
              list={select.list}
              renderItem={renders.item}
            />
            <Navigation
              pages={pagesQuantity(STEP, select.count) || 1}
              onSelectPage={callbacks.selectPage}
              recentPage={recentPage}
            />
          </PageLayout>
        )}
      />
      <Route
        path='/item/:id'
        element={
          <PageLayout>
            <Head title={itemTitle} />
            <BasketTool
              onBackToMain={callbacks.backToMain}
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
            />
            <ItemInfo
              store={store}
              onAdd={callbacks.addToBasket}
              setItemTitle={setItemTitle}
            />
          </PageLayout>
        }
      />
    </Routes>
  );
}

export default memo(Main);
