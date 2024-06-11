import { ContractType } from "./contractSlice.ts";

export const validateContract = (contract: ContractType): string | null => {
    if (!contract.editedNewspaper) {
        return "يرجى إدخال عقود التعديل"; // "Please enter the establishment attach"
    }
    if (!contract.editedAttach) {
        return "يرجى إدخال صحيفة الشركات بالتعديل"; // "Please enter the edited attach"
    }
    
    return null; // Return null if validation succeeds
};
