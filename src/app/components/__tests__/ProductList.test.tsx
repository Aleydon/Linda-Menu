import { fireEvent, render, screen } from '@testing-library/react';

import { Product } from '@/types/product';

import ProductList from '../ProductList';

// Mock framer-motion to avoid issues with animations in tests
jest.mock('framer-motion', () => ({
  motion: {
    /* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
    div: ({
      children,
      initial,
      animate,
      transition,
      whileInView,
      viewport,
      layout,
      ...props
    }: any) => <div {...props}>{children}</div>,
    span: ({
      children,
      initial,
      animate,
      transition,
      layout,
      ...props
    }: any) => <span {...props}>{children}</span>,
    button: ({
      children,
      initial,
      animate,
      transition,
      layout,
      ...props
    }: any) => <button {...props}>{children} </button>
    /* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  )
}));

// Mock useCart hook
jest.mock('@/hooks/useCart', () => ({
  useCart: () => ({
    addItem: jest.fn(),
    items: []
  })
}));

// Mock next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  /* eslint-disable @typescript-eslint/no-explicit-any */
  default: (props: any) => <img alt="" {...props} />
  /* eslint-enable @typescript-eslint/no-explicit-any */
}));

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 10,
    stock: 10,
    description: 'Description 1',
    variations: [
      { id: 'v1', name: 'Var 1', price: 10, stock: 5 },
      { id: 'v2', name: 'Var 2', price: 11, stock: 5 },
      { id: 'v3', name: 'Var 3', price: 12, stock: 5 },
      { id: 'v4', name: 'Var 4', price: 13, stock: 5 },
      { id: 'v5', name: 'Var 5', price: 14, stock: 5 }
    ]
  }
];

describe('ProductList Component', () => {
  it('renders products correctly', () => {
    render(<ProductList products={mockProducts} />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });

  it('shows only first 3 variations by default when there are more than 3', () => {
    render(<ProductList products={mockProducts} />);
    expect(screen.getByText(/Var 1/)).toBeInTheDocument();
    expect(screen.getByText(/Var 2/)).toBeInTheDocument();
    expect(screen.getByText(/Var 3/)).toBeInTheDocument();
    expect(screen.queryByText(/Var 4/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Var 5/)).not.toBeInTheDocument();
    expect(screen.getByText(/Ver mais \(2\)/)).toBeInTheDocument();
  });

  it('expands variations when "Ver mais" toggle is clicked', () => {
    render(<ProductList products={mockProducts} />);
    const toggleButton = screen.getByText(/Ver mais \(2\)/);
    fireEvent.click(toggleButton);
    expect(screen.getByText(/Var 4/)).toBeInTheDocument();
    expect(screen.getByText(/Var 5/)).toBeInTheDocument();
    expect(screen.getByText(/Ver menos/)).toBeInTheDocument();
  });

  it('collapses variations when "Ver menos" toggle is clicked after expansion', () => {
    render(<ProductList products={mockProducts} />);
    const toggleButton = screen.getByText(/Ver mais \(2\)/);
    fireEvent.click(toggleButton); // Expand
    const collapseButton = screen.getByText(/Ver menos/);
    fireEvent.click(collapseButton); // Collapse
    expect(screen.queryByText(/Var 4/)).not.toBeInTheDocument();
    expect(screen.getByText(/Ver mais \(2\)/)).toBeInTheDocument();
  });

  it('expands variations when the card is clicked', () => {
    render(<ProductList products={mockProducts} />);
    const card = screen.getByText('Product 1').closest('.group');
    if (!card) throw new Error('Card not found');
    fireEvent.click(card);
    expect(screen.getByText(/Var 4/)).toBeInTheDocument();
    expect(screen.getByText(/Var 5/)).toBeInTheDocument();
  });

  it('does not show expansion toggle if there are 3 or fewer variations', () => {
    const productsWithFewVariations: Product[] = [
      {
        ...mockProducts[0],
        variations: mockProducts[0].variations!.slice(0, 3)
      }
    ];
    render(<ProductList products={productsWithFewVariations} />);
    expect(screen.queryByText(/Ver mais/)).not.toBeInTheDocument();
    expect(screen.getByText(/Var 1/)).toBeInTheDocument();
    expect(screen.getByText(/Var 2/)).toBeInTheDocument();
    expect(screen.getByText(/Var 3/)).toBeInTheDocument();
  });
});
