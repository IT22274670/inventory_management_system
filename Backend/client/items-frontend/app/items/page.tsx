"use client";
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import {  Pencil, PlusCircle, Trash2 } from "lucide-react"
import { Label } from "@/components/ui/label"


import { Badge } from "@/components/ui/badge"
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import CategoryAdd from '@/components/CategoryAdd'
import { backendUrl, categoryData, jwtToken } from '@/constant'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast';
import { revalidatePath } from 'next/cache';
import ItemAdd from '@/components/ItemAdd';

interface Item {
    _id:string;
                name: string;
                itemCode: number;
                category: {
                    _id: string
                    name: string
                    id: string
                };
                noOfPurchases: number;
                stock: number;
                isAvailable: boolean;
                slug: string,
                returns: number,
                id: string
    }
  
    
  
  const Page =() => {
    const { toast } = useToast();
    const [items, setItems] = useState<Item[]>([]);
    const router = useRouter();
   
    
    async function deleteItem(itemId: string): Promise<void> {
        
        try {
          const response = await axios.delete(`${backendUrl}/api/v1/items/${itemId}`, {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
              'Content-Type': 'application/json'
            }
          });
          
            toast({
                title: "Item deleted succefully",
               })
               
               router.push('/items')
          
        } catch (error) {
          console.error('Error deleting category:', error);
          throw error;
        }
      }
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get<Item[],any>(`${backendUrl}/api/v1/items`, {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
              'Content-Type': 'application/json'
            }
          });
          setItems(response.data.data.data);
          
       
        } catch (error) {
          console.error('Error fetching items:', error);
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
          <CardTitle>Items</CardTitle>
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
      <ItemAdd />
        
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>No Of Purchases</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Returns</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item ,i ) => (
                 <TableRow key={i}>
                 <TableCell>
                   <div className="font-medium">{item.name}</div>
                   <div className="hidden text-sm text-muted-foreground md:inline">
                    {item.category.name}
                   </div>
                 </TableCell>
                 
                 <TableCell className='table-cell' >{item.noOfPurchases}</TableCell>
                 <TableCell className='table-cell'>{item.stock}</TableCell>
                 <TableCell className="text-right">{item.returns}</TableCell>
                 <TableCell>
                 <TableCell onClick={() =>  {}}><Pencil  size={18} className='text-muted-foreground cursor-pointer'/></TableCell>
                 <TableCell onClick={() =>  deleteItem(item._id)}><Trash2 size={18} className='text-red-500 cursor-pointer'/></TableCell>
                 </TableCell>
                 

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