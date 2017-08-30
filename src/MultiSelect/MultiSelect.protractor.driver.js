const checkboxDriverFactory = component => ({
  addTag: () => {
    component.click();
    component.$('[data-hook^="dropdown-item"]:first-of-type').click();
  },
  element: () => component
});

export default checkboxDriverFactory;
