import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animator';
import {Container, Row, Col} from '../../src/Grid';
import * as css from './Example.scss';
import Dropdown from '../../src/Dropdown';

class ExampleDebug extends React.Component {

  options;

  constructor(props) {
    super(props);

    this.state = {
      debug: false
    };

    this.options = [
      {id: 'enter', value: 'enter'},
      {id: 'entering', value: 'entering'},
      {id: 'entered', value: 'entered'},
      {id: 'leave', value: 'leave'},
      {id: 'leaving', value: 'leaving'}
    ];
  }

  render() {

    return (
      <Container>
        <Row>
          <Col span="2">
            <Dropdown
              placeholder="Choose Debug Phase"
              selectedId={this.state.translateSizeIn}
              onSelect={option => this.setState({debug: option.id})}
              options={this.options}
            />
          </Col>
          <Col span="10">
            <div className={css.basicWrapper}>
              <Animator translate scale opacity debug={this.state.debug}>
                <div className={css.basicDiv}>{this.state.debug ? ` emulates the ${this.state.debug} phase` : '<--- Waiting for you to choose a debug phase'}</div>
              </Animator>
              <Animator opacity scale>
                {this.state.debug === 'leaving' && <div style={{fontSize: '16px', width: '300px'}}>{`<----`} Because it is debug mode the Element is only hiding but did not unmount. you can still see it in the devtools</div>}
              </Animator>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
;

export default () =>
  <ExampleDebug/>

