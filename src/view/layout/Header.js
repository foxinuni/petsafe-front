import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import {
  UserOutlined,
  CloseOutlined,
  DoubleLeftOutlined,
} from '@ant-design/icons';
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
    return (
      <HeaderWrapper>
        <AntHeader
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            background: '#fffff',
          }}
        >
          <DoubleLeftOutlined className="trigger" onClick={this.doToggleMenu} />
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
                      <CloseOutlined />
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
                  'https://c1.klipartz.com/pngpicture/1022/1004/sticker-png-happy-face-emoji-smiley-emoticon-apple-color-emoji-sticker-art-emoji-face-with-tears-of-joy-emoji-web-design.png'
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
