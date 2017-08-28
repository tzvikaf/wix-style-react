import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import $ from 'jquery';

const datePickerDriverFactory = ({element, wrapper, component}) => {

    const getFirstAvailableOption = () => element.querySelector('[role="option"]:not([class*="outside-month"])')

    return {
        exists: () => !!element,
        getFirstAvailableOption
    };
};

export default datePickerDriverFactory;
