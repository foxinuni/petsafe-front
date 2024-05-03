import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import BookingView from 'view/booking/view/BookingView';
import actions from 'modules/booking/view/bookingViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/booking/view/bookingViewSelectors';
import BookingViewToolbar from 'view/booking/view/BookingViewToolbar';

class BookingPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    console.log('render desde BookingViewPage');
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            ['Principal', '/'],
            ['Reservas', '/booking'],
            ['Reserva'],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{'Reserva'}</PageTitle>

          <BookingViewToolbar match={this.props.match} />

          <BookingView
            loading={this.props.loading}
            record={this.props.record}
          />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(Layout(BookingPage));
