import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/ButtonLayout/README.md';
import TabbedView from '../utils/Components/TabbedView';
import ReadmeTestKit from '../../src/ButtonLayout/README.TESTKIT.md';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

storiesOf('Core', module)
  .add('Button Layout', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <Markdown source={Readme}/>

        <h1>Example</h1>

        <CodeExample title="Controlled" code={ExampleControlledRaw}>
          <ExampleControlled/>
        </CodeExample>

      </div>
      <div>
        <Markdown source={ReadmeTestKit}/>
      </div>
    </TabbedView>
  ));
