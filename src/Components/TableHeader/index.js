import "./TableHeader.css";
import { useState, useEffect, useMemo } from "react";
import Modal from "../Modal";
import seedData from "../../seedData";
import TableContent from "../TableContent";
import { useSelector, useDispatch } from "react-redux";
import Chart from "../Chart";
import Footer from "../Footer";

const options = [
  "FoodNDinning",
  "utility",
  "shopping",
  "education",
  "Personal Care",
  "Travel",
];

const months = [
  "January",
  "February",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function TableHeader() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState({
    type: "",
    isOpen: false,
    item: {},
  });
  const [chart, toggleChart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(1);
  const seedData = useSelector((state) => state.seedData);

  const onOpenModal = (type, item = {}) => {
    setModal((prevData) => {
      const data = { ...prevData };
      data.type = type;
      data.isOpen = true;
      data.item = item;
      return data;
    });
  };

  const onCloseModal = () => {
    setModal((prevData) => {
      const data = { ...prevData };
      data.type = "";
      data.isOpen = false;
      data.item = {};
      return data;
    });
  };

  const onDeleteClick = (item) => {
    dispatch({
      type: "DELETE_BILL",
      payload: { data: item, month: selectedMonth },
    });
  };

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  function handleMonthChange(event) {
    console.log(event.target.value);
    setSelectedMonth(event.target.value);
  }

  return (
    <>
      <div className="TableHead">
        <div className="MonthDropdown">
          <select onChange={handleMonthChange} value={selectedMonth}>
            {months.map((value, index) => (
              <option value={index + 1} key={`id_${index}&val_${value}`}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="CategoryDropdown">
          <select onChange={handleCategoryChange} value={selectedCategory}>
            <option value={""}>Choose a category</option>
            {options.map((value, index) => (
              <option value={value} key={`id_${index}&val_${value}`}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div></div>
        <div className="Button">
          {modal.isOpen && (
            <Modal
              data={modal}
              onCloseModal={onCloseModal}
              selectedMonth={selectedMonth}
            />
          )}
          {chart && (
            <Chart
              onCloseChart={() => {
                toggleChart((prevState) => !prevState);
              }}
              monthlyData={seedData[selectedMonth]}
            />
          )}
          <button onClick={() => onOpenModal("add")}>Add</button>
          <button onClick={() => toggleChart((prevState) => !prevState)}>
            Chart
          </button>
        </div>
      </div>
      <TableContent
        selectedMonth={selectedMonth}
        selectedCategory={selectedCategory}
        onEditClick={(item) => onOpenModal("edit", item)}
        onDeleteClick={onDeleteClick}
      />
    </>
  );
}
export default TableHeader;
