import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test-utils';
import Navbar from '../Navbar';

describe('Navbar', () => {
  const renderNavbar = (props = {}) => {
    return render(<Navbar {...props} />);
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the navbar with navigation links', () => {
    renderNavbar();
    
    // Check for main navigation links
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /resume/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('toggles mobile menu when menu button is clicked', () => {
    renderNavbar();
    
    // Menu should be closed by default
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
    
    // Click to open menu
    fireEvent.click(menuButton);
    
    // Should show close button when menu is open
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
    
    // Click to close menu
    fireEvent.click(closeButton);
    
    // Menu should be closed again
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });

  it('applies scrolled class when page is scrolled', () => {
    // Mock scroll position
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    
    renderNavbar();
    
    // Trigger scroll event
    window.dispatchEvent(new Event('scroll'));
    
    // Navbar should have scrolled class
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('scrolled');
  });

  it('closes mobile menu when clicking outside', () => {
    renderNavbar();
    
    // Open menu
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    
    // Click outside (on document body)
    fireEvent.mouseDown(document.body);
    
    // Menu should be closed
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });
});
