import React, { Component } from 'react';
import RolListTable from 'view/rol/RolListTable';
import RolListToolbar from 'view/rol/RolListToolbar';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';

class RolPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[['Principal', '/'], ['Roles']]}
        />

        <ContentWrapper>
          <PageTitle>{'Roles'}</PageTitle>

          <RolListToolbar />
          <RolListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(RolPage);
