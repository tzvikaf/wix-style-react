import React, {Component} from 'react';
import {node, string, object, any} from 'prop-types';

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
    const {style1, style2, style3} = helper.getStyle(this.props.animationPhase.get());
    return (
      <div className={layer1} style={style1}>
        <div className={layer2} style={style2}>
          <div className={layer3} style={style3}>
            <Content {...helper.getContentProps()}>{children}</Content>
          </div>
        </div>
      </div>
    );
  }
}

AnimatorChild.propTypes = {
  children: node,
  helper: object,
  animationPhase: string
};

export default AnimatorChild;
