import PetService from 'modules/pet/petService';
import paginationAction from 'modules/shared/pagination/paginationAction';
import selectors from 'modules/pet/list/petListSelectors';
import exporterFields from 'modules/pet/list/petListExporterFields';

const prefix = 'PET_LIST';

export default paginationAction(
  prefix,
  PetService.list,
  selectors,
  'archivo_mascotas',
  exporterFields,
);
