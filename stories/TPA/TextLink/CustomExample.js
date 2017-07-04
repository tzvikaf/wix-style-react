import React from 'react';
import TextLink from '../../../src/TPA/TextLink';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '140px',
  lineHeight: '22px'
};

const someCustomStyle = {
  'color': '#000000',
  'background': '#ff0000',
  'text-decoration': 'underline',
  'font-size': '20px'
};

function Example() {
  return (
    <div>
      <div className="ltr" style={style}>
        <TextLink link="https://www.wix.com" target="_blank" style={someCustomStyle}>Click me</TextLink>
      </div>
    </div>
  );
}

export default Example;
