const ProductImgCustom = ({ width = 32, height = 32, img = "" }) => {
  return (
    <div
      className="flex justify-center items-center overflow-hidden rounded-[8px]"
      style={{ height: height, width: width }}
    >
      <img style={{ height: height }} src={img} alt="seller_picture" />
    </div>
  );
};

export default ProductImgCustom;
