import { useState } from "react";
import Input from "../Input";
import "./Footer.css";

function Footer({ total, pageData }) {
  const [budget, setBudget] = useState(0);
  const [showMinMonthBills, setShowMinMonthBills] = useState(false);
  const [finalBudgetList, setFinalBudgetList] = useState([]);

  const getMinMonthBills = (pageData, budget) => {
    let result = 0;
    const resultPageData = [];
    const tempPageData = [...pageData];
    let tempBudget = budget;
    const descPageData = tempPageData.sort((a, b) => {
      return b.amount - a.amount;
    });

    while (
      descPageData.length > 0 &&
      tempBudget - Number(descPageData[0].amount) < 0
    ) {
      descPageData.shift();
    }

    let difference = 1;

    while (difference > 0 && descPageData.length > 0) {
      if (difference === 1) {
        difference = tempBudget - Number(descPageData[0].amount);
      } else {
        difference -= Number(descPageData[0].amount);
      }

      if (difference > 0) {
        result += 1;
        resultPageData.push(Number(descPageData[0].amount));
      } else {
        difference = difference + Number(descPageData[0].amount);
      }
      descPageData.shift();
    }
    const resultObj = { result: result, resultPageData: resultPageData };

    setShowMinMonthBills((prevState) => true);
    setFinalBudgetList(resultObj);
  };

  return (
    <div className="footer">
      <div className="total">
        <h3>Total: </h3>
        <h3> {total}</h3>
      </div>
      <div className="minBills">
        <p>Budget:</p>
        <div className="minBillInput">
          <Input
            label=""
            type="text"
            name="budget"
            placeholder="Budget"
            value={budget}
            onChange={(val) => {
              setBudget(val);
            }}
          />
        </div>
        <div className="minBillButton">
          <button onClick={() => getMinMonthBills(pageData, budget)}>
            Calculate
          </button>
        </div>
        {showMinMonthBills ? (
          <div className="NoOfBills">
            <h3>{"\u00A0"} Min. No. of Bills: </h3>
            <p>{finalBudgetList.result}</p>
            <h3> Bills Amount: </h3>
            {finalBudgetList.resultPageData.map((entry, index) => (
              <p className="total" key={`${entry}_${index}`}>
                {entry}
                {", "}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Footer;
