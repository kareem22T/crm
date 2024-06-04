import { GeneralTaxType } from "../../../../services/generalTaxServices";

export const validateGeneralTax = (GeneralTax: GeneralTaxType): string | null => {
    if (!GeneralTax.jurisdiction) {
        return "يرجي ادخال المأموريه التابع لها"; // "Please enter the jurisdiction"
    }
    if (!GeneralTax.activityStartDate) {
        return "يرجي ادخال تاريخ بدء النشاط"; // "Please enter the activity start date"
    }
    if (!GeneralTax.taxCardIssueDate) {
        return "يرجي ادخال تاريخ اصدار البطاقه الضريبيه"; // "Please enter the tax card issue date"
    }
    if (!GeneralTax.taxCardExpiryDate) {
        return "يرجي ادخال تاريخ انتهاء البطاقه الضريبيه"; // "Please enter the tax card expiry date"
    }
    if (!GeneralTax.subjectAdvancePayments) {
        return "يرجي ادخال الخضوع للدفعات المقدمة"; // "Please enter the subject advance payments"
    }
    if (!GeneralTax.periodSubjectAdvancePayments) {
        return "يرجي ادخال فترة الخضوع للدفعات المقدمة"; // "Please enter the period subject advance payments"
    }

    // Additional validation for date formats
    const isValidDate = (date: string) => !isNaN(Date.parse(date));
    
    if (!isValidDate(GeneralTax.activityStartDate)) {
        return "تاريخ بدء النشاط غير صالح"; // "Invalid activity start date"
    }
    if (!isValidDate(GeneralTax.taxCardIssueDate)) {
        return "تاريخ اصدار البطاقه الضريبيه غير صالح"; // "Invalid tax card issue date"
    }
    if (!isValidDate(GeneralTax.taxCardExpiryDate)) {
        return "تاريخ انتهاء البطاقه الضريبيه غير صالح"; // "Invalid tax card expiry date"
    }
    if (!isValidDate(GeneralTax.periodSubjectAdvancePayments)) {
        return "فترة الخضوع للدفعات المقدمة غير صالح"; // "Invalid period subject advance payments"
    }

    return null; // Return null if validation succeeds
};