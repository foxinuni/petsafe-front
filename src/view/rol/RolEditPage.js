import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import RolEditForm from 'view/rol/RolEditForm';

class RolEditPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            ['Principal', '/'],
            ['roles', '/roles'],
            ['Editar rol'],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{'Editar rol'}</PageTitle>

          <RolEditForm match={this.props.match} />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(RolEditPage);
