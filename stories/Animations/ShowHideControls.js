import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import ToggleSwitch from '../../src/ToggleSwitch';
import {Container, Row, Col} from '../../src/Grid';
import {node} from 'prop-types';

class ShowHideControls extends React.Component {

  toggle() {
    this.setState({show: !this.state.show})
  }

  onChange() {
    clearInterval(this.state.intervalId);
    this.toggle();
  }

  constructor(props) {
    super(props);
    this.state = {
      show: true
    };

  }

  componentDidMount() {

    if (!this.props.interval) {
      return;
    }
    const intervalId = setInterval(() => {
      this.toggle();
    }, 5000);

    this.setState({intervalId});
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalId);
  }

  render() {
    const {children} = this.props;
    return (
      <Container>
        <Row>
          <Col span="2">
            Show / Hide
            <ToggleSwitch checked={this.state.show}
                                      onChange={() => this.onChange()}/>
          </Col>
          <Col span="10">
            {React.createElement(children.type, {...children.props, show: this.state.show}, children)}
          </Col>
        </Row>
      </Container>

    );
  }
}

ShowHideControls.propTypes = {
  children: node
};

export default ShowHideControls;
