function renderComponent(component) {
  if (typeof component.beforeRender !== 'undefined') {
    component.beforeRender();
  }
  component.render();
  if (typeof component.afterRender !== 'undefined') {
    component.afterRender();
  }
}

export default renderComponent;
