import { months } from '../months';

import SelectMonth from '../SelectMonth/SelectMonth';
import ViewSelectedYear from '../../SelectedYear/ViewSelectedYear';

function MonthAndYear({numberChange, setSelectMonth, number}) {
  return (
    <div className="records__selects">
      <SelectMonth
        selectedMonthNumber={number}
        onMonthChange={(newMonthNumber) => {
          numberChange(newMonthNumber - 1);
          setSelectMonth(months[newMonthNumber - 1]);
        }}
      />
      <ViewSelectedYear />
    </div>
  );
}

export default MonthAndYear