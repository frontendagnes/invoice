import Authorization from "../components/Authorization/Authoryzation.jsx";
import Header from "../components/Header/Header.jsx";
import Invoices from "../components/Invoices/Invoices.jsx";
import Invoice from "../components/Invoice/Invoice.jsx";
import InvoicesDetails from "../components/InvoicesDetails/InvoicesDetails.jsx";
import Costs from "../components/Costs/Costs.jsx";
import Records from "../components/Records/Records.jsx";
import PasswordRecovery from "@/components/Authorization/PasswordRecovery/PasswordRecovery.jsx";
import SelectedYear from "../components/SelectedYear/index.jsx";
import NoMatch from "../components/NoMatch/NoMatch.jsx";
import Home from "../components/Home/Home.jsx";
import Layout from "../components/Layout/Layout.jsx";
import Settings from "../components/Settings/Settings.jsx";
import Contractors from "../components/Contractors/Contractors.jsx";
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
        <Invoices data={invoices} />
      </Layout>
    ),
  },
  invoice: {
    path: "/invoice",
    element: <Invoice />,
  },
  invoiceDetails: {
    path: "/invoice/:invoiceId",
    element: ({ invoices }) => (
      <>
        <Header />
        <InvoicesDetails data={invoices} />
      </>
    ),
  },
  costs: {
    path: "/costs",
    element: () => (
      <Layout>
        <Costs />
      </Layout>
    ),
  },
  records: {
    path: "/records",
    element: ({ invoices }) => (
      <Layout>
        <Records data={invoices} />
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
        <Contractors/>
      </Layout>
    ),
  },
  noMatch: {
    path: "*",
    element: <NoMatch />,
  },
};

export default routesConfig;
