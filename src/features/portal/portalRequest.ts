import { PortalType } from "./portalSlice";

export const validatePortal = (portal: PortalType): string | null => {
    if (!portal.portalType) {
        return "يرجي ادخال نوع البوابة"; // "Please enter the portal type"
    }
    if (!portal.email) {
        return "يرجي ادخال البريد الإلكتروني"; // "Please enter the email"
    }
    if (!portal.passwordEmail) {
        return "يرجي ادخال كلمة مرور البريد الإلكتروني"; // "Please enter the email password"
    }
    if (!portal.username) {
        return "يرجي ادخال اسم المستخدم"; // "Please enter the username"
    }
    if (!portal.passwordWebsite) {
        return "يرجي ادخال كلمة مرور الموقع"; // "Please enter the website password"
    }
    if (!portal.salariesTaxPassWord) {
        return "يرجي ادخال كلمة مرور ضرائب الرواتب"; // "Please enter the salaries tax password"
    }
    if (!portal.accountantCode) {
        return "يرجي ادخال رمز المحاسب"; // "Please enter the accountant code"
    }

    return null; // Return null if validation succeeds
};
