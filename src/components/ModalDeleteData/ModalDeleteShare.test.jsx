// @vitest-environment jsdom

import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import ModalDeleteShare from './ModalDeleteShare';
import { deleteSharedDataById } from '../../data/useSharedData';
import toast from 'react-hot-toast';
import { describe, test, expect, vi, afterEach } from 'vitest';

vi.mock('../../data/useSharedData');
vi.mock('react-hot-toast');

afterEach(() => cleanup());

describe('ModalDeleteShare tests:', () => {
  const mockSetIsOpen = vi.fn();
  const mockOnSuccess = vi.fn();
  const sharedDataId = 1;

  const renderModal = () => {
    render(
      <ModalDeleteShare 
        setIsOpen={mockSetIsOpen}
        sharedDataId={sharedDataId}
        onSuccess={mockOnSuccess}
      />
    );
  };

  test('Renders modal with correct elements', () => {
    renderModal();

    const headingElement = screen.getByText('Delete Shared Data');
    expect(headingElement).toBeInTheDocument();

    const descriptionInput = screen.getByPlaceholderText('Add description');
    expect(descriptionInput).toBeInTheDocument();

    const uploadButton = screen.getByRole('button', { name: 'Delete Share' });
    expect(uploadButton).toBeInTheDocument();
  });

  test('Validates description input correctly', () => {
    renderModal();

    const descriptionInput = screen.getByPlaceholderText('Add description');

    fireEvent.change(descriptionInput, { target: { value: 'Delete Shared' } });
    expect(descriptionInput.value).toBe('Delete Shared');
    
    fireEvent.change(descriptionInput, { target: { value: '' } });
    expect(descriptionInput.value).toBe('');

    fireEvent.change(descriptionInput, { target: { value: 'Invalid value' } });
    expect(descriptionInput.value).toBe('Invalid value');
  });

  test('Calls deleteSharedDataById on "Delete Share" button click and handles success', async () => {
    deleteSharedDataById.mockResolvedValueOnce();
  
    renderModal();
    const input = screen.getByPlaceholderText('Add description');
    const button = screen.getByRole('button', { name: 'Delete Share' });
  
    fireEvent.change(input, { target: { value: 'Delete Shared' } });
    fireEvent.click(button);
  
    await waitFor(() => {
      expect(deleteSharedDataById).toHaveBeenCalledWith(sharedDataId);
      expect(mockSetIsOpen).toHaveBeenCalledWith(false);
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Data deleted correctly.');
    });
  });

  test('Handles deleteSharedDataById failure', async () => {
    const error = new Error('Failed to delete shared data');
    deleteSharedDataById.mockRejectedValueOnce(error);
    console.error = vi.fn();

    renderModal();
    const input = screen.getByPlaceholderText('Add description');
    const button = screen.getByRole('button', { name: 'Delete Share' });

    fireEvent.change(input, { target: { value: 'Delete Shared' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(deleteSharedDataById).toHaveBeenCalledWith(sharedDataId);
      expect(console.error).toHaveBeenCalledWith('Error al guardar los datos:', error);
    });
  });
});
