"use client";
import React, { useEffect, useState } from 'react'
import {  PlusCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dialog,DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import CategoryAdd from '@/components/CategoryAdd'
import { backendUrl, categoryData, jwtToken } from '@/constant'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast';
import { revalidatePath } from 'next/cache';

interface Category {
    
    _id: string;
    name: string;
    noOfItems:  number;
    slug: string;
    id: string;
    }
  
    
  
  const Page =() => {
    const { toast } = useToast();
    const [categories, setCategories] = useState<Category[]>([]);
    const router = useRouter();
   
    
    async function deleteCategory(categoryId: string): Promise<void> {
        
        try {
          const response = await axios.delete(`${backendUrl}/api/v1/categories/${categoryId}`, {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
              'Content-Type': 'application/json'
            }
          });
          
            toast({
                title: "Category deleted succefully",
               })
               
               router.push('/category')
          
        } catch (error) {
          console.error('Error deleting category:', error);
          throw error;
        }
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
        <div>
    <Card className="xl:col-span-2 border-none">
    <Dialog>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Recent transactions from your store.
          </CardDescription>
        </div>
        <DialogTrigger asChild>
        <Button  size="sm" className="ml-auto gap-1">
          
            Add New
            <PlusCircle className="h-4 w-4" />
          
        </Button>
      </DialogTrigger>
      <CategoryAdd />
        
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              
              <TableHead className="text-right">No. of Items</TableHead>
          
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((item ,i ) => (
                 <TableRow key={i}>
                 <TableCell>
                   <div className="font-medium">{item.name}</div>
                   <div className="hidden text-sm text-muted-foreground md:inline">
                    Slug: {item.slug}
                   </div>
                 </TableCell>
                 
                 <TableCell className="text-right">{item.noOfItems}</TableCell>
                 <TableCell onClick={() =>  deleteCategory(item._id)}><Trash2 size={18} className='text-red-500'/></TableCell>

               </TableRow>
            ))}
           
          </TableBody>
        </Table>
      </CardContent>
      </Dialog>
    </Card>
    </div>
  )
}

 

export default Page