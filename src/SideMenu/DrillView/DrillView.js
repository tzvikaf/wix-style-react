import React, {Children} from 'react';
import WixComponent from '../../BaseComponents/WixComponent';
import {string, node, bool} from 'prop-types';
import SideMenu from '../core/SideMenu';
import Animator from '../../Animations/Animator';
import styles from './DrillView.scss';

const SlideDirection = {
  left: 'left',
  right: 'right'
};

class SideMenuDrill extends WixComponent {
  constructor(props) {
    super(props);

    const state = {
      menus: {},
      currentMenuId: this.props.menuKey,
      previousMenuId: null,
      showMenuA: true,
      slideDirection: SlideDirection.right
    };

    this.processChildren({props: this.props}, state);
    this.state = state;
  }

  componentWillReceiveProps(nextProps) {
    const state = {
      menus: {}
    };

    this.processChildren({props: nextProps}, state);
    this.setState(state);
  }

  setSelectedItemMenu(selectedItemMenuId, state) {
    // initial selected menu
    if (!this.state) {
      Object.assign(state, {currentMenuId: selectedItemMenuId, selectedItemMenuId});
      return;
    }

    // returning to an already selected menu item (force nav)
    if (this.lastClickedMenuKey === selectedItemMenuId) {
      this.navigateToMenu(selectedItemMenuId, SlideDirection.left);
      this.lastClickedMenuKey = null;
    }

    if (this.state.selectedItemMenuId === selectedItemMenuId) {
      return;
    }

    this.setState({selectedItemMenuId});
    if (this.state.currentMenuId !== selectedItemMenuId) {
      this.navigateToMenu(selectedItemMenuId, this.getSlideDirectionTo(selectedItemMenuId));
    }
  }

  getSlideDirectionTo(selectedItemMenuId) {
    const {currentMenuId, menus} = this.state;
    return menus[currentMenuId].level < menus[selectedItemMenuId].level ? SlideDirection.left : SlideDirection.right;
  }

  navigateToMenu(nextMenuId, slideDirection) {
    const previousMenuId = this.state.currentMenuId;
    const showMenuA = !this.state.showMenuA;

    if (nextMenuId === previousMenuId) {
      return;
    }

    this.setState({currentMenuId: nextMenuId, previousMenuId, showMenuA, slideDirection});
  }

  clickFirstClickableChild(item, event) {
    let found = false;
    if (item.props.onClick) {
      item.props.onClick(event);
      return true;
    }

    Children.forEach(item.props.children, child => {
      if (!found && child.props) {
        found = this.clickFirstClickableChild(child, event);
      }
    });
    return found;
  }

  selectFirstLinkChild(menu, event) {
    let found = false;
    Children.forEach(menu.props.children, child => {
      if (!found && child.type === SideMenuDrill.Link) {
        this.clickFirstClickableChild(child, event);
        found = true;
      }

      if (!found && child.props && child.props.children) {
        this.selectFirstLinkChild(child, event);
      }
    });
  }

  alterMenu(menu, childrenClone, parentMenuKey, isActive) {
    const defaultSubMenProps = {
      isOpen: false,
      onSelectHandler: event => {
        this.lastClickedMenuKey = menu.props.menuKey;
        this.selectFirstLinkChild(menu, event);

        if (menu.props.onSelectHandler) {
          menu.props.onSelectHandler.apply(menu, [event]);
        }
      },
      onBackHandler: event => {
        this.navigateToMenu(parentMenuKey, SlideDirection.right);

        if (menu.props.onBackHandler) {
          menu.props.onBackHandler.apply(menu, [event]);
        }
      },
      isActive
    };

    return React.cloneElement(menu, defaultSubMenProps, childrenClone);
  }

  cloneSubMenu(menu, state, parentMenuKey, childrenClone) {
    const isMenuActive = state.menus[menu.props.menuKey].isActive;
    if (isMenuActive && state.menus[parentMenuKey]) {
      state.menus[parentMenuKey].isActive = true;
    }

    const menuClone = this.alterMenu(menu, childrenClone, parentMenuKey, isMenuActive);
    state.menus[menuClone.props.menuKey].component = menuClone;
    return menuClone;
  }

  cloneChild(menu, state, parentMenuKey, childrenClone) {
    if (menu.type === SideMenuDrill.Link && menu.props.isActive) {
      this.setSelectedItemMenu(parentMenuKey, state);
      state.menus[parentMenuKey].isActive = true;
    }

    if (menu.props.menuKey) {
      return this.cloneSubMenu(menu, state, parentMenuKey, childrenClone);
    }

    return React.cloneElement(menu, {}, childrenClone);
  }

  processChildren(menu, state, parentMenuKey, level = 0) {
    const childrenClone = Children.map(menu.props.children, child => {
      if (child && child.props && child.props.children) {
        const menuKey = menu.props.menuKey || parentMenuKey;

        if (!state.menus[menuKey]) {
          state.menus[menuKey] = {isActive: false, component: null, level};
        }

        return this.processChildren(child, state, menuKey, level + 1);
      }

      return child;
    });

    return this.cloneChild(menu, state, parentMenuKey, childrenClone, level);
  }

  renderNavigation(menu) {
    if (menu.props.menuKey === this.props.menuKey) {
      // Render root items
      return menu.props.children;
    }

    // Render open SubMenu
    return React.cloneElement(menu, {isOpen: true});
  }

  renderMenu(menu) {
    return (
      <div childClassName={styles.drillViewPanel} className={styles.drillViewPanelInner}>
        {this.renderNavigation(menu)}
      </div>
    );
  }

  render() {
    const {menus, currentMenuId, previousMenuId, showMenuA} = this.state;
    const menuAId = showMenuA ? currentMenuId : previousMenuId;
    const menuBId = showMenuA ? previousMenuId : currentMenuId;

    const menuA = menuAId && menus[menuAId].component;
    const menuB = menuBId && menus[menuBId].component;

    return (
      <SideMenu dataHook="drill-view" inFlex={this.props.inFlex}>
        <div className={styles.drillViewContainerWrapper}>
          <div className={`${styles.drillViewContainer} ${!showMenuA && styles.secondMenu}`}>
            <Animator opacity className={styles.drillViewContainer}>
              { showMenuA ? this.renderMenu(menuA) : null }
            </Animator>
            <Animator opacity className={styles.drillViewContainer2}>
              { !showMenuA ? this.renderMenu(menuB) : null }
            </Animator>
          </div>
        </div>
      </SideMenu>
    );
  }
}

SideMenuDrill.defaultProps = {
  inFlex: false,
  menuKey: 'root'
};

SideMenuDrill.propTypes = {
  inFlex: bool,
  menuKey: string,
  children: node
};

export default SideMenuDrill;
