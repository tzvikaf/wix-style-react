import React, {Component} from 'react';
import Tooltip2 from '../../../src/Tooltip/Tooltip2';
import Tooltip from '../../../src/Tooltip/Tooltip.js';

export default class TooltipExample extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {
      message: 'just a message',
      height: 0,
      showTooltip2: true,
      offset: {x: 0, y: 0},
      width: 300
    };
  }

  render() {
    const content = (
      <div style={{background: 'red'}}>Tooltip content</div>
    );

    return (
      <div ref='wrapper'>
        <div style={{width: 600, height: this.state.height}}/>
          <Tooltip2 content='שלום עולם שלום עולם' placement='bottom' alignment='center' theme='dark' showTrigger='mouseenter' hideTrigger='mouseleave' moveBy={this.state.offset} zIndex={30} textAlign='center'>
            {/* <button onClick={() => this.setState({offset: {x: 100, y: 100}})}>set offset</button> */}
            <div style={{width: this.state.width, height: 200, background: 'gray'}}>
              <button onClick={() => this.setState({showTooltip2: !this.state.showTooltip2})}>show/hide</button>
              <button onClick={() => this.setState({offset: {x: 100, y: 100}})}>set offset</button>
              <button onClick={() => this.setState({width: 600})}>set width</button>
            </div>
          </Tooltip2>

        <div style={{overflowY: 'scroll', height: 200, width :400}}>
          <Tooltip bounce content={this.state.message} showTrigger='custom' hideTrigger='custom' active>
          <div style={{position: 'relative', top: 150, left: 50, width: 300, height: 200, background: 'gray'}}>
            <button onClick={() => this.setState({message: this.state.message.split('').reverse().join('')})}>click</button>
            <br/><br/><br/>
            <button onClick={() => this.setState({height: this.state.height ? 0 : 100})}>push</button>
          </div>
        </Tooltip>
        </div>
      </div>
    );
  }
}
