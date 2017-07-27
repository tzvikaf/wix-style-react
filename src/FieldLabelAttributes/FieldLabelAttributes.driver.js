import $ from 'jquery';

const fieldLabelAttributesDriverFactory = ({element}) => {
  return {
    exists: () => !!element,
    hasRequired: () => !!$(element).find('[data-hook="required"]').length,
    hasInfo: () => !!$(element).find('[data-hook="info"]').length
  };
};

export default fieldLabelAttributesDriverFactory;
