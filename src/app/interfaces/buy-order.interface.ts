const DATA_PACKAGE_TYPE_OPTIONS = ["Device Location", "Device Behavior", "ID Mapping"];

interface BuyOrder {
  name: string,
  uid: string,
  maxBidPrice: number,
  dataPackageType: "Device Location" | "Device Behavior" | "ID Mapping"
}

export {
  DATA_PACKAGE_TYPE_OPTIONS,
  BuyOrder
}
