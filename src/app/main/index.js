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
import Loader from '../../components/loader';
import ItemInfo from '../../components/itemInfo';

function Main() {
  const navigate = useNavigate();

  const store = useStore();
  const [step, setStep] = useState(STEP)
  const [recentPage, setRecentPage] = useState(INITIAL_PAGE)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    store.actions.catalog.load(recentPage, STEP)
      .catch(err => console.log(err))
      .finally(setLoading(false));
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
    //
    backToMain: useCallback(() => navigate(-1)),
    //
    openItemPage: useCallback((itemId) => {
      store.actions.catalog.loadItem(itemId)
        .then((res) => {
          setItemInfo(res);
          setPageInfo(true);
        })
        .catch(err => console.log(err))
    })
  }

  const selectPage = (data) => {
    setRecentPage(Number(data))
  }

  const renders = {
    item: useCallback((item) => {
      return <Item
        item={item}
        onAdd={callbacks.addToBasket}
        onItemSelect={callbacks.openItemPage}
      />
    }, [callbacks.addToBasket]),
  };

  return (
    <Routes>
      <Route path='/'
        element={(isLoading
          ? <PageLayout>
            <Head title='Магазин' />
            <Loader />
          </PageLayout>
          : <PageLayout>
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
              pages={pagesQuantity(step, select.count) || 1}
              onSelectPage={selectPage}
            />
          </PageLayout>
        )}
      />
      <Route
        path='/item/:id'
        element={
          <PageLayout>
            <Head title='Название товара' />
            <BasketTool
              onBackToMain={callbacks.backToMain}
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
            />
            <ItemInfo
              store={store}
              onAdd={callbacks.addToBasket}
            />
          </PageLayout>
        }
      />
    </Routes>
  );
}

export default memo(Main);
