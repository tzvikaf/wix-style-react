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
      showTooltip2: true
    };
  }

  render() {
    const content = (
      <div style={{background: 'red'}}>Tooltip content</div>
    );

    return (
      <div ref='wrapper'>
        <div style={{width: 600, height: this.state.height}}/>
        <Tooltip2 content={content} placement='right' alignment='center' theme='dark' showTrigger='mouseleave' hideTrigger='mouseenter' active={this.state.showTooltip2}>
          <div style={{position: 'relative', top: 150, left: 550, width: 300, height: 200, background: 'gray'}}>
            <button onClick={() => this.setState({showTooltip2: !this.state.showTooltip2})}>show/hide</button>
          </div>
        </Tooltip2>

        <div>
          <Tooltip content={this.state.message} showTrigger='mouseleave' hideTrigger='mouseenter'>
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
