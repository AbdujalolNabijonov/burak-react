import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";


//Redux
import { createSelector } from "reselect"
import { newDishesRetriever } from "./selector";
import { useSelector } from "react-redux";
import { Product } from "../../../lib/types/product.type";
import { server } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";

const newDishesSelector = createSelector(
    newDishesRetriever,
    (newDishes) => ({ newDishes })
)


export default function NewDishes() {
    const { newDishes } = useSelector(newDishesSelector)
    return (
        <div className={"new-products-frame"}>
            <Container>
                <Stack className={"main"}>
                    <Box className={"category-title"}>Fresh Menu</Box>
                    <Stack className={"cards-frame"}>
                        <CssVarsProvider>
                            {newDishes.length !== 0 ? (
                                newDishes.map((product: Product) => {
                                    const imagePath = `${server}/${product.productImages[0].replace(/\\/g, "/")}`;
                                    const sizeVolume = product.productCollection === ProductCollection.DRINK
                                        ? ProductCollection.DRINK : product.productCollection
                                    return (
                                        <Card
                                            key={product._id}
                                            variant="outlined"
                                            className={"card"}
                                        >
                                            <CardOverflow>
                                                <div className="product-sale">{sizeVolume}</div>
                                                <AspectRatio ratio="1">
                                                    <img src={imagePath} alt="" />
                                                </AspectRatio>
                                            </CardOverflow>

                                            <CardOverflow variant="soft" className="product-detail">
                                                <Stack className="info">
                                                    <Stack flexDirection={"row"}>
                                                        <Typography className={"title"}>
                                                            {product.productName}
                                                        </Typography>
                                                        <Divider width="2" height="24" bg="#d9d9d9" />
                                                        <Typography className={"price"}>
                                                            ${product.productPrice}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack>
                                                        <Typography className={"views"}>
                                                            {product.productViews}
                                                            <VisibilityIcon
                                                                sx={{ fontSize: 20, marginLeft: "5px" }}
                                                            />
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </CardOverflow>
                                        </Card>
                                    );
                                })
                            ) : (
                                <Box className="no-data">New products are not available!</Box>
                            )}
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
