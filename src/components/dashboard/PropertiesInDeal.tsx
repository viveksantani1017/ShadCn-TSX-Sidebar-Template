import React from "react"

import ProductList from "../ProductList"
import { DataTable } from "../datatable/DataTable"
import { columns } from "../datatable/columns"
import { Barchart } from "../ui/Barchart"
import { Linechart } from "../ui/Linechart"

const products = [
  {
    id: 1,
    category: "Appartment",
    name: "Abc Appartnnent",
    ownerName: "X Builders",
    area: "Patel Colony",
    price: 100000,
    images: ["/img/products/appt.jpg"],
  },
  {
    id: 2,
    category: "Appartment",
    name: "Abc Appartnnent",
    ownerName: "X Builders",
    area: "Patel Colony",
    price: 100000,
    images: ["/img/products/appt.jpg"],
  },
  {
    id: 3,
    category: "Appartment",
    name: "Abc Appartnnent",
    ownerName: "X Builders",
    area: "Patel Colony",
    price: 100000,
    images: ["/img/products/appt.jpg"],
  },
  {
    id: 4,
    category: "Appartment",
    name: "Abc Appartnnent",
    ownerName: "X Builders",
    area: "Patel Colony",
    price: 100000,
    images: ["/img/products/appt.jpg"],
  },
  {
    id: 5,
    category: "Appartment",
    name: "Abc Appartnnent",
    ownerName: "X Builders",
    area: "Patel Colony",
    price: 100000,
    images: ["/img/products/appt.jpg"],
  },
]
const data = [
  {
    id: "TASK-8782",
    propertyName: "Abc Appratment",
    propertyType: "Appratment",
    ownerName: "Anil Kumar",
    brokerName: "Jignesh Kumar",
    customerName: "Dilip Kumar",
    status: "in progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7878",
    propertyName: "Xyz Complex Shop 1",
    propertyType: "Office Space",
    ownerName: "Rajeesh Kumar",
    brokerName: "Suresh Kumar",
    customerName: "Paresh Kumar",
    status: "backlog",
    label: "documentation",
    priority: "medium",
  },
]
const viewUrl = "/properties/propertyDetails?property"
const editUrl = "/properties/editProperty?property"
const hasView = true
const hasEdit = true
const hasDelete = true

const PropertiesInDeal = () => {
  return (
    <>
      <div className=" h-full flex-1 flex-col space-y-3 mt-10 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all Properties currently in deals!
            </p>
          </div>
          <div className="flex items-center space-x-2">{/* <UserNav /> */}</div>
        </div>
        <DataTable data={data} searchColumn="propertyName" columns={columns({viewUrl,editUrl,hasView,hasEdit,hasDelete})} />
      </div>
    </>
  )
}

export default PropertiesInDeal
