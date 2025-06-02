/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseForm, { CourseFormData } from './courseForm';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('CourseForm', () => {
  const mockSubmit = jest.fn();

  const defaultProps = {
    onSubmit: mockSubmit,
    submitLabel: 'Enviar',
  };

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('valida campos obrigatórios ao submeter vazio', async () => {
    render(<CourseForm {...defaultProps} />);

    fireEvent.click(screen.getByText('Enviar'));

    await waitFor(() => {
      expect(screen.getByText('addCourse:errors.title')).toBeInTheDocument();
      expect(screen.getByText('addCourse:errors.description')).toBeInTheDocument();
      expect(screen.getByText('addCourse:errors.image_required')).toBeInTheDocument();
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('preenche com valores iniciais quando fornecido', () => {
    const initialValues: CourseFormData = {
      title: 'Curso Inicial',
      description: 'Desc inicial',
      imageUrl: 'https://img.com/1.png',
    };

    render(<CourseForm {...defaultProps} initialValues={initialValues} />);

    expect(screen.getByDisplayValue('Curso Inicial')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Desc inicial')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://img.com/1.png')).toBeInTheDocument();
  });
});
