import React, { Component } from 'react';
import UserUsersFilter from 'view/user/list/UserUsersFilter';
import UserUsersTable from 'view/user/list/UserUsersTable';
import UserUsersToolbar from 'view/user/list/UserUsersToolbar';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';

class UserPage extends Component {
  render() {
    console.log('render desde IamPage');
    return (
      <React.Fragment>
        <Breadcrumb
          items={[['Principal', '/'], ['Usuarios']]}
        />

        <ContentWrapper>
          <PageTitle>{'Usuarios'}</PageTitle>

          <UserUsersToolbar />
          <UserUsersFilter />
          <UserUsersTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(UserPage);
