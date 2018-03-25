import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Button, Form, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// const renderField = ({ input, type, meta: { touched, error } }) => (
//   <div>
//     <input {...input} className="form-control" type={type} />
//     {touched && error && <span>{error}</span>}
//   </div>
// );

// const renderGroup = (field) => (
//   <div className="form-group">
//     <label></label>
//     <Field name={field} type={field} component={renderField} />
//   </div>
// );

const validate = (values) => {
  const errors = {};
  if (values.get('password1') && values.get('password2')) {
    if (values.get('password1') !== values.get('password2')) {
      errors.password2 = 'Password must match';
    } else if (values.get('password1').length < 8) {
      errors.password2 = 'Password should be longer than 8';
    }
  }
  return errors;
};

const warn = (values) => {
  const warnings = {};
  if (!values.get('username')) {
    warnings.username = 'This field is required';
  } else if (values.get('username').length < 5) {
    warnings.username = 'Username should be longer than 5';
  }
  return warnings;
};

const renderField = ({
  input,
  label,
  type,
  id,
  meta: { touched, error, warning },
}) => (
  <Form.Field>
    <label htmlFor={id}>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} id={id} />
      {touched &&
        ((error && <Message error header="Error!" content={error}></Message>) ||
          (warning && <Message warning header="Warning" content={warning}></Message>))}
    </div>
  </Form.Field>
);

renderField.propTypes = {
  input: PropTypes.any,
  label: PropTypes.any,
  type: PropTypes.any,
  meta: PropTypes.any,
  id: PropTypes.any,
};

const SignupForm = (props) => {
  const { handleSubmit, submitting } = props;
  // console.log(props);
  return (
    <Form onSubmit={handleSubmit} warning error>
      <Field name="username" type="text" component={renderField} id="username" label="Username" />
      <Field name="password1" type="password" component={renderField} id="password1" label="Password" />
      <Field name="password2" type="password" component={renderField} id="password2" label="Confirm Password" />
      {/* {error ? <strong>{error}</strong> : ''} */}
      {props.children}
      <Button type="submit" disabled={submitting}>Submit</Button>
    </Form>
  );
};

SignupForm.propTypes = {
  // error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  children: PropTypes.any,
};

export default reduxForm({
  form: 'signup',
  validate,
  warn,
})(SignupForm);
