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
const handleGetBook = async (id: string): Promise<Book> => {
  try {
    const response = await libraryApi.getBookById(id);
    return response;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw new Error("Failed to fetch book");
  }
};

const handleAddBook = async (data: Book) => {
  try {
    const response = await libraryApi.addBook(data);
    return response;
  } catch (error) {
    console.error("Error fetching all books:", error);
    throw new Error("Failed to Add Book");
  }
};

const handleDeleteBook = async (bookId: string) => {
  try {
    const response = await libraryApi.deleteBook(bookId);
    return response;
  } catch (error) {
    console.error("Error Deleting all books:", error);
    throw new Error("Failed to Delete Book");
  }
};

const handleEditBook = async (id: string, data: Book): Promise<void> => {
  try {
    await libraryApi.updateBook(id, data);
  } catch (error) {
    throw new Error("Failed to Update book");
  }
};

export {
  handleDeleteBook,
  handleGetAllBooks,
  handleEditBook,
  handleAddBook,
  handleGetBook,
};
