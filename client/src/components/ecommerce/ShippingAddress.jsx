import React from "react";
import { Input } from "../ui/input";
import { Field, FieldError } from "../ui/field";

const ShippingAddress = ({ shippingForm }) => {
  return (
    <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
      <Field>
        <Input
          aria-invalid={!!shippingForm.formState.errors.address}
          placeholder="Street Address"
          {...shippingForm.register("address")}
        />
        <FieldError>
          {shippingForm.formState.errors.address?.message}
        </FieldError>
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <Input
            aria-invalid={!!shippingForm.formState.errors.city}
            placeholder="City"
            {...shippingForm.register("city")}
            error={shippingForm.formState.errors.city?.message}
          />
          <FieldError>{shippingForm.formState.errors.city?.message}</FieldError>
        </Field>

        <Field>
          <Input
            aria-invalid={!!shippingForm.formState.errors.state}
            placeholder="State"
            {...shippingForm.register("state")}
            error={shippingForm.formState.errors.state?.message}
          />
          <FieldError>
            {shippingForm.formState.errors.state?.message}
          </FieldError>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <Input
            aria-invalid={!!shippingForm.formState.errors.country}
            placeholder="Country"
            {...shippingForm.register("country")}
            error={shippingForm.formState.errors.country?.message}
          />
          <FieldError>
            {shippingForm.formState.errors.country?.message}
          </FieldError>
        </Field>
        <Field>
          <Input
            placeholder="Pin Code"
            aria-invalid={!!shippingForm.formState.errors.pin}
            {...shippingForm.register("pin")}
            error={shippingForm.formState.errors.pin?.message}
          />
          <FieldError>{shippingForm.formState.errors.pin?.message}</FieldError>
        </Field>
      </div>
      <Field>
        <Input
          placeholder="Phone Number"
          aria-invalid={!!shippingForm.formState.errors.phone}
          {...shippingForm.register("phone")}
          error={shippingForm.formState.errors.phone?.message}
        />
        <FieldError>{shippingForm.formState.errors.phone?.message}</FieldError>
      </Field>
    </div>
  );
};

export default ShippingAddress;
