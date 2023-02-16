import seedData from "./seedData";

export const reducer = (state = seedData, action) => {
  switch (action.type) {
    case "ADD_BILL": {
      const month = action.payload.month;
      const formData = {
        ...action.payload.data,
        ...{ id: `${state[month].length + 2}` },
      };
      console.log(formData);
      const result = {
        ...state,
        ...{ [month]: [...state[month], formData] },
      };
      return result;
    }

    case "EDIT_BILL": {
      const month = action.payload.month;
      const id = action.payload.data.id;
      console.log(action.payload.data);
      let monthData = [...state[month]];
      console.log(id);
      monthData.splice(id - 1, 1, action.payload.data);
      let result = { ...state, ...{ [month]: monthData } };
      return result;
    }

    case "DELETE_BILL": {
      const id = action.payload.data.id;
      const month = action.payload.month;
      let deleteIndex;
      state[month].forEach((bill, index) => {
        if (bill.id === id) {
          deleteIndex = index;
        }
      });
      const newMonthData = [...state[month]];
      newMonthData.splice(deleteIndex, 1);
      newMonthData.forEach((bill, index) => {
        newMonthData[index] = { ...bill, ...{ id: `${index + 1}` } };
      });
      const result = { ...state, ...{ [month]: newMonthData } };
      return result;
    }
    default:
      return state;
  }
};
