import { useParams } from "react-router-dom"


export default function ChosenProduct(props: any) {
    const params = useParams<{ productId: string }>();
    return (
        <>
            Chosen Product {params.productId}
        </>
    )
}