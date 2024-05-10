"use client";
import React, {useTransition } from 'react'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { categoryAddSchema } from '@/lib/validation';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import axios from 'axios';
import { backendUrl, jwtToken } from '@/constant';
import { useToast } from './ui/use-toast';


const CategoryAdd = () => {
   
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof categoryAddSchema>>({
        resolver: zodResolver(categoryAddSchema),
        defaultValues: {
         name: "",
        },
      })

    function onSubmit(values: z.infer<typeof categoryAddSchema>) {
        
    
    // Set up the headers with the JWT token
    const headers = {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
    };
        
        startTransition(async () => {
        
            try {
                
                const response = await axios.post(`${backendUrl}/api/v1/categories`, values, {
                    headers: headers
                });
                console.log(response.data);
                if(response.data.status == "success")
                toast({
                    title: "Category added succefully",
                   
                 
                  })
                
            } catch (error) {
                console.error('Error:', error);
            }
        })
      }

  return (
    <DialogContent className="sm:max-w-[425px]">
    <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} >
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Add new category to your store
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input  {...field} disabled={isPending} />
              </FormControl>
              <FormDescription>
               Enter new category name here
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
     
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
      </Form>
      </DialogContent>
  )
}

export default CategoryAdd