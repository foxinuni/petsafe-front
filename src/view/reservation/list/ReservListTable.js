import { Table, Popconfirm, Typography } from 'antd';
import actions from 'modules/reservation/reservListActions';
import { selectors } from 'modules/reservation/reservListActions';
import authSelectors from 'authorization/authorizationSelector';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';
import { dateToString } from 'modules/shared/dates';

const { Text } = Typography;

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
      title: 'Creador',
      dataIndex: 'creator',
      sorter: true,
      render: undefined,
    },
    {
      title: 'Mascota',
      dataIndex: 'pet',
      sorter: true,
      render: undefined,
    },
    {
      title: 'Llegada',
      dataIndex: 'arrival',
      sorter: false,
      render: (record) => <Text> {dateToString(record)}</Text>,
    },
    {
      title: 'Salida',
      dataIndex: 'departure',
      sorter: false,
      render: (record) => <Text> {dateToString(record)}</Text>,
    },
    {
      title: 'Opciones',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/reservation/${record.id}`}>{'Ver'}</Link>
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
