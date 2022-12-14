import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { SignContainer, ButtonContainer } from './signing-form.styles';
import {
  googleSignInStart,
  emailSignInStart,
} from '../../store/user/user.action';

const defaultFromFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formField, setFormField] = useState(defaultFromFields);
  const { email, password } = formField;
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    try {
      dispatch(googleSignInStart());
    } catch (err) {
      if ((err as AuthError).code === AuthErrorCodes.POPUP_CLOSED_BY_USER)
        return;
    }
  };

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) =>
    setFormField({ ...formField, [name]: value });

  const signInWithEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(emailSignInStart(email, password));

    setFormField(defaultFromFields);
  };

  return (
    <SignContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={signInWithEmail}>
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
