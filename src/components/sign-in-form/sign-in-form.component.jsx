import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import { SignContainer, ButtonContainer } from './signing-form.styles';

const defaultFromFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formField, setFormField] = useState(defaultFromFields);
  const { email, password } = formField;

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') return;
    }
  };

  const handleChange = ({ target: { name, value } }) =>
    setFormField({ ...formField, [name]: value });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

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
    <SignContainer>
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

        <ButtonContainer>
          <Button>sign in</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            google sign in
          </Button>
        </ButtonContainer>
      </form>
    </SignContainer>
  );
};

export default SignInForm;
