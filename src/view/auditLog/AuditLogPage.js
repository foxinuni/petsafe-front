import React, { Component } from 'react';
import AuditLogFilter from 'view/auditLog/AuditLogFilter';
import AuditLogTable from 'view/auditLog/AuditLogTable';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import AuditLogToolbar from 'view/auditLog/AuditLogToolbar';

class AuditLogPage extends Component {
  render() {
    console.log('render desde auditlogpage');
    return (
      <React.Fragment>
        <Breadcrumb
          items={[['Principal', '/'], ['logs']]}
        />

        <ContentWrapper>
          <PageTitle>{'Logs'}</PageTitle>
          <AuditLogToolbar />
          <AuditLogFilter />
          <AuditLogTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(AuditLogPage);
