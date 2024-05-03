import { Table, Popconfirm } from 'antd';
import actions from 'modules/pet/list/petListActions';
import selectors from 'modules/pet/list/petListSelectors';
import model from 'modules/pet/petModel';
import petSelectors from 'modules/pet/petSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';
import ButtonLink from 'view/shared/styles/ButtonLink';
import UserListItem from 'view/user/list/UserListItem';

const { fields } = model;

class PetListTable extends Component {
  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;

    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  doDestroy = (id) => {
    const { dispatch } = this.props;
    // dispatch(destroyActions.doDestroy(id));
  };

  columns = [
    fields.id.forTable(),
    fields.owner.forTable({
      render: (value) => <UserListItem value={value} />,
    }),
    fields.name.forTable(),
    fields.type.forTable(),
    fields.breed.forTable(),
    fields.size.forTable(),
    fields.createdAt.forTable(),
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/pet/${record.id}`}>{'Ver'}</Link>
          {this.props.hasPermissionToEdit && (
            <Link to={`/pet/${record.id}/edit`}>
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
    const { pagination, rows, loading } = this.props;
    console.log('render desde PetListTable');
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
      petSelectors.selectPermissionToEdit(state),
    hasPermissionToDestroy:
      petSelectors.selectPermissionToDestroy(state),
  };
}

export default connect(select)(PetListTable);
