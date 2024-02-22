import React from "react"
import { ReactComponent as ArrowHead } from "../../icons/ItemInformation/Vector.svg"
import ButtonCustom from "../../components/Button"

// product
// {
//   product_name : String,
//   product_picture_uri : String,
//   product_price : Number,
//   seller : String,
//   seller_picture_uri : String,
//   link_to_product : String,
//   link_to_seller : String (now still null),
//   variant : {
//             variant_name1 : [String],
//             variant_name2 : [String]
//             }
// }

const ItemInformation = () => {
    const product = {
        product_name: "Bonjour Tote Bag",
        product_picture_uri:
            "https://static.wixstatic.com/media/2349a0_c9b86d38c80d4353853d5681593cd88a~mv2.jpg/v1/fill/w_480,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/2349a0_c9b86d38c80d4353853d5681593cd88a~mv2.jpg",
        product_price: 1400,
        seller: "anytoty shop",
        seller_picture_uri:
            "https://cdn01.pinkoi.com/product/Ku8E3KRW/0/1/640x530.jpg",
        link_to_product: "",
        link_to_seller: "",
        variant: {
            color: ["red", "green"],
            variant_name2: ["s", "m"],
        },
    }

    return (
        <div className="">
            {/* header */}
            <div className="h-[56px] bg-white flex justify-between px-[24px] items-center">
                <p className="font-bold text-[20px]">Add item Variation</p>
            </div>
            {/* product img */}
            <div className="h-[375px] flex justify-center items-center overflow-hidden">
                <img
                    src={product.product_picture_uri}
                    alt="product_img"
                    className="h-[375px]"
                />
            </div>
            {/* product name */}
            <div className="h-[87px] px-[24px] pt-[24px] ">
                <div className="border-b h-[63px]">
                    <p className="font-medium text-[16px]">
                        {product.product_name}
                    </p>
                    <p className="font-bold text-[18px]">
                        ฿{product.product_price.toLocaleString("en-US")}
                    </p>
                </div>
            </div>
            {/* seller */}
            <div className="h-[88px] p-[24px] flex justify-between">
                <div className="h-[40px] w-[40px] rounded-full overflow-hidden flex justify-center items-center">
                    <img
                        className="h-[40px]"
                        src={product.seller_picture_uri}
                        alt="seller_picture"
                    />
                </div>
                <div className="flex items-center w-[279px] justify-between">
                    <span className="font-semibold text-[14px]">
                        {product.seller}
                    </span>
                    <div className="flex w-[81px] justify-between items-center">
                        <span className="text-[12px] text-[#06C755]">
                            Go to shop
                        </span>
                        <ArrowHead />
                    </div>
                </div>
            </div>
            <div className="h-[8px] bg-[#DFDFDF]" />
            {/* footer */}
            <div className="h-[97px] flex justify-center items-center">
                <ButtonCustom title="Confirm" />
            </div>
            <a href="https://lin.ee/sLoenA2h">link</a>
        </div>
    )
}

export default ItemInformation
