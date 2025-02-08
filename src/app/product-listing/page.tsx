'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Minus, Plus } from 'lucide-react';
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  price: z
    .string()
    .min(1, 'Price is required')
    .refine((val) => !isNaN(+val), { message: 'Price must be a number' }),
  features: z
    .array(z.string().min(1, 'Feature is required'))
    .min(1, 'At least one feature is required'),
  renting_roles: z
    .array(z.string().min(1, 'Renting role is required'))
    .min(1, 'At least one renting role is required'),
  dimensions: z
    .array(z.string().min(1, 'Dimension is required'))
    .min(1, 'At least one dimension is required'),
  amenities: z
    .array(z.string().min(1, 'Amenity is required'))
    .min(1, 'At least one amenity is required'),
  video: z.instanceof(File).optional(),
  image1: z.instanceof(File).optional(),
  image2: z.instanceof(File).optional(),
  image3: z.instanceof(File).optional(),
  image4: z.instanceof(File).optional(),
});

interface ArrayTextareaFieldProps {
  label: string; // Use string instead of any
  index: number; // The index of the field
  field: {
    name: string; // Name of the field
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Function to handle change
    onBlur: () => void; // Function to handle blur event
    value: string; // The current value of the field
  }; // Extend with FieldValues to allow additional properties
}
type FormFieldName =
  | 'name'
  | 'description'
  | 'category'
  | 'price'
  | 'video'
  | `features.${number}`
  | `renting_roles.${number}`
  | `dimensions.${number}`
  | `amenities.${number}`
  | `image${1 | 2 | 3 | 4}`;
const ArrayTextareaField = ({
  label,
  index,
  field,
}: ArrayTextareaFieldProps) => (
  <FormItem>
    <FormLabel>
      <span className='font-medium'>{`${label} ${index + 1}`}</span>
    </FormLabel>
    <FormControl>
      <Textarea
        placeholder={`Enter ${label.toLowerCase()}`}
        {...field}
        className='w-full border rounded-lg focus:ring-2 focus:ring-blue-500'
      />
    </FormControl>
    <FormMessage />
  </FormItem>
);

const ItemsPage = () => {
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      price: '',
      features: ['', '', '', '', ''],
      renting_roles: ['', ''],
      dimensions: ['', '', '', '', ''],
      amenities: [''],
      video: undefined,
      image1: undefined,
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('price', data.price);
      formData.append('features', JSON.stringify(data.features));
      formData.append('renting_roles', JSON.stringify(data.renting_roles));
      formData.append('dimensions', JSON.stringify(data.dimensions));
      formData.append('amenities', JSON.stringify(data.amenities));
      if (video) formData.append('video', video);

      images.forEach((img, index) => {
        formData.append(`image${index + 1}`, img);
      });
      setLoading(true);
      const response = await axios.post(
        'http://localhost:3000/api/items',
        formData
      );
      if (response.data.success) {
        toast({
          description: `${response.data.message}`,
        });
        form.reset();
        setImages([]);
        setVideo(null);
      } else {
        toast({
          description: `${response.data.message}`,
        });
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 p-4'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full sm:max-w-[85%]'>
        <h1 className='text-3xl font-semibold text-center mb-6 text-sixth'>
          Add New Space
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className='font-bold text-xl'>Name</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter item name'
                      {...field}
                      className='w-full border rounded-lg focus:ring-2 focus:ring-blue-500'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description */}
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className='font-bold text-xl'>Description</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter item description'
                      {...field}
                      className='w-full min-h-[150px] border rounded-lg focus:ring-2 focus:ring-blue-500'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category */}
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className='font-bold text-xl'>Category</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter category'
                      {...field}
                      className='w-full border rounded-lg focus:ring-2 focus:ring-blue-500'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Price */}
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className='font-bold text-xl'>Price</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      step='0.01'
                      placeholder='Enter price'
                      {...field}
                      className='w-full border rounded-lg focus:ring-2 focus:ring-blue-500'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Features */}
            <div>
              <h2 className='text-xl font-bold'>Features</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {form.watch('features').map((_, index) => (
                  <div key={index} className='flex items-center gap-2'>
                    <FormField
                      key={index}
                      control={form.control}
                      name={`features.${index}`}
                      render={({ field }) => (
                        <ArrayTextareaField
                          label='Feature'
                          index={index}
                          field={field}
                        />
                      )}
                    />
                    {form.watch('features').length > 5 && (
                      <Button
                        type='button'
                        variant='destructive'
                        onClick={() => {
                          const updatedFeatures = [
                            ...form.getValues('features'),
                          ];
                          updatedFeatures.splice(index, 1);
                          form.setValue('features', updatedFeatures);
                        }}
                      >
                        -
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type='button'
                variant='default'
                onClick={() => {
                  form.setValue('features', [
                    ...form.getValues('features'),
                    '',
                  ]);
                }}
              >
                Add Feature <Plus />
              </Button>
            </div>
            {/* Renting Roles */}
            <div>
              <h2 className='text-xl font-bold'>Renting Roles</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {form.watch('renting_roles').map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`renting_roles.${index}`}
                    render={({ field }) => (
                      <ArrayTextareaField
                        label='Renting Role'
                        index={index}
                        field={field}
                      />
                    )}
                  />
                ))}
              </div>
            </div>
            {/* Dimensions */}
            <div>
              <h2 className='text-xl font-bold'>Dimensions</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {form.watch('dimensions').map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`dimensions.${index}`}
                    render={({ field }) => (
                      <ArrayTextareaField
                        label='Dimension'
                        index={index}
                        field={field}
                      />
                    )}
                  />
                ))}
              </div>
            </div>
            {/* Amenities */}
            <div>
              <h2 className='text-xl font-bold'>Amenities</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {form.watch('amenities').map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`amenities.${index}`}
                    render={({ field }) => (
                      <ArrayTextareaField
                        label='Amenity'
                        index={index}
                        field={field}
                      />
                    )}
                  />
                ))}
              </div>
            </div>
            {/* Video Upload */}
            <FormField
              control={form.control}
              name='video'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className='font-bold text-xl'>Video</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      accept='video/*'
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setVideo(e.target.files[0]);
                        }
                      }}
                      className='border rounded-lg'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Image Uploads */}
            {[...Array(4)].map((_, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`image${index + 1}` as FormFieldName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className='font-bold text-xl'>{`Image ${
                        index + 1
                      }`}</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='file'
                        accept='image/*'
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            const newImages = [...images];
                            newImages[index] = e.target.files[0];
                            setImages(newImages);
                          }
                        }}
                        className='border rounded-lg'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            {/* Submit Button */}
            <Button
              type='submit'
              disabled={loading}
              className='w-full bg-third text-white py-2 rounded-lg hover:bg-sixth transition duration-200'
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ItemsPage;
