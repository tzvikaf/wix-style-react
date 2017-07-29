import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animator';
import * as css from './Example.scss';
import AnimationTemplate from './AnimationTemplate';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';


class DelayAndNestingExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show2: this.props.show
    }
  }

  componentWillReceiveProps({show}) {
    setTimeout(() => {
      this.setState({show2: show});
    }, 0)
  }

  render() {
    const {show} = this.props;
    return (
      <div className={css.basicWrapper} style={{height: '100px'}}>
        <Animator show={show} height={80} delay={{exit: 300}}>
          <div style={{height: '80px', width: '700px', background: 'aquamarine', fontSize: '18px'}}>
            I am the container
            <Animator show={show} scale opacity delay={{enter: 300}}>
              <div className={css.basicDiv} style={{marginTop: '20px'}}>
                I am an inner child
              </div>
            </Animator>
          </div>
        </Animator>
      </div>
    );
  }
}

export default () =>
  <AnimationTemplate>
    <DelayAndNestingExample/>
  </AnimationTemplate>

class Fade extends React.Component {

  onEnter() {
    console.log('onEnter!');
  }

  onExit() {
    console.log('onExit!');
  }

  render() {

    return (
      <TransitionGroup>
        {React.Children.toArray(this.props.children).map((child) =>
          <CSSTransition
            enter={true}
            exit={true}
            appear={true}
            timeout={1000}
            classNames="shuki"
            onExit={this.onExit}
            onEnter={this.onEnter}
          >
            {child}
        </CSSTransition>
        )}
      </TransitionGroup>
    )
  }
};

class Fake extends React.Component {

  onEnter() {
    console.log('onEnter!');
  }

  onExit() {
    console.log('onExit!');
  }

  render() {

    return (
      <TransitionGroup>
        {React.Children.toArray(this.props.children).map((child) =>
          <CSSTransition
            enter={true}
            exit={true}
            appear={true}
            timeout={1000}
            classNames="shuki"
            onExit={this.onExit}
            onEnter={this.onEnter}
          >
            {child}
          </CSSTransition>
        )}
      </TransitionGroup>
    )
  }
};

//
//
// class Shuki extends React.Component {
//
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       children: false
//     }
//   }
//
//   getMuki() {
//     return this.props.children.props.children[1];
//
//   }
//
//   componentWillReceiveProps(props) {
//     if (props.show) {
//       this.setState({children: props.children});
//     } else {
//       const newChildren = Object.assign({}, props.children);
//       debugger;
//       newChildren.props.children[1] = false;
//       this.setState({children: newChildren});
//       console.log('this will be the false part');
//     }
//   }
//
//   render() {
//     return (
//       <div>
//         {this.state.children}
//       </div>
//     )
//   }
// }
//
// const Muki = () => (<div>I am Muki</div>);
//
// const Example = () => {
//   return (
//     <Foo bar={true/false}>
//       <div>some div</div>
//       <Bar></Bar>
//     </Foo>
//   )
// };
//
// class Foo extends React.Component {
//
//   componentWillReceiveProps({bar}) {
//     if (bar) {
//       /* I want to show bar!! */
//     } else {
//       /* I want to remove only bar!! */
//       /* maybe doing something like: this.props.children.searchForBar().removeNode() */
//     }
//   }
//
//   render () {
//     return (
//       <div>{this.props.children}</div>
//     )
//   }
// };
//
// const Bar = () => 'I am some bar';