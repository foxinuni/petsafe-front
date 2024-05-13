import { Button, Form } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/reservation/form/reservFormActions';
import selectors from 'modules/reservation/form/reservFormSelectors';
import authSelector from 'authorization/authorizationSelector';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import TextAreaFormItem from 'view/shared/form/items/TextAreaFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import DatePickerRangeFormItem from 'view/shared/form/items/DatePickerRangeFormItem';
import moment from 'moment';
import ViewFeeItem from 'view/shared/form/items/ViewFeeItem';
import * as Yup from 'yup';

class ReservForm extends Component {
  schema = Yup.object().shape({});

  componentDidMount() {
    const { dispatch, match } = this.props;

    if (this.isEditing()) {
      dispatch(actions.doFind(match.params.id));
    } else {
      dispatch(actions.doNew());
      dispatch(
        actions.seekPet(
          this.props.token,
          match.params.id,
          this.props.permissionUsers,
        ),
      );
    }
  }

  isEditing = () => {
    const { match } = this.props;
    return !String(match.path).includes('new');
  };

  handleSubmit = (values) => {
    const { dispatch } = this.props;

    if (this.isEditing()) {
      dispatch(actions.doUpdate());
    } else {
      console.log(values);
      dispatch(
        actions.doCreate(values, this.props.match.params.id, this.props.token),
      );
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
      owner: this.props.permissionUsers
        ? `${this.props.owner.name} ${this.props.owner.surname}`
        : '',
      pet: this.props.pet.name,
      clientNotes: '',
      employeeNotes: '',
      fee: '',
    };
  };

  handleFee = (dates) => {
    const { dispatch } = this.props;
    dispatch(actions.resetFee());
    if (dates && dates[0] && dates[1]) dispatch(actions.newFee(dates));
  };

  render() {
    if ((this.props.owner || !this.props.permissionUsers) && this.props.pet) {
      const { saveLoading } = this.props;
      return (
        <FormWrapper>
          <Formik
            initialValues={this.initialValues()}
            validationSchema={this.schema}
            onSubmit={this.handleSubmit}
            render={(form) => {
              return (
                <Form onFinish={form.handleSubmit}>
                  {this.props.permissionUsers && (
                    <ViewFormItem name={'owner'} label={'Dueño'} />
                  )}
                  <ViewFormItem name={'pet'} label={'Mascota'} />
                  <DatePickerRangeFormItem
                    name={'dates'}
                    label={'Entrada y salida'}
                    required={true}
                    onChange={this.handleFee}
                  />
                  <TextAreaFormItem
                    name={'clientNotes'}
                    label={'Anotaciones del cliente'}
                    required={false}
                  />
                  {this.isEditing() && (
                    <TextAreaFormItem
                      name={'employeeNotes'}
                      label={'Notas de estadia: '}
                      required={false}
                    />
                  )}
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
                  {this.props.fee && this.props.fee != 0 && (
                    <ViewFeeItem
                      name={'fee'}
                      label={'Tarifa'}
                      value={this.props.fee}
                    />
                  )}

                  <Form.Item className="form-buttons" {...tailFormItemLayout}>
                    <Button
                      loading={saveLoading}
                      type="primary"
                      htmlType="submit"
                    >
                      {'Guardar'}
                    </Button>

                    <Button disabled={saveLoading} onClick={form.handleReset}>
                      {'Resetear'}
                    </Button>
                  </Form.Item>
                </Form>
              );
            }}
          />
        </FormWrapper>
      );
    } else {
      return <Spinner />;
    }
  }
}

function select(state) {
  return {
    saveLoading: selectors.selectSaveLoading(state),
    reservation: selectors.selectReservation(state),
    owner: selectors.selectOnwer(state),
    pet: selectors.selectPet(state),
    token: authSelector.selectToken(state),
    states: selectors.selectStates(state),
    fee: selectors.selectFee(state),
    permissionUsers: authSelector.selectPermViewProfiles(state),
  };
}

export default connect(select)(ReservForm);
