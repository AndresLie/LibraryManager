import { Book } from "@/types/book";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  author: z
    .string()
    .min(2, { message: "Author name must be at least 2 characters." }),
  isbn: z.string().min(2, { message: "ISBN must be at least 2 characters." }),
  publishedDate: z.union([z.string(), z.date()]),
  pageCount: z.string(),
});

export function useBookForm(book?: Book) {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: book
      ? {
          ...book,
          publishedDate: new Date(book.publishedDate)
            .toISOString()
            .split("T")[0],
        }
      : {
          title: "",
          author: "",
          isbn: "",
          publishedDate: undefined,
          pageCount: "0",
        },
  });
}
