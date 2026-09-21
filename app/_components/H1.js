function H1({ label, text }) {
  return (
    <h1 className="flex gap-2">
      <span className="text-accent-500 shrink-0">{label} :</span>

      <span className="text-primary-100 break-words min-w-0">{text}</span>
    </h1>
  );
}

export default H1;
