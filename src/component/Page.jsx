import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Page() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const dataUrl = "https://fakestoreapi.com/products";

  useEffect(() => {
    const getTableData = async () => {
      try {
        const response = await axios.get(dataUrl);

        if (response.status === 200) {
          setTableData(response.data);
        }

        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    getTableData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${dataUrl}/${id}`);
      setTableData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      setError("Failed to delete item");
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setEditItem(null);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${dataUrl}/${editItem.id}`, editItem);

      if (response.status === 200) {
        setTableData((prevData) =>
          prevData.map((item) =>
            item.id === editItem.id ? { ...item, ...editItem } : item
          )
        );
        handleClose();
      }
    } catch (error) {
      setError("Failed to update item");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Data Visualization
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>
                  {item.rating?.rate} (Count: {item.rating?.count})
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(item)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the fields below and click "Save" to update the item.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={editItem?.title || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Category"
            name="category"
            value={editItem?.category || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={editItem?.description || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            value={editItem?.price || ""}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Page;
