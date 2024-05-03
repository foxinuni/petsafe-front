import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import IdField from 'modules/shared/fields/idField';
import JsonField from 'modules/shared/fields/jsonField';
import StringField from 'modules/shared/fields/stringField';
import StringArrayField from 'modules/shared/fields/stringArrayField';

const fields = {
  id: new IdField('id', 'ID'),
  timestampRange: new DateTimeRangeField(
    'timestampRange',
    'Rango de tiempo',
  ),
  timestamp: new DateTimeField('timestamp', 'Tiempo'),
  createdByEmail: new StringField(
    'createdByEmail',
    'Creado por (Email)',
  ),
  entityName: new StringField(
    'entityName',
    'Nombre de la entidad',
  ),
  entityNames: new StringArrayField(
    'entityNames',
    'Nombres de entidades',
  ),
  action: new StringField('action', 'Accion'),
  entityId: new StringField('entityId', 'ID de entidad'),
  values: new JsonField('values', 'Valores'),
};

export default {
  fields,
};
