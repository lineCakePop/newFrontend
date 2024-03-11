const UserIconCustom = ({ width = 32, height = 32, img = "" }) => {
  return (
    <div
      className="flex justify-center items-center overflow-hidden rounded-full"
      style={{ height: height, width: width }}
    >
      <img style={{ height: height }} src={img} alt="seller_picture" />
    </div>
  );
};

export default UserIconCustom;
