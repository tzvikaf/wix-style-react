# `<AutoDocs/>`

stop wasting time manually writing documentation of component props.
Instead, use `<AutoDocs/>`, this way documentation will never go out of
sync with source code and will always reflect the actual implementation.

> this is only a utility component for `wix-style-react` library. It is
> not exported and should not be used in other projects.


All you need is:
* `import YourComponentSource from '!raw-loader!/Components/YourComponent'`
* `<AutoDocs source={YourComponentSource}/>`

Notice the usage of `raw-loader`.


### Usage

imaginary `/stories/MyComponent/index.js`:

```js
import AutoDocs from '../utils/Components/AutoDocs';
import MyComponentSource from '!raw-loader!../utils/Components/MyComponent';

storiesOf('Components', module)
  .add('MyComponent' () =>
    <div>
      <AutoDocs source={MyComponentSource}/>
    </div>
  );
```

### Documentation in components 

in order for `AutoDocs` to work nicely, your component should have these things:

* a description:

  ```js
  /**
    * This is `MyComponent`, and this is a description for it
    */
  const MyComponent = ({some, thing}) => {
    // ...
  ```

* `propTypes` (either `MyComponent.propTypes = {}` or `static propTypes = {}`):

  ```js
  MyComponent.propTypes = {
    /** this will remove all your code */
    some: string.isRequired,

    /** this will remove all your photos */
    thing: oneOf(['vacation', 'nudes', 'newborn']).isRequired
  };
  ```

* `defaultProps` (either `MyComponent.defaultProps = {}` or `static defaultProps = {}`):

  ```js
  MyComponent.defaultProps = {
    some: 'okay remove my code',
    thing: 'nudes'
  };
  ```

* `displayName` (either `MyComponent.displayName = 'MyComponent'` or `static displayName = 'MyComponent'`)

All this will give you:

![](/assets/images/autodocs-example.png)
