import React, { Component } from 'react';
import BookingListFilter from 'view/booking/list/BookingListFilter';
import BookingListTable from 'view/booking/list/BookingListTable';
import BookingListToolbar from 'view/booking/list/BookingListToolbar';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';

class BookingListPage extends Component {
  render() {
    console.log('render desde BookingListPage');
    return (
      <React.Fragment>
        <Breadcrumb
          items={[['Principal', '/'], ['Reservas']]}
        />

        <ContentWrapper>
          <PageTitle>{'Reservas'}</PageTitle>

          <BookingListToolbar />
          <BookingListFilter />
          <BookingListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(BookingListPage);
