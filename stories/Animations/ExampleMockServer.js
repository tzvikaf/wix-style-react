import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animations/Animator';
import * as css from './Example.scss';
import AnimationTemplate from './AnimationTemplate';

const Item = () => 'I am an item from the Server';
class ExampleMockServer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentWillReceiveProps({show}) {
    this.state.items.splice(0, this.state.items.length);
    if (show) {

      setTimeout(() => {
        this.state.items.push({content: 'Some Item', index: 0});
        this.state.items.push({content: 'Some Item', index: 1});
        this.state.items.push({content: 'Some Item', index: 2});
        this.state.items.push({content: 'Some Item', index: 3});
        this.state.items.push({content: 'Some Item', index: 4});
        this.setState({
          items: this.state.items
        });
      }, 300);
    } else {
      setTimeout(() => {
        this.state.items.push({content: 'Loading...', index: 15});
        this.setState({
          items: this.state.items
        });
      }, 300);
    }
  }

  render() {
    return (
      <div className={css.basicWrapper}>
        <Animator opacity sequence translate="top" className={css.flexParent}>
          {this.state.items.map((item, index) =>
            <div key={index} className={css.basicDiv}
                 childStyle={item.childStyle && item.childStyle}>{item.content}</div>
          )}
        </Animator>
      </div>
    )
  }
}
;

export default () =>
  <AnimationTemplate>
    <ExampleMockServer/>
  </AnimationTemplate>

