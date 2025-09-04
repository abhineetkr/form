import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('fills names and navigates Next across steps', async () => {
  render(<App />);

  // Fill first and last name
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  await userEvent.type(firstNameInput, 'mousam');
  await userEvent.type(lastNameInput, 'mukherjee');

  // Click Next three times
  await userEvent.click(screen.getByRole('button', { name: /next/i }));
  await userEvent.click(screen.getByRole('button', { name: /next/i }));
  await userEvent.click(screen.getByRole('button', { name: /next/i }));

  // Optional sanity check: now on Contact Details step
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
});
