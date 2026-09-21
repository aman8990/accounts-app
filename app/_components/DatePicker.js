'use client';

import { useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { enIN } from 'date-fns/locale';
import 'react-day-picker/style.css';

function DatePicker({ control, name, label }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative mx-3 my-2 flex flex-col gap-2">
      <label className="text-lg text-accent-600 font-semibold">{label}</label>

      <Controller
        name={name}
        control={control}
        defaultValue={new Date()}
        render={({ field }) => (
          <>
            {/* Date input */}
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="w-full border rounded-md px-3 py-2 text-left bg-white"
            >
              {field.value ? format(field.value, 'dd/MM/yyyy') : 'DD/MM/YYYY'}
            </button>

            {/* Calendar popup */}
            {open && (
              <div className="absolute z-50 mt-2 rounded-md border bg-white shadow-lg">
                <DayPicker
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    if (date) {
                      field.onChange(date);
                      setOpen(false);
                    }
                  }}
                  locale={enIN}
                  defaultMonth={field.value}
                />
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}

export default DatePicker;
