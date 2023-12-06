import React, { memo } from 'react'
import { cn as bem } from '@bem-react/classname';
import { INITIAL_PAGE } from '../../constants';
import './index.css'
import ReactPaginate from 'react-paginate';

const Navigation = (props) => {

  const handlePageClick = () => {
    console.log('handling page click');
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
        previousClassName={cn(`item`)}
        previousLinkClassName={cn(`link`)}
        nextClassName={cn(`item`)}
        nextLinkClassName={cn(`link`)}
        breakLabel="..."
        breakClassName={cn(`item`)}
        breakLinkClassName={cn(`link`)}
        containerClassName={cn()}
        activeClassName="active-item"
        renderOnZeroPageCount={null}
        initialPage={INITIAL_PAGE}
      />
    </>
  );
}

export default memo(Navigation);