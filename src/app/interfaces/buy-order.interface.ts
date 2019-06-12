export interface BuyOrder {
  name: string,
  uid: string,
  maxBidPrice: number,
  dataPackageType: "Device Location" | "Device Behavior" | "ID Mapping";
}
