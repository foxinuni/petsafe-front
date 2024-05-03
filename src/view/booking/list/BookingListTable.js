import { Table, Popconfirm } from 'antd';
import actions from 'modules/booking/list/bookingListActions';
import selectors from 'modules/booking/list/bookingListSelectors';
import model from 'modules/booking/bookingModel';
import bookingSelectors from 'modules/booking/bookingSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';
import ButtonLink from 'view/shared/styles/ButtonLink';
import UserListItem from 'view/user/list/UserListItem';
import PetListItem from 'view/pet/list/PetListItem';

const { fields } = model;

class BookingListTable extends Component {
  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;

    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  doDestroy = (id) => {
    const { dispatch } = this.props;
    //  dispatch(destroyActions.doDestroy(id));
  };

  columns = [
    fields.id.forTable(),
    fields.owner.forTable({
      render: (value) => <UserListItem value={value} />,
    }),
    fields.pet.forTable({
      render: (value) => <PetListItem value={value} />,
    }),
    fields.arrival.forTable(),
    fields.departure.forTable(),
    fields.status.forTable(),
    fields.fee.forTable(),
    fields.createdAt.forTable(),
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/booking/${record.id}`}>{'Ver'}</Link>
          {this.props.hasPermissionToEdit && (
            <Link to={`/booking/${record.id}/edit`}>
              {'Editar'}
            </Link>
          )}
          {this.props.hasPermissionToDestroy && (
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
    console.log('render desde BookingListTable');
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
    hasPermissionToEdit:
      bookingSelectors.selectPermissionToEdit(state),
    hasPermissionToDestroy:
      bookingSelectors.selectPermissionToDestroy(state),
  };
}

export default connect(select)(BookingListTable);
