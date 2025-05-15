'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { CalendarIcon, ImagePlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/shared/icons';

const studentSchema = z.object({
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
    required_error: "Gender is required",
  }),
  address: z.string().min(10, { message: "Address must be at least 10 characters" }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  guardianName: z.string().min(2, { message: "Guardian name must be at least 2 characters" }),
  guardianContact: z.string().min(10, { message: "Guardian contact must be at least 10 characters" }),
  currentClass: z.string({
    required_error: "Class is required",
  }),
  section: z.string().optional(),
  rollNumber: z.string().optional(),
  photo: z.any().optional(),
});

type StudentFormValues = z.infer<typeof studentSchema>;

export function StudentRegistrationForm({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      dateOfBirth: undefined,
      gender: undefined,
      address: '',
      phoneNumber: '',
      guardianName: '',
      guardianContact: '',
      currentClass: '',
      section: '',
      rollNumber: '',
    },
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('photo', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(data: StudentFormValues) {
    setIsLoading(true);

    try {
      // In a real application, we would create a FormData object
      // and upload the photo to a server
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('dateOfBirth', data.dateOfBirth.toISOString());
      formData.append('gender', data.gender);
      formData.append('address', data.address);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('guardianName', data.guardianName);
      formData.append('guardianContact', data.guardianContact);
      formData.append('currentClass', data.currentClass);
      if (data.section) formData.append('section', data.section);
      if (data.rollNumber) formData.append('rollNumber', data.rollNumber);
      if (data.photo) formData.append('photo', data.photo);

      // Simulating API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success('Registration completed successfully!');
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Personal Information</h3>
            <p className="text-sm text-muted-foreground">
              Please provide your personal details for registration.
            </p>
          </div>
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      {photoPreview ? (
                        <div className="relative h-32 w-32 overflow-hidden rounded-full">
                          <img
                            src={photoPreview}
                            alt="Student photo preview"
                            className="h-full w-full object-cover"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-0 top-0 bg-primary/10 hover:bg-primary/20"
                            onClick={() => {
                              setPhotoPreview(null);
                              form.setValue('photo', undefined);
                            }}
                          >
                            <Icons.close className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-muted">
                          <ImagePlus className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 text-center">
                      <h4 className="text-sm font-medium">Student Photo</h4>
                      <p className="text-xs text-muted-foreground">
                        Upload a passport-sized photo for your student ID card.
                      </p>
                    </div>
                    <label htmlFor="photo-upload">
                      <Button variant="outline" type="button" className="cursor-pointer">
                        <ImagePlus className="mr-2 h-4 w-4" />
                        {photoPreview ? 'Change Photo' : 'Upload Photo'}
                      </Button>
                    </label>
                    <input 
                      id="photo-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handlePhotoChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your date of birth is used for age verification.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter your full address" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Guardian Information</h3>
            <p className="text-sm text-muted-foreground">
              Provide details of your parent or guardian.
            </p>
          </div>
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="guardianName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guardian Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter guardian's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="guardianContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guardian Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter guardian's phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Academic Information</h3>
            <p className="text-sm text-muted-foreground">
              Provide your current academic details.
            </p>
          </div>
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="currentClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Class 6">Class 6</SelectItem>
                      <SelectItem value="Class 7">Class 7</SelectItem>
                      <SelectItem value="Class 8">Class 8</SelectItem>
                      <SelectItem value="Class 9">Class 9</SelectItem>
                      <SelectItem value="Class 10">Class 10</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                      <SelectItem value="C">Section C</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Your class section (if applicable).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rollNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roll Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your roll number (if known)" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your class roll number (if already assigned).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-end space-x-4">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Complete Registration
          </Button>
        </div>
      </form>
    </Form>
  );
}