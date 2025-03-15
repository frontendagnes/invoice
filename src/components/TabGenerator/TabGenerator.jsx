import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";

const Tabs = styled.div`
  display: flex;
  background-color: ${(props) => props.tabsBgColor || ""};
  width: 100%;
`;

const Tab = React.memo(styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: 2px;
  color: ${(props) => props.textColor || "#ffffff"};
  border-radius: 20px 20px 0 0;
  padding: 15px 30px;
  cursor: pointer;
  flex: 1;
  min-width: 0;
  transition: background 0.3s ease-in-out;
  background: ${(props) =>
    props.active
      ? props.activeBgColor || "#5a71aa"
      : props.defaultBgColor || "#3f4d70"};

  &:hover {
    background: ${(props) => props.hoverBgColor || "#5a71aa"} !important;
  }
`);

function TabGenerator({ tabs, styles = {} }) {
  const [activeTab, setActiveTab] = useState(0);

  // Zapobiega tworzeniu nowej funkcji przy każdym renderze
  const handleTabClick = useCallback((index) => setActiveTab(index), []);

  // Zapamiętuje obiekt stylów, by nie generować nowego przy każdym renderze
  const mergedStyles = useMemo(
    () => ({
      textColor: styles.textColor || "#ffffff",
      activeBgColor: styles.activeBgColor || "#5a71aa",
      defaultBgColor: styles.defaultBgColor || "#3f4d70",
      hoverBgColor: styles.hoverBgColor || "#5a71aa",
    }),
    [styles]
  );

  return (
    <div className="tabgenerator">
      <Tabs bgColor={styles.tabsBgColor}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            active={activeTab === index}
            {...mergedStyles}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </Tab>
        ))}
      </Tabs>
      <div className="tabgenerator__content">{tabs[activeTab]?.content}</div>
    </div>
  );
}

export default React.memo(TabGenerator);
