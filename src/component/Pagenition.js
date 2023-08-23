import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

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
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <button
          className={`circular-btn ${isFirstPage ? "disabled" : ""}`}
          
          onClick={() => handlePage(1)}
          disabled={isFirstPage}
        >
          <FirstPageIcon />
        </button>
        <button
          className={`circular-btn ${isFirstPage ? "disabled" : ""}`}
          onClick={() => handlePage(currentPage - 1)}
          disabled={isFirstPage}
        >
          <NavigateBeforeIcon />
        </button>
        {getButtons().map((button) => {
          return (
            <button
              key={button}
              className={`circular-btn ${
                currentPage === button ? "active" : ""
              }`}
              onClick={() => handlePage(button)}
            >
              {button}
            </button>
          );
        })}
        <button
          className={`circular-btn ${LastPage ? "disabled" : ""}`}
          onClick={() => handlePage(currentPage + 1)}
          disabled={LastPage}
        >
          <NavigateNextIcon />
        </button>
        <button
          className={`circular-btn ${LastPage ? "disabled" : ""}`}
          onClick={() => handlePage(totalPages)}
          disabled={LastPage}
        >
          <LastPageIcon />
        </button>
      </Stack>
    </Box>
  );
};

export default Pagenition;
