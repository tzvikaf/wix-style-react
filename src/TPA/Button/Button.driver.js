import ReactTestUtils from 'react-dom/test-utils';

const buttonDriverFactory = ({element}) => {
  return {
    exists: () => !!element,
    click: () => {
      try {
        ReactTestUtils.Simulate.click(element);
      } catch (e) {
        element.simulate('click');
      }
    },
    hasTheme: theme => element.getAttribute('data-theme') === theme,
    getButtonTextContent: () => element.textContent,
    isButtonDisabled: () => element.getAttribute('disabled') === ''
  };
};

export default buttonDriverFactory;
