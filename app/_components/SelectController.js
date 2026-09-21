import Select from 'react-select';
import { Controller } from 'react-hook-form';

function SelectController({
  label,
  name,
  newOptions,
  handleChange,
  control,
  placeholder,
  isSearchable = false,
  bigInput = false,
}) {
  return (
    <div
      className={`${bigInput ? 'flex flex-col mt-4 gap-2 w-[94%] ml-8' : 'flex flex-col mt-2.5 gap-2 w-60'} `}
    >
      <label className="text-accent-600 font-semibold text-lg">{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            options={newOptions}
            value={
              newOptions.find((option) => option.value === field.value) || null
            }
            onChange={(option) => {
              handleChange(option?.value || '');
            }}
            placeholder={placeholder}
            isSearchable={isSearchable}
            className="font-bold"
          />
        )}
      />
    </div>
  );
}

export default SelectController;
