import { Input } from "../ui/input";

const PaymentDetails = ({ paymentForm }) => (
  <div className="space-y-4 animate-in slide-in-from-right-4 duration-300 text-left">
    <Input
      placeholder="Cardholder Name"
      {...paymentForm.register("cardHolder")}
      error={paymentForm.formState.errors.cardHolder?.message}
    />
    <Input
      placeholder="Card Number (16 digits)"
      maxLength={16}
      {...paymentForm.register("cardNumber")}
      error={paymentForm.formState.errors.cardNumber?.message}
    />
    <div className="grid grid-cols-2 gap-4">
      <Input
        placeholder="MM/YY"
        {...paymentForm.register("expiry")}
        error={paymentForm.formState.errors.expiry?.message}
      />
      <Input
        placeholder="CVV"
        maxLength={3}
        {...paymentForm.register("cvv")}
        error={paymentForm.formState.errors.cvv?.message}
      />
    </div>
  </div>
);
export default PaymentDetails;
