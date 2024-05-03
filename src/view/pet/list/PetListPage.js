import React, { Component } from 'react';
import PetListFilter from 'view/pet/list/PetListFilter';
import PetListTable from 'view/pet/list/PetListTable';
import PetListToolbar from 'view/pet/list/PetListToolbar';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';

class PetListPage extends Component {
  render() {
    console.log('render desde PetListPage');
    return (
      <React.Fragment>
        <Breadcrumb
          items={[['Principal', '/'], ['Mascotas']]}
        />

        <ContentWrapper>
          <PageTitle>{'Mascotas'}</PageTitle>

          <PetListToolbar />
          <PetListFilter />
          <PetListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(PetListPage);
