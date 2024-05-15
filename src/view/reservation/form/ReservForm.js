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
    console.log(match);
    console.log(match.params);

    if (!this.isNew()) {
      dispatch(
        actions.doFind(
          match.params.id,
          this.props.token,
          this.props.permissionSeePets || this.props.permissionPetsSelf,
        ),
      );
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

  isNew = () => {
    const { match } = this.props;
    return String(match.path).includes('new');
  };

  handleSubmit = (values) => {
    const { dispatch } = this.props;

    if (this.isNew()) {
      dispatch(
        actions.doCreate(values, this.props.match.params.id, this.props.token),
      );
    }
  };

  initialValues = () => {
    const reservation = this.props.reservation;
    console.log('reservation essss');
    console.log(reservation);

    if (!this.isNew() && reservation) {
      return {
        owner: reservation.owner,
        pet: reservation.pet.name,
        dates: `De: ${reservation.arrival}    Hasta: ${reservation.departure}`,
        clientNotes: reservation.clientNotes,
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
    if (
      ((this.props.owner || !this.props.permissionUsers) && this.props.pet) ||
      this.props.reservation
    ) {
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
                  {(this.props.permissionUsers && this.isNew() && (
                    <ViewFormItem name={'owner'} label={'Dueño'} />
                  )) ||
                    null}
                  <ViewFormItem name={'pet'} label={'Mascota'} />
                  {(this.isNew() && (
                    <DatePickerRangeFormItem
                      name={'dates'}
                      label={'Entrada y salida'}
                      required={true}
                      onChange={this.handleFee}
                    />
                  )) ||
                    null}
                  {(!this.isNew() && (
                    <ViewFormItem name={'dates'} label={'Entrada y salida'} />
                  )) ||
                    null}
                  {(this.isNew() && (
                    <TextAreaFormItem
                      name={'clientNotes'}
                      label={'Anotaciones'}
                      required={false}
                    />
                  )) ||
                    null}
                  {(!this.isNew() && (
                    <ViewFormItem name={'clientNotes'} label={'Anotaciones'} />
                  )) ||
                    null}
                  {(this.props.fee && this.props.fee != 0 && (
                    <ViewFeeItem
                      name={'fee'}
                      label={'Tarifa'}
                      value={this.props.fee}
                    />
                  )) ||
                    null}
                  {(this.isNew() && (
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
                  )) ||
                    null}
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
    permissionSeePets: authSelector.selectPermViewPets(state),
    permissionPetsSelf: authSelector.selectPermSelfPets(state),
  };
}

export default connect(select)(ReservForm);
