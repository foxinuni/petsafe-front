import { Button, Form } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/pet/form/petFormActions';
import selectors from 'modules/pet/form/petFormSelectors';
import model from 'modules/pet/petModel';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import FormSchema from 'view/shared/form/formSchema';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import UserAutocompleteFormItem from 'view/user/autocomplete/UserAutocompleteFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import BookingAutocompleteFormItem from 'view/booking/autocomplete/BookingAutocompleteFormItem';

const { fields } = model;

class PetForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.owner,
    fields.name,
    fields.type,
    fields.breed,
    fields.size,
  ]);

  componentDidMount() {
    const { dispatch, match } = this.props;

    if (this.isEditing()) {
      dispatch(actions.doFind(match.params.id));
    } else {
      dispatch(actions.doNew());
    }
  }

  isEditing = () => {
    const { match } = this.props;
    return !!match.params.id;
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
    const record = this.props.record;

    if (this.isEditing() && record) {
      return this.schema.initialValues(record);
    }

    return this.schema.initialValues();
  };

  renderForm() {
    const { saveLoading } = this.props;

    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onFinish={form.handleSubmit}>
                {this.isEditing() && (
                  <ViewFormItem
                    name={fields.id.name}
                    label={fields.id.label}
                  />
                )}

                <UserAutocompleteFormItem
                  name={fields.owner.name}
                  label={fields.owner.label}
                  required={fields.owner.required}
                />
                <InputFormItem
                  name={fields.name.name}
                  label={fields.name.label}
                  required={fields.name.required}
                />
                <SelectFormItem
                  name={fields.type.name}
                  label={fields.type.label}
                  options={[
                    {
                      id: 5,
                      value: 'cat',
                      title: 'cat',
                      label: 'cat',
                    },
                  ]}
                  required={fields.type.required}
                />
                <InputFormItem
                  name={fields.breed.name}
                  label={fields.breed.label}
                  required={fields.breed.required}
                />
                <SelectFormItem
                  name={fields.size.name}
                  label={fields.size.label}
                  options={[
                    {
                      id: 5,
                      value: 'small',
                      title: 'small',
                      label: 'small',
                    },
                  ]}
                  required={fields.size.required}
                />

                <Form.Item
                  className="form-buttons"
                  {...tailFormItemLayout}
                >
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
    console.log('render desde PetForm');
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
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(PetForm);
