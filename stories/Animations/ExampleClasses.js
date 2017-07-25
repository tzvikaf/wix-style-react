import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animator';
import * as css from './Example.scss';
import AnimationTemplate from './AnimationTemplate';
import {Container, Row, Col} from '../../src/Grid';


const ExampleClasses = ({show}) => {
  return (
    <Row>
      <Col span="12">
        <Row>
          <div className={css.basicWrapper}>
            <Animator opacity className={css.flexParent}>
              {show && <div childClassName={css.flexGrow1} className={css.basicDiv}>We are flex children</div>}
              {show && <div childClassName={css.flexGrow1} childStyle={{color: 'red'}} className={css.basicDiv}>We have flex-grow:1, I have red inline style</div>}
              {show && <div childClassName={`${css.flexGrow1} ${css.flexGrow4}`} className={css.basicDiv}>except me, I have flex-grow: 10</div>}
            </Animator>
          </div>
        </Row>
        <Row>
          <div style={{fontSize: '18px', lineHeight: '24px'}}>
            Pay attentions that the data of childClassName and childStyle will be placed on the top level of the
            Animation
            Children and it is designated to interact with the Animator's className prop (for flex and maybe other
            purposes).
            These classes will not be included in the animation and they must be used carefully. For your content's
            design
            use regular className on YOUR div or inside your custom component
          </div>
        </Row>
      </Col>
    </Row>
  )
};

export default () =>
  <AnimationTemplate>
    <ExampleClasses/>
  </AnimationTemplate>

