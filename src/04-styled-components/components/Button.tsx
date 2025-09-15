import React from 'react';
import { Loader2 } from 'lucide-react';
import { StyledButton, Spinner } from './Button.styles';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  children,
  variant = 'solid',
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className = ''
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      $variant={variant}
      onClick={onClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      className={className}
    >
      {loading && (
        <Spinner>
          <Loader2 size={16} />
        </Spinner>
      )}
      {children}
    </StyledButton>
  );
}