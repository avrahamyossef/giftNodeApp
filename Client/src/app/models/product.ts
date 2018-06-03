export interface ProductModel {
    ProductId: number,
    Name: string,
    Description: string,
    Price: Number,
    Images: Object,
    Intersts: any[],
    Relationships: any[],
    Events: any[],
    Age: any[],
    StoreName: Number,
    CreatedDate: Date,
    StoreLocationLng: DoubleRange,
    StoreLocationLat: DoubleRange,
    StoreAddress: String,
    City: String,
    Phone: String,
    StoreHours: any[]
}