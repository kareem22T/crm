import AuthorizationsView from "../authorizations/authorizationView";
import BranchesView from "../branchs/branchesView";
import ContractsView from "../contracts/contractsView";
import GeneralTaxesView from "../generalTaxes/generalTaxesView";
import InvoiceView from "../invoice/invoiceView";
import PartnersView from "../parteners/partnersView";
import PortalView from "../portal/portalView";
import SocialInsurancesView from "../socialInsurances/socialInsurancesView";
import TaxExaminationsView from "../taxExaminations/taxExaminationsView";
import VatsView from "../vats/vatsView";

enum DataToShow {
    MainInfo = 1,
    GeneralTax,
    PaymentInfo
}

interface formProps {
    show: number
}

const InfoToShow: React.FC<formProps> = ({show}) => {
    return (
        <>
            {
                show == DataToShow.MainInfo && (
                    <>
                        <hr style={{height: 1, width: "100%", margin: "auto", display: "block", border: "none", background: "rgba(0, 0, 0, .1)"}}/>
                        <BranchesView />
                        <hr style={{height: 1, width: "100%", margin: "auto", display: "block", border: "none", background: "rgba(0, 0, 0, .1)"}}/>
                        <PartnersView />
                        <hr style={{height: 1, width: "100%", margin: "auto", display: "block", border: "none", background: "rgba(0, 0, 0, .1)"}}/>
                        <ContractsView />
                        <hr style={{height: 1, width: "100%", margin: "auto", display: "block", border: "none", background: "rgba(0, 0, 0, .1)"}}/>
                        <AuthorizationsView />
                        <hr style={{height: 1, width: "100%", margin: "auto", display: "block", border: "none", background: "rgba(0, 0, 0, .1)"}}/>
                        <SocialInsurancesView />
                    </>
                )
            }
            {
                show == DataToShow.GeneralTax && (
                    <>
                        <GeneralTaxesView />
                        <hr style={{height: 1, width: "100%", margin: "auto", display: "block", border: "none", background: "rgba(0, 0, 0, .1)"}}/>
                        <VatsView />
                        <hr style={{height: 1, width: "100%", margin: "auto", display: "block", border: "none", background: "rgba(0, 0, 0, .1)"}}/>
                        <TaxExaminationsView />
                    </>
                )
            }
            {
                show == DataToShow.PaymentInfo && (
                    <>
                        <PortalView />
                        <hr style={{height: 1, width: "100%", margin: "auto", display: "block", border: "none", background: "rgba(0, 0, 0, .1)"}}/>
                        <InvoiceView />
                    </>
                )
            }
        </>
    )
}

export default InfoToShow;


