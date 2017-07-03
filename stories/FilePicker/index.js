import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import TabbedView from '../utils/Components/TabbedView';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/FilePicker/README.md';
import ReadmeTestKit from '../../src/FilePicker/README.TESTKIT.md';

import Example from './Example';
import ExampleRaw from '!raw-loader!./Example';

storiesOf('Core', module)
  .add('FilePicker', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <Markdown source={Readme}/>
        <h1>Usage examples</h1>
        <CodeExample title="Standard" code={ExampleRaw}>
          <Example/>
        </CodeExample>
      </div>
      <Markdown source={ReadmeTestKit}/>
    </TabbedView>
  ));
