import { any, z } from "zod"

export const propertySchema = z.object({
  name: z.string(),
  address: z.string(),
  isFeatured: z.boolean(),
  availableFor: z.string(),
  status: z.string(),
  details: z.object({
    projectName: z.string(),
    bhk: z.number(),
    carpetArea: z.string(),
    superBuiltUpArea: z.string(),
    ageInYears: z.number(),
    furnishingStatus: z.string(),
    readyToMoveIn: z.boolean(),
    maintenancePricePerMonth: z.number(),
  }),
  areaId: z.number(),
  categoryId: z.number(),
  amenities: z.array(
    z.object({
      amenityId: z.number(),
      value: z.string(),
    })
  ),
  purchaseInfo: z.optional(
    z.object({
      amount: z.number(),
      brokerageChargeType: z.string(),
      brokerageChargeTypeValue: z.number(),
      brokerageChargeAmount: z.number(),
    })
  ),
  rentInfo: z.optional(
    z.object({
      amount: z.number(),
      brokerageChargeType: z.string(),
      brokerageChargeTypeValue: z.number(),
      brokerageChargeAmount: z.number(),
    })
  ),
  nearbyPlaces: z.array(
    z.object({
      nearbyPlaceTypeId: z.number(),
      placeName: z.string(),
    })
  ),
})

export const getAllpropertySchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  isFeatured: z.boolean(),
  availableFor: z.string(),
  status: z.string(),
  category: z.object({
    id: z.number(),
    name: z.string(),
    parentCategoryId: z.number(),
  }),
  area: z.object({
    id: z.number(),
    name: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z.string(),
    managedByBrokerUsers: z.array(z.any()),
  }),
  details: z.object({
    projectName: z.string(),
    bhk: z.number(),
    carpetArea: z.string(),
    superBuiltUpArea: z.string(),
    ageInYears: z.number(),
    furnishingStatus: z.string(),
    readyToMoveIn: z.boolean(),
    maintenancePricePerMonth: z.number(),
  }),
  brokerUser: z.object({
    id: z.number(),
    fullName: z.string(),
  }),
  amenities: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      iconName: z.string(),
      value: z.string(),
    })
  ),
  nearbyPlaces: z.array(
    z.object({
      id: z.number(),
      typeName: z.string(),
      placeName: z.string(),
    })
  ),
  purchaseInfo: z.object({
    amount: z.number(),
    brokerageChargeType: z.string(),
    brokerageChargeTypeValue: z.number(),
    brokerageChargeAmount: z.number(),
  }),
  rentInfo: z.optional(
    z.object({
      amount: z.number(),
      brokerageChargeType: z.string(),
      brokerageChargeTypeValue: z.number(),
      brokerageChargeAmount: z.number(),
    })
  ),
  media: z.array(
    z.object({
      id: z.number(),
      fileName: z.string(),
      type: z.string(),
    })
  ),
})
export const areaSchema = z.object({
  id: z.optional(z.number()),
  name: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  managedByBroker: z.number(),
  managedByBrokerUserIds: z.string().array(),
  managedByBrokerUsers:z.optional(z.string().array())
})
export const getAllareaSchema = z.object({
  id: z.number(),
  name: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  managedByBrokerUsers: z.array(
    z.object({
      id: z.number(),
      fullName: z.string(),
    })
  ),
})

export const addBrokerAreaSchema = z.object({
  id: z.string(),
  brokerUserIds: z.string().array(),
})

export const brokerDetailsSchema = z.object({
  id: z.number(),
  fullName: z.string(),
})

export const brokerSchema = z.object({
  userId: z.optional(z.string()),
  fullName: z.string(),
  password: z.optional(z.string()),
  email: z.optional(z.string()),
})
export const getBrokerByAreaSchema = z.object({
  userId: z.number(),
  fullName: z.string(),
})
export const amenitySchema = z.object({
  id: z.number(),
  name: z.string(),
  iconName: z.string(),
})
export const propertyMediaSchema = z.object({
  id: z.number(),
  fileName: z.string(),
  type: z.string(),
})
export const propertyCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  parentCategoryId: z.optional(z.number()),
})
export const nearbyPlaceTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
})
export const propertyNearbyPlaceTypeSchema = z.object({
  nearbyPlaceTypeId: z.number(),
  placeName: z.string(),
})

export const updatePropertyBasicInfoSchema = z.object({
  id: z.string(),
  details: z.object({
    name: z.string(),
    address: z.string(),
    isFeatured: z.boolean(),
    availableFor: z.string(),
    status: z.string(),
    category: z.number(),
  }),
})
export const updatePropertyDetailsSchema = z.object({
  id: z.string(),
  details: z.object({
    projectName: z.string(),
    bhk: z.number(),
    carpetArea: z.string(),
    superBuiltUpArea: z.string(),
    ageInYears: z.number(),
    furnishingStatus: z.string(),
    readyToMoveIn: z.boolean(),
    maintenancePricePerMonth: z.number(),
  }),
})

export const updatePropertyAmenitySchema = z.object({
  propertyId: z.number(),
  amenityId: z.number(),
  value: z.optional(z.string()),
})

export const updatePropertyNearByPlaceSchema = z.object({
  propertyId: z.number(),
  nearbyPlaceTypeId: z.number(),
  placeName: z.string(),
})

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  hasChildren: z.boolean(),
  children: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      hasChildren: z.boolean(),
      children: any(),
    })
  ),
})

export type Property = z.infer<typeof propertySchema>
export type Area = z.infer<typeof areaSchema>
export type Broker = z.infer<typeof brokerSchema>
export type Amenity = z.infer<typeof amenitySchema>
export type PropertyMedia = z.infer<typeof propertyMediaSchema>
export type PropertyCategory = z.infer<typeof propertyCategorySchema>
export type NearbyPlaceType = z.infer<typeof nearbyPlaceTypeSchema>
export type Category = z.infer<typeof categorySchema>
export type BrokerDetails = z.infer<typeof brokerDetailsSchema>
export type AddBrokerArea = z.infer<typeof addBrokerAreaSchema>
export type PropertyNearbyPlaceType = z.infer<
  typeof propertyNearbyPlaceTypeSchema
>
export type GetPropertyCategorySchema = z.infer<typeof getAllpropertySchema>
export type GetBrokerByAreaSchema = z.infer<typeof getBrokerByAreaSchema>
export type GetAllArea = z.infer<typeof getAllareaSchema>
export type UpdatePropertyBasicInfo = z.infer<
  typeof updatePropertyBasicInfoSchema
>
export type UpdatePropertyDetials = z.infer<typeof updatePropertyDetailsSchema>
export type UpdatePropertyAmenity = z.infer<typeof updatePropertyAmenitySchema>
export type UpdatePropertyNearByPlace = z.infer<
  typeof updatePropertyNearByPlaceSchema
>
