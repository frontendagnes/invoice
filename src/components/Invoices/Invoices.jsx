import React, { useState, useCallback, useMemo } from "react";
import "./Invoices.css";
import { useNavigate } from "react-router-dom";
import { db, deleteDoc, doc } from "../../assets/utility/firebase";
import { useStateValue } from "../../assets/utility/StateProvider";
import { getTotal, today } from "../../assets/functions";
// components
import InvoicesItem from "../InvoicesItem/InvoicesItem";
// mui
import { TextField, Pagination, Stack } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const ITEMS_PER_PAGE = 10;

function Invoices({ data }) {
  const [{ user, selectedYear }, dispatch] = useStateValue();
  const [searchText, setSearchText] = useState("");
  const [filterDate, setFilterDate] = useState(today());
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const resetDate = useCallback(() => {
    setFilterDate(today());
  }, []);

  const openDetails = useCallback(
    (details) => {
      navigate(`/invoice/${details}`);
    },
    [navigate]
  );

  const deleteItem = useCallback(
    async (itemId) => {
      await deleteDoc(doc(db, "invoices", user.uid, "invoice", itemId))
        .then(() => {
          dispatch({ type: "ALERT_DELETE" });
        })
        .catch((error) =>
          dispatch({ type: "ALERT__ERROR", item: error.message })
        );
    },
    [dispatch, user.uid]
  );

  const filterByYear = useCallback(
    (item) => new Date(item.data.date).getFullYear() === selectedYear,
    [selectedYear]
  );

  const filterByDate = useCallback(
    (item) => item.data.date === filterDate,
    [filterDate]
  );

  const filterByNameOrNumber = useCallback(
    (item) =>
      item.data.buyer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.data.number.toLowerCase().includes(searchText.toLowerCase()),
    [searchText]
  );

  const filteredDataByDate = useMemo(() => {
    return data.filter(filterByYear).filter(filterByDate);
  }, [data, filterByYear, filterByDate]);

  const paginatedDataByDate = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredDataByDate.slice(startIndex, endIndex);
  }, [filteredDataByDate, currentPage]);

  const totalPagesByDate = useMemo(() => {
    return Math.ceil(filteredDataByDate.length / ITEMS_PER_PAGE);
  }, [filteredDataByDate]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const sortedAndFilteredDataForList = useMemo(() => {
    return data
      .filter(filterByYear)
      .sort(
        (a, b) =>
          new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
      )
      .filter(filterByNameOrNumber);
  }, [data, filterByYear, filterByNameOrNumber]);

  const paginatedDataForList = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedAndFilteredDataForList.slice(startIndex, endIndex);
  }, [sortedAndFilteredDataForList, currentPage]);

  const totalPagesForList = useMemo(() => {
    return Math.ceil(sortedAndFilteredDataForList.length / ITEMS_PER_PAGE);
  }, [sortedAndFilteredDataForList]);

  return (
    <div className="invoices">
      <div className="invoices__dataFilter">
        <h2>Wyszukaj faktury wg daty</h2>
        <div className="datefilter__input">
          <div className="datefilter__input--width">
            <TextField
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              fullWidth
            />
          </div>
          <RemoveCircleIcon
            onClick={resetDate}
            color="error"
            fontSize="large"
            className="datefilter__button"
          />
        </div>

        {paginatedDataByDate.map((item) => (
          <InvoicesItem
            key={item.id}
            optionalValue={item.data.note}
            name={item.data.buyer.name}
            number={item.data.number}
            index={item.id}
            date={item.data.date}
            noteCnt={item.data?.note}
            openDetails={openDetails}
            deleteItem={deleteItem}
            amount={getTotal(item.data.products)}
          />
        ))}
        {totalPagesByDate > 1 && (
          <Stack alignItems="center" mt={2}>
            <Pagination
              count={totalPagesByDate}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        )}
      </div>
      <div className="invoices__nameFilter">
        <h2>Zestawienie faktur</h2>
        <div className="namefilter__input">
          <TextField
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            id="outlined-basic"
            label="Wyszukaj wpisując kontrahenta lub numer faktury"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
        </div>

        {paginatedDataForList.map((item) => (
          <InvoicesItem
            key={item.id}
            optionalValue={item.data.note}
            name={item.data.buyer.name}
            number={item.data.number}
            index={item.id}
            date={item.data.date}
            noteCnt={item.data?.note}
            openDetails={openDetails}
            deleteItem={deleteItem}
            amount={getTotal(item.data.products)}
          />
        ))}
        {totalPagesForList > 1 && (
          <Stack alignItems="center" mt={2}>
            <Pagination
              count={totalPagesForList}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        )}
      </div>
    </div>
  );
}

export default React.memo(Invoices);

// import React, { useState } from "react";
// import "./Invoices.css";
// import { useNavigate } from "react-router-dom";
// import { db, deleteDoc, doc } from "../../assets/utility/firebase";
// import { useStateValue } from "../../assets/utility/StateProvider";
// import { getTotal, today } from "../../assets/functions";
// // components
// import InvoicesItem from "../InvoicesItem/InvoicesItem";
// // mui
// import { TextField } from "@mui/material";
// import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

// function Invoices({ data }) {
//   const [{ user, selectedYear }, dispatch] = useStateValue();
//   const [text, setText] = useState("");
//   const [anyDate, setAnyDate] = useState(today());

//   const navigate = useNavigate();

//   const resetDate = () => {
//     setAnyDate(today());
//   };
//   const openDetails = (details) => {
//     navigate(`/invoice/${details}`);
//   };
//   const deleteItem = async (itemId) => {
//     await deleteDoc(doc(db, "invoices", user.uid, "invoice", itemId))
//       .then(() => {
//         dispatch({ type: "ALERT_DELETE" });
//       })
//       .catch((error) =>
//         dispatch({ type: "ALERT__ERROR", item: error.message })
//       );
//   };
//   return (
//     <div className="invoices">
//       <div className="invoices__dataFilter">
//         <h2>Wyszukaj faktury wg daty</h2>
//         <div className="datefilter__input">
//           <div className="datefilter__input--width">
//             <TextField
//               type="date"
//               value={anyDate}
//               onChange={(e) => setAnyDate(e.target.value)}
//               fullWidth
//             />
//           </div>
//           <RemoveCircleIcon
//             onClick={resetDate}
//             color="error"
//             fontSize="large"
//             className="datefilter__button"
//           />
//         </div>

//         {data
//           .filter(
//             (item) => new Date(item.data.date).getFullYear() === selectedYear
//           )
//           .filter((item) => item.data.date === anyDate)
//           .map((item) => (
//             <InvoicesItem
//               key={item.id}
//               optionalValue={item.data.note}
//               name={item.data.buyer.name}
//               number={item.data.number}
//               index={item.id}
//               date={item.data.date}
//               noteCnt={item.data.note}
//               openDetails={openDetails}
//               deleteItem={deleteItem}
//               amount={getTotal(item.data.products)}
//             />
//           ))}
//       </div>
//       <div className="invoices__nameFilter">
//         <h2>Zestawienie faktur</h2>
//         <div className="namefilter__input">
//           <TextField
//             type="text"
//             vlaue={text}
//             onChange={(e) => setText(e.target.value)}
//             id="outlined-basic"
//             label="Wyszukaj wpisując kontrahenta lub numer faktury"
//             variant="outlined"
//             autoComplete="off"
//             fullWidth
//           />
//         </div>
//         {data
//           .filter(
//             (item) => new Date(item.data.date).getFullYear() === selectedYear
//           )
//           .sort(
//             (a, b) =>
//               new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
//           )
//           .filter(
//             (item) =>
//               item.data.buyer.name.toLowerCase().includes(text.toLowerCase()) ||
//               item.data.number.toLowerCase().includes(text.toLowerCase())
//           )
//           .map((item) => (
//             <InvoicesItem
//               key={item.id}
//               optionalValue={item.data.note}
//               name={item.data.buyer.name}
//               number={item.data.number}
//               index={item.id}
//               date={item.data.date}
//               noteCnt={item.data?.note}
//               openDetails={openDetails}
//               deleteItem={deleteItem}
//               amount={getTotal(item.data.products)}
//             />
//           ))}
//       </div>
//     </div>
//   );
// }

// export default Invoices;
