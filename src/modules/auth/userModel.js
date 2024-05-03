import StringField from 'modules/shared/fields/stringField';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import ImagesField from 'modules/shared/fields/imagesField';
import BooleanField from 'modules/shared/fields/booleanField';
import StringArrayField from 'modules/shared/fields/stringArrayField';
import GenericField from 'modules/shared/fields/genericField';
import * as yup from 'yup';
import EnumeratorField from 'modules/shared/fields/enumeratorField';

class EmailsField extends StringArrayField {
  forForm() {
    let yupChain = yup
      .array()
      .label(this.label)
      .of(
        yup
          .string()
          .email('Email')
          .label('Email')
          .max(255)
          .required(),
      );

    if (this.required) {
      yupChain = yupChain.required();
    }

    return yupChain;
  }
}

const fields = {
  id: new IdField('id', 'ID'),
  firstName: new StringField('name', 'Nombres', {
    max: 80,
  }),
  lastName: new StringField('surname', 'Apellidos', {
    max: 175,
  }),
  password: new StringField('password', 'Contraseña', {
    required: true,
  }),
  fullName: new StringField('name', 'Nombre completo', {
    required: true,
  }),
  email: new StringField('email', 'Email', {
    required: true,
    max: 255,
  }),

  role: new StringField('roles', 'Rol', {
    required: true,
  }),

  disabledAsStatus: new BooleanField('disabled', 'Estado', {
    noLabel: 'Activo',
    yesLabel: 'Inactivo',
  }),
  disabled: new BooleanField('disabled', 'Inactivo', {
    noLabel: 'Activo',
    yesLabel: 'Inactivo',
  }),
  phoneNumber: new StringField('number', 'Numero', {
    matches: /^[0-9]/,
    max: 24,
    required: true,
  }),
  avatarsUser: new ImagesField(
    'avatars',
    'Avatars',
    'user/avatars/user',
    { max: 1 },
  ),
  avatarsProfile: new ImagesField(
    'avatars',
    'Avatars',
    (id) => `user/avatars/profile/${id}`,
    { max: 1 },
  ),

  createdAt: new DateTimeField('createdAt', 'Creado'),
  updatedAt: new DateTimeField('updatedAt', 'Actualizado'),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    'Rango de creacion',
  ),
  roleUser: new GenericField('roleUser', 'Rol de usuario'),
  status: new EnumeratorField('status', 'Estado', [
    {
      id: 'enabled',
      label: 'Activo',
    },
    {
      id: 'disabled',
      label: 'Inactivo',
    },
  ]),
};

export default {
  fields,
};
