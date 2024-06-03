import { VatType, VatRow } from '../../../services/vatServices';

interface TableProps {
    vats: VatRow[],
  }
  
const VatList: React.FC<TableProps> = ({ vats }) => {  
    return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-right dark:bg-meta-4" style={{whiteSpace: "nowrap"}}>
                <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">موقف التسجيل بالقيمة المضافة</th>
                <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">رقم التسجيل بالقيمة المضافة</th>
                <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">المأمورية التابع لها</th>
                <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">تاريخ التسجيل </th>
                <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">تاريخ انتهاء شهادة التسجيل  </th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            {vats.map((vat:VatRow) => (
                <tr key={vat.id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{vat.status}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{vat.vatNumber}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{vat.jurisdiction}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{vat.registrationDate}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{vat.expiryDate}</p>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VatList;
