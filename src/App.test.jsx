import { beforeEach, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  window.history.pushState({}, '', '/');
});

test('renders the homepage hero on the default route', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /turn surplus food/i })
  ).toBeInTheDocument();
});

test('renders the primary navigation', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: 'Restaurants' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'NGOs' })).toBeInTheDocument();
});

test('renders the not-found page for an unknown route', () => {
  window.history.pushState({}, '', '/no-such-page');
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /404 - page not found/i })
  ).toBeInTheDocument();
});

test('navigating from the dashboard reaches the donation form', async () => {
  const user = userEvent.setup();
  window.history.pushState({}, '', '/restaurants');
  render(<App />);

  expect(screen.getAllByText(/no pending listings/i).length).toBeGreaterThan(0);
  await user.click(screen.getByRole('button', { name: /add new donation/i }));

  expect(
    screen.getByRole('heading', { name: /add new food donation/i })
  ).toBeInTheDocument();
});

test('submitting a donation redirects to the dashboard and lists it', async () => {
  const user = userEvent.setup();
  window.history.pushState({}, '', '/add-donation');
  render(<App />);

  await user.type(screen.getByLabelText(/restaurant name/i), 'Test Kitchen');
  await user.type(screen.getByLabelText(/type of food/i), 'Pasta');
  await user.type(screen.getByLabelText(/quantity/i), '12 meals');
  fireEvent.change(screen.getByLabelText(/pickup time/i), {
    target: { value: '18:30' },
  });

  await user.click(screen.getByRole('button', { name: /submit donation/i }));

  // useNavigate should have taken us to the dashboard, with the lifted state intact.
  expect(
    screen.getByRole('heading', { name: /restaurant dashboard/i })
  ).toBeInTheDocument();
  expect(screen.getAllByText('Pasta').length).toBe(2);
  expect(
    screen.getAllByText(/Quantity: 12 meals, Pickup Time: 18:30/).length
  ).toBe(2);
});
