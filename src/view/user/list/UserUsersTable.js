import React, { Component } from 'react';
import { connect } from 'react-redux';
import userSelectors from 'modules/user/userSelectors';
import selectors from 'modules/user/list/userListSelectors';
import actions from 'modules/user/list/userListActions';
import selectorAuth from 'modules/auth/authSelectors';
import { Table, Tag, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';

class UserUsersTable extends Component {
  handleTableChange = (pagination, _, sorter) => {
    const { dispatch } = this.props;
    const token = this.props.token;
    console.log('en el table change');
    console.log(this.props.filter);
    console.log(sorter);
    dispatch(
      actions.doChangePaginationAndSort(
        pagination,
        this.props.filter,
        sorter,
        token,
        sorter,
      ),
    );
  };

  columns = [
    {
      title: 'Avatar',
      sorter: true,
      dataIndex: 'avatar',
      render: (_, record) => {
        return (
          <Avatar
            src={
              record.avatars && record.avatars.length
                ? record.avatars[0].publicUrl
                : undefined
            }
            alt="avatar"
          />
        );
      },
    },

    {
      title: 'Correo',
      sorter: true,
      dataIndex: 'email',
      render: undefined,
    },
    {
      title: 'Nombre completo',
      sorter: true,
      dataIndex: 'name',
      render: undefined,
    },
    {
      title: 'Estado',
      dataIndex: 'disabled',
      sorter: false,
      render: (disabled) => {
        const color = disabled ? 'red' : 'green';
        return (
          <Tag color={color}>
            {disabled ? 'Inactivo' : 'Activo'}
          </Tag>
        );
      },
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      sorter: true,
      render: undefined,
    },
    {
      title: 'Opciones',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          {this.props.hasPermissionToEdit && (
            <Link to={`/user/${record.id}/edit`}>
              {'Editar'}
            </Link>
          )}
        </div>
      ),
    },
  ];

  render() {
    const { pagination, rows, loading } = this.props;
    console.log('render desde UsersTable');
    console.log(rows);
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
    hasPermissionToEdit:
      userSelectors.selectPermissionToEdit(state),
    token: selectorAuth.selectToken(state),
  };
}

export default connect(select)(UserUsersTable);
