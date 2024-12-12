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

const handleEdit = async (bookId: String): Promise<any> => {
  try {
    const response = await libraryApi.getBookById(bookId);
    return response;
  } catch (error) {
    console.error(`Error fetching book with ID ${bookId}:`, error);
    throw new Error(`Failed to fetch book with ID ${bookId}`);
  }
};

const handleDelete = (bookId: String) => {
  console.log("Delete clicked for book:", bookId);
};

const handleUpdateBook = async (id: string, data: Book): Promise<void> => {
  try {
    await libraryApi.updateBook(id, data);
  } catch (error) {
    throw new Error("Failed to update book");
  }
};

export { handleDelete, handleGetAllBooks, handleEdit, handleUpdateBook };
