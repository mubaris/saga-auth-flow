import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Button, Form } from 'semantic-ui-react';
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

const SigninForm = (props) => {
  const { handleSubmit, submitting } = props;
  // console.log(props);
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label htmlFor="username">Username</label>
        <Field name="username" type="text" component="input" id="username" />
      </Form.Field>
      <Form.Field>
        <label htmlFor="password">Password</label>
        <Field name="password" type="password" component="input" id="password" />
      </Form.Field>
      {/* {error ? <strong>{error}</strong> : ''} */}
      {props.children}
      <Button type="submit" disabled={submitting}>Submit</Button>
    </Form>
  );
};

SigninForm.propTypes = {
  // error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  children: PropTypes.any,
};

export default reduxForm({
  form: 'signin',
})(SigninForm);
