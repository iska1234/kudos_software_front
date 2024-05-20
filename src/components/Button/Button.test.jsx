// @vitest-environment jsdom

import { render, screen, cleanup  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, afterEach  } from 'vitest';
import Button from './Button';
import { AuthProvider, useAuth } from '../../contexts/authContext';

afterEach(() => cleanup());

describe('Button tests: ', () => {

  const renderWithAuthProvider = (component) => render(<AuthProvider>{component}</AuthProvider>);

  test('Test login event', async () => {
    const loginMock = vi.fn();
    const TestComponent = () => {
      const { login } = useAuth();
      return <Button onClick={() => loginMock(login)}>Login</Button>;
    };

    renderWithAuthProvider(<TestComponent />);
    const button = screen.getByText('Login');
    await userEvent.click(button);
    expect(loginMock).toHaveBeenCalled();
  });

  test('Test signup event', async () => {
    const signupMock = vi.fn();
    const TestComponent = () => {
      const { signup } = useAuth();
      return <Button onClick={() => signupMock(signup)}>Signup</Button>;
    };

    renderWithAuthProvider(<TestComponent />);
    
    const button = screen.getByText('Signup');
    await userEvent.click(button);
    expect(signupMock).toHaveBeenCalled();
  });

  test('Test logout event', async () => {
    const logoutMock = vi.fn();
    const TestComponent = () => {
      const { logout } = useAuth();
      return <Button onClick={() => logoutMock(logout)}>Logout</Button>;
    };

    renderWithAuthProvider(<TestComponent />);
    
    const button = screen.getByText('Logout');
    await userEvent.click(button);
    expect(logoutMock).toHaveBeenCalled();
  });

  test('Test the handleclick property', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByText('Click me');
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  const sizes = ["md", "lg", "sm", "icon"];
  for (const size of sizes) {
    test(`You can set the value of ${size} for the class property correctly`, async () => {
      const { container } = render(<Button size={size}>{size}</Button>);
      const button = container.firstChild;
      expect(button).toHaveClass(`_${size}_2a1efe`);
    });
  }


});

