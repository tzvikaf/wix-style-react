import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/LanguagePicker/README.md';
import ReadmeTestkit from '../../src/LanguagePicker/README.TESTKIT.md';

import TabbedView from '../utils/Components/TabbedView';

import Example from './Example';
import ExampleRaw from '!raw-loader!./Example';

storiesOf('Core', module)
  .add('LanguagePicker', () => (
    <TabbedView tabs={['API', 'Testkit']}>
      <div>
        <Markdown source={Readme}/>

        <h1>Usage examples</h1>

        <CodeExample title="Example" code={ExampleRaw}>
          <Example/>
        </CodeExample>

      </div>
      <div>
        <Markdown source={ReadmeTestkit}/>
      </div>
    </TabbedView>
  ));
