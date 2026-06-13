import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';

import Header from '../Header';

// Mock framer-motion to avoid issues with animations in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: ComponentPropsWithoutRef<'div'>) => (
      <div {...props}>{children}</div>
    ),
    h1: ({ children, ...props }: ComponentPropsWithoutRef<'h1'>) => (
      <h1 {...props}>{children}</h1>
    ),
    p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => (
      <p {...props}>{children}</p>
    )
  }
}));

describe('Header Component', () => {
  it('renders the application title', () => {
    render(<Header />);
    expect(screen.getByText(/Linda/i)).toBeInTheDocument();
    expect(screen.getByText(/Menu/i)).toBeInTheDocument();
  });

  it('renders the delivery info after mounting', () => {
    render(<Header />);
    expect(screen.getByText(/30-45 min/i)).toBeInTheDocument();
    expect(screen.getByText(/Entrega em toda região/i)).toBeInTheDocument();
  });

  it('renders the descriptive text', () => {
    render(<Header />);
    expect(
      screen.getByText(/Sabores incríveis entregues com carinho/i)
    ).toBeInTheDocument();
  });
});
