import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./Pagenition.css"

const Pagenition = ({ totalPages, onPagechange, currentPage }) => {
  const isFirstPage = currentPage === 1;
  const LastPage = currentPage === totalPages;

  const handlePage = (page) => {
    onPagechange(page);
  };

  const getButtons = () => {
    let buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(i);
    }
    return buttons;
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconButton
          className={`circular-button ${isFirstPage ? "disabled" : ""}`}
          onClick={() => handlePage(1)}
          disabled={isFirstPage}
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          className={`circular-button ${isFirstPage ? "disabled" : ""}`}
          onClick={() => handlePage(currentPage - 1)}
          disabled={isFirstPage}
        >
          <NavigateBeforeIcon />
        </IconButton>
        {getButtons().map((button) => {
          return (
            <IconButton
              key={button}
              className={`circular-button ${
                currentPage === button ? "active" : ""
              }`}
              onClick={() => handlePage(button)}
            >
              {button}
            </IconButton>
          );
        })}
        <IconButton
          className={`circular-button ${LastPage ? "disabled" : ""}`}
          onClick={() => handlePage(currentPage + 1)}
          disabled={LastPage}
        >
          <NavigateNextIcon />
        </IconButton>
        <IconButton
          className={`circular-button ${LastPage ? "disabled" : ""}`}
          onClick={() => handlePage(totalPages)}
          disabled={LastPage}
        >
          <LastPageIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Pagenition;
