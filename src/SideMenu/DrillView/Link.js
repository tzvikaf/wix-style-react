import React from 'react';
import {node, bool} from 'prop-types';
import NavigationLinkLayout from '../core/navigation/LinkLayout';

const Link = ({children, isActive, badge, ...rest}) => (
  <NavigationLinkLayout isActive={isActive} {...rest}>
    {children}
    {badge}
  </NavigationLinkLayout>
);

Link.defaultProps = {
  isActive: false
};

Link.propTypes = {
  children: node.isRequired,
  isActive: bool,
  badge: node
};

export default Link;
