import { useState, useEffect } from "react";

function Type1({ children }) {
  useEffect(() => {
    return () => {
      console.log("Type1 unmount");
    };
  }, []);
  return children;
}

function Type2({ children }) {
  useEffect(() => {
    return () => {
      console.log("Type2 unmount");
    };
  }, []);
  return children;
}

function Type3({ children }) {
  useEffect(() => {
    return () => {
      console.log("Type3 unmount");
    };
  }, []);
  return children;
}

function Type4({ children }) {
  useEffect(() => {
    return () => {
      console.log("Type4 unmount");
    };
  }, []);
  return children;
}

function SortedItems({ items }) {
  return (
    <>
      {items.map((item, index) => {
        // if no key provided or using key as index, Item component will be
        // unmounted when index changes for the same component
        switch (item) {
          case 1: {
            // return <Type1>{item}</Type1>;
            // return <Type1 key={index}>{item}</Type1>;
            return <Type1 key={item}>{item}</Type1>;
          }
          case 2: {
            // return <Type2>{item}</Type2>;
            // return <Type2 key={index}>{item}</Type2>;
            return <Type2 key={item}>{item}</Type2>;
          }
          case 3: {
            // return <Type3>{item}</Type3>;
            // return <Type3 key={index}>{item}</Type3>;
            return <Type3 key={item}>{item}</Type3>;
          }
          case 4: {
            // return <Type4>{item}</Type4>;
            // return <Type4 key={index}>{item}</Type4>;
            return <Type4 key={item}>{item}</Type4>;
          }
          default: {
            return null;
          }
        }
      })}
    </>
  );
}

export default function Sort() {
  const [items, setItems] = useState([1, 2, 3, 4]);
  console.log("Sort: items", items);

  const getRandomIndex = (size) => {
    return Math.floor(Math.random() * size);
  };

  const getSortedItems = ({ result = [], arr }) => {
    const randomIndex = getRandomIndex(arr.length);
    result.push(arr[randomIndex]);
    if (arr.length > 1) {
      const nextArr = arr.slice();
      nextArr.splice(randomIndex, 1);
      getSortedItems({ result, arr: nextArr });
    }
    return result;
  };

  const sortItems = () => {
    setItems(getSortedItems({ arr: items }));
  };

  return (
    <>
      <button onClick={sortItems}>Random Sort</button>
      <SortedItems items={items} />
    </>
  );
}
