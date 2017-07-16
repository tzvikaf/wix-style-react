import React, {Component} from 'react';
import {node, object, any} from 'prop-types';

const Content = ({type, newProps, sonOfChild}) => {
  return React.createElement(type, newProps, sonOfChild);
};

Content.propTypes = {
  type: any,
  newProps: object,
  sonOfChild: node,
};

class AnimatorChild extends Component {
  render() {
    const {children, helper} = this.props;
    const {layer1, layer2, layer3} = helper.getClass();
    return (
      <div className={layer1} style={helper.getStyle()}>
        <div className={layer2}>
          <div className={layer3}>
            <Content {...helper.getContentProps()}>{children}</Content>
          </div>
        </div>
      </div>
    );
  }
}

AnimatorChild.propTypes = {
  children: node,
  helper: object
};

export default AnimatorChild;
