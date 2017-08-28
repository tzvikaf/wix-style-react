import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import $ from 'jquery';

const datePickerDriverFactory = ({element, wrapper, component}) => {

    const getFirstAvailableOption = () => element.querySelector('[role="option"]:not([class*="outside-month"])');
    const getElementByDataHook = (dataHook) => element.querySelector(`[data-hook="${dataHook}"]`);
    const getDatePickerInput = () => element.querySelector('input');
    const getDatePickerInputValue = () => getDatePickerInput().value;

    return {
        exists: () => !!element,
        getFirstAvailableOption,
        getElementByDataHook,
        getDatePickerInput,
        getDatePickerInputValue
    };
};

export default datePickerDriverFactory;
