import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoveLeft, Pencil, Trash2 } from "lucide-react";
import { useNavigation } from "@/module/libraryNavigate";
import { handleGetBook } from "@/services/bookService";
export default function Details() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { navigateToEdit, navigateBack, navigateToDelete } = useNavigation();
  useEffect(() => {
    async function fetchBookDetails() {
      try {
        const bookDetails = await handleGetBook(id!);
        setBook(bookDetails);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p>Loading...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p>Book not found.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <div className="flex-col space-y-10 justify-evenly w-full max-w-2xl">
        <div className=" bg-slate-100 rounded-lg shadow-md p-8 space-y-4">
          <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
          <p className="text-lg text-slate-500 mb-2">Author: {book.author}</p>
          <p className="text-slate-400">ISBN: {book.isbn}</p>
          <p className="text-slate-400">
            Published: {new Date(book.publishedDate).toLocaleDateString()}
          </p>
          <p className="text-slate-400">Pages: {book.pageCount}</p>
          <p className="text-slate-400">Genre: {book.genre}</p>
        </div>
        <div className="flex space-x-10">
          <Button
            variant="default"
            className="text-left w-full bg-slate-200 hover:bg-slate-300 text-black"
            onClick={() => {
              navigateBack();
            }}
          >
            <MoveLeft /> Back
          </Button>
          <Button
            variant="destructive"
            className="text-left w-full hover:bg-red-700 text-black"
            onClick={(event) => {
              event.stopPropagation();
              navigateToDelete(book._id);
            }}
          >
            <Trash2 />
            Delete
          </Button>
          <Button
            variant="default"
            className="text-left w-full bg-green-500 hover:bg-green-600 text-black"
            onClick={(event) => {
              event.stopPropagation();
              navigateToEdit(book._id);
            }}
          >
            <Pencil />
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
