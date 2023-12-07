import React, { memo } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { INITIAL_PAGE } from '../../constants';
import './index.css'
import ReactPaginate from 'react-paginate';

const Navigation = (props) => {

  const handlePageClick = (e) => {
    props.onSelectPage(e.selected)
  }

  const cn = bem('Navigation')

  return (
    <>
      <ReactPaginate
        nextLabel={null}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={props.pages}
        previousLabel={null}
        pageClassName={cn(`item`)}
        pageLinkClassName={cn(`link`)}
        previousClassName={cn(`item-hidden`)}
        previousLinkClassName={cn(`link`)}
        nextClassName={cn(`item-hidden`)}
        nextLinkClassName={cn(`link`)}
        breakLabel="..."
        breakClassName={cn(`item`)}
        breakLinkClassName={cn(`link`)}
        containerClassName={cn()}
        activeClassName="active-item"
        renderOnZeroPageCount={null}
        initialPage={INITIAL_PAGE - 1}
      />
    </>
  );
}

Navigation.propTypes = {
  pages: propTypes.number
}

export default memo(Navigation);