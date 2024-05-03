import { Layout as AntLayout, Menu as AntMenu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import SiderWrapper from 'view/layout/styles/SiderWrapper';
import { Link } from 'react-router-dom';
import authSelectors from 'modules/auth/authSelectors';
import { connect } from 'react-redux';
import PermissionChecker from 'modules/auth/permissionChecker';
import actions from 'modules/layout/layoutActions';
import layoutSelectors from 'modules/layout/layoutSelectors';
import routes from 'view/routes';
const { Sider } = AntLayout;

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
  }

  componentDidMount() {
    this.toggleMenuOnResize();
    window.addEventListener(
      'resize',
      this.toggleMenuOnResize,
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      this.toggleMenuOnResize,
    );
  }

  toggleMenuOnResize = () => {
    window.innerWidth < 576
      ? this.hideMenu()
      : this.showMenu();
  };

  get selectedKeys() {
    const url = this.props.url;

    const match = routes.privateRoutes.find((option) => {
      if (option.menu.exact) {
        return url === option.path;
      }

      return url.startsWith(option.path);
    });

    if (match) {
      return [match.path];
    }

    return null;
  }

  hideMenu = () => {
    const { dispatch } = this.props;
    dispatch(actions.doHideMenu());
  };

  showMenu = () => {
    const { dispatch } = this.props;
    dispatch(actions.doShowMenu());
  };

  match = (permission) => {
    const permissionChecker = new PermissionChecker(
      this.props.currentUser,
    );

    return permissionChecker.match(permission);
  };

  render() {
    return (
      <SiderWrapper
        style={{
          display: this.props.menuVisible
            ? 'block'
            : 'none',
          minHeight: '100vh', // Ensure the sidebar covers the whole height
        }}
      >
        <Sider
          theme="dark" // Changed theme to dark for a different visual effect
          trigger={null}
          collapsible
          collapsed={!this.props.menuVisible}
          style={{ background: '#30404d' }} // Custom background color
        >
          <div
            className="logo"
            style={{
              padding: '10px',
              background: '#263238',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h2 style={{ color: 'white' }}>{'Pet safe'}</h2>
          </div>

          <AntMenu
            theme="dark"
            mode="inline"
            selectedKeys={this.selectedKeys}
            style={{
              background: '#30404d',
              color: 'white',
            }} // Ensuring consistent color styling
          >
            {routes.privateRoutes
              .filter((privateRoute) => !!privateRoute.menu)
              .filter((privateRoutes) =>
                this.match(
                  privateRoutes.permissionRequired,
                ),
              )
              .map((privateRoute) => (
                <AntMenu.Item
                  key={privateRoute.path}
                  icon={<UserOutlined />}
                >
                  <Link to={privateRoute.path}>
                    {privateRoute.label}
                  </Link>
                </AntMenu.Item>
              ))}
          </AntMenu>
        </Sider>
      </SiderWrapper>
    );
  }
}

const select = (state) => ({
  currentUser: authSelectors.selectCurrentUser(state),
  menuVisible: layoutSelectors.selectMenuVisible(state),
});

export default connect(select)(Menu);
