import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Home/Navbar";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  ButtonGroup,
  Button,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import UserSpeedDial from "../Home/SpeedDial/UserSpeedDial";

import {
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART,
} from "../../redux/actions/cartAction";

const Checkout = () => {
  const [total, settotal] = useState(0);
  const navigate = useNavigate();

  // redux
  const auth = useSelector((state) => state.authReducer);

  const { isLogged } = auth;

  // redux state
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);
  const { items } = cart;

  const caltotal = () => {
    let tot = 0;
    if (items) {
      items.map((item) => {
        tot = tot + item.product.price * item.qty;
      });
      settotal(tot);
    }
  };

  const addItem = (item, qty) => {
    dispatch(UPDATE_CART(item, qty + 1));
    caltotal();
  };

  const subItem = (item, qty) => {
    if (qty > 1) {
      dispatch(UPDATE_CART(item, qty - 1));
      caltotal();
    }
  };

  const deleteProduct = (item) => {
    dispatch(REMOVE_ITEM_FROM_CART(item));
  };

  useEffect(() => {
    caltotal();
  }, [items, items.qty, caltotal, total]);

  return (
    <div>
      <Navbar />
      {isLogged ? (
        <div>
          <UserSpeedDial />
        </div>
      ) : null}

      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 4,
          borderRadius: 5,
          p: 2,
          width: 700,
          marginTop: 5,
          height: 450,
          marginLeft: 5,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontFamily: "Roboto", marginBottom: "20px" }}
        >
          Cart
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: "300px" }}>
          <Table aria-label="checkout Table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((obj) => (
                <TableRow>
                  <TableCell>
                    <Stack direction="row" gap={3}>
                      <img
                        src={obj.product.images}
                        alt="Product Image"
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "100%",
                        }}
                      />
                      <Typography variant="subtitle1">
                        {" "}
                        <strong>{obj.product.name}</strong>
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        onClick={() => subItem(obj.product, obj.qty)}
                      >
                        -
                      </Button>
                      <Button disabled>{obj.qty}</Button>
                      <Button
                        variant="contained"
                        onClick={() => addItem(obj.product, obj.qty)}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell>PKR {obj.product.price * obj.qty}</TableCell>
                  <TableCell align="center">
                    <DeleteIcon
                      color="error"
                      onClick={() => deleteProduct(obj.product)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Button
        variant="outlined"
        color="primary"
        startIcon={<ArrowBackIosNewIcon />}
        sx={{
          marginTop: 2,
          marginLeft: 5,
          height: "48px",
          backgroundColor: "#00AB55",
          color: "#fff",
          borderRadius: "8px",
          padding: "8px 22px",
          textTransform: "capitalize",
          fontWeight: 700,
          cursor: "pointer",
        }}
        onClick={() => navigate("/productdetails")}
      >
        Continue Shopping
      </Button>

      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 4,
          borderRadius: 5,
          p: 2,
          width: 500,
          marginTop: -57,
          marginRight: 5,
          height: 500,
          float: "right",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Order Summary
        </Typography>
        <Stack direction="row" gap={35}>
          <Typography
            variant="body1"
            sx={{ marginBottom: "20px", color: "rgb(99, 115, 129)" }}
          >
            SubTotal
          </Typography>
          <Typography variant="h6">PKR {total}</Typography>
        </Stack>
        <Stack direction="row" gap={35}>
          <Typography
            variant="body1"
            sx={{ marginBottom: "20px", color: "rgb(99, 115, 129)" }}
          >
            Shipping
          </Typography>
          <Typography variant="body1">
            <strong>Free</strong>
          </Typography>
        </Stack>
        <Divider />
        <Stack mt={3} direction="row" gap={35}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6" color="error">
            PKR {total}
          </Typography>
        </Stack>

        <Button
          variant="outlined"
          color="warning"
          startIcon={<ShoppingCartCheckoutIcon />}
          style={{
            maxWidth: "150px",
            marginTop: "180px",
            marginLeft: "290px",
            backgroundColor: "#00AB55",
            color: "#fff",
            borderRadius: "8px",
            padding: "8px 22px",
            width: "300px",
            textTransform: "capitalize",
            fontWeight: 700,
            cursor: "pointer",
          }}
          onClick={() =>
            navigate("/paymentform", {
              state: {
                orderItems: [
                  {
                    items,
                  },
                ],
                totalPrice: total,
              },
            })
          }
        >
          Check Out
        </Button>
      </Box>
    </div>
  );
};

export default Checkout;
