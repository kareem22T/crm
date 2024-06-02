import { clientRow } from '../../../services/clientServices';

interface TableProps {
    clients: clientRow[],
    showClient: (client: clientRow) => void;
  }
  
const Table: React.FC<TableProps> = ({ clients, showClient }) => {  
    return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-right dark:bg-meta-4" style={{whiteSpace: "nowrap"}}>
                <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">كود الشركة</th>
                <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">اسم الشركة</th>
                <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">الاسم التجاري</th>
                <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">النشاط</th>
                <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">رقم السجل التجاري</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client:clientRow) => (
                <tr key={client.id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{client.code}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{client.companyName}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{client.tradeName}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{client.activity}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{client.commercialRegisterNum}</p>
                    </td>
                    <td>
                      <button onClick={() => showClient(client)} className="inline-flex bg-blck items-center justify-center gap-2.5 rounded-full bg-meta-3 py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                        </svg>
                      </button>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
