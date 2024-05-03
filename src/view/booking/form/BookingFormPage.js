import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import BookingForm from 'view/booking/form/BookingForm';

class BookingFormPage extends Component {
  isEditing = () => {
    const { match } = this.props;
    return !!match.params.id;
  };

  title = () => {
    return this.isEditing() ? 'Edicion' : 'Nueva reserva';
  };

  render() {
    console.log('render desde bookingformPage');
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            ['Principal', '/'],
            ['Reservas', '/booking'],
            [this.title()],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{this.title()}</PageTitle>

          <BookingForm match={this.props.match} />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(BookingFormPage);
