import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animations/Animator';
import * as css from './Example.scss';
import AnimationTemplate from './AnimationTemplate';


const ExampleTranslate = ({show}) => {
  return (
    <div>
      <div className={css.basicWrapper}>
        <Animator opacity translate="bottom">
          {show && <div className={css.basicDiv}>translate="top" </div>}
        </Animator>
        <Animator opacity translate={{to: 'right'}}>
          {show && <div className={css.basicDiv}>{`translate={{to: 'right'}}`}</div>}
        </Animator>
        <Animator opacity translate={{to: 'left', size: '100vh'}}>
          {show && <div className={css.basicDiv}>{`translate={{to: 'left', size: '100vh'}}`} </div>}
        </Animator>
        <Animator opacity translate={{to: 'top', size: {in: '100%', out: '60px'}}}>
          {show && <div className={css.basicDiv}>{`translate={{to: 'top', size: {in: '100%', out: '60px'}}}`} </div>}
        </Animator>
      </div>
      <div className={css.basicWrapper}>
        <Animator opacity translate={{to: {in: 'top'}, size: '100px'}}>
          {show && <div className={css.basicDiv}>{`translate={{to: {in: 'top'}, size: '100px'}}`} </div>}
        </Animator>
        <Animator opacity translate={{to: {in: 'top', out: 'bottom'}, size: '100%'}}>
          {show && <div className={css.basicDiv}>{`translate={{to: {in: 'top', out: 'bottom'}, size: '100%'}}`} </div>}
        </Animator>
      </div>
    </div>
  )
};

export default () =>
  <AnimationTemplate>
    <ExampleTranslate/>
  </AnimationTemplate>

