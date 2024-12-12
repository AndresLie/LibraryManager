import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateToEdit = (bookId: string) => {
    navigate(`/edit/${bookId}`);
  };

  const navigateToDetails = (bookId: string) => {
    navigate(`/details/${bookId}`);
  };

  const navigateToHome = () => {
    navigate("/");
  };
  const navigateToDelete = (bookId: string) => {
    navigate(`/details/${bookId}`);
  };
  const navigateBack = () => {
    navigate(-1);
  };

  return {
    navigateToEdit,
    navigateToDetails,
    navigateToHome,
    navigateToDelete,
    navigateBack,
  };
};
