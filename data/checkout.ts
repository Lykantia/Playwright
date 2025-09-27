export interface CheckoutDataItem {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export interface CheckoutData {
  valid: CheckoutDataItem;
  missingZip: CheckoutDataItem;
  specialChars: CheckoutDataItem;
}

export const checkoutData: CheckoutData = {
  valid: {
    firstName: "Test",
    lastName: "Booking",
    postalCode: "70000",
  },
  missingZip: {
    firstName: "Test",
    lastName: "Booking",
    postalCode: "",
  },
  specialChars: {
    firstName: "Tęšť",
    lastName: "Říčka",
    postalCode: "123 45",
  },
};

