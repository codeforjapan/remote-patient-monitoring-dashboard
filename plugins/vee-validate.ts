import Vue from 'vue'
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

Vue.component('ValidationProvider', ValidationProvider)

extend('required', {
  ...required,
  message: 'This field is required',
})
