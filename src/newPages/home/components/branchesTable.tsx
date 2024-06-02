import { BranchType, BranchRow } from '../../../services/branchesServices';

interface TableProps {
    branchs: BranchRow[],
  }
  
const BranchesList: React.FC<TableProps> = ({ branchs }) => {  
    return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-right dark:bg-meta-4" style={{whiteSpace: "nowrap"}}>
                <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">عنوان الفروع</th>
                <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">المدير المسئول</th>
                <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">رقم التليفون  للتواصل</th>
                <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">إيميل للتواصل</th>
                <th className="border-b border-[#eee] py-5 px-4 font-medium text-black dark:text-white">تاريخ عقد الإيجار </th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            {branchs.map((branch:BranchRow) => (
                <tr key={branch.id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{branch.address}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{branch.manager}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{branch.phoneNumber}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{branch.email}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{branch.dateRentalContract}</p>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BranchesList;
