import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { SignContainer } from '../sign-in-form/signing-form.styles';
import { signUpStart } from '../../store/user/user.action';

const defaultFromFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formField, setFormField] = useState(defaultFromFields);
  const { displayName, email, password, confirmPassword } = formField;
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) =>
    setFormField({ ...formField, [name]: value });

  const signUp = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('password n confirm password did not match');
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      setFormField(defaultFromFields);
      alert('Success creating a new user');
    } catch (err) {
      err.code === 'auth/email-already-in-use'
        ? alert('email is already in use')
        : console.log('error while creating user', err.code);
    }
  };

  return (
    <SignContainer>
      <h2>I do not have a account</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={signUp}>
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
    </SignContainer>
  );
};

export default SignUpForm;
