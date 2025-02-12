import React from 'react';

interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <button className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2">
      {text}
    </button>
  );
};

export default Button;
