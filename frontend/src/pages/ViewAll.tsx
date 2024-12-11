import { useState, useEffect } from "react";
import libraryApi from "@/module/libraryApi";

export default function ViewAll() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const books = await libraryApi.getBooks();
        setData(books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ul>
        {data.map((book, index) => (
          <li key={index}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </>
  );
}
