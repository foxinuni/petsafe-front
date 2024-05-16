import { Table, Popconfirm, Tag, Typography, Avatar } from 'antd';
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
import selectorAuth from 'modules/auth/authSelectors';

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
        this.props.currentUser,
      ),
    );
  };

  doDestroy = (id) => {
    const { dispatch } = this.props;
    dispatch(petActions.destroy(id, this.props.token));
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
              'https://i.pinimg.com/474x/46/5d/f2/465df2e54f32abdc771e704db608e313.jpg'
            }
            alt="avatar"
          />
        );
      },
    },
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
          {((this.props.permissionToReservSelf ||
            this.props.permissionToReservManage) && (
            <Link to={`/reservation/${record.id}/new`}>{'Reservar'}</Link>
          )) ||
            null}
          {((this.props.permissionToEdit || this.props.permissionSelfPets) && (
            <Link to={`/pet/${record.id}/edit`}>{'Editar'}</Link>
          )) ||
            null}
          {((this.props.permissionToEdit || this.props.permissionSelfPets) && (
            <Popconfirm
              title={'Estas seguro?'}
              onConfirm={() => this.doDestroy(record.id)}
              okText={'Si'}
              cancelText={'No'}
            >
              <ButtonLink>{'Eliminar'}</ButtonLink>
            </Popconfirm>
          )) ||
            null}
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
    permissionSelfPets: authSelectors.selectPermSelfPets(state),
    token: authSelectors.selectToken(state),
    currentUser: selectorAuth.selectCurrentUser(state),
  };
}

export default connect(select)(PetListTable);
