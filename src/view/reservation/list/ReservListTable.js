import { Table, Popconfirm } from 'antd';
import actions from 'modules/reservation/reservListActions';
import { selectors } from 'modules/reservation/reservListActions';
import authSelectors from 'authorization/authorizationSelector';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';

class ReservListTable extends Component {
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
      title: 'Mascota',
      dataIndex: 'pet',
      sorter: true,
      render: (record) => {
        return this.props.permissionToEditPets ? (
          <div key={record.id}>
            <Link to={`/pet/${record.id}`}>{record.label}</Link>
          </div>
        ) : (
          <div key={record.id}>{record.label}</div>
        );
      },
    },
    {
      title: 'Llegada',
      dataIndex: 'arrival',
      sorter: false,
      render: undefined,
    },
    {
      title: 'Salida',
      dataIndex: 'departure',
      sorter: false,
      render: undefined,
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      sorter: false,
      render: undefined,
    },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/reservation/${record.id}`}>{'Ver'}</Link>
          {this.props.permissionToEdit && (
            <Link to={`/booking/${record.id}/edit`}>{'Editar'}</Link>
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
    token: authSelectors.selectToken(state),
    permissionToEditUsers: authSelectors.selectPermManageProfiles(state),
    permissionToEditPets: authSelectors.selectPermManagePets(state),
    permissionToEdit: authSelectors.selectPermManageReserv(state),
  };
}

export default connect(select)(ReservListTable);
