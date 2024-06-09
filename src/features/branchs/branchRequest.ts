import { BranchType } from "./branchSlice";

export const validateBranch = (Branch: BranchType): string | null => {
    if (!Branch.address)
        return "يرجى إدخال عنوان الفروع ";

    if (!Branch.manager)
        return "يرجى إدخال المدير المسئول";

    if (!Branch.phoneNumber)
        return "يرجى ادخال رقم التليفون ";

    if (!Branch.email)
        return "يرجى إدخال إيميل للتواصل  ";

    if (!Branch.dateRentalContract)
        return "يرجى إدخال تاريخ عقد الإيجار   ";

    return null; // Return null if validation succeeds
  };
  