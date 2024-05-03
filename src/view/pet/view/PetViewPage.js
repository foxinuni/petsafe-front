import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import PetView from 'view/pet/view/PetView';
import actions from 'modules/pet/view/petViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/pet/view/petViewSelectors';
import PetViewToolbar from 'view/pet/view/PetViewToolbar';

class PetPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    console.log('render desde PetViewPage');
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            ['Principal', '/'],
            ['Mascotas', '/pet'],
            ['Mascota'],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{'Mascota'}</PageTitle>

          <PetViewToolbar match={this.props.match} />

          <PetView
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

export default connect(select)(Layout(PetPage));
