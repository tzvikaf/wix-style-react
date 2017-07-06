import React from 'react';
import {storiesOf} from '@storybook/react';
import CodeExample from '../utils/Components/CodeExample';
import Markdown from '../utils/Components/Markdown';

import Readme from '../../src/Text/README.md';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';


storiesOf('Core', module)
  .add('Text', () => {
    return (
      <div>
        <Markdown source={Readme}/>
        <CodeExample title="Standard" code={ExampleStandardRaw}>
          <ExampleStandard/>
        </CodeExample>
      </div>
    );
  });
