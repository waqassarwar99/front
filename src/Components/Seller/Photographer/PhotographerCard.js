import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Card,
  Typography,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PhotographerCard = () => {
  const deleteService = async (id) => {
    const service = await axios.delete(`/service/deletePhotographer/${id}`);
    alert("Service Deleted");
    window.location.href = "/photographer";
  };

  const editService = (data) => {
    navigate("/editphotographer", { state: data });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const service = await axios.get("/service/viewPhotographer");
      setData(service.data);
      console.log(service.data);
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
    <div className="ServiceCards">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginLeft: "40px",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/addphotographer")}
        >
          Add Service
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
          product.category === "Photographer" && product.seller === userId ? (
            <div className="col-6" style={{ width: "550px" }}>
              <Card
                style={{
                  marginTop: "20px",
                  borderRadius: 15,
                  backgroundColor: "#e0e1dc",
                }}
                className="card"
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
                        variant="h5"
                        sx={{
                          marginBottom: 2,
                          fontWeight: "bold",
                          fontFamily: "Roboto",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          marginBottom: 2,
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          fontFamily: "Arial",
                        }}
                      >
                        {product.description}
                      </Typography>
                      <Typography sx={{ fontWeight: 500 }}>
                        Price Range:{" "}
                        <Box component="span" sx={{ fontWeight: "bold" }}>
                          PKR {product.basicPlan.price} - PKR{" "}
                          {product.platinumPlan.price}
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
                          onClick={() => editService(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          color="error"
                          onClick={() => deleteService(product._id)}
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
  [theme.breakpoints.down("md")]: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  [theme.breakpoints.up("md")]: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default PhotographerCard;
