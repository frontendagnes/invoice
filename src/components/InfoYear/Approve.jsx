import Content from "./Content.jsx";

const Approve = ({ handleClickNo, addData }) => {
  return (
    <Content
      text="Operacja spowoduje reset numeru faktury i dodanie nowego roku do bazy. Jesteś pewien że chcesz kontynuować"
      handleClick={addData}
      handleClickNo={handleClickNo}
      buttonYesTxt="Pewnie, dodaj rok"
    />
  );
};

export default Approve;
