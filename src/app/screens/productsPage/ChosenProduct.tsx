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

export default function ChosenProduct(props: any) {

    const chosenProduct: any = { productImages: ["/img/1.jpg"], }
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
                            const imagePath = ele;
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
                        <span className={"resto-name"}>Burak</span>
                        <span className={"resto-name"}>01032011222</span>
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
