import { Group, FormInputLabel, Input } from './form-input.styles';

const FormInput = ({ label, ...otherProps }) => (
  <Group>
    <Input {...otherProps} />
    {label && (
      <FormInputLabel
        className={`${
          otherProps.value.length > 0 ? 'shrink' : ''
        } form-input-label`}
      >
        {label}
      </FormInputLabel>
    )}
  </Group>
);

export default FormInput;
