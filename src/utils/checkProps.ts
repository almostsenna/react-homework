import PropTypes from 'prop-types';

interface ComponentWithPropTypes {
  name: string;
  propTypes: Record<string, PropTypes.Validator<unknown>>;
}

// У React 19 запускаємо runtime-перевірки вручну для умови домашньої роботи.
export default function checkProps<Props extends object>(
  component: ComponentWithPropTypes,
  props: Props,
): void {
  if (import.meta.env.DEV) {
    PropTypes.checkPropTypes(component.propTypes, props, 'prop', component.name);
  }
}
