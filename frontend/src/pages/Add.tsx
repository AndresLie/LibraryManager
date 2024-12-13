import { useToast } from "@/hooks/use-toast";
import { handleAddBook } from "@/services/bookService";
import BookForm from "@/components/forms/bookForm";
import { useBookForm } from "@/hooks/useBookForm";
import { Book } from "@/types/book";

export default function Add() {
  const { toast } = useToast();
  const form = useBookForm();
  const { reset, handleSubmit } = form;

  const handleAddBookFormSubmit = async (data: Book) => {
    try {
      await handleAddBook(data);
      toast({
        className: "bg-green-600 ",
        variant: "destructive",
        title: "Successfully Created",
        duration: 2000,
      });
      reset({});
    } catch (error) {
      console.error("Error creating book:", error);
      toast({
        variant: "destructive",
        title: "Book with the same ISBN exists",
        duration: 2000,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-slate-100 rounded-lg shadow-md space-y-4">
      <h1 className="text-2xl font-bold mb-4">Add Book</h1>
      <BookForm {...form} onSubmit={handleSubmit(handleAddBookFormSubmit)} />
    </div>
  );
}
