import React, {Component} from 'react';
import ButtonLayout from 'wix-style-react/ButtonLayout';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '160px',
  lineHeight: '22px'
};

const anchorStyle = {
  textDecoration: 'inherit'
};

class ControlledExample extends Component {
  render() {
    return (
      <div style={style}>
        <ButtonLayout>
          <a href="http://www.wix.com" target="_blank" rel="noopener noreferrer" style={anchorStyle}>
            Link Like Button
          </a>
        </ButtonLayout>
      </div>
    );
  }
}

export default () =>
  <ControlledExample/>;
