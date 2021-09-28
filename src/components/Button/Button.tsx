import React, { FC } from 'react';
import './Button.scss';

type ButtonProps = {
  onClick?: () => void;
  type?: 'submit' | 'button'
  disabled?: boolean
  variation?: 'solid' | 'outlined'
}

const Button: FC<ButtonProps> = ({
  children, onClick, disabled = false, type = 'button', variation = 'solid',
}) => (
  <button type={type} className={`button ${variation}`} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export default Button;
