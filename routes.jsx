import PasswordRecovery from "@/components/Authorization/PasswordRecovery/PasswordRecovery.jsx";
import Authorization from "./src/components/Authorization/Authoryzation.jsx";
import Costs from "./src/components/Costs/Costs.jsx";
import Header from "./src/components/Header/Header.jsx";
import Home from "./src/components/Home/Home.jsx";
import Invoices from "./src/components/Invoices/Invoices.jsx";
import InvoicesDetails from "./src/components/Invoices/InvoicesDetails/InvoicesDetails.jsx";
import Layout from "./src/components/Layout/Layout.jsx";
import NoMatch from "./src/components/NoMatch/NoMatch.jsx";
import Records from "./src/components/Records/Records.jsx";
import SelectedYear from "./src/components/SelectedYear/index.jsx";
import Contractors from "./src/components/Contractors/Contractors.jsx";
import Settings from "./src/components/Settings/Settings.jsx";
import CorrectionInvoices from "./src/components/CorrectionInvoices/CorrectionInvoices.jsx";
import CorrectionDetails from "./src/components/CorrectionInvoices/CorrectionDetails/CorrectionDetails.jsx";
import SelectYearHeader from "./src/components/SelectYearHeader/SelectYearHeader.jsx";
import Products from "./src/components/Products/Products.jsx";

const routesConfig = {
  authorization: {
    path: "/authorization",
    element: <Authorization />,
  },
  home: {
    index: true,
    path: "/",
    element: <Home />,
  },
  invoices: {
    path: "/invoices",
    element: ({ invoices }) => (
      <Layout>
        <SelectYearHeader />
        <Invoices data={invoices} />
      </Layout>
    ),
  },
  invoiceDetails: {
    path: "/invoices/:invoiceId",
    element: ({ invoices }) => (
      <>
        <Header />
        <InvoicesDetails data={invoices} />
      </>
    ),
  },
  corectionInvoices: {
    path: "/correction-invoices",
    element: ({ correctionInvoices }) => (
      <Layout>
        <SelectYearHeader />
        <CorrectionInvoices data={correctionInvoices} />
      </Layout>
    ),
  },
  corectionInvoicesDetails: {
    path: "/correction-invoices/:correctionId",
    element: ({ correctionInvoices }) => (
      <>
        <Header />
        <CorrectionDetails data={correctionInvoices} />
      </>
    ),
  },
  costs: {
    path: "/costs",
    element: () => (
      <Layout>
        <SelectYearHeader />
        <Costs />
      </Layout>
    ),
  },
  records: {
    path: "/records",
    element: ({ allInvoices }) => (
      <Layout>
        <Records data={allInvoices} />
      </Layout>
    ),
  },
  products: {
    path: "/products",
    element: () => (
      <Layout>
        <Products />
      </Layout>
    ),
  },
  passwordRecovery: {
    path: "/password-recovery",
    element: <PasswordRecovery />,
  },
  settings: {
    path: "/settings",
    element: () => (
      <Layout>
        <Settings />
      </Layout>
    ),
  },
  selectedYear: {
    path: "/settings/selected-year",
    element: () => (
      <Layout>
        <SelectedYear />
      </Layout>
    ),
  },
  contractors: {
    path: "/settings/contractors",
    element: () => (
      <Layout>
        <Contractors />
      </Layout>
    ),
  },
  noMatch: {
    path: "*",
    element: <NoMatch />,
  },
};

export default routesConfig;
