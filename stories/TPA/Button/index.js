import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Button from '../../../src/TPA/Button';
import styles from './styles.scss';
import WixStyleDecorator from '../decorators/WixStyleDecorator';
import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw!./ExampleControlled';
import CodeExample from '../../utils/Components/CodeExample';

storiesOf('TPA', module)
  .addDecorator(WixStyleDecorator)
  .add('Button', () => {
    return (
      <div>
        <div className={styles.wrapper}>
          <Button>Default</Button>
        </div>

        <div className={styles.wrapper}>
          <Button theme="fill">Fill</Button>
        </div>

        <div className={styles.wrapper}>
          <Button theme="fill" disabled>Fill (Disabled)</Button>
        </div>

        <div className={styles.wrapper}>
          <Button theme="outline" onClick={() => { alert(1); }}>Outline (Click me)</Button>
        </div>

        <div className={styles.wrapper}>
          <Button className={styles.customButton}>Custom</Button>
        </div>

        <CodeExample title="Controlled" code={ExampleControlledRaw}>
          <ExampleControlled/>
        </CodeExample>

      </div>
    );
  });


