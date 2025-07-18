import "./SelectYearHeader.css";
import ViewSelectedYear from "../SelectedYear/ViewSelectedYear";
function SelectYearHeader() {
  return (
    <div className="selectYearHeader">
      <span>Wybierz rok który chcesz przeglądać:</span>
      <ViewSelectedYear />
    </div>
  );
}

export default SelectYearHeader;
