function PageTitle({ title }) {
  return (
    <div className="text-center">
      <h1 className="inline-block text-6xl text-primary-100 my-10 border-4 border-primary-100 rounded-2xl px-4 pt-3 pb-2">
        {title}
      </h1>
    </div>
  );
}

export default PageTitle;
