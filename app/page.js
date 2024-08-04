"use client";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import {
  Box,
  Modal,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  getDoc,
  setDoc,
} from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const updateInventory = async () => {
    try {
      const snapshot = query(collection(firestore, "inventory"));
      const docs = await getDocs(snapshot);
      const inventoryList = docs.docs.map((doc) => ({
        name: doc.id,
        ...doc.data(),
      }));
      setInventory(inventoryList);
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  const removeItem = async (item) => {
    try {
      const docRef = doc(firestore, "inventory", item);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        if (quantity === 1) {
          await deleteDoc(docRef);
        } else {
          await setDoc(docRef, { quantity: quantity - 1 });
        }
        await updateInventory();
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Adding item to inventory list function
const addItem = async (input) => {
  const inputArr = input.split(' ');
  let quantity, item;

  // Check if the first part of the input is a number
  if (isNaN(inputArr[0])) {
    // If not, assume the entire input is the item name and set quantity to 1
    quantity = 1;
    item = input;
  } else {
    // Otherwise, assume the first part is the quantity and the rest is the item name
    quantity = parseInt(inputArr[0], 10);
    item = inputArr.slice(1).join(' ');
  }

  if (!item.trim()) {
    alert('Invalid input. Please enter an item name.');
    return;
  }

  const docRef = doc(firestore, "inventory", item);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { quantity: currentQuantity } = docSnap.data();
    await setDoc(docRef, { quantity: currentQuantity + quantity });
  } else {
    await setDoc(docRef, { quantity });
  }
  await updateInventory();
};

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #000000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{ transform: "translate(-50%, -50%)" }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                handleClose();
                setItemName("");
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box>
        <Button
          variant="outlined"
          size="small"
          onClick={handleOpen}
        >
          Add New Item
        </Button>
      </Box>
      <Box border="1px solid #333">
      <Box width="800px" height="100px" bgcolor="#ADD8E6" display="flex" alignItems="center" justifyContent="center">
      <Typography
        variant="h2" // Use a larger variant or adjust size with style
        color="#333"
        textAlign="center"
  >
    Inventory Items
  </Typography>
</Box>
<Stack width="800px" height="300px" spacing={2} overflow="auto">
  {inventory.map(({ name, quantity }) => (
    <Box
      key={name}
      width="100%"
      minHeight="150px"
      display="flex"
      alignItems="center"
      bgcolor="#f0f0f0"
      padding={5}
    >
      {/* Container for the name */}
      <Box
        width="50%"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography
          variant="h5"
          color="#333"
          style={{ fontWeight: 300, textAlign: "left", wordBreak: "break-word" }}
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Typography>
      </Box>

      {/* Container for the quantity */}
      <Box
        width="10%" /* Adjusted width for alignment */
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginRight="auto" /* Pushes the Remove button to the right */
      >
        <Typography
          variant="h5"
          color="#333"
          style={{ fontWeight: 300, textAlign: "center" }}
        >
          {quantity}
        </Typography>
      </Box>

      <Button variant="contained" onClick={() => removeItem(name)}>
        Remove
      </Button>
    </Box>
  ))}
</Stack>
      </Box>
    </Box>
  );
}