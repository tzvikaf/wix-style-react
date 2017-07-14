import React, {Component} from 'react';
import {node, object} from 'prop-types';

class AnimatorChild extends Component {
  render() {
    const {children, helper} = this.props;
    const {layer1, layer2, layer3} = helper.getClass();
    return (
      <div className={layer1}>
        <div className={layer2}>
          <div className={layer3}>
            {children}
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
