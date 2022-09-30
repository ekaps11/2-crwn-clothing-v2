import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.styles.scss';

const defaultFromFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formField, setFormField] = useState(defaultFromFields);
  const { displayName, email, password, confirmPassword } = formField;

  const handleChange = ({ target: { name, value } }) =>
    setFormField({ ...formField, [name]: value });

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('password n confirm password did not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      setFormField(defaultFromFields);
      alert('Success creating a new user');
    } catch (err) {
      err.code === 'auth/email-already-in-use'
        ? alert('email is already in use')
        : console.log('error while creating user', err.code);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>I do not have a account</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          type="text"
          required
        />

        <FormInput
          label="Email"
          name="email"
          value={email}
          onChange={handleChange}
          type="email"
          required
        />

        <FormInput
          label="Password"
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
          required
        />

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          type="password"
          required
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
