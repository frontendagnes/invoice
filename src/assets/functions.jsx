import { nanoid } from "nanoid";
import { CircularProgress } from "@mui/material";
export const today = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  const currentDay = () => {
    if (day < 10) {
      return `0${day}`;
    } else return day;
  };
  const currentMonth = () => {
    if (month < 10) {
      return `0${month}`;
    } else return month;
  };

  let fulldate = `${year}-${currentMonth()}-${currentDay()}`;
  return fulldate;
};

export const getTotal = (data) =>
  data?.reduce((amount, item) => item.worth + amount, 0);

export const getSum = (data) =>{
  data.reduce((amount, item) => item + amount, 0)
}
export const index = () => {
  return `item-${nanoid(8)}`;
};
export const renderLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      padding: "20px",
      alignItems: "center",
    }}
  >
    <CircularProgress color="success" />
    <span
      style={{
        marginLeft: "10px",
        letterSpacing: "3px",
      }}
    >
      Loading...
    </span>
  </div>
);
