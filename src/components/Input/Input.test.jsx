// @vitest-environment jsdom

import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, afterEach } from 'vitest';
import Input from './Input';
import s from './Input.module.css';

afterEach(() => cleanup());

describe('Input tests: ', () => {

  test('Renders with correct type', () => {
    render(<Input type="password" />);
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('type', 'password');
  });

  test('Renders with default type text', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
  });

  test('Renders with correct id', () => {
    render(<Input id="test-id" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'test-id');
  });

  test('Handles change event', async () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test');
    expect(handleChange).toHaveBeenCalled();
  });

  test('Renders with correct value', () => {
    render(<Input value="test-value" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test-value');
  });

  test('Applies error class when error prop is true', () => {
    render(<Input error={true} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(`${s.input} ${s.error}`);
  });

  test('Applies correct custom class', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  test('Input type text renders correctly', () => {
    render(<Input type="text" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
  });

  test('Input type password renders correctly', () => {
    render(<Input type="password" />);
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('type', 'password');
  });

  test('Input type email renders correctly', () => {
    render(<Input type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  test('Input type number renders correctly', () => {
    render(<Input type="number" />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('type', 'number');
  });

});
