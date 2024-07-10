import React, { useState } from 'react';

const PlacesCard = ({ singleProduct, addToCart }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleAddToCart = () => {
        addToCart(singleProduct);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 2000); // Pop-up will disappear after 2 seconds
    };

    return (
        <div className="relative shadow-lg transition-all duration-500 hover:shadow-xl cursor-pointer rounded-lg overflow-hidden bg-white p-1 lg:max-h-[500px]">
            {/* Product Image */}
            <div className="aspect-w-16 aspect-h-6 sm:aspect-w-16 sm:aspect-h-9">
                <img
                    src={singleProduct.url}
                    alt="product-img"
                    className="object-cover w-full h-60 transform transition duration-700 hover:scale-110"
                />
            </div>

            {/* Product Details */}
            <div className="p-1 sm:p-2 space-y-1">
                <h1 className="font-bold text-lg sm:text-xl line-clamp-1 text-gray-900">{singleProduct.title}</h1>

                {/* Product Location */}
                <div className="flex items-center gap-1 text-gray-600 opacity-70">
                    <span className="text-red-500"></span>
                </div>

                {/* Product Price and Description */}
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <p className="font-bold text-base sm:text-lg text-gray-900">N{singleProduct.price}</p>
                    <p className="line-clamp-2 sm:ml-2 text-gray-700">{singleProduct.description}</p>
                </div>

                {/* Add to Cart Button */}
                <div className="flex justify-center">
                    <button
                        className="bg-red-600 py-1 px-2 sm:py-2 sm:px-3 rounded-lg text-white font-bold transition duration-300 ease-in-out hover:bg-red-700"
                        onClick={handleAddToCart}
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>

            {/* Pop-up Notification */}
            {showPopup && (
                <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
                    Added to Cart
                </div>
            )}
        </div>
    );
};

export default PlacesCard;


