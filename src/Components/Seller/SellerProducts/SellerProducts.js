import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SellerProducts.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SellerProducts = () => {
  const deleteProduct = async (id) => {
    const product = await axios.delete(`/product/deleteproduct/${id}`);
    alert("Product Deleted");
     window.location.href = "/sellerproducts";
  };

  const editProduct = (data) => {
    navigate("/editproduct", { state: data });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const product = await axios.get("/product/viewproduct");
      setData(product.data);
      console.log(product.data);
    };

    getData();
  }, []);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/user/sellerdetail", {
        headers: { Authorization: token },
      });
      setUserId(res.data._id);
    };

    getData();
  }, []);
  const [userId, setUserId] = useState("");

  const [data, setData] = useState([]);
  return (
    <div className="SellerProducts">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop: "20px",
          marginLeft: "40px",
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/addproduct")}
        >
          Add Product
        </Button>
      </div>
      <div
        className="ProductCard row"
        style={{
          marginLeft: "20px",
          marginRight: "30px",
        }}
      >
        {data.map((product) =>
          product.seller._id === userId ? (
            <div className="col-6" style={{ width: "550px" }}>
              <Card
                style={{
                  padding: "10px",
                  marginTop: "20px",
                  borderRadius: 15,
                  backgroundColor: "#e0e1dc",
                }}
              >
                <Grid container spacing={3}>
                  <StyledGrid item md={5} xs={12}>
                    <CardContent
                      sx={{
                        display: "flex",
                      }}
                    >
                      <img
                        width={"180px"}
                        height={"180px"}
                        alt="Apple iPhone 11 Pro"
                        src={product.images}
                      />
                    </CardContent>
                  </StyledGrid>
                  <Grid
                    item
                    xs={12}
                    md={7}
                    sx={{
                      paddingTop: [
                        "0 !important",
                        "0 !important",
                        "1.5rem !important",
                      ],
                      paddingLeft: [
                        "1.5rem !important",
                        "1.5rem !important",
                        "0 !important",
                      ],
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ marginBottom: 2, fontWeight: "bold" }}
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="body2" sx={{ marginBottom: 3.5 }}>
                        {product.description}
                      </Typography>
                      <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>
                        Price:
                        <Box component="span" sx={{ fontWeight: "bold" }}>
                          PKR{product.price}
                        </Box>
                      </Typography>
                    </CardContent>
                    <CardActions className="card-action-dense">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          color="success"
                          onClick={() => editProduct(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          color="error"
                          onClick={() => deleteProduct(product._id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardActions>
                  </Grid>
                </Grid>
              </Card>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  [theme.breakpoints.up("md")]: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default SellerProducts;
