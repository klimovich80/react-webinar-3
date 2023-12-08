import React, { memo } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { INITIAL_PAGE } from '../../constants';
import './index.css'
import { pagination } from '../../utils';

const Navigation = (props) => {

  const cn = bem('Navigation');

  const callbacks = {
    handlePageClick: (e) => {
      props.onSelectPage(Number(e.target.innerHTML))
    },
  }

  let element = (<></>)
  const pages = pagination(INITIAL_PAGE, props.recentPage, props.pages)
  let keyGen = props.pages + 1

  return (
    <nav className={cn()}>
      <ul className={cn('items')}>
        {
          pages.map(function (page) {
            typeof (page) === 'number'
              ? element = (<li
                key={page}
                className={
                  page === props.recentPage
                    ? cn('item active-item')
                    : cn('item')
                }
                onClick={callbacks.handlePageClick}
              >{page}</li>)
              : element = (<p key={keyGen++}
                className={cn('dots')}
              >{page}</p>)
            return element
          })
        }
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  pages: propTypes.number,
  recentPage: propTypes.number
}

export default memo(Navigation);