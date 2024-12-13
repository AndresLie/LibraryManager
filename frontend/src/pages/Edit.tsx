import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BookForm from "@/components/forms/bookForm";
import { Book } from "@/types/book";
import isEqual from "lodash/isEqual";
import { omit } from "lodash";
import { useToast } from "@/hooks/use-toast";
import { handleEditBook, handleGetBook } from "@/services/bookService";
import { useNavigation } from "@/module/libraryNavigate";
import { useBookForm } from "@/hooks/useBookForm";

export default function Edit() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { navigateBack } = useNavigation();
  const form = useBookForm();
  const { handleSubmit, reset } = form;
  useEffect(() => {
    async function fetchBook() {
      try {
        const bookDetails = await handleGetBook(id!);
        console.log(bookDetails);
        setBook(bookDetails);
        reset({
          ...bookDetails,
          publishedDate: new Date(bookDetails.publishedDate)
            .toISOString()
            .split("T")[0],
        });
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  const handleEditBookFormSubmit = async (data: Book) => {
    data.publishedDate = new Date(data.publishedDate).toISOString();

    if (isEqual(data, omit(book, ["_id", "__v"]))) {
      toast({
        variant: "destructive",
        title: "No Changes Detected",
        duration: 2000,
      });
      return;
    }
    try {
      await handleEditBook(id!, data);
      toast({
        className: "bg-green-600 ",
        variant: "destructive",
        title: "Changes Succeed",
        duration: 2000,
      });
      navigateBack();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-slate-100 rounded-lg shadow-md space-y-4">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <BookForm
        book={book}
        {...form}
        onSubmit={handleSubmit(handleEditBookFormSubmit)}
      />
    </div>
  );
}
