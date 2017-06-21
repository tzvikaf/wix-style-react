import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import tooltipDriverFactory from './Tooltip.driver';
import Tooltip from './Tooltip';
import TooltipContent from './TooltipContent';
import {createDriverFactory} from '../test-common';
import {buttonTestkitFactory, tooltipTestkitFactory} from '../../testkit';
import {tooltipTestkitFactory as enzymeTooltipTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import Button from '../../src/Button';
import waitFor from 'wait-for-cond';

describe('Tooltip', () => {

  const createDriver = createDriverFactory(tooltipDriverFactory);
  const _props = {showDelay: 5, hideDelay: 5, content: <TooltipContent children={'I\'m the content'}/>};
  const children = <div>foo children</div>;

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should be hidden by default', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    expect(driver.isShown()).toBeFalsy();
  });

  it('should show a tooltip once hovering', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    expect(driver.isShown()).toBeFalsy();
    return waitFor(() => driver.isShown());
  });

  it('should hide when mouse leaving', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    expect(driver.isShown()).toBeFalsy();
    return resolveIn(30).then(() => {
      expect(driver.isShown()).toBeTruthy();
      driver.mouseLeave();
      return resolveIn(30).then(() => {
        expect(driver.isShown()).toBeFalsy();
      });
    });
  });

  it('should hide tooltip when using custom triggers', () => {
    const props = {..._props, hideTrigger: 'custom', showTrigger: 'custom'};
    const driver = createDriver(<Tooltip {...props}>{children}</Tooltip>);
    driver.mouseEnter();

    expect(driver.isShown()).toBeFalsy();
    driver.setProps({...props, active: true});

    return waitFor(() => {
      return driver.isShown();
    }, 'should be shown')
    .then(() => {
      driver.setProps({...props, active: false});
      return !driver.isShown();
    }, 'should not be shown');
  });

  it('should test inner component', () => {
    const dataHook = 'button_data_hook';
    const buttonContent = (
      <div>
        Custom Content...&nbsp;
        <Button dataHook={dataHook} id="inner-button" height="small">Button content</Button>
      </div>
    );
    const driver = createDriver(<Tooltip showDelay={5} hideDelay={5} content={buttonContent}>{children}</Tooltip>);
    driver.mouseEnter();
    expect(driver.isShown()).toBeFalsy();
    return waitFor(() => driver.isShown())
    .then(() => {
      const buttonTestkit = buttonTestkitFactory({wrapper: driver.getTooltipWrapper(), dataHook});
      expect(buttonTestkit.getButtonTextContent()).toBe('Button content');
    });
  });

  it('should not override focus event', () => {
    const onFocus = jest.fn();
    const onFocusedChild = <div onFocus={onFocus}>foo children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onFocusedChild}</Tooltip>);
    driver.focus();
    expect(onFocus).toBeCalled();
  });

  it('should not override blur event', () => {
    const onBlur = jest.fn();
    const onBluredChild = <div onBlur={onBlur}>foo children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onBluredChild}</Tooltip>);
    driver.blur();
    expect(onBlur).toBeCalled();
  });

  it('should not override click event', () => {
    const onClick = jest.fn();
    const onClickedChild = <div onClick={onClick}>foo children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onClickedChild}</Tooltip>);
    driver.click();
    expect(onClick).toBeCalled();
  });

  it('should not override mouse enter event', () => {
    const onMouseEnter = jest.fn();
    const onMouseEnteredChild = <div onMouseEnter={onMouseEnter}>foo children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onMouseEnteredChild}</Tooltip>);
    driver.mouseEnter();
    expect(onMouseEnter).toBeCalled();
  });

  it('should not override mouse leave event', () => {
    const onMouseLeave = jest.fn();
    const onMouseLeavedChild = <div onMouseLeave={onMouseLeave}>foo children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onMouseLeavedChild}</Tooltip>);
    driver.mouseLeave();
    expect(onMouseLeave).toBeCalled();
  });

  it('should support error theme', () => {
    const driver = createDriver(<Tooltip theme={'error'} {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    return waitFor(() => driver.hasErrorTheme(), 'should display the error theme');
  });

  it('should support dark theme', () => {
    const driver = createDriver(<Tooltip theme={'dark'} {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    return waitFor(() => driver.hasDarkTheme(), 'should display the dark theme');
  });

  it('should support light theme', () => {
    const driver = createDriver(<Tooltip theme={'light'} {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    return waitFor(() => driver.hasLightTheme(), 'should display the light theme');
  });

  it('should have children', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    expect(driver.getChildren()).toContain('foo children');
  });

  it('should have a content', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    return waitFor(() => driver.getContent().indexOf('I\'m the content') !== -1,
                   'should display the content');
  });

  it('should cancel mouse leave, when followed by mouse enter immediately', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    driver.mouseLeave();
    driver.mouseEnter();
    return resolveIn(30).then(() => {
      expect(driver.isShown()).toBe(true);
    });
  });

  it('should call onShow when tooltip is shown', () => {
    const onShow = jest.fn();
    const driver = createDriver(<Tooltip {...{..._props, onShow}}>{children}</Tooltip>);

    driver.mouseEnter();

    expect(onShow).not.toHaveBeenCalled();
    return resolveIn(30).then(() => {
      expect(onShow).toHaveBeenCalled();
    });
  });

  describe('placement attribute', () => {
    it('should be top by default', () => {
      const driver = createDriver(<Tooltip {...{..._props}}>{children}</Tooltip>);
      driver.mouseEnter();

      return waitFor(() => driver.getPlacement() === 'top');
    });

    ['top', 'bottom', 'left', 'right'].forEach(placement => {
      it(`should be ${placement}`, () => {
        const driver = createDriver(<Tooltip {...{..._props}} placement={placement}>{children}</Tooltip>);
        driver.mouseEnter();

        return resolveIn(30).then(() => {
          expect(driver.getPlacement()).toBe(placement);
        });
      });
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Tooltip dataHook={dataHook} {..._props}>{children}</Tooltip></div>));
      const driver = tooltipTestkitFactory({wrapper, dataHook});
      driver.mouseEnter();
      expect(driver.isShown()).toBeFalsy();
      return resolveIn(30).then(() => {
        expect(driver.isShown()).toBeTruthy();
      });
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Tooltip dataHook={dataHook} {..._props}>{children}</Tooltip>);
      const driver = enzymeTooltipTestkitFactory({wrapper, dataHook});
      driver.mouseEnter();
      expect(driver.isShown()).toBeFalsy();
      return resolveIn(30).then(() => {
        expect(driver.isShown()).toBeTruthy();
      });
    });

    it.skip('should remove a tooltip immediately once the component is destroyed', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Tooltip dataHook={dataHook} {..._props} hideDelay={1000}>{children}</Tooltip>);
      const driver = enzymeTooltipTestkitFactory({wrapper, dataHook});
      driver.mouseEnter();
      return waitFor(() => driver.isShown())
      .then(() => {
        wrapper.unmount();
        expect(driver.isShown()).toBeFalsy();
      });
    });
  });

  // describe.skip('Tooltip position', () => {
  //   let wrapper;
  //
  //   function render(placement, alignment) {
  //     wrapper = mount(<Tooltip placement={placement} alignment={alignment} dataHook='tooltip' content={<div style={{width: 100, height: 50}} active/>}>
  //         <div style={{width: 100, height: 50}}/>
  //       </Tooltip>);
  //   }
  //
  //   function getPosition() {
  //     const style = wrapper.find('[data-hook=\'tooltip\']').props().style;
  //     console.log('zzzzzz', style);
  //     return style.transform;
  //   }
  //
  //   function assertPosition(x, y) {
  //     const pos = getPosition();
  //     return waitFor(() => pos === `translate3d(${x}, ${y}, 0)`);
  //   }
  //
  //   it('should position top-left', () => {
  //     const wrapper = render('top', 'left');
  //     return assertPosition(50, 50);
  //   });
  //
  //   it('should position top-center ', () => {
  //     expect(position(anchor, element, params('top', 'center')))
  //       .toEqual({left: 525, top: 440});
  //   });
  //
  //   it('should position top-right ', () => {
  //     expect(position(anchor, element, params('top', 'right')))
  //       .toEqual({left: 550, top: 440});
  //   });
  //
  //   it('should position right-top', () => {
  //     expect(position(anchor, element, params('right', 'top')))
  //       .toEqual({left: 610, top: 500});
  //   });
  //
  //   it('should position right-center', () => {
  //     expect(position(anchor, element, params('right', 'center')))
  //       .toEqual({left: 610, top: 525});
  //   });
  //
  //   it('should position right-bottom', () => {
  //     expect(position(anchor, element, params('right', 'bottom')))
  //       .toEqual({left: 610, top: 550});
  //   });
  //
  //   it('should position bottom-left', () => {
  //     expect(position(anchor, element, params('bottom', 'left')))
  //       .toEqual({left: 500, top: 610});
  //   });
  //
  //   it('should position bottom-center', () => {
  //     expect(position(anchor, element, params('bottom', 'center')))
  //       .toEqual({left: 525, top: 610});
  //   });
  //
  //   it('should position bottom-right', () => {
  //     expect(position(anchor, element, params('bottom', 'right')))
  //       .toEqual({left: 550, top: 610});
  //   });
  //
  //   it('should position left-top', () => {
  //     expect(position(anchor, element, params('left', 'top')))
  //       .toEqual({left: 440, top: 500});
  //   });
  //
  //   it('should position left-center', () => {
  //     expect(position(anchor, element, params('left', 'center')))
  //       .toEqual({left: 440, top: 525});
  //   });
  //
  //   it('should position left-bottom', () => {
  //     expect(position(anchor, element, params('left', 'bottom')))
  //       .toEqual({left: 440, top: 550});
  //   });
  // });
});

function resolveIn(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({});
    }, timeout);
  });
}
