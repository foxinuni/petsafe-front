import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import ProfileForm from 'view/auth/ProfileForm';

class ProfileFormPage extends Component {
  render() {
    console.log('render desde ProfileFormPage');
    return (
      <React.Fragment>
        <Breadcrumb
          items={[['Princiapl', '/'], ['Usuarios']]}
        />

        <ContentWrapper>
          <PageTitle>{'Usuarios'}</PageTitle>

          <ProfileForm />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(ProfileFormPage);
