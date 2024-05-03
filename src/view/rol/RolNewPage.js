import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import RolNewForm from 'view/rol/RolNewForm';

class RolEditPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            ['Principal', '/'],
            ['Roles', '/roles'],
            ['Crear rol'],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{'Crear rol'}</PageTitle>

          <RolNewForm />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(RolEditPage);
