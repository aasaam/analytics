/* eslint-disable camelcase */
import Vue from 'vue';
import '@/custom-validation/validators';
import {
  required,
  required_if,
  email,
  min,
  max,
  length,
  numeric,
  alpha,
  alpha_spaces,
  alpha_dash,
  regex,
  digits,
  alpha_num,
} from 'vee-validate/dist/rules';

import {
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider,
  configure,
} from 'vee-validate';

setInteractionMode('eager');

extend('required', required);
extend('required_if', required_if);
extend('email', email);
extend('min', min);
extend('max', max);
extend('length', length);
extend('numeric', numeric);
extend('alpha', alpha);
extend('digits', digits);
extend('alpha_spaces', alpha_spaces);
extend('alpha_dash', alpha_dash);
extend('alpha_num', alpha_num);
extend('regex', regex);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

export default function VeeValidatePlugin({ app }) {
  configure({
    defaultMessage: (_, values) =>
      app.i18n.t(`validations.${values._rule_}`, values),
  });
}
