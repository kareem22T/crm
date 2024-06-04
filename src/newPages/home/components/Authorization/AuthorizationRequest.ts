import { AuthorizationType } from "../../../../services/AuthorizationServices";

export const validateAuthorization = (Authorization: AuthorizationType): string | null => {
    if (!Authorization.authorizationNum) {
        return "يرجي ادخال رقم التوكيل"; // "Please enter the jurisdiction"
    }
    if (!Authorization.dateAuthorization) {
        return "يرجي ادخال تاريخ التوكيل"; // "Please enter the activity start date"
    }
    if (!Authorization.principal) {
        return "يرجي ادخال الموكل"; // "Please enter the tax card issue date"
    }
    if (!Authorization.principalType) {
        return "يرجي ادخال الصفة"; // "Please enter the tax card expiry date"
    }

    return null; // Return null if validation succeeds
};