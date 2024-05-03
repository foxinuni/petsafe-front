import AuditLogService from 'modules/auditLog/auditLogService';
import selectors from 'modules/auditLog/auditLogSelectors';
import paginationAction from 'modules/shared/pagination/paginationAction';
import exporterFields from 'modules/auditLog/auditLogExporterFields';

const prefix = 'AUDIT_LOG';

export default paginationAction(
  prefix,
  AuditLogService.fetch,
  selectors,
  'logs_archivo',
  exporterFields,
);
