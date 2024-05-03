import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';
import DecimalRangeField from 'modules/shared/fields/decimalRangeField';
import DecimalField from 'modules/shared/fields/decimalField';
import RelationToOneField from 'modules/shared/fields/relationToOneField';
import ImagesField from 'modules/shared/fields/imagesField';

const fields = {
  id: new IdField('id', 'ID'),
  owner: new RelationToOneField('owner', 'Dueño', {
    required: true,
  }),
  pet: new RelationToOneField('pet', 'Mascota', {
    required: true,
  }),
  arrival: new DateTimeField('arrival', 'Llegada', {
    required: true,
  }),
  departure: new DateTimeField('departure', 'Salida', {
    required: true,
  }),
  clientNotes: new StringField(
    'clientNotes',
    'Notas del cliente',
    {
      max: 20000,
    },
  ),
  employeeNotes: new StringField(
    'employeeNotes',
    'Notas del empleado',
    {
      max: 20000,
    },
  ),
  photos: new ImagesField(
    'photos',
    'Fotos',
    'booking/photos',
    {
      size: 3000000,
    },
  ),
  status: new StringField('status', 'Estado', {
    required: true,
  }),

  cancellationNotes: new StringField(
    'cancellationNotes',
    'Notas de cancelacion',
    {
      max: 20000,
    },
  ),
  fee: new DecimalField('fee', 'Tarifa', {
    scale: 2,
  }),

  createdAt: new DateTimeField('createdAt', 'Creado'),
  updatedAt: new DateTimeField('updatedAt', 'Actualizado'),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    'Rango creacion',
  ),
  arrivalRange: new DateTimeRangeField(
    'arrivalRange',
    'Rango de llegada',
  ),
  departureRange: new DateTimeRangeField(
    'departureRange',
    'Rango de salida',
  ),
  feeRange: new DecimalRangeField(
    'feeRange',
    'Rango de tarifa',
  ),
};

export default {
  fields,
};
