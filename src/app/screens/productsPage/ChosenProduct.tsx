import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Dispatch } from "@reduxjs/toolkit";
import { Product } from "../../../lib/types/product.type";
import { setChosenProduct, setRestaurant } from "./slice";


//Redux
import { createSelector } from "reselect"
import { chosenProductRetriever, restaurantRetriever } from "./selector";
import ProductService from "../../services/Product.service";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../../lib/config";
import { Member } from "../../../lib/types/member.type";
import MemberService from "../../services/Member.service";
import { CartItem } from "../../../lib/types/search.type";

const actionDispatch = (dispatch: Dispatch) => ({
    setChosenProduct: (product: Product) => dispatch(setChosenProduct(product)),
    setRestaurant: (restaurant: Member) => dispatch(setRestaurant(restaurant))
})

const chosenProductSelector = createSelector(
    chosenProductRetriever,
    (chosenProduct) => ({ chosenProduct })
)

const restaurantSelector = createSelector(
    restaurantRetriever,
    (restaurant) => ({ restaurant })
)

interface ChosenProductProps {
    onAdd: (item: CartItem) => void
}

export default function ChosenProduct(props: ChosenProductProps) {
    const { onAdd } = props;
    const { productId } = useParams<{ productId: string }>();
    const { setChosenProduct, setRestaurant } = actionDispatch(useDispatch());
    const { chosenProduct } = useSelector(chosenProductSelector)
    const { restaurant } = useSelector(restaurantSelector)

    useEffect(() => {
        const productService = new ProductService();
        const memberService = new MemberService();

        window.document.addEventListener("scroll", () => { });


        productService
            .getProduct(productId)
            .then((product) => setChosenProduct(product))
            .catch()

        memberService
            .getRestaurant()
            .then((member: Member) => setRestaurant(member))
            .catch()
    }, [])

    if (!chosenProduct) return null;
    return (
        <div className={"chosen-product"}>
            <Box className={"title"}>Product Detail</Box>
            <Container className={"product-container"}>
                <Stack className={"chosen-product-slider"}>
                    <Swiper
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="swiper-area"
                    >
                        {chosenProduct?.productImages.map((ele: string, index: number) => {
                            const imagePath = `${server}/${ele}`;
                            return (
                                <SwiperSlide key={index}>
                                    <img className="slider-image" src={imagePath} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </Stack>
                <Stack className={"chosen-product-info"}>
                    <Box className={"info-box"}>
                        <strong className={"product-name"}>
                            {chosenProduct?.productName}
                        </strong>
                        <span className={"resto-name"}>{restaurant?.memberNick}</span>
                        <span className={"resto-name"}>{restaurant?.memberPhone}</span>
                        <Box className={"rating-box"}>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                            <div className={"evaluation-box"}>
                                <div className={"product-view"}>
                                    <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                                    <span>{chosenProduct?.productViews}</span>
                                </div>
                            </div>
                        </Box>
                        <p className={"product-desc"}>
                            {chosenProduct?.productDesc
                                ? chosenProduct?.productDesc
                                : "No Description"}
                        </p>
                        <Divider height="1" width="100%" bg="#000000" />
                        <div className={"product-price"}>
                            <span>Price:</span>
                            <span>${chosenProduct?.productPrice}</span>
                        </div>
                        <div className={"button-box"}>
                            <Button
                                variant="contained"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAdd({
                                        _id: chosenProduct._id,
                                        name: chosenProduct.productName,
                                        price: chosenProduct.productPrice,
                                        quantity: 1,
                                        image: chosenProduct.productImages[0]
                                    })
                                }}
                            >
                                Add To Basket
                            </Button>
                        </div>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}
