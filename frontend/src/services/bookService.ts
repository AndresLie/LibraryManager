import libraryApi from "@/module/libraryApi";
import { Book } from "@/types/book";

const handleGetAllBooks = async (): Promise<any[]> => {
  try {
    const response = await libraryApi.getBooks();
    return response;
  } catch (error) {
    console.error("Error fetching all books:", error);
    throw new Error("Failed to fetch all books");
  }
};

const handleAddBook = async (data: Book) => {
  try {
    const response = await libraryApi.addBook(data);
    return response;
  } catch (error) {
    console.error("Error fetching all books:", error);
    throw new Error("Failed to fetch all books");
  }
};

const handleDeleteBook = (bookId: String) => {
  console.log("Delete clicked for book:", bookId);
};

const handleEditBook = async (id: string, data: Book): Promise<void> => {
  try {
    await libraryApi.updateBook(id, data);
  } catch (error) {
    throw new Error("Failed to update book");
  }
};

export { handleDeleteBook, handleGetAllBooks, handleEditBook, handleAddBook };
