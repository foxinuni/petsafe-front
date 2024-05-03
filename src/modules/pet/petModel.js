import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';
import RelationToOneField from 'modules/shared/fields/relationToOneField';
import RelationToManyField from 'modules/shared/fields/relationToManyField';

const fields = {
  id: new IdField('id', 'ID'),
  owner: new RelationToOneField('owner', 'Dueño', {
    required: true,
  }),
  name: new StringField('name', 'Nombre', {
    required: true,
    max: 255,
  }),

  type: new StringField('type', 'Tipo', {
    required: true,
  }),

  breed: new StringField('breed', 'Raza', {
    required: true,
  }),
  size: new StringField('size', 'Tamaño', {
    required: true,
  }),
  bookings: new RelationToManyField(
    'bookings',
    'Reservas',
    {},
  ),
  createdAt: new DateTimeField('createdAt', 'Creado'),
  updatedAt: new DateTimeField('updatedAt', 'Actualizado'),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    'Rango de creacion',
  ),
};

export default {
  fields,
};
