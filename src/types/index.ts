import { type LucideIcon } from "lucide-react"

import { Amenity, Area, PropertyCategory } from "@/components/datatable/data/schema"
import { IconType } from "react-icons/lib"

export interface NavItem {
  title: string
  href?: string
  icon: IconType | LucideIcon
  color?: string
  isChidren?: boolean
  children?: NavItem[]
}
export interface PropertyData {
  name: string,
  address: string,
  isFeatured: boolean,
  availableFor: string,
  status: string,
  details: {
    projectName: string,
    bhk: number,
    carpetArea: string,
    superBuiltUpArea: string,
    ageInYears: number,
    furnishingStatus: string,
    readyToMoveIn: boolean,
    maintenancePricePerMonth: number
  },
  areaId: number,
  categoryId: number,
  amenities: [
    {
      amenityId: number,
      value: string
    }
  ],
  purchaseInfo: {
    amount: number,
    brokerageChargeType: string,
    brokerageChargeTypeValue: number,
    brokerageChargeAmount: number
  },
  rentInfo: {
    amount: number,
    brokerageChargeType: string,
    brokerageChargeTypeValue: number,
    brokerageChargeAmount: number
  },
  nearbyPlaces: [
    {
      nearbyPlaceTypeId: number,
      placeName: string
    }
  ]
}
export interface Response {
  status: number
  message?: string
  token?: string
  data?: any
  errors?: any
}

export interface Credentials {
  email: string
  password: string
  firebaseToken: string
}

export interface AmenityData {
  id: string
  details: Amenity
}
export interface AreaData {
  id: string
  details: Area
}
export interface NearByPlaceData {
  id: string
  name: string
}
export interface PropertyCategoryData {
  id: string
  details: PropertyCategory
}

export interface deleteDataFromTable {
  id: string
  modelName: string
  arrayList:Array<string>
}
