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
    const intervalId = setInterval(() => {
      this.toggle();
    }, 2000);

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
          <Col span="1"><ToggleSwitch checked={this.state.show}
                                      onChange={() => this.onChange()}/>
          </Col>
          <Col span="11">
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
