import React, { useState } from "react";
import styled from "styled-components";

const TabsWrapper = styled.div`
  width: 100%;
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
  background: #3f4d70;
  padding: 10px 30px;
  cursor: pointer;
  width: 50%;
  border-radius: 20px 20px 0 0;
  transition: color 0.6s ease-in;
  &:hover {
    color: #fafafafa !important;
  }
`;

function TabGenerator({ component, component1, component2, title, title1 }) {
  const [tab, setTab] = useState(true);
  const [tab1, setTab1] = useState(false);

  const styles = {
    defaultStyle: {
      color:"#adadad",
    },
    activeStyle: {
      color: "#fafafafa",
    },
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
          style={tab ? styles.activeStyle : styles.defaultStyle}
          onClick={switchTab}
        >
          {title}
        </Tab>
        <Tab
          style={tab1 ? styles.activeStyle : styles.defaultStyle}
          onClick={switchTab1}
        >
          {title1}
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
