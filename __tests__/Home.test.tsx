import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders the longermini! button', () => {
    render(<Home />);
    const button = screen.getByRole('button', { name: /longermini!/i });
    expect(button).toBeInTheDocument();
  });

  it('renders the textarea', () => {
    render(<Home />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });
});