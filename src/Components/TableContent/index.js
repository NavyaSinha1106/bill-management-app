import "./TableContent.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Footer";

const headings = ["Description", "Category", "Date", "Amount"];

function TableContent({
  selectedMonth,
  selectedCategory,
  onEditClick,
  onDeleteClick,
}) {
  const seedData = useSelector((state) => state.seedData);
  const [pageData, setPageData] = useState([]);
  console.log(seedData);
  useEffect(() => {
    if (selectedCategory.length) {
      const catData = seedData[selectedMonth].filter((elem) => {
        if (elem.category === selectedCategory) {
          return elem;
        }
      });
      setPageData(catData);
    } else {
      setPageData(seedData[selectedMonth]);
    }
  }, [selectedCategory, selectedMonth, seedData]);

  console.log(pageData);

  return (
    <>
      <div className="TableHeading">
        {headings.map((value, index) => (
          <h2 key={`id_${index}&val_${value}`}>{value}</h2>
        ))}
      </div>
      <div className="TableContent">
        {pageData.map((item, index) => (
          <div key={`id_${index}&val_${item}`}>
            <div className="TableRow">
              <h2>{item.description}</h2>
              <h2>{item.category}</h2>
              <h2>{item.date}</h2>
              <h2>{item.amount}</h2>
              <button
                className="RowEditButton"
                onClick={() => onEditClick(item)}
              >
                Edit
              </button>
              <button
                className="RowDeleteButton"
                onClick={() => onDeleteClick(item)}
              >
                Delete
              </button>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <Footer
        total={(() => {
          let total = 0;
          pageData.forEach((item) => {
            total = total + item.amount;
          });
          return total;
        })()}
        pageData={pageData}
      />
    </>
  );
}

export default TableContent;
