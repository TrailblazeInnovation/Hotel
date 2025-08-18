export const FormExtension = {
  name: 'Forms',
  type: 'response',
  match: () => false,
  render: ({ element }) => {
    const el = document.createElement('div');
    el.style.padding = '12px';
    el.textContent = 'FormExtension import OK';
    element.appendChild(el);
  }
};
export default FormExtension;
