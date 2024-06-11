import { InvoiceType } from "./invoiceSlice";

export const validateInvoice = (invoice: InvoiceType): string | null => {
    if (!invoice.username) {
        return "يرجي ادخال اسم المستخدم"; // "Please enter the username"
    }
    if (!invoice.password) {
        return "يرجي ادخال كلمة المرور"; // "Please enter the password"
    }
    if (!invoice.passToken) {
        return "يرجي ادخال رمز المرور"; // "Please enter the pass token"
    }
    if (!invoice.subscriptionDate) {
        return "يرجي ادخال تاريخ الاشتراك"; // "Please enter the subscription date"
    }
    if (!invoice.renewalDate) {
        return "يرجي ادخال تاريخ التجديد"; // "Please enter the renewal date"
    }
    if (!invoice.eInvoiceRegistration) {
        return "يرجي ادخال تسجيل الفاتورة الإلكترونية"; // "Please enter the e-invoice registration"
    }

    return null; // Return null if validation succeeds
};
