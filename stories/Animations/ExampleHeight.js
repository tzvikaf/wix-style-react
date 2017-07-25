import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animator';
import * as css from './Example.scss';
import AnimationTemplate from './AnimationTemplate';
import {Container, Row, Col} from '../../src/Grid';

const HeightExample = ({show}) => {
  return (
    <Container>
      <Row>
        <Col span="6">
          <div style={{height: 'auto', border: '1px solid black', padding: '10px 20px 20px'}}>
            <Animator opacity height>
              {show &&
              <div style={{fontSize: '20px', background: 'beige', padding: '20px'}}>I have height={'{'}true{'}'} so animator guess the right height for me. use me *only* if you don't know the height</div>}
            </Animator>
            <div>I am some casual text here</div>
          </div>
        </Col>
        <Col span="6">
          <div style={{height: 'auto', border: '1px solid black', padding: '10px 20px 20px'}}>
            <Animator opacity height={110}>
              {show &&
              <div style={{fontSize: '20px', background: 'beige', padding: '20px', height: '110px'}}>I have height={`{110}`} so animator animates to that specific height. This method is much more stable than the other!!</div>}
            </Animator>
            <div>I am some casual text here</div>
          </div>
        </Col>
      </Row>
    </Container>
  )
};

export default () =>
  <AnimationTemplate>
    <HeightExample/>
  </AnimationTemplate>

