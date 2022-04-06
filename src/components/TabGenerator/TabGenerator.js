import React, { useState } from "react";
import styled from "styled-components";

const TabsWrapper = styled.div`
`;
const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
const Tab = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: 2px;
  color: #ffffff;
  padding: 10px 30px;
  cursor: pointer;
  width: 50%;
  border-radius: 20px 20px 0 0;
  transition: background 0.75s ease-in;
  &:hover {
    background: #3f4d70 !important;
  }
`;

function TabGenerator({ component, component1 }) {
  const [tab, setTab] = useState(true);
  const [tab1, setTab1] = useState(false);

  const styles = {
    activeStyle: "#3f4d70",
    defaultStyle: "#5a71aa",
  };

  const switchTab = () => {
    setTab(true);
    setTab1(false);
  };
  const switchTab1 = () => {
    setTab(false);
    setTab1(true);
  };

  return (
    <TabsWrapper>
      <Tabs>
        <Tab
          style={{ background: tab ? styles.activeStyle : styles.defaultStyle }}
          onClick={switchTab}
        >
          Logowanie
        </Tab>
        <Tab
          style={{
            background: tab1 ? styles.activeStyle : styles.defaultStyle,
          }}
          onClick={switchTab1}
        >
          Rejestracja
        </Tab>
      </Tabs>
      <div className="tabgenrator__content">
        {tab ? <div>{component}</div> : null}
        {tab1 ? <div>{component1}</div> : null}
      </div>
    </TabsWrapper>
  );
}

export default TabGenerator;
