import { SocialInsuranceType } from "./socialInsuranceSlice";

export const validateSocialInsurance = (socialInsurance: SocialInsuranceType): string | null => {
    if (!socialInsurance.insuranceStatus) {
        return "يرجي ادخال موقف التأمينات"; // "Please enter the insurance status"
    }
    if (!socialInsurance.socialInsuranceNum) {
        return "يرجي ادخال رقم التأمينات الاجتماعية"; // "Please enter the social insurance number"
    }
    if (!socialInsurance.associatedInsurance) {
        return "يرجي ادخال تابع لتأمينات"; // "Please enter the associated insurance"
    }
    if (!socialInsurance.attached) {
        return "يرجي ارفاق المستند"; // "Please attach the document"
    }
    if (!socialInsurance.BranchId) {
        return "يرجي اختيار الفرع"; // "Please attach the document"
    }
    // Additional validation can be added as required
    return null; // Return null if validation succeeds
};
