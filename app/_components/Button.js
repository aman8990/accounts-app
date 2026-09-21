function Button({
  children,
  onClick,
  type,
  disabled,
  rounded,
  color = 'natural',
}) {
  const colorStyles = {
    natural: 'text-accent-100 hover:bg-accent-700 bg-accent-600',

    green: 'text-white hover:bg-green-700 bg-green-600',

    red: 'text-white hover:bg-red-700 bg-red-600',
  };

  return (
    <button
      className={`flex justify-center cursor-pointer font-semibold text-xl ${colorStyles[color] ?? colorStyles.natural}  ${
        rounded ? 'rounded-full w-28 py-1' : 'rounded-md p-2 w-full'
      }`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
