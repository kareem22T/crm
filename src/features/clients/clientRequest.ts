import { ClientType } from "./clientSlice";

export const validateClient = (client: ClientType): string | null => {
    if (!client.code) {
        return "يرجى إدخال الرمز";
      }
      if (!client.fileStatus) {
        return "يرجى إدخال حالة الملف";
      }
      if (!client.companyName) {
        return "يرجى إدخال اسم الشركة";
      }
      if (!client.tradeName) {
        return "يرجى إدخال السمة التجارية";
      }
      if (!client.activity) {
        return "يرجى إدخال النشاط";
      }
      if (!client.legalEntity) {
        return "يرجى إدخال الكيان القانوني";
      }
      if (!client.entryDate) {
        return "يرجى إدخال  تاريخ القيد  ";
      }
      if (!client.issuingAuthority) {
        return "يرجى إدخال الجهة الصادرة";
      }
      if (!client.commercialRegisterNum) {
        return "يرجى إدخال رقم السجل التجاري";
      }
      if (!client.releaseDate) {
        return "يرجى إدخال تاريخ الإصدار";
      }
      if (!client.dateLastRenewal) {
        return "يرجى إدخال تاريخ آخر تجديد";
      }
      if (!client.dateLastRecord) {
        return "يرجى إدخال تاريخ آخر تسجيل";
      }
      if (!client.investedCapital) {
        return "يرجى إدخال رأس المال المستثمر";
      }
      if (!client.licensed) {
        return "يرجى إدخال حالة الترخيص";
      }
      if (!client.source) {
        return "يرجى إدخال المصدر";
      }
      if (!client.paid) {
        return "يرجى إدخال حالة الدفع";
      }
          
    return null;
  };
  