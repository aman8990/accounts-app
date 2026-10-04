import ButtonPreSmall from '../../invoice/_components/ButtonPreSmall';

function Memos({ memos }) {
  function formatDate(date) {
    if (!date) return '-';

    const [year, month, day] = date.split('-');

    return `${day}/${month}/${year}`;
  }

  return (
    <div className="overflow-x-auto mt-20 mb-20 p-4">
      <h1 className="text-center text-primary-100 text-3xl font-semibold mb-5">
        Last 10 Memos
      </h1>
      <table className="w-full">
        <thead>
          <tr className="border-2 text-accent-500 border-accent-500">
            <th className="p-3 text-center">ID</th>
            <th className="p-3 text-center">Name</th>
            <th className="p-3 text-center">Date</th>
            <th className="p-3 text-center">From</th>
            <th className="p-3 text-center">To</th>
            <th className="p-3 text-center">Pre IN.</th>
          </tr>
        </thead>

        <tbody>
          {memos?.map((memo) => (
            <tr
              key={memo.id}
              className="border-b-2 border-r-2 border-l-2 border-primary-100 text-primary-100 font-semibold text-lg"
            >
              <td className="p- text-center">{memo.id}</td>
              <td className="p- text-center max-w-30">
                {memo.party_master.full_name ?? '-'}
              </td>
              <td className="p- text-center">
                {formatDate(memo.memo_date) ?? '-'}
              </td>
              <td className="p- text-center">{memo.from ?? '-'}</td>
              <td className="p- text-center">{memo.to ?? '-'}</td>
              <td className="p-3 text-center">
                <ButtonPreSmall memo={memo} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Memos;
