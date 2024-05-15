import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectors } from 'modules/user/userListActions';
import actions from 'modules/user/userListActions';
import authSelectors from 'authorization/authorizationSelector';
import { Table, Tag, Avatar, Typography } from 'antd';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';
import { dateToString } from 'modules/shared/dates';

const { Text } = Typography;
class UserUsersTable extends Component {
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

  columns = [
    {
      title: 'Avatar',
      sorter: false,
      dataIndex: 'avatar',
      render: (_, record) => {
        return (
          <Avatar
            src={
              'https://static.vecteezy.com/system/resources/previews/004/274/186/non_2x/person-icon-user-interface-icon-silhouette-of-man-simple-symbol-a-glyph-symbol-in-your-web-site-design-logo-app-ui-webinar-video-chat-ect-vector.jpg'
            }
            alt="avatar"
          />
        );
      },
    },

    {
      title: 'Correo',
      sorter: false,
      dataIndex: 'email',
      render: undefined,
    },
    {
      title: 'Nombre completo',
      sorter: false,
      dataIndex: 'name',
      render: undefined,
    },
    {
      title: 'Rol',
      dataIndex: 'rol',
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
          {this.props.permissionToManage && (
            <Link to={`/user/${record.id}/edit`}>{'Editar'}</Link>
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
    permissionToManage: authSelectors.selectPermManageProfiles(state),
    token: authSelectors.selectToken(state),
  };
}

export default connect(select)(UserUsersTable);
