import { VatType } from "./vatSlice";

export const validateVat = (VAT: VatType): string | null => {
    if (!VAT.status)
        return "يرجى إدخال موقف التسجيل بالقيمة المضافة ";

    if (!VAT.vatNumber)
        return "يرجى إدخال رقم التسجيل بالقيمة المضافة ";

    if (!VAT.jurisdiction)
        return "يرجى إدخال المأمورية التابع لها ";

    if (!VAT.registrationDate)
        return "يرجى إدخال تاريخ التسجيل ";

    if (!VAT.expiryDate)
        return "يرجى إدخال تاريخ انتهاء شهادة التسجيل ";

    return null; // Return null if validation succeeds
};
