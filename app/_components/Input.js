function Input({
  label,
  id,
  type = 'text',
  register,
  placeholder,
  disabled,
  value,
  rules,
  error,
}) {
  return (
    <div className="p-3 w-full">
      <div className="mb-1.5 flex items-center gap-2 ml-2">
        <label htmlFor={id} className="text-lg font-bold text-accent-600">
          {label} :
        </label>

        {error && (
          <span className="text-xs font-semibold text-red-600">* {error}</span>
        )}
      </div>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        {...register(id, rules)}
        className={`w-full rounded-md border px-2 py-2 text-lg font-semibold outline-none transition 
          ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500'
              : 'border-gray-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-600'
          }
          ${
            disabled
              ? 'cursor-not-allowed bg-gray-400 text-gray-1'
              : 'bg-white text-primary-950'
          }
        `}
      />
    </div>
  );
}

export default Input;
