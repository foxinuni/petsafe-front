import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import authActions from 'modules/auth/authActions';
import authSelectors from 'modules/auth/authSelectors';
import layoutActions from 'modules/layout/layoutActions';
import { connect } from 'react-redux';
import HeaderWrapper from 'view/layout/styles/HeaderWrapper';
import layoutSelectors from 'modules/layout/layoutSelectors';
import { getHistory } from 'modules/store';

const { Header: AntHeader } = Layout;

class Header extends Component {
  doSignout = () => {
    const { dispatch } = this.props;
    dispatch(authActions.doSignout());
  };

  doNavigateToProfile = () => {
    getHistory().push('/profile');
  };

  doToggleMenu = () => {
    const { dispatch } = this.props;
    dispatch(layoutActions.doToggleMenu());
  };

  render() {
    console.log('render desde Header');
    return (
      <HeaderWrapper>
        <AntHeader
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            background: '#f0f2f5',
          }}
        >
          <UserOutlined
            className="trigger"
            onClick={this.doToggleMenu}
          />
          <Dropdown
            className="user-dropdown"
            menu={{
              onClick: (info) => {
                if (info.key === 'profile') {
                  this.doNavigateToProfile();
                }
                if (info.key === 'signout') {
                  this.doSignout();
                }
              },
              items: [
                {
                  key: 'profile',
                  label: (
                    <>
                      <UserOutlined />
                      {'Editar perfil'}
                    </>
                  ),
                  onClick: () => this.doNavigateToProfile(),
                },
                {
                  type: 'divider',
                },
                {
                  key: 'signout',
                  label: (
                    <>
                      <UserOutlined />
                      {'Salir'}
                    </>
                  ),
                  onClick: () => this.doSignout(),
                },
              ],
            }}
            trigger={['click']}
            placement="bottomRight"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Avatar
                className="user-dropdown-avatar"
                size="small"
                src={
                  'https://media.licdn.com/dms/image/C5603AQEoerUvVlNAqg/profile-displayphoto-shrink_200_200/0/1644726039220?e=2147483647&v=beta&t=ymQESsFHDE-73FHdXfLeJAbmGvAxPqg22yntqPbA12k'
                }
                alt="avatar"
              />
              {this.props.user.name || 'Usuario'}
            </a>
          </Dropdown>
        </AntHeader>
      </HeaderWrapper>
    );
  }
}

const select = (state) => ({
  menuVisible: layoutSelectors.selectMenuVisible(state),
  user: authSelectors.selectCurrentUser(state),
});

export default connect(select)(Header);
