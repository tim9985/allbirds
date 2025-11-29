import styled from 'styled-components';

const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;

const HiddenInput = styled.input`
  display: none;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const EmailInput = styled.input`
  display: block;
  height: 50px;
  width: 100%;
  border: 1px solid #d4d4d8;
  padding: 0 10px;
  font-size: 1rem;

  @media (min-width: 768px) {
    flex-basis: 300px;
    flex-grow: 1;
    height: auto;
    width: auto;
    padding: 16px;
  }

  &::placeholder {
    color: #999;
  }
`;

const SubmitButton = styled.button`
  color: white;
  background-color: #262626;
  display: block;
  flex-shrink: 0;
  height: 50px;
  letter-spacing: 0.5px;
  width: 100%;
  padding: 0 30px;
  border: none;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  font-weight: 500;

  @media (min-width: 768px) {
    height: auto;
    width: auto;
    padding: 16px 30px;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px 0px;
  }
`;

export const NewsletterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
  };

  return (
    <Form onSubmit={handleSubmit}>
      <HiddenInput type="hidden" name="form_type" value="customer" />
      <HiddenInput type="hidden" name="utf8" value="✓" />
      <HiddenInput type="hidden" name="contact[tags]" value="email_from_website" />
      <FormContainer>
        <EmailInput
          type="email"
          name="contact[email]"
          defaultValue=""
          placeholder="Email"
          aria-label="Email"
          required
        />
        <SubmitButton type="submit" aria-label="구독">
          구독
        </SubmitButton>
      </FormContainer>
    </Form>
  );
};
