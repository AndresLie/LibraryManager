import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { handleDeleteBook, handleGetBook } from "@/services/bookService";
import { Book } from "@/types/book";
import { MoveLeft, Trash2 } from "lucide-react";

export default function Delete() {
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        if (id) {
          const bookDetails = await handleGetBook(id); // or another service to get book by id
          setBook(bookDetails);
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
        toast({
          variant: "destructive",
          title: "Failed to fetch book",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id, toast]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await handleDeleteBook(id);
      toast({
        className: "bg-green-600 bottom-28",
        variant: "destructive",
        title: "Book Deleted Successfully",
        duration: 2000,
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting book:", error);
      toast({
        variant: "destructive",
        title: "Failed to delete book",
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found.</p>;
  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <div className="flex-col justify-center  w-full max-w-2xl ">
        <div className="max-w-2xl mx-auto p-8 bg-slate-100 rounded-lg shadow-md space-y-4">
          <h1 className="text-2xl font-bold mb-4">Delete This Book?</h1>
          <div className="space-y-2">
            <p>
              <strong>Title:</strong> {book.title}
            </p>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p>
              <strong>Published Date:</strong>{" "}
              {book.publishedDate
                ? new Date(book.publishedDate).toLocaleDateString()
                : "None"}
            </p>
            <p>
              <strong>Page Count:</strong> {book.pageCount}
            </p>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="flex px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 space-x-2"
              onClick={() => navigate(-1)}
            >
              <MoveLeft className="mr-2" />
              Back
            </button>
            <button
              type="button"
              className="flex px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-black"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2" /> Delete Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
