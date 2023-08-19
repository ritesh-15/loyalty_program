export const getDiscountedPricePercentage = (
    originalPrice:number,
    discountedPrice:number
) => {
    const discount:number = originalPrice - discountedPrice;

    const discountPercentage:Number = (discount / originalPrice) * 100;

    return discountPercentage.toFixed(2);
};