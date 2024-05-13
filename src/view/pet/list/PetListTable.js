import { Table, Popconfirm, Tag, Typography } from 'antd';
import actions from 'modules/pet/petListActions';
import { selectors } from 'modules/pet/petListActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';
import ButtonLink from 'view/shared/styles/ButtonLink';
import authSelectors from 'authorization/authorizationSelector';
import { dateToString } from 'modules/shared/dates';
import petActions from 'modules/pet/form/petFormActions';

const { Text } = Typography;
class PetListTable extends Component {
  handleTableChange = (pagination, _, sorter) => {
    const { dispatch } = this.props;
    const token = this.props.token;
    dispatch(
      actions.doChangePaginationAndSort(
        pagination,
        this.props.filter,
        token,
        sorter,
      ),
    );
  };

  doDestroy = (id) => {
    const { dispatch } = this.props;
    dispatch(petActions.destroy(id, this.props.token));
  };

  columns = [
    {
      title: 'Dueño',
      dataIndex: 'owner',
      sorter: false,
      render: undefined,
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      sorter: false,
      render: undefined,
    },
    {
      title: 'Raza',
      dataIndex: 'breed',
      sorter: false,
      render: undefined,
    },
    {
      title: 'Edad',
      dataIndex: 'age',
      sorter: false,
      render: undefined,
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      sorter: false,
      render: (record) => <Text> {dateToString(record)}</Text>,
    },
    {
      title: 'Opciones',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          {(this.props.permissionToReservSelf ||
            this.props.permissionToReservManage) && (
            <Link to={`/reservation/${record.id}/new`}>{'Reservar'}</Link>
          )}
          {this.props.permissionToEdit && (
            <Link to={`/pet/${record.id}/edit`}>{'Editar'}</Link>
          )}
          {this.props.permissionToEdit && (
            <Popconfirm
              title={'Estas seguro?'}
              onConfirm={() => this.doDestroy(record.id)}
              okText={'Si'}
              cancelText={'No'}
            >
              <ButtonLink>{'Eliminar'}</ButtonLink>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  render() {
    const { pagination, rows, loading } = this.props;
    return (
      <TableWrapper>
        <Table
          rowKey="id"
          loading={loading}
          columns={this.columns}
          dataSource={rows}
          pagination={pagination}
          onChange={this.handleTableChange}
          scroll={{ x: true }}
        />
      </TableWrapper>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    rows: selectors.selectRows(state),
    pagination: selectors.selectPagination(state),
    filter: selectors.selectFilter(state),
    permissionToEditUsers: authSelectors.selectPermManageProfiles(state),
    permissionSeeUsers: authSelectors.selectPermViewProfiles(state),
    permissionToEdit: authSelectors.selectPermManagePets(state),
    permissionToReservSelf: authSelectors.selectPermSelfReserv(state),
    permissionToReservManage: authSelectors.selectPermManageReserv(state),
    token: authSelectors.selectToken(state),
  };
}

export default connect(select)(PetListTable);
