import { Table, Popconfirm, Typography } from 'antd';
//import actions from 'modules/pet/list/petListActions';
//import selectors from 'modules/pet/list/petListSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';
import ButtonLink from 'view/shared/styles/ButtonLink';
import authSelectors from 'authorization/authorizationSelector';
import { dateToString } from 'modules/shared/dates';

const { Text } = Typography;
class PetListTable extends Component {
  handleTableChange = (pagination, _, sorter) => {
    /* const { dispatch } = this.props;
    const token = this.props.token;
    dispatch(
      actions.doChangePaginationAndSort(
        pagination,
        this.props.filter,
        token,
        sorter,
      ),
    );*/
  };

  doDestroy = (id) => {
    const { dispatch } = this.props;
    //  dispatch(actionsRoles.doDestroy(id, this.props.token));
  };

  columns = [
    {
      title: 'Dueño',
      dataIndex: 'owner',
      sorter: true,
      render: (record) => {
        return this.props.permissionToEditUsers ? (
          <div key={record.id}>
            <Link to={`/user/${record.id}`}>{record.label}</Link>
          </div>
        ) : (
          <div key={record.id}>{record.label}</div>
        );
      },
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      sorter: true,
      render: undefined,
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      sorter: true,
      render: undefined,
    },
    {
      tutle: 'Raza',
      dataIndex: 'breed',
      sorter: true,
      render: undefined,
    },
    {
      tutle: 'Tamaño',
      dataIndex: 'size',
      sorter: false,
      render: undefined,
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      sorter: true,
      render: (record) => <Text> {dateToString(record)}</Text>,
    },
    {
      title: 'Opciones',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
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
    loading: false,
    // loading: selectors.selectLoading(state),
    // rows: selectors.selectRows(state),
    // pagination: selectors.selectPagination(state),
    // filter: selectors.selectFilter(state),
    permissionToEditUsers: authSelectors.selectPermManageProfiles(state),
    permissionToEdit: authSelectors.selectPermManagePets(state),
  };
}

export default connect(select)(PetListTable);
