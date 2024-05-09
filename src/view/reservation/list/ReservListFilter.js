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
    //llamar a todos los estados y todos los usuarios si se puede
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.doFetch());
  }

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch(actions.doFetch(values));
  };

  handleReset = (form) => {
    form.setValues({});
    const { dispatch } = this.props;
    dispatch(actions.doReset());
  };

  handleOwnerChange = (value) => {
    const { dispatch } = this.props;
    dispatch(reservActions.resetOwner());
    if (value && this.props.permissionViewPets) {
      dispatch(reservActions.getPetsFrom(this.props.token, value));
    }
  };

  render() {
    const { loading } = this.props;
    console.log('render desde bookingListFilter');
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
                      showTime
                    />
                  </Col>
                  {this.props.permissionView && this.props.pemissionUsers && (
                    <Col md={24} lg={12}>
                      <SelectFormItem
                        name={'owner'}
                        label={'Dueño'}
                        layout={formItemLayout}
                        options={this.props.users.rows.map((user) => ({
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
                        options={this.props.ownerPets.rows.map((pet) => ({
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
                      showTime
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <DatePickerRangeFormItem
                      name={'departure'}
                      label={'Salida'}
                      layout={formItemLayout}
                      showTime
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
                      icon="search"
                      type="primary"
                      htmlType="submit"
                    >
                      {'Guardar'}
                    </Button>
                    <Button
                      loading={loading}
                      onClick={() => this.handleReset(form)}
                      icon="undo"
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
  }
}

function select(state) {
  return {
    filter: selectors.selectFilter(state),
    ownerPets: reservSelectors.selectOwnerPets(state),
    permissionView: authSelectors.selectPermViewPets(state),
    pemissionUsers: authSelectors.selectPermViewProfiles(state),
    permissionViewPets: authSelectors.selectPermViewPets(state),
  };
}

export default withRouter(connect(select)(ReservListFilter));
