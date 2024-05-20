// @vitest-environment jsdom

import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, afterEach } from 'vitest';
import Modal from './Modal';
import { saveData } from '../../data/useSavedData';
import toast from 'react-hot-toast';

vi.mock('../../data/useSavedData');
vi.mock('react-hot-toast');

afterEach(() => cleanup());

describe('Modal tests:', () => {
  const mockSetIsOpen = vi.fn();
  const mockOnSuccess = vi.fn();
  const userId = 1;
  const savedData = [];

  const renderModal = () => {
    render(
      <Modal 
        setIsOpen={mockSetIsOpen}
        userId={userId}
        savedData={savedData}
        onSuccess={mockOnSuccess}
      />
    );
  };

  test('Renders Modal correctly', () => {
    renderModal();
    expect(screen.getByText('Save Data')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add description')).toBeInTheDocument();
    expect(screen.getByText('Upload Registry')).toBeInTheDocument();
  });

  test('Closes Modal on background click', () => {
    renderModal();
    const background = screen.getByRole('button', { name: '' });
    fireEvent.click(background);
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  test('Closes Modal on close button click', () => {
    renderModal();
    const closeButton = screen.getByRole('button', { name: '' });
    userEvent.click(closeButton);
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  test('Handles description input change', () => {
    renderModal();
    const input = screen.getByPlaceholderText('Add description');
    fireEvent.change(input, { target: { value: 'Test description' } });
    expect(input).toHaveValue('Test description');
  });

  test('Calls saveData on upload button click and handles success', async () => {
    saveData.mockResolvedValueOnce();
  
    renderModal();
    const input = screen.getByPlaceholderText('Add description');
    const button = screen.getByText('Upload Registry');
  
    fireEvent.change(input, { target: { value: 'Test description' } });
    userEvent.click(button);
  
    await waitFor(() => {
      expect(saveData).toHaveBeenCalledWith('Test description', savedData, userId);
      expect(mockSetIsOpen).toHaveBeenCalledWith(false);
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Data registered correctly.');
    });
  });

  test('Handles saveData failure', async () => {
    const error = new Error('Failed to save data');
    saveData.mockRejectedValueOnce(error);
    console.error = vi.fn();

    renderModal();
    const input = screen.getByPlaceholderText('Add description');
    const button = screen.getByText('Upload Registry');

    userEvent.type(input, 'Test description');
    userEvent.click(button);

    await waitFor(() => {
      expect(saveData).toHaveBeenCalledWith('Test description', savedData, userId);
      expect(console.error).toHaveBeenCalledWith('Error al guardar los datos:', error);
    });
  });
});
