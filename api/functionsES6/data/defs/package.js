const packageDefs = `
type Event {
  carrier_occurred_at: String
  city_locality: String
  company_name: String
  country_code: String
  description: String
  event_code: String
  latitude: Float
  longitude: Float
  occurred_at: String
  postal_code: String
  signer: String
  state_province: String
}

type ShipEngineData {
  actual_delivery_date: String
  carrier_status_code: String
  carrier_status_description: String
  estimated_delivery_date: String
  exception_description: String
  ship_date: String
  status_code: String
  status_description: String
  tracking_number: String
  events: [Event]
}

type Package {
  key: String!

  # firebase user uuid
  # is grabbed in the middleware
  # we write this to every package record to query on later
  # userId: String!
  carrier: String
  tracking_code: String

  status: String
  # make a query for all "active" packages
  # not updated in the last ~1-2 hours
  # lastUpdated: Timestamp

  ship_engine: ShipEngineData
}

input PackageCreateInput {
  carrier: String!
  tracking_code: String!
}

input PackageUpdateInput {
  carrier: String!
  tracking_code: String!
}`;

export default packageDefs;
