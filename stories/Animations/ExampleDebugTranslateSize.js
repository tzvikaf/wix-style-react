import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animations/Animator';
import * as css from './Example.scss';
import {Container, Row, Col} from '../../src/Grid';


const ExampleTranslateSize = () => {

  const sizes = [0, 10, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <Container>
      <Row>
        <Col span="2">
        </Col>
        <Col span="10">
          <div className={css.basicWrapper} style={{height: '70px', border: '1px solid black'}}>
            {sizes.map((size, index) =>
              (<Animator key={index} translate={{to: 'top', size: size}} debug="enter">
                <div className={css.basicDiv}>{size}%</div>
              </Animator>)
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
};

export default () =>
  <ExampleTranslateSize />
