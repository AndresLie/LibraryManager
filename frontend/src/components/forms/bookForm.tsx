import { useBookForm } from "@/hooks/useBookForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Book } from "@/types/book";
import { useNavigate } from "react-router-dom";

export default function BookForm({
  book,
  onSubmit,
}: {
  book?: Book;
  onSubmit: (data: any) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useBookForm(book);
  const navigate = useNavigate();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label className="flex justify-start" htmlFor="title">
          Title
        </Label>
        <Input id="title" {...register("title")} />
        {errors.title && (
          <p className="text-red-500 text-sm flex justify-start">
            {errors.title.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="flex justify-start" htmlFor="author">
          Author
        </Label>
        <Input id="author" {...register("author")} />
        {errors.author && (
          <p className="text-red-500 text-sm flex justify-start">
            {errors.author.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="flex justify-start" htmlFor="isbn">
          ISBN
        </Label>
        <Input id="isbn" {...register("isbn")} />
        {errors.isbn && (
          <p className="text-red-500 text-sm flex justify-start">
            {errors.isbn.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="flex justify-start" htmlFor="publishedDate">
          Published Date
        </Label>
        <Input
          id="publishedDate"
          type="text"
          placeholder="YYYY-MM-DD"
          {...register("publishedDate", {
            pattern: {
              value: /^\d{4}-\d{2}-\d{2}$/,
              message: "Date must be in YYYY-MM-DD format",
            },
          })}
        />
        {errors.publishedDate && (
          <p className="text-red-500 text-sm">{errors.publishedDate.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="flex justify-start" htmlFor="pageCount">
          Page Count
        </Label>
        <Input id="pageCount" type="number" {...register("pageCount")} />
        {errors.pageCount && (
          <p className="text-red-500 text-sm flex justify-start">
            {errors.pageCount.message}
          </p>
        )}
      </div>
      <div className="flex justify-end space-x-8">
        <Button
          type="button"
          variant="default"
          className="text-left bg-slate-300 hover:bg-slate-500 text-black"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </Button>
        <Button type="submit">{book ? "Save Changes" : "Add Book"}</Button>
      </div>
    </form>
  );
}
