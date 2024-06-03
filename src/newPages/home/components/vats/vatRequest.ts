import { VatType } from "../../../../services/vatServices";

export const validateVat = (VAT: VatType): string | null => {
    if (!VAT.status)
        return "يرجى إدخال الحالة ";

    if (!VAT.vatNumber)
        return "يرجى إدخال ضريبة الشراء ";

    if (!VAT.jurisdiction)
        return "يرجى إدخال الاختصاص القضائي ";

    if (!VAT.registrationDate)
        return "يرجى إدخال تاريخ التسجيل ";

    if (!VAT.expiryDate)
        return "يرجى إدخال تاريخ الانتهاء ";

    return null; // Return null if validation succeeds
};
