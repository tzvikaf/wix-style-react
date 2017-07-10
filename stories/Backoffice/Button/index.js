import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../../utils/Components/Markdown';
import TabbedView from '../../utils/Components/TabbedView';
import CodeExample from '../../utils/Components/CodeExample';
import Readme from '../../../src/Backoffice/Button/README.md';
import ReadmeTestKit from '../../../src/Backoffice/Button/README.TESTKIT.md';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';
import IconsExample from './ExampleWithIcons';
import IconsExampleRaw from '!raw-loader!./ExampleWithIcons';

storiesOf('Backoffice', module)
  .add('Button', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <Markdown source={Readme}/>
        <h1>Example</h1>
        <CodeExample title="With icons" code={IconsExampleRaw}>
          <IconsExample/>
        </CodeExample>
        <CodeExample title="Controlled" code={ExampleControlledRaw}>
          <ExampleControlled/>
        </CodeExample>
      </div>
      <Markdown source={ReadmeTestKit}/>
    </TabbedView>
  ));
