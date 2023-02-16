import Input from "../Input";
import { useEffect, useState } from "react";
import "./Modal.css";
import { useSelector, useDispatch } from "react-redux";

function Modal({ data, onCloseModal, selectedMonth }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    date: "",
    amount: 0,
  });

  useEffect(() => {
    if (data.item?.description?.length) {
      console.log(data.item);
      setFormData(data.item);
    }
  }, []);

  const onChange = (type, value) => {
    setFormData((prevData) => {
      const data = { ...prevData };
      data[type] = value;
      return data;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (data.type === "add") {
      dispatch({
        type: "ADD_BILL",
        payload: { data: formData, month: selectedMonth },
      });
    } else if (data.type === "edit") {
      dispatch({
        type: "EDIT_BILL",
        payload: { data: formData, month: selectedMonth },
      });
    }
    onCloseModal();
  };
  return (
    <div className="modal">
      <div className="crossButton" onClick={onCloseModal}>
        <h1>X</h1>
      </div>
      <form className="form">
        <Input
          label="Description:"
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={(val) => {
            onChange("description", val);
          }}
        />
        <Input
          label="Category:"
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={(val) => {
            onChange("category", val);
          }}
        />
        <Input
          label="Date:"
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={(val) => {
            onChange("date", val);
          }}
        />
        <Input
          label="Amount:"
          type="text"
          name="amt"
          placeholder="Amount"
          value={formData.amount}
          onChange={(val) => {
            onChange("amount", val);
          }}
        />
        <button onClick={handleFormSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default Modal;
