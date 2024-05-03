import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import UserEditForm from 'view/user/edit/UserEditForm';

class UserEditPage extends Component {
  render() {
    console.log('render desde EditPage');
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            ['Principal', '/'],
            ['Usuarios', '/user'],
            ['Editar usuario'],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{'Editar usuario'}</PageTitle>

          <UserEditForm match={this.props.match} />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(UserEditPage);
