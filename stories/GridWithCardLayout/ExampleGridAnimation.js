import React from 'react';
import {Container, Row, Col, Card} from '../../src/Grid'
import styles from './ExampleGrid.scss'

import TextField from '../../src/TextField';
import Input from '../../src/Input';
import Label from '../../src/Label';
import {Plus, ArrowDownThin} from 'wix-style-react/Icons';
import Tooltip from '../../src/Tooltip';
import ToggleSwitch from '../../src/ToggleSwitch';

function renderStandardInput() {
  return (
    <TextField>
      <Label
        for="textField"
      >
        Text Field
      </Label>
      <Input
        id="textField"
        placeholder="Default text goes"
      />
    </TextField>
  );
}

class ExampleGridAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: true};
  }

  render() {
    return  <div data-hook="card-example" className={styles.exampleContainer} style={{height: 1094}}>
      <div className={styles.actions}>
        <ToggleSwitch checked={this.state.show} onChange={() => this.setState({show: !this.state.show})}/> Show/Hide grid container
      </div>
      <Container>
        {this.state.show && <Row>
          <Col span={4}>
            <Card>
              <Card.LinkHeader linkTo= 'http://www.wix.com/' linkTitle= 'Link to Wix' title= 'Card with link'/>
              <Card.Content>
                <Row>
                  <Col span={12}>
                    {renderStandardInput()}
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Card.LinkHeader linkTo= 'http://www.wix.com/' linkTitle= 'Link to Wix' title= 'Card with link'/>
              <Card.Content>
                <Row>
                  <Col span={12}>
                    {renderStandardInput()}
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Card.LinkHeader linkTo= 'http://www.wix.com/' linkTitle= 'Link to Wix' title= 'Card with link'/>
              <Card.Content>
                <Row>
                  <Col span={12}>
                    {renderStandardInput()}
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Col>
        </Row>}
        {this.state.show && <Row>
          <Col span={3}>
            <Card>
              <Card.LinkHeader linkTo= 'http://www.wix.com/' linkTitle= 'Link to Wix' title= 'Card with link'/>
              <Card.Content>
                <Row>
                  <Col span={12}>
                    {renderStandardInput()}
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Col>
          <Col span={3}>
            <Card>
              <Card.LinkHeader linkTo= 'http://www.wix.com/' linkTitle= 'Link to Wix' title= 'Card with link'/>
              <Card.Content>
                <Row>
                  <Col span={12}>
                    {renderStandardInput()}
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Col>
          <Col span={3}>
            <Card>
              <Card.LinkHeader linkTo= 'http://www.wix.com/' linkTitle= 'Link to Wix' title= 'Card with link'/>
              <Card.Content>
                <Row>
                  <Col span={12}>
                    {renderStandardInput()}
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Col>
          <Col span={3}>
            <Card>
              <Card.LinkHeader linkTo= 'http://www.wix.com/' linkTitle= 'Link to Wix' title= 'Card with link'/>
              <Card.Content>
                <Row>
                  <Col span={12}>
                    {renderStandardInput()}
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Col>
        </Row>}
        {this.state.show && <Row>
          <Col span={4}>
            <Card>
              <Card.LinkHeader linkTo= 'http://www.wix.com/' linkTitle= 'Link to Wix' title= 'Card with link'/>
              <Card.Content>
                <Row>
                  <Col span={12}>
                    {renderStandardInput()}
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Card.LinkHeader linkTo= 'http://www.wix.com/' linkTitle= 'Link to Wix' title= 'Card with link'/>
              <Card.Content>
                <Row>
                  <Col span={12}>
                    {renderStandardInput()}
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Card.LinkHeader linkTo= 'http://www.wix.com/' linkTitle= 'Link to Wix' title= 'Card with link'/>
              <Card.Content>
                <Row>
                  <Col span={12}>
                    {renderStandardInput()}
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Col>
        </Row>}
        {this.state.show && <Row>
          <Col span={3}>
            <Card>
              <Card.LinkHeader linkTo= 'http://www.wix.com/' linkTitle= 'Link to Wix' title= 'Card with link'/>
              <Card.Content>
                <Row>
                  <Col span={12}>
                    {renderStandardInput()}
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Col>
          <Col span={3}>
            <Card>
              <Card.LinkHeader linkTo= 'http://www.wix.com/' linkTitle= 'Link to Wix' title= 'Card with link'/>
              <Card.Content>
                <Row>
                  <Col span={12}>
                    {renderStandardInput()}
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Col>
          <Col span={3}>
            <Card>
              <Card.LinkHeader linkTo= 'http://www.wix.com/' linkTitle= 'Link to Wix' title= 'Card with link'/>
              <Card.Content>
                <Row>
                  <Col span={12}>
                    {renderStandardInput()}
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Col>
          <Col span={3}>
            <Card>
              <Card.LinkHeader linkTo= 'http://www.wix.com/' linkTitle= 'Link to Wix' title= 'Card with link'/>
              <Card.Content>
                <Row>
                  <Col span={12}>
                    {renderStandardInput()}
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Col>
        </Row>}
      </Container>
    </div>
  }
};


export default () =>
  <ExampleGridAnimation/>
