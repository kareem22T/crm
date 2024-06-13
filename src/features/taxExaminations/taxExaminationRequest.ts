import { TaxExaminationType } from "./taxExaminationSlice";

export const validateTaxExamination = (TaxExamination: TaxExaminationType): string | null => {
    if (!TaxExamination.status) {
        return "يرجي ادخال حالة الفحص الضريبي"; // "Please enter the tax examination status"
    }
    if (!TaxExamination.amount) {
        return "يرجي ادخال القيمة"; // "Please enter the industrial profits"
    }
    if (!TaxExamination.year) {
        return "يرجي ادخال السنة"; // "Please enter the year"
    }

    return null; // Return null if validation succeeds
};
