import React, { Component } from 'react';
import ReservListFilter from 'view/reservation/list/ReservListFilter';
import ReservListTable from 'view/reservation/list/ReservListTable';
import ReservListToolbar from 'view/reservation/list/ReservListToolbar';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';

class BookingListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb items={[['Principal', '/'], ['Reservas']]} />

        <ContentWrapper>
          <PageTitle>{'Reservas'}</PageTitle>

          <ReservListToolbar />
          <ReservListFilter />
          <ReservListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(BookingListPage);
