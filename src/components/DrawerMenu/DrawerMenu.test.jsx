// @vitest-environment jsdom

import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';
import 'react-modern-drawer/dist/index.css';

afterEach(() => cleanup());

describe('DrawerMenu tests:', () => {

  const mockToggleDrawer = vi.fn();
  const links = [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ];

  const renderWithRouter = (ui) => {
    return render(
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    );
  };

  test('Renders drawer when open', () => {
    renderWithRouter(<DrawerMenu isOpen={true} toggleDrawer={mockToggleDrawer} links={links} />);
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  test('Displays all links', () => {
    renderWithRouter(<DrawerMenu isOpen={true} toggleDrawer={mockToggleDrawer} links={links} />);
    links.forEach(link => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  test('Calls toggleDrawer on link click', async () => {
    renderWithRouter(<DrawerMenu isOpen={true} toggleDrawer={mockToggleDrawer} links={links} />);
    const homeLink = screen.getByText('Home');
    await userEvent.click(homeLink);
    expect(mockToggleDrawer).toHaveBeenCalled();
  });

  test('Links have correct href attribute', () => {
    renderWithRouter(<DrawerMenu isOpen={true} toggleDrawer={mockToggleDrawer} links={links} />);
    links.forEach(link => {
      const linkElement = screen.getByText(link.label);
      expect(linkElement.closest('a')).toHaveAttribute('href', link.to);
    });
  });

});
