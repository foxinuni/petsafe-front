import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import IamNewForm from 'view/user/new/UserNewForm';

class UserNewPage extends Component {
  render() {
    console.log('render desde IamNewPage');
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            ['Principal', '/'],
            ['Usuarios', '/iam'],
            ['Nuevo usuario'],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{'Nuevo usuario'}</PageTitle>

          <IamNewForm />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(UserNewPage);
