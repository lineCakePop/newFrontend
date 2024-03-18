import ProductImgCustom from "./productImg";
import UserIconCustom from "./userIcon";

const ProductDetail = ({
  productPicture,
  productPrice,
  seller,
  sellerPicture,
  variant,
  productName,
}) => {
  return (
    <div className="h-[126px] bg-white">
      <div className="flex items-center gap-[8px]">
        <UserIconCustom height={24} width={24} img={sellerPicture} />
        <div className="text-[14px] font-semibold truncate">{seller}</div>
      </div>
      <div className="mt-[24px] flex h-[78px] items-center">
        <div className="w-[72px] ">
          <ProductImgCustom width={72} height={72} img={productPicture} />
        </div>
        <div className="ml-[12px] text-[16px] font-medium leading-[20.8px] truncate	">
          {productName}
          <div className="mt-[4px] text-[12px] h-[15.6px] text-[#555555]">
            {variant}
          </div>
          <div className="mt-[16px] h-[21px] font-semibold text-[16px]">
            ฿{productPrice.toLocaleString("en-US")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
