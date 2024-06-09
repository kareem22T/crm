import { TaxExaminationType } from "./taxExaminationSlice";

export const validateTaxExamination = (TaxExamination: TaxExaminationType): string | null => {
    if (!TaxExamination.status) {
        return "يرجي ادخال موقف الفحص الضريبي"; // "Please enter the tax examination status"
    }
    if (!TaxExamination.industrialProfits) {
        return "يرجي ادخال أرباح تجاريه وصناعيه"; // "Please enter the industrial profits"
    }
    if (!TaxExamination.salaryTax) {
        return "يرجي ادخال ضريبه الأجور والمرتبات"; // "Please enter the salary tax"
    }
    if (!TaxExamination.stampDuty) {
        return "يرجي ادخال ضريبه الدمغه"; // "Please enter the stamp duty"
    }
    if (!TaxExamination.year) {
        return "يرجي ادخال السنة"; // "Please enter the year"
    }

    return null; // Return null if validation succeeds
};
