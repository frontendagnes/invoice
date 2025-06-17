import React from "react";
import { useStateValue } from "@/utility/StateProvider.jsx";

//components
import Authorization from "@/components/Authorization/Authoryzation.jsx";
import CreateInvoice from "@/components/CreateInvoice/CreateInvoice.jsx";
import InfoYear from "@/components/InfoYear/index.jsx";
import Layout from "../Layout/Layout";
function Home() {
  const [{ user }] = useStateValue();
  return (
    <div className="app__login">
      {user ? (
        <>
          <Layout>
            <CreateInvoice />
          </Layout>
          <InfoYear />
        </>
      ) : (
        <Authorization />
      )}
    </div>
  );
}

export default Home;
