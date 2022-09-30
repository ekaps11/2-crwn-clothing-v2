import { useState } from 'react';
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss';

const defaultFromFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formField, setFormField] = useState(defaultFromFields);
  const { email, password } = formField;

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') return;
    }
  };

  const handleChange = ({ target: { name, value } }) =>
    setFormField({ ...formField, [name]: value });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(res);
      setFormField(defaultFromFields);
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          alert('user not found');
          break;

        case 'auth/wrong-password':
          alert('wrong password');
          break;

        default:
          console.log(err);
          break;
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
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

        <div className="buttons-container">
          <Button>sign in</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
