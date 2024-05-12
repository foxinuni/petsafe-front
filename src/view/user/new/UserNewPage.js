import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import UserNewForm from 'view/user/new/UserNewForm';

class UserNewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[['Principal', '/'], ['Usuarios', '/user'], ['Nuevo usuario']]}
        />

        <ContentWrapper>
          <PageTitle>{'Nuevo usuario'}</PageTitle>

          <UserNewForm />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(UserNewPage);
