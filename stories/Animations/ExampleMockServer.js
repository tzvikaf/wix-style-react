import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animator';
import * as css from './Example.scss';
import AnimationTemplate from './AnimationTemplate';

const Item = () => <div className={css.basicDiv}>I am an Item</div>;

class ExampleMockServer extends React.Component {

  to;

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoader: !props.show
    };

    this.to = {in: 'top', out: 'bottom'};
  }

  componentWillReceiveProps({show}) {
    if (show) {
      this.setState({
        items: new Array(5).fill(1).map((_, index) => <Item key={index}/>)
      });
    } else {
      this.setState({
        items: []
      })
    }

    this.setState({isLoader: !show})
  }

  render() {

    const {to} = this;

    return (
      <div style={{height: '70px', display: 'flex'}}>
        <Animator opacity sequence translate={{to}} className={`${css.flexParent}`}>
          {this.state.isLoader && <div style={{fontSize: '25px', textAlign: 'center'}}>Loading....</div>}
        </Animator>
        <Animator opacity sequence translate={{to}} className={`${css.flexParent} ${css.absolute}`}>
          {this.state.items}
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

