import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";



//Redux
import { Dispatch } from "@reduxjs/toolkit";
import { Product, ProductInquiry } from "../../../lib/types/product.type";
import { setProducts } from "./slice";
import { createSelector } from "reselect"
import { productsRetriever } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/Product.service";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { server } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search.type";

const actionDispatch = (dispatch: Dispatch) => ({
    setProducts: (produts: Product[]) => dispatch(setProducts(produts))
})

const productsSelector = createSelector(
    productsRetriever,
    (products) => ({ products })
)

interface ProductsProps {
    onAdd: (Item: CartItem) => void
}

export default function Products(props: ProductsProps) {
    const { onAdd } = props
    const history = useHistory()
    const [productInquiry, setProductInquiry] = useState<ProductInquiry>(
        {
            order: "createdAt",
            productCollection: ProductCollection.DISH,
            limit: 8,
            page: 1
        }
    )
    const [searchText, setSearchText] = useState<string>("")

    const { setProducts } = actionDispatch(useDispatch());
    const { products } = useSelector(productsSelector)

    useEffect(() => {
        const productService = new ProductService();

        productService
            .getProducts(productInquiry)
            .then((products: Product[]) => setProducts(products))
            .catch()
        if (searchText) {
            setSearchText("")
        }
    }, [productInquiry])

    //Handlers
    const productCollectionHandler = (collection: ProductCollection) => {
        productInquiry.page = 1
        productInquiry.order = "createdAt"
        productInquiry.productCollection = collection;
        productInquiry.limit = 8
        setProductInquiry({ ...productInquiry })
    }

    const productPaginationHandler = (value: ChangeEvent<any>, page: number) => {
        productInquiry.page = page;
        setProductInquiry({ ...productInquiry })
    }

    const productOrderHandler = (order: string) => {
        productInquiry.order = order;
        setProductInquiry({ ...productInquiry })
    }

    const productSearchHandler = () => {
        productInquiry.search = searchText;
        setProductInquiry({ ...productInquiry })
    }

    const navigateHandler = (id: string) => {
        history.push(`/products/${id}`)
    }
    return (
        <div className={"products"}>
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Stack className={"avatar-big-box"}>
                        <Stack className={"top-text"}>
                            <p>Burak Restaurant</p>
                            <Stack className={"single-search-big-box"}>
                                <input
                                    type={"search"}
                                    className={"single-search-input"}
                                    name={"singleResearch"}
                                    placeholder={"Type here"}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") productSearchHandler()
                                    }}
                                />
                                <Button
                                    className={"single-button-search"}
                                    variant="contained"
                                    endIcon={<SearchIcon />}
                                    onClick={productSearchHandler}
                                >
                                    Search
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack className={"dishes-filter-section"}>
                        <Stack className={"dishes-filter-box"}>
                            <Button
                                variant={"contained"}
                                className={"order"}
                                color={productInquiry.order === "createdAt" ? "primary" : "secondary"}
                                onClick={() => productOrderHandler("createdAt")}
                            >
                                New
                            </Button>
                            <Button
                                variant={"contained"}
                                className={"order"}
                                color={productInquiry.order === "productPrice" ? "primary" : "secondary"}
                                onClick={() => productOrderHandler("productPrice")}
                            >
                                Price
                            </Button>
                            <Button
                                variant={"contained"}
                                className={"order"}
                                color={productInquiry.order === "productViews" ? "primary" : "secondary"}
                                onClick={() => productOrderHandler("productViews")}
                            >
                                Views
                            </Button>
                        </Stack>
                    </Stack>

                    <Stack className={"list-category-section"}>
                        <Stack className={"product-category"}>
                            <div className={"category-main"}>
                                <Button
                                    variant={"contained"}
                                    color={productInquiry.productCollection === ProductCollection.OTHER ? "primary" : "secondary"}
                                    onClick={() => productCollectionHandler(ProductCollection.OTHER)}
                                >
                                    Other
                                </Button>
                                <Button
                                    variant={"contained"}
                                    color={productInquiry.productCollection === ProductCollection.DESSERT ? "primary" : "secondary"}
                                    onClick={() => productCollectionHandler(ProductCollection.DESSERT)}
                                >
                                    Dessert
                                </Button>
                                <Button
                                    variant={"contained"}
                                    color={productInquiry.productCollection === ProductCollection.DRINK ? "primary" : "secondary"}
                                    onClick={() => productCollectionHandler(ProductCollection.DRINK)}
                                >
                                    Drink
                                </Button>
                                <Button
                                    variant={"contained"}
                                    color={productInquiry.productCollection === ProductCollection.SALAD ? "primary" : "secondary"}
                                    onClick={() => productCollectionHandler(ProductCollection.SALAD)}
                                >
                                    Salad
                                </Button>
                                <Button
                                    variant={"contained"}
                                    color={productInquiry.productCollection === ProductCollection.DISH ? "primary" : "secondary"}
                                    onClick={() => productCollectionHandler(ProductCollection.DISH)}
                                >
                                    Dish
                                </Button>
                            </div>
                        </Stack>

                        <Stack className={"product-wrapper"}>
                            {products.length !== 0 ?
                                products.map((product: Product) => {
                                    const imagePath = `${server}/${product.productImages[0].replace(/\\/g, "/")}`;
                                    const sizeVolume = product.productCollection === ProductCollection.DRINK ?
                                        ProductCollection.DRINK : product.productCollection
                                    return (
                                        <Stack
                                            key={product._id}
                                            className={"product-card"}
                                            onClick={() => navigateHandler(product._id)}
                                        >
                                            <Stack
                                                className={"product-img"}
                                                sx={{ backgroundImage: `url(${imagePath})` }}
                                            >
                                                <div className={"product-sale"}>{sizeVolume}</div>
                                                <Button
                                                    className={"shop-btn"}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onAdd({
                                                            _id: product._id,
                                                            name: product.productName,
                                                            price: product.productPrice,
                                                            quantity: 1,
                                                            image: product.productImages[0]
                                                        })
                                                    }}
                                                >
                                                    <img
                                                        src={"/icons/shopping-cart.svg"}
                                                        style={{ display: "flex" }}
                                                    />
                                                </Button>
                                                <Button className={"view-btn"} sx={{ right: "36px" }}>
                                                    <Badge
                                                        badgeContent={product.productViews}
                                                        color="secondary"
                                                    >
                                                        <RemoveRedEyeIcon
                                                            sx={{
                                                                color:
                                                                    product.productViews === 0 ? "gray" : "white",
                                                            }}
                                                        />
                                                    </Badge>
                                                </Button>
                                            </Stack>
                                            <Box className={"product-desc"}>
                                                <span className={"product-title"}>
                                                    {product.productName}
                                                </span>
                                                <div className={"product-desc"}>
                                                    <MonetizationOnIcon />
                                                    {product.productPrice}
                                                </div>
                                            </Box>
                                        </Stack>
                                    );
                                })
                                : (
                                    <Box className="no-data">Products are not available!</Box>
                                )}
                        </Stack>
                    </Stack>

                    <Stack className={"pagination-section"}>
                        <Pagination
                            count={products.length !== 0 ? productInquiry.page + 1 : productInquiry.page}
                            page={productInquiry.page}
                            renderItem={(item) => (
                                <PaginationItem
                                    components={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon,
                                    }}
                                    {...item}
                                    color={"secondary"}
                                />
                            )}
                            onChange={productPaginationHandler}
                        />
                    </Stack>
                </Stack>
            </Container>

            <div className={"brands-logo"}>
                <Container className={"family-brands"}>
                    <Box className={"category-title"}>Our Family Brands</Box>
                    <Stack className={"brand-list"}>
                        <Box className={"review-box"}>
                            <img src={"/img/gurme.webp"} />
                        </Box>
                        <Box className={"review-box"}>
                            <img src={"/img/sweets.webp"} />
                        </Box>
                        <Box className={"review-box"}>
                            <img src={"/img/seafood.webp"} />
                        </Box>
                        <Box className={"review-box"}>
                            <img src={"/img/doner.webp"} />
                        </Box>
                    </Stack>
                </Container>
            </div>

            <div className={"address"}>
                <Container>
                    <Stack className={"address-area"}>
                        <Box className={"title"}>Our address</Box>
                        <iframe
                            style={{ marginTop: "60px" }}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.363734762081!2d69.2267250514616!3d41.322703307863044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b9a0a33281d%3A0x9c5015eab678e435!2z0KDQsNC50YXQvtC9!5e0!3m2!1sko!2skr!4v1655461169573!5m2!1sko!2skr"
                            width="1320"
                            height="500"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </Stack>
                </Container>
            </div>
        </div>
    );
}
