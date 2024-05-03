import React, { Component } from 'react';
import { connect } from 'react-redux';
import actionsRoles from 'modules/rol/rolActions';
import selectorAuth from 'modules/auth/authSelectors';
import { Table, Tooltip, Tag, Popconfirm } from 'antd';
import rolSelectors from 'modules/rol/rolSelectors';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';
import ButtonLink from 'view/shared/styles/ButtonLink';

class RolesTable extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionsRoles.getAllRoles(this.props.token));
  }

  doDestroy = (id) => {
    const { dispatch } = this.props;
    dispatch(actionsRoles.doDestroy(id, this.props.token));
  };

  columns = [
    {
      title: 'name',
      render: (_, record) => (
        <div className="table-actions">
          <p>{record.label}</p>
        </div>
      ),
    },
    {
      title: 'Estado',
      render: (disabled, record) => {
        if (record.type === 'role') {
          return;
        }

        const color = disabled ? 'red' : 'green';
        return (
          <Tag color={color}>
            {disabled ? 'Inactivo' : 'Activo'}
          </Tag>
        );
      },
    },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          {this.props.hasPermissionToEdit && (
            <Link to={`/roles/${record.id}/edit`}>
              {'Editar'}
            </Link>
          )}
          {this.props.hasPermissionToEdit && (
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
          scroll={{ x: true }}
        />
      </TableWrapper>
    );
  }
}

function select(state) {
  return {
    loading: rolSelectors.selectLoading(state),
    rows: rolSelectors.selectRoles(state),
    token: selectorAuth.selectToken(state),
    hasPermissionToEdit:
      rolSelectors.selectPermissionToEdit(state),
  };
}

export default connect(select)(RolesTable);
