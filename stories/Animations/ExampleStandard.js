import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import {Container, Row, Col} from '../../src/Grid';
import ToggleSwitch from '../../src/ToggleSwitch';
import Dropdown from '../../src/Dropdown';
import Animator from '../../src/Animations/Animator';


const createSizeArray = (size) => {
  return new Array(size + 1).fill(0).map((element, id) => ({id: id * 10, value: id* 10})).splice(1, size + 1);
}

class AnimatedExample extends React.Component {

  options;

  constructor(props) {
    super(props);
    this.state = {
      showComponents: true,
      opacity: true,
      scale: false,
      sequenceDelay: false,
      translate: true,
      translateSize: 100,
      direction: 'left',
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

    this.sizeOptions = createSizeArray(10);
    this.directionOptions = [
      {id: 'TOP', value: 'Top'},
      {id: 'BOTTOM', value: 'Bottom'},
      {id: 'LEFT', value: 'Left'},
      {id: 'RIGHT', value: 'Right'},
    ]

  }

  myToggle(option) {
    return (
      <div>
        <ToggleSwitch checked={this.state[option]} onChange={() => this.setState({[option]: !this.state[option]})}/>
        {option}
      </div>
  )
  }

  render() {
    return (
      <div style={{height: '250px'}}>
        <Container>
          <Row> <Col span="">Animation component </Col></Row>
          <Row>
            <Col span="4">
              <Row>
                <ToggleSwitch checked={this.state.show} onChange={() => this.setState({show: !this.state.show})}/> Show
                Element
              </Row>
              <Row>
                {this.myToggle('opacity')}
              </Row>
              <Row>
                {this.myToggle('scale')}
              </Row>
              <Row>
                {this.myToggle('translate')}
              </Row>
              {this.state.translate && <Row>
                <Col span="12">
                  Translate Options
                </Col>
                <Col span="6">
                  Size
                  <Dropdown
                    selectedId={100}
                    onSelect={option => this.setState({translateSize: option.id})}
                    options={this.sizeOptions}
                  />
                </Col>
                <Col span="6">
                  Direction
                  <Dropdown
                    selectedId="TOP"
                    onSelect={option => this.setState({direction: option.id})}
                    options={this.directionOptions}
                  />
                </Col>
              </Row>}
              <Row>
                {this.myToggle('sequenceDelay')}
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
            <Col span="8">
              <pre>&lt;Animator{this.state.timing ? ` timing="${this.state.timing}"` : ''}{this.state.opacity ? ' opacity' : ''}{this.state.scale ? ' scale' : ''}{this.state.translate ? ` translate={{size: ${this.state.translateSize}, to: "${this.state.direction}"}}` : ''}{this.state.sequenceDelay ? ' sequenceDelay' : ''}&gt;&lt;
                /Animator&gt;</pre>
              <br />
              <div style={{width: '70px'}}>
                <Animator opacity={this.state.opacity}
                          scale={this.state.scale}
                          translate={this.state.translate ? {to: this.state.direction, size: this.state.translateSize} : false}
                          sequenceDelay={this.state.sequenceDelay}
                          timing={this.state.timing === 'none' ? false : this.state.timing}>
                  {this.state.show && <div>The content!!</div>}
                  {this.state.show && <div>The content!!</div>}
                  {this.state.show && <div>The content!!</div>}
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
