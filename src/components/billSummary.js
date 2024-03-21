import React from "react";

const BillSummary = ({
  giftPrice,
  shippingPrice,
  discount,
  addCost,
  totalMember,
}) => {
  const totalBill = () => {
    return giftPrice + shippingPrice - discount + addCost;
  };

  const arrayBill = [
    { name: "Gift total", price: giftPrice },
    { name: "Shipping Fee", price: shippingPrice },
    { name: "Additional Cost", price: addCost },
    { name: "Discount", price: discount },
    { name: "Total", price: totalBill() },
    { name: "Each Payment", price: totalBill() / totalMember },
  ].filter((item) => item.price !== 0);

  return (
    <div className=" flex flex-col gap-[14px]">
      {arrayBill.map((item, index) => (
        <div className="flex justify-between">
          <div
            className={`${index < arrayBill.length - 2 ? "text-[#555555] text-[14px]" : "text-[16px] "}`}
          >
            {item.name}
          </div>
          <div
            className={`${index < arrayBill.length - 2 ? "text-[#555555] text-[14px]" : "text-[16px] font-medium"}`}
          >
            ฿
            {
              item.price
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
                .split("$")[1]
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default BillSummary;
