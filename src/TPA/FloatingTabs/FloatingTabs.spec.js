import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
// import floatingTabsDriverFactory from './FloatingTabs.driver';
import FloatingTabs from './FloatingTabs';
import FloatingTabItem from '../FloatingTabItem/FloatingTabItem';
// import {createDriverFactory} from '../../test-common';
import {tpaFloatingTabsTestkitFactory as floatingTabsTestkitFactory} from '../../../testkit';
// import {tpaFloatingTabsTestkitFactory as enzymeFloatingTabsTestkitFactory} from '../../../testkit/enzyme';
// import {mount} from 'enzyme';

describe('FloatingTabs', () => {

  // const createDriver = createDriverFactory(floatingTabsDriverFactory);

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const onClick1 = jest.fn();
      const onClick2 = jest.fn();
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div>
          <FloatingTabs dataHook={dataHook}>
            <FloatingTabItem onClick={onClick1} active={true}>1</FloatingTabItem>
            <FloatingTabItem onClick={onClick2}>2</FloatingTabItem>
          </FloatingTabs>
        </div>
      ));
      const floatingTabsTestkit = floatingTabsTestkitFactory({wrapper, dataHook});
      expect(floatingTabsTestkit.exists()).toBeTruthy();
    });
  });
});
