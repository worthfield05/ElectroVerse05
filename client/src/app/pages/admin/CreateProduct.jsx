import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateAdminProduct } from "@/hooks/useAdmin";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const images = useWatch({ control, name: "images" });
  const { isError, error, isPending, mutate } = useCreateAdminProduct();

  useEffect(() => {
    if (!images) return;

    if (images.length < 1) {
      setError("images", {
        message: "Upload 2 to 4 images",
      });
    } else {
      clearErrors("images");
    }
  }, [images, setError, clearErrors]);

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);
    formData.append("description", data.description);
    console.log(data);

    Array.from(data.images).forEach((img) => {
      formData.append("images", img);
    });
    mutate(formData);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Add Product</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(submitHandler)}
          encType="multipart/form-data"
          className="space-y-6"
        >
          {/* Name */}
          <div className="space-y-1">
            <Label>Product Name</Label>
            <Input {...register("name", { required: "Name is required" })} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price</Label>
              <Input
                type="number"
                {...register("price", {
                  required: "Price required",
                  valueAsNumber: true,
                })}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div>
              <Label>Stock</Label>
              <Input
                type="number"
                {...register("stock", {
                  required: "Stock required",
                  valueAsNumber: true,
                })}
              />
              {errors.stock && (
                <p className="text-sm text-red-500">{errors.stock.message}</p>
              )}
            </div>
          </div>

          {/* Rating */}
          <div>
            <Label>Category</Label>
            <Input
              type="text"
              {...register("category", {
                required: "category required",
              })}
            />
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea
              rows={4}
              {...register("description", {
                required: "Description required",
              })}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Images */}
          <div>
            <Label>Product Images (3–4)</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              {...register("images")}
              required
            />

            {errors.images && (
              <p className="text-sm text-red-500 mt-1">
                {errors.images.message}
              </p>
            )}

            {images && (
              <div className="grid grid-cols-4 gap-3 mt-3">
                {Array.from(images).map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="h-24 w-full rounded-md object-cover border"
                  />
                ))}
              </div>
            )}
          </div>
          {isError && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertDescription>
                {error?.response?.data?.message || "An error occurred."}
              </AlertDescription>
            </Alert>
          )}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Creating" : "Save Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateProduct;
