import _ from 'lodash/fp';
import exampleStyles from '../../stories/DataTable/Example.scss';

const dataTableDriverFactory = component => ({
  getFirstHighlightedRow: () => {
    return component.$$('tbody tr').getAttribute('class')
        .then(classes => {
          const highlightedRowClass = classes.filter(i => i.includes(exampleStyles['highlight-row']))[0].split(' ')[1];
          return component.$(`.${highlightedRowClass}`).getText();
        });
  },
  clickRowByIndex: index => component.$$('tbody tr').get(index).click(),
  getRowTextByIndex: index => component.$$('tbody tr').get(index).getText(),
  element: () => component
});

export default dataTableDriverFactory;
