import { z } from "zod";
export const shippingAddressSchema = z.object({
  address: z.string().min(5, "Please enter a full address"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "City is required"),
  country: z.string().min(2, "City is required"),
  phone: z.string().min(10, "phone no must be at least 10 digits"),
  pin: z.string().regex(/^\d{5}$/, "pin code must be 5 digits"),
});
export const paymentSchema = z.object({
  cardHolder: z.string().min(4, "Name on card is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format MM/YY"),
  cvv: z.string().regex(/^\d{3}$/, "CVV must be 3 digits"),
});
