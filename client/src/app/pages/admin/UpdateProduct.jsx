import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProductDetail } from "@/hooks/useProduct";
import { useParams } from "react-router";
import { useUpdateProduct } from "@/hooks/useAdmin";

const UpdateProduct = () => {
  const { id } = useParams();
  const { data } = useProductDetail(id);
  const { mutate, isPending } = useUpdateProduct();
  const product = data?.product;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const images = watch("images");
  const [previewImages, setPreviewImages] = useState([]);

  // Load product data
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: product.category,
        description: product.description,
      });

      setPreviewImages(product.images || []);
    }
  }, [product, reset]);

  // Preview new images
  useEffect(() => {
    if (images && images.length > 0) {
      const previews = Array.from(images).map((file) =>
        URL.createObjectURL(file),
      );
      setPreviewImages(previews);
    }
  }, [images]);

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);
    formData.append("description", data.description);
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((img) => {
        formData.append("images", img);
      });
    }

    mutate({
      id: id,
      productData: formData,
    });
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Label>Product Name</Label>
            <Input {...register("name", { required: true })} />
          </div>

          {/* Price */}
          <div>
            <Label>Price</Label>
            <Input type="number" {...register("price", { required: true })} />
          </div>

          {/* Stock */}
          <div>
            <Label>Stock</Label>
            <Input type="number" {...register("stock", { required: true })} />
          </div>

          {/* Rating */}
          <div>
            <Label>category</Label>
            <Input type="text" {...register("category")} />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea {...register("description")} />
          </div>

          {/* Images */}
          <div>
            <Label>Product Images (3–4)</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              {...register("images")}
            />
          </div>

          {/* Image Preview */}
          <div className="grid grid-cols-4 gap-3 mt-3">
            {previewImages.map((img, i) => (
              <img
                key={i}
                src={typeof img === "string" ? img : img}
                className="h-20 w-20 object-cover rounded-md border"
                alt="preview"
              />
            ))}
          </div>

          <Button disabled={isPending} className="w-full mt-4">
            {isPending ? "Updating..." : "Update Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateProduct;
