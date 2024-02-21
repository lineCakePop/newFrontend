import React, { useState } from "react";

//  ======================= svg =======================
import { ReactComponent as UserAdd } from "../../icons/friendWishlist/user-add.svg";
import { ReactComponent as Search } from "../../icons/friendWishlist/search.svg";
import WishlistCard from "../../components/friendWishlist/wishlistCard";

const testData = [
  {
    displayName: "ไม้แก่น",
    pictureUrl:
      "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg",
    birthDay: new Date("2022-03-25"),
    wishlist: [
      {
        productName: "ปลากระป๋อง",
        productPrice: 1900,
        productPicture:
          "https://static.toiimg.com/photo/msid-53891743,width-96,height-65.cms",
        variant_text: "",
      },
      {
        productName: "ปลากระป๋อง2",
        productPrice: 1900,
        productPicture:
          "https://pictures-nigeria.jijistatic.com/125306347_NjIwLTYyMC0zMGQ4NTU1ZDNm.webp",
        variant_text: "",
      },
    ],
  },
  {
    displayName: "นน",
    pictureUrl:
      "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    birthDay: null,
    wishlist: [
      {
        productName: "ปลากระป๋อง",
        productPrice: 1900,
        productPicture:
          "https://pictures-nigeria.jijistatic.com/129837368_NjIwLTYyMC02YmEyY2UwMmNk.webp",
        variant_text: "",
      },
    ],
  },
];

function FriendWishlist() {
  //  ======================= useState =======================

  const [searchInput, setSearchInput] = useState("");
  const [wishlist, setWishlist] = useState(testData);
  const [displayWishlist, setDisplayWishlist] = useState(testData);

  //  ======================= function =======================

  const handleSearch = (text) => {
    setSearchInput(text);
    setDisplayWishlist(
      wishlist.filter((friendWislist) =>
        friendWislist.displayName
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase())
      )
    );
  };

  return (
    <div>
      {/* header */}
      <div className="h-[56px] px-[24px] py-[16px] items-center border-b border-[#DFDFDF] flex justify-between">
        <span className="text-[20px] font-bold">Friend’s wishlist</span>
        <UserAdd />
      </div>
      {/* search */}
      <div className="h-[72px] px-[24px] py-[16px] justify-center items-center relative">
        <input
          className="bg-[#F5F5F5] h-[40px] w-[100%] rounded-[5px] px-[12px] outline-none placeholder-[#B7B7B7]"
          placeholder="      Search friend"
          value={searchInput}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        {searchInput === "" && (
          <Search className="absolute top-[28px] left-[35px]" />
        )}
      </div>
      {/* friend wishlist */}
      {displayWishlist.map((friendWislist) => {
        return (
          <WishlistCard
            displayName={friendWislist.displayName}
            pictureUrl={friendWislist.pictureUrl}
            wishlist={friendWislist.wishlist}
            birthDay={friendWislist.birthDay}
          />
        );
      })}
    </div>
  );
}

export default FriendWishlist;
