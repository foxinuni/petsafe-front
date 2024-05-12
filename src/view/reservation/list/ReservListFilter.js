import { Button, Col, Form, Row } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/reservation/reservListActions';
import reservActions from 'modules/reservation/form/reservFormActions';
import reservSelectors from 'modules/reservation/form/reservFormSelectors';
import { selectors } from 'modules/reservation/reservListActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FilterWrapper, {
  formItemLayout,
} from 'view/shared/styles/FilterWrapper';
import authSelectors from 'authorization/authorizationSelector';
import DatePickerRangeFormItem from 'view/shared/form/items/DatePickerRangeFormItem';
import InputRangeFormItem from 'view/shared/form/items/InputRangeFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';

const initialValues = {};

class ReservListFilter extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    if (this.props.pemissionUsers && this.props.permissionViewPets) {
      dispatch(reservActions.getOwners(this.props.token));
    }
    dispatch(reservActions.getStates(this.props.token));
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.doFetch(null, this.props.token));
  }

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch(actions.doFetch(values, this.props.token));
  };

  handleReset = (form) => {
    form.setValues({});
    const { dispatch } = this.props;
    dispatch(actions.doReset());
  };

  handleOwnerChange = (value) => {
    const { dispatch } = this.props;
    dispatch(reservActions.resetOwner());
    if (value) {
      dispatch(reservActions.getPetsFrom(this.props.token, value));
    } else {
      dispatch(reservActions.resetPets());
    }
  };

  render() {
    if (this.props.states) {
      const { loading } = this.props;
      return (
        <FilterWrapper
          style={{
            padding: '20px',
            background: '#f0f2f5',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            render={(form) => {
              return (
                <Form onFinish={form.handleSubmit} layout="vertical">
                  <Row gutter={24}>
                    <Col md={24} lg={12}>
                      <DatePickerRangeFormItem
                        name={'createdAt'}
                        label={'creado'}
                        layout={formItemLayout}
                      />
                    </Col>
                    {this.props.permissionViewPets &&
                      this.props.pemissionUsers && (
                        <Col md={24} lg={12}>
                          <SelectFormItem
                            name={'owner'}
                            label={'Dueño'}
                            layout={formItemLayout}
                            options={this.props.owners.map((user) => ({
                              id: user.id,
                              value: user.id,
                              title: user.name,
                              label: user.name,
                            }))}
                            onChange={this.handleOwnerChange}
                          />
                        </Col>
                      )}
                    {this.props.ownerPets && (
                      <Col md={24} lg={12}>
                        <SelectFormItem
                          name={'pet'}
                          label={'Mascota'}
                          layout={formItemLayout}
                          options={this.props.ownerPets.map((pet) => ({
                            id: pet.id,
                            value: pet.id,
                            title: pet.name,
                            label: pet.name,
                          }))}
                        />
                      </Col>
                    )}
                    <Col md={24} lg={12}>
                      <DatePickerRangeFormItem
                        name={'arrival'}
                        label={'Llegada'}
                        layout={formItemLayout}
                      />
                    </Col>
                    <Col md={24} lg={12}>
                      <DatePickerRangeFormItem
                        name={'departure'}
                        label={'Salida'}
                        layout={formItemLayout}
                      />
                    </Col>
                    <Col md={24} lg={12}>
                      <SelectFormItem
                        name={'status'}
                        label={'Estado'}
                        options={this.props.states.map((state) => ({
                          id: state.id,
                          value: state.id,
                          label: state.name,
                          title: state.name,
                        }))}
                        layout={formItemLayout}
                      />
                    </Col>
                    <Col md={24} lg={12}>
                      <InputRangeFormItem
                        name={'feeRange'}
                        label={'Tarifa'}
                        layout={formItemLayout}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="filter-buttons" span={24}>
                      <Button
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                      >
                        {'Guardar'}
                      </Button>
                      <Button
                        loading={loading}
                        onClick={() => this.handleReset(form)}
                      >
                        {'Resetear'}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          />
        </FilterWrapper>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

function select(state) {
  return {
    filter: selectors.selectFilter(state),
    pemissionUsers: authSelectors.selectPermViewProfiles(state),
    permissionViewPets: authSelectors.selectPermViewPets(state),
    token: authSelectors.selectToken(state),
    states: reservSelectors.selectStates(state),
    owners: reservSelectors.selectUsers(state),
    ownerPets: reservSelectors.selectOwnerPets(state),
  };
}

export default withRouter(connect(select)(ReservListFilter));
