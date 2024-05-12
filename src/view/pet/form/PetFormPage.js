import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import PetForm from 'view/pet/form/PetForm';

class PetFormPage extends Component {
  isEditing = () => {
    const { match } = this.props;
    return !!match.params.id;
  };

  title = () => {
    return this.isEditing() ? 'Editar' : 'Nueva mascota';
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[['Principal', '/'], ['Mascotas', '/pet'], [this.title()]]}
        />

        <ContentWrapper>
          <PageTitle>{this.title()}</PageTitle>

          <PetForm match={this.props.match} />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(PetFormPage);
