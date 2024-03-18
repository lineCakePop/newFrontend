import React from "react";

const BillSummary = ({ giftPrice, shippingPrice, discount, eachPayment }) => {
  const arrayBill = [
    { name: "Gift total", price: giftPrice },
    { name: "Shipping Fee", price: shippingPrice },
    { name: "Total", price: discount },
    { name: "Each Payment", price: eachPayment },
  ];

  return (
    <div className="h-[120px] flex flex-col gap-[14px]">
      {arrayBill.map((item, index) => (
        <div className="flex justify-between">
          <div
            className={`${index < 2 ? "text-[#555555] text-[14px]" : "text-[16px] font-medium"}`}
          >
            {item.name}
          </div>
          <div
            className={`${index < 2 ? "text-[#555555] text-[14px]" : "text-[16px] font-semibold"}`}
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
