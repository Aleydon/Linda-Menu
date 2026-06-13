import { fireEvent, render, screen } from '@testing-library/react';

import { Category, Product } from '@/types/product';

import { CategoryFilter } from '../CategoryFilter';

const mockCategories: Category[] = [
  { id: '1', name: 'Burgers' },
  { id: '2', name: 'Drinks' }
];

const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Classic Burger',
    description: 'A classic',
    price: 20,
    category_id: '1',
    image_url: '',
    variations: [],
    stock: 10
  },
  {
    id: 'p2',
    name: 'Coke',
    description: 'Ice cold',
    price: 5,
    category_id: '2',
    image_url: '',
    variations: [],
    stock: 20
  }
];

// Mock ProductList as it's a separate component
jest.mock('../ProductList', () => {
  return function MockProductList({ products }: { products: Product[] }) {
    return (
      <div data-testid="product-list">
        {products.map(p => (
          <div key={p.id}>{p.name}</div>
        ))}
      </div>
    );
  };
});

describe('CategoryFilter Component', () => {
  it('renders all categories and "Todos" button', () => {
    render(
      <CategoryFilter categories={mockCategories} products={mockProducts} />
    );

    expect(screen.getByText('Todos')).toBeInTheDocument();
    expect(screen.getByText('Burgers')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
  });

  it('filters products by category when a category button is clicked', () => {
    render(
      <CategoryFilter categories={mockCategories} products={mockProducts} />
    );

    const burgerButton = screen.getByText('Burgers');
    fireEvent.click(burgerButton);

    expect(screen.getByText('Classic Burger')).toBeInTheDocument();
    expect(screen.queryByText('Coke')).not.toBeInTheDocument();
  });

  it('filters products by search term', () => {
    render(
      <CategoryFilter categories={mockCategories} products={mockProducts} />
    );

    const searchInput = screen.getByPlaceholderText('Buscar produtos...');
    fireEvent.change(searchInput, { target: { value: 'Coke' } });

    // Check if the product is in the list (using the testid from our mock)
    const productList = screen.getByTestId('product-list');
    expect(productList).toHaveTextContent('Coke');
    expect(productList).not.toHaveTextContent('Classic Burger');
  });

  it('shows all products when "Todos" is clicked after filtering', () => {
    render(
      <CategoryFilter categories={mockCategories} products={mockProducts} />
    );

    fireEvent.click(screen.getByText('Burgers'));
    expect(screen.queryByText('Coke')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Todos'));
    expect(screen.getByText('Classic Burger')).toBeInTheDocument();
    expect(screen.getByText('Coke')).toBeInTheDocument();
  });
});
