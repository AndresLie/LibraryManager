import { useState, useEffect } from "react";
import libraryApi from "@/module/libraryApi";
import { Button } from "@/components/ui/button";
import { Ellipsis, Grid3x3, Rows3, Table } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

type ViewMode = "list" | "grid" | "combination";

export default function ViewAll() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    return (localStorage.getItem("viewMode") as ViewMode) || "list";
  });
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const books = await libraryApi.getBooks();
        setData(books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const handleViewModeToggle = () => {
    const modes: ViewMode[] = ["list", "combination", "grid"];
    const nextMode = modes[(modes.indexOf(viewMode) + 1) % modes.length];
    setViewMode(nextMode);
  };

  const handleEdit = (bookId: String) => {
    console.log("Edit clicked for book:", bookId);
  };

  const handleDelete = (
    bookId: String,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("Delete clicked for book:", bookId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  const handleDetails = (bookId: string) => {
    return () => {
      navigate(`/details/${bookId}`);
    };
  };

  const getIcon = () => {
    if (viewMode === "list") return <Rows3 />;
    else if (viewMode === "grid") return <Grid3x3 />;
    else return <Table />;
  };

  const renderBooks = () => {
    const renderPopover = (bookId: string) => (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-4 right-4 bg-slate-200 rounded-full p-2 group-hover:bg-slate-300 transition-all duration-300 ease-in-out"
            onClick={(event) => event.stopPropagation()}
          >
            <Ellipsis />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-32">
          <div className="flex flex-col space-y-2">
            <Button
              variant="default"
              className="text-left w-full bg-slate-100 hover:bg-slate-200 text-black"
              onClick={(event) => {
                event.stopPropagation();
                handleEdit(bookId);
              }}
            >
              Edit
            </Button>
            <Button
              variant="default"
              className="text-left w-full text-red-500 bg-slate-100 hover:bg-slate-200 border-2 border-black hover:border-red-600"
              onClick={(event) => {
                event.stopPropagation();
                handleDelete(bookId, event);
              }}
            >
              Delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
    if (viewMode === "list") {
      return (
        <ul className=" space-y-8 mx-[20vw] ">
          {data.map((book, index) => (
            <li
              key={index}
              className="relative px-4 py-8 bg-slate-200 rounded-xl hover:bg-slate-300  transition-all duration-300 ease-in-out group"
              onClick={handleDetails(book._id)}
            >
              <h1>{book.title}</h1>
              <p className="text-lg text-slate-400">{book.author}</p>
              {renderPopover(book._id)}
            </li>
          ))}
        </ul>
      );
    } else if (viewMode === "grid") {
      return (
        <div className="grid grid-cols-3 gap-4">
          {data.map((book, index) => (
            <div
              key={index}
              className="relative px-4 py-8 bg-slate-200 rounded-xl shadow-md  flex flex-col items-center justify-center text-center hover:bg-slate-300  transition-all duration-300 ease-in-out group"
              onClick={handleDetails(book._id)}
            >
              <h1>{book.title}</h1>
              <p className="text-lg text-slate-400">{book.author}</p>
              {renderPopover(book._id)}
            </div>
          ))}
        </div>
      );
    } else if (viewMode === "combination") {
      return (
        <div>
          <div className="grid grid-cols-2 gap-4">
            {data.map((book, index) => (
              <div
                key={index}
                className="relative px-4 py-8 bg-slate-200 rounded-xl shadow-md  flex flex-col items-center justify-center text-center hover:bg-slate-300  transition-all duration-300 ease-in-out group"
                onClick={handleDetails(book._id)}
              >
                <h1>{book.title}</h1>
                <p className="text-lg text-slate-400">{book.author}</p>
                {renderPopover(book._id)}
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="py-10 flex-col justify-center align-middle ">
        {renderBooks()}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-12 right-12 bg-blue-500 text-white shadow-lg hover:bg-blue-600 rounded-full p-8 large-icon"
        onClick={handleViewModeToggle}
      >
        {getIcon()}
      </Button>
    </>
  );
}
