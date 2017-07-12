import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import {Container, Row, Col} from '../../src/Grid';
import ToggleSwitch from '../../src/ToggleSwitch';
import Dropdown from '../../src/Dropdown';
import Animator from '../../src/Animations/Animator';


const createSizeArray = (size) => {
  return new Array(size + 1).fill(0).map((element, id) => ({id: id * 10, value: id * 10})).splice(1, size + 1);
}

const MockDiv = ({children, height = '40px', width = '100px', background = 'beige'}) => {
  return (<div style={{height, width, background, overflow: 'hidden'}}>{children}</div>);
}

class AnimatedExample extends React.Component {

  options;

  constructor(props) {
    super(props);
    this.state = {
      opacity: true,
      scale: false,
      height: false,
      width: false,
      translate: false,
      sequenceDelay: true,
      reverse: false,
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
      {id: 'debug', value: 'Debug'},
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

  getSequenceDelayValue() {
    if (!this.state.sequenceDelay) {
      return false;
    }
    return this.state.reverse ? 'reverse' : true;
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
                {this.myToggle('height')}
              </Row>
              <Row>
                {this.myToggle('width')}
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
                {this.state.sequenceDelay && <span><ToggleSwitch checked={this.state.reverse}
                                                                 onChange={() => this.setState({reverse: !this.state.reverse})}/>Reverse Sequence</span> }
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
              <pre>&lt;Animator
                {this.state.timing ? ` timing="${this.state.timing}"` : ''}
                {this.state.opacity ? ' opacity' : ''}
                {this.state.scale ? ' scale' : ''}
                {this.state.height ? ' height' : ''}
                {this.state.width ? ' width' : ''}
                {this.state.translate ? ` translate={{size: ${this.state.translateSize}, to: "${this.state.direction}"}}` : ''}
                {this.state.sequenceDelay ? ' sequenceDelay' : ''}{this.state.sequenceDelay && this.state.reverse ? '="reverse"' : ''}
                &gt;&lt;/Animator&gt;</pre>
              <br />
              <div style={{width: '200px'}}>
                <Animator opacity={this.state.opacity}
                          scale={this.state.scale}
                          height={this.state.height}
                          width={this.state.width}
                          translate={this.state.translate ? {
                              to: this.state.direction,
                              size: this.state.translateSize
                            } : false}
                          sequenceDelay={this.getSequenceDelayValue()}
                          timing={this.state.timing === 'none' ? false : this.state.timing}>
                  {this.state.show && <MockDiv>Some Content in Here</MockDiv>}
                  {this.state.show && <MockDiv>Some Content in Here</MockDiv>}
                  {this.state.show && <MockDiv>Some Content in Here</MockDiv>}
                  {this.state.show && <MockDiv>Some Content in Here</MockDiv>}
                  {this.state.show && <MockDiv>Some Content in Here</MockDiv>}
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
