import PasswordRecovery from "@/components/Authorization/PasswordRecovery/PasswordRecovery.jsx";
import Authorization from "../components/Authorization/Authoryzation.jsx";
import Costs from "../components/Costs/Costs.jsx";
import Header from "../components/Header/Header.jsx";
import Home from "../components/Home/Home.jsx";
import Invoices from "../components/Invoices/Invoices.jsx";
import InvoicesDetails from "../components/InvoicesDetails/InvoicesDetails.jsx";
import Layout from "../components/Layout/Layout.jsx";
import NoMatch from "../components/NoMatch/NoMatch.jsx";
import Records from "../components/Records/Records.jsx";
import SelectedYear from "../components/SelectedYear/index.jsx";
import Contractors from "../components/Contractors/Contractors.jsx";
import Settings from "../components/Settings/Settings.jsx";
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
  // invoice: {
  //   path: "/invoice",
  //   element: <Invoice />,
  // },
  invoiceDetails: {
    path: "/invoices/:invoiceId",
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
