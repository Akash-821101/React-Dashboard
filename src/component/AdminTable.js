import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagenition from "./Pagenition";
import TextField from "@mui/material/TextField";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";


const AdminTable = () => {
  const [term, setTerm] = useState("");
  const [adminData, setAdminData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItemId, setEditingItemId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [ischecked, setIsChecked] = useState(false);
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
    role: ""
  });

  // fetching of user data from API

  const fetchAdminData = async () => {
    try {
      const res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      console.log(res.data);

      return res.data;
    } catch (e) {
      if (e.respose) {
        console.error("couldn't fetch data");
      }
    }
  };

  // Loading the intial data on pageload

  useEffect(() => {
    const onLoad = async () => {
      const data = await fetchAdminData();
      setAdminData(data);
      setFilterData(data);
    };
    onLoad();
  }, []);

  // filter data in search field and update data for pagination

  useEffect(() => {
    const result = adminData.filter((item) => {
      return (
        item.name.toLowerCase().includes(term.toLowerCase()) ||
        item.email.toLowerCase().includes(term.toLowerCase()) ||
        item.role.toLowerCase().includes(term.toLowerCase())
      );
    });

    setFilterData(result);
    setCurrentPage(1);
  }, [term, adminData]);

  // setting of no. of pages for display data
  const userPerPage = 10;
  const visitedPage = (currentPage - 1) * userPerPage;
  const nextPage = visitedPage + userPerPage;

  const paginatedData = filterData.slice(visitedPage, nextPage);

  const totalPage = Math.ceil(filterData.length / 10);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // function for save change made in data

  const onUpdate = () => {
    const editedUser = paginatedData[editingItemId];
    const updatedResult = adminData.map((user) => {
      if (user.id === editedUser.id) {
        return {
          ...user,
          ...editedData
        };
      }
      return user;
    });

    setAdminData(updatedResult);
    setEditingItemId(null);
  };

  // handle the change made in input field

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const selectRow = (userId) => {
    if (!selectedRows.includes(userId)) {
      setSelectedRows([...selectedRows, userId]);
      
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== userId));
      
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData.map((user) => user.id));
      setIsChecked(true);
    } else {
      setSelectedRows([]);
      setIsChecked(false);
    }
  };

  const deleteSelected = (e) => {
    e.stopPropagation();
    const result = adminData.filter((item) => {
      return !selectedRows.includes(item.id);
    });
    setAdminData(result);
    setIsChecked(false);
  };

  return (
    <Box mb={4}>
      <Box>
        <TextField
          fullWidth
          type="text"
          placeholder="Search by name, email or role"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          size="small"
        />
      </Box>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={ischecked}
                    color="primary"
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  <Typography fontWeight="700" varaiant="h6">
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="700" varaiant="h6">
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="700" varaiant="h6">
                    Role
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="700" varaiant="h6">
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData.length > 0 ? (
                paginatedData.map((user, i) => (
                  <TableRow
                    hover
                    sx={{ cursor: "pointer" }}
                    key={user.id}
                    role="checkbox"
                    onClick={(e) => {
                      selectRow(user.id);
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        color="primary"
                        checked={selectedRows.includes(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      {editingItemId === i ? (
                        <TextField
                          label="Name"
                          type="text"
                          name="name"
                          value={editedData.name}
                          onChange={handleEditChange}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        user.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingItemId === i ? (
                        <TextField
                          label="Email"
                          type="email"
                          name="email"
                          value={editedData.email}
                          onChange={handleEditChange}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        user.email
                      )}
                    </TableCell>
                    <TableCell>
                      {editingItemId === i ? (
                        <TextField
                          label="Role"
                          type="text"
                          name="role"
                          value={editedData.role}
                          onChange={handleEditChange}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        user.role
                      )}
                    </TableCell>
                    <TableCell>
                      {editingItemId === i ? (
                        <Box>
                          <IconButton
                            color="success"
                            variant="contained"
                            onClick={onUpdate}
                          >
                            <CheckOutlinedIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            variant="contained"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingItemId(null);
                            }}
                          >
                            <ClearOutlinedIcon />
                          </IconButton>
                        </Box>
                      ) : (
                        <Box>
                          <IconButton
                            color="primary"
                            variant="contained"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingItemId(i);
                              setEditedData({
                                name: user.name,
                                role: user.role,
                                email: user.email
                              });
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            variant="contained"
                            onClick={deleteSelected}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow hover sx={{ cursor: "pointer" }}>
                  <TableCell colSpan="10">No results</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Stack
        display="flex"
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        mt={2}
      >
        <Box>
          <button
            className={ischecked ? "btn-del" : "btn-del disabled"}
            onClick={deleteSelected}
          >
            Delete Selected
          </button>
        </Box>
        <Pagenition
          totalPages={totalPage}
          onPagechange={onPageChange}
          currentPage={currentPage}
        />
      </Stack>
    </Box>
  );
};

export default AdminTable;
