"use client";
import React, { useEffect, useState, useTransition } from 'react'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {  itemAddSchema } from '@/lib/validation';
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
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem,  SelectTrigger, SelectValue } from './ui/select';

interface Category {
    
  _id: string;
  name: string;
  noOfItems:  number;
  slug: string;
  id: string;
  }

const ItemAdd = () => {
   
  const [categories, setCategories] = useState<Category[]>([]);
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof itemAddSchema>>({
        resolver: zodResolver(itemAddSchema),
        defaultValues: {
         name: "",
         itemCode:"",

        },
      })

      function onSubmit(values: z.infer<typeof itemAddSchema>) {
       
    const headers = {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
    };
        
        startTransition(async () => {
        
            try {
                
                const response = await axios.post(`${backendUrl}/api/v1/items`, values, {
                    headers: headers
                });
                console.log(response.data);
                if(response.data.status == "success")
                toast({
                    title: "Item added succefully",
                   
                 
                  })
                
            } catch (error) {
                console.error('Error:', error);
            }
        })
      }

      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get<Category[],any>(`${backendUrl}/api/v1/categories`, {
              headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
              }
            });
            setCategories(response.data.data.data);
            
         
          } catch (error) {
            console.error('Error fetching categories:', error);
            // Handle error
          }
        };
        fetchCategories();
      }, []);

  return (
    <DialogContent className="sm:max-w-[425px]">
    <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} >
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>
            Add new item to your store
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item name</FormLabel>
              <FormControl>
                <Input  {...field} disabled={isPending} placeholder='Sugar 100g' />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Code</FormLabel>
              <FormControl>
                <Input  {...field} placeholder='002' disabled={isPending} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
       
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category,i) => (
                      <SelectItem key={i} value={category._id}>{category.name}</SelectItem>
  ))}
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
              <Textarea {...field} disabled={isPending} />

              </FormControl>
              
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

export default ItemAdd