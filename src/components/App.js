import React, { useState, useEffect } from "react";
import './../styles/App.css';
import 'regenerator-runtime/runtime'

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const offsetHeight = document.documentElement.offsetHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= offsetHeight && !isLoading) {
        setIsLoading(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
      );
      const data = await response.json();
      setItems((prevItems) => [...prevItems, ...data]);
      setIsLoading(false);
      setPage((prevPage) => prevPage + 1);
    };

    if (page === 1) {
      setIsLoading(true);
      fetchData();
    } else if (isLoading) {
      fetchData();
    }
  }, [isLoading, page]);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <img src={item.thumbnailUrl} alt={item.title} />
        </div>
      ))}
      {isLoading && <p class="loadmore">Loading more items...</p>}
    </div>
  );
}

export default App;