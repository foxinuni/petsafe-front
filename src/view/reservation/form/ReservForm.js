import { Button, Form } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/reservation/form/reservFormActions';
import selectors from 'modules/reservation/form/reservFormSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import TextAreaFormItem from 'view/shared/form/items/TextAreaFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import DatePickerFormItem from 'view/shared/form/items/DatePickerFormItem';
import moment from 'moment';
import * as Yup from 'yup';

class ReservForm extends Component {
  schema = Yup.object().shape({});

  componentDidMount() {
    const { dispatch, match } = this.props;

    if (this.isEditing()) {
      dispatch(actions.doFind(match.params.id));
    } else {
      //if not editing then also seek for the selected pet with the params.id, and through it also the owner
      dispatch(actions.doNew());
    }
  }

  isEditing = () => {
    const { match } = this.props;
    if (match.path === '/reservation/:id/new') return false;
    return true;
  };

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    const { id, ...data } = this.schema.cast(values);

    if (this.isEditing()) {
      dispatch(actions.doUpdate(id, data));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  initialValues = () => {
    const reservation = this.props.reservation;

    if (this.isEditing() && reservation) {
      return {
        owner: reservation.owner,
        pet: reservation.pet,
        arrival: moment(reservation.arrival),
        departure: moment(reservation.departure),
        clientNotes: reservation.clientNotes,
        employeeNotes: reservation.employeeNotes,
        fee: reservation.fee,
      };
    }

    return {
      //owner: //include owner selected
      // pet : //include pet selected,
      clientNotes: '',
      employeeNotes: '',
      fee: '',
    };
  };

  renderForm() {
    const { saveLoading } = this.props;
    console.log('render desde bookingform');
    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onFinish={form.handleSubmit}>
                <ViewFormItem name={'owner'} label={'Dueño'} />
                <ViewFormItem name={'pet'} label={'Mascota'} />
                <DatePickerFormItem
                  name={'arrival'}
                  label={'Llegada'}
                  required={true}
                />
                <DatePickerFormItem
                  name={'departure'}
                  label={'Salida'}
                  required={true}
                />
                <TextAreaFormItem
                  name={'clientNotes'}
                  label={'Anotaciones del cliente'}
                  required={false}
                />
                <TextAreaFormItem
                  name={'employeeNotes'}
                  label={'Notas de estadia: '}
                  required={false}
                />
                {this.isEditing() && (
                  <SelectFormItem
                    name={'states'}
                    label={'Estado'}
                    options={this.props.states.map((state) => ({
                      id: state.id,
                      value: state.id,
                      label: state.name,
                      tittle: state.name,
                    }))}
                    required={true}
                  />
                )}
                <ViewFormItem name={'fee'} label={'Tarifa'} />

                <Form.Item className="form-buttons" {...tailFormItemLayout}>
                  <Button
                    loading={saveLoading}
                    type="primary"
                    htmlType="submit"
                    icon="save"
                  >
                    {'Guardar'}
                  </Button>

                  <Button
                    disabled={saveLoading}
                    onClick={form.handleReset}
                    icon="undo"
                  >
                    {'Resetear'}
                  </Button>
                </Form.Item>
              </Form>
            );
          }}
        />
      </FormWrapper>
    );
  }

  render() {
    const { findLoading, record } = this.props;

    if (findLoading) {
      return <Spinner />;
    }

    if (this.isEditing() && !record) {
      return <Spinner />;
    }

    return this.renderForm();
  }
}

function select(state) {
  return {
    findLoading: selectors.selectFindLoading(state),
    saveLoading: selectors.selectSaveLoading(state),
    reservation: selectors.selectReservation(state),
    states: selectors.selectStates(state),
  };
}

export default connect(select)(ReservForm);
