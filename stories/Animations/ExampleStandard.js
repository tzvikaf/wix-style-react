import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Input from '../../src/Input';
import {Container, Row, Col, Card} from '../../src/Grid';
import {FadeAnimation, ScaleAnimation, SlideAnimation} from '../../src/Animations';
import {SlideDirection} from '../../src/Animations/SlideAnimation';
import ToggleSwitch from '../../src/ToggleSwitch';
import Dropdown from '../../src/Dropdown';
import Animator from '../../src/Animations/Animator';

class AnimatedExample extends React.Component {

  options;

  constructor(props) {
    super(props);
    this.state = {
      showComponents: true,
      opacity: true,
      scale: true,
      sequenceDelay: true,
      translate: false,
      timing: 'large',
      show: true
    };

    this.options = [
      {id: 'micro', value: 'Micro'},
      {id: 'small', value: 'Small'},
      {id: 'medium', value: 'Medium'},
      {id: 'large', value: 'Large'},
      {id: 'none', value: 'None'}
    ];

  }

  render() {
    return (
      <div style={{height: '250px'}}>
        <Container>
          <Row> <Col span="">Animation component </Col></Row>
          <Row>
            <Col span="2">
              <Row>
                <ToggleSwitch checked={this.state.show} onChange={() => this.setState({show: !this.state.show})}/> Show
                Element
              </Row>
              <Row>
                <ToggleSwitch checked={this.state.opacity}
                              onChange={() => this.setState({opacity: !this.state.opacity})}/> Opacity
              </Row>
              <Row>
                <ToggleSwitch checked={this.state.scale}
                              onChange={() => this.setState({scale: !this.state.scale})}/> Scale
              </Row>
              <Row>
                <ToggleSwitch checked={this.state.translate}
                              onChange={() => this.setState({translate: !this.state.translate})}/> Translate
              </Row>
              <Row>
                <ToggleSwitch checked={this.state.sequenceDelay}
                              onChange={() => this.setState({sequenceDelay: !this.state.sequenceDelay})}/> Sequence Delay
              </Row>
              <Row>
                Timing
                <Dropdown
                  selectedId="large"
                  onSelect={option => this.setState({timing: option.id})}
                  options={this.options}
                />
              </Row>
            </Col>
            <Col span="10">
              <pre>&lt;Animator{this.state.timing ? ` timing="${this.state.timing}"` : ''}{this.state.opacity ? ' opacity' : ''}{this.state.scale ? ' scale' : ''}{this.state.translate ? ' translate' : ''}{this.state.sequenceDelay ? ' sequenceDelay' : ''}&gt;&lt;/Animator&gt;</pre>
              <br />
              <div style={{width: '70px'}}>
                <Animator opacity={this.state.opacity}
                          scale={this.state.scale}
                          translate={this.state.translate}
                          sequenceDelay={this.state.sequenceDelay}
                          timing={this.state.timing === 'none' ? false : this.state.timing}>
                {this.state.show && <div>The content!!</div>}
                </Animator>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default () =>
  <AnimatedExample/>
