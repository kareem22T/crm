import { PartnerType } from "../../../../services/partnerServices";

export const validatePartner = (partner: PartnerType): string | null => {
    if (!partner.name) {
        return "يرجي ادخال أسم الشريك"; // "Please enter the partner's name"
    }
    if (!partner.contributionRatio) {
        return "يرجي ادخال نسبه المساهمه"; // "Please enter the contribution ratio"
    }
    if (!partner.contributionValue) {
        return "يرجي ادخال قيمه المساهمه"; // "Please enter the contribution value"
    }
    if (!partner.nationalId) {
        return "يرجي ادخال الرقم القومي"; // "Please enter the national ID"
    }

    return null; // Return null if validation succeeds
};
