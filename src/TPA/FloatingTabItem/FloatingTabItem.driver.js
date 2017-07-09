const floatingTabItemDriverFactory = ({ element }) => {

    return {
        exists: () => !!element,
        isActive: () => {
            return element.getAttribute('class') === 'active';
        },
        content: () => element.textContent
    };
};

export default floatingTabItemDriverFactory;
