'use client';

function Spinner({ size = 60, text }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="spinner"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />

      {text && (
        <span className="text-primary-100 font-semibold text-lg">{text}</span>
      )}
    </div>
  );
}

export default Spinner;
