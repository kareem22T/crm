import { ContractType } from "../../../../services/contractServices";

export const validateContract = (contract: ContractType): string | null => {
    if (!contract.establishmentNewspaper) {
        return "يرجى إدخال عقد التأسيس"; // "Please enter the establishment newspaper"
    }
    if (!contract.editedNewspaper) {
        return "يرجى إدخال صحيفة الشركات بالتأسيس"; // "Please enter the edited newspaper"
    }
    if (!contract.establishmentAttach) {
        return "يرجى إدخال عقود التعديل"; // "Please enter the establishment attach"
    }
    if (!contract.editedAttach) {
        return "يرجى إدخال صحيفة الشركات بالتعديل"; // "Please enter the edited attach"
    }
    
    return null; // Return null if validation succeeds
};
