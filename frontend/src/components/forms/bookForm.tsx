import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Book } from "@/types/book";
import { useNavigation } from "@/module/libraryNavigate";

type BookFormProps = {
  book?: Book;
  onSubmit: (data: any) => void;
  register: any;
  handleSubmit: any;
  formState: { errors: any };
  reset: any;
};

export default function BookForm({
  book,
  onSubmit,
  register,
  handleSubmit,
  formState: { errors },
}: BookFormProps) {
  const { navigateBack } = useNavigation();
  return (
    <form
      onSubmit={(event) => {
        handleSubmit(onSubmit)(event);
      }}
      className="space-y-4"
    >
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
            navigateBack();
          }}
        >
          Cancel
        </Button>
        <Button type="submit">{book ? "Save Changes" : "Add Book"}</Button>
      </div>
    </form>
  );
}
