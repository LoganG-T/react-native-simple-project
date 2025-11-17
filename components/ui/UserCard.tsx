import { Card } from "@/components/ui/Card";
import { FC, useState } from "react";
import { Text, View } from "react-native";

interface GeoCoordinate {
  lat: number;
  lng: number;
}

interface Address {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  geo?: GeoCoordinate;
}

interface Company {
  name: string;
  catchphrase: string;
  bs: string;
}

export interface UserCardProps {
  name: string;
  email: string;
  address: Address;
  phoneNumber: string;
  website: string;
  company: Company;
}

// Note: Accessibility - large card not split by grouping.

export const UserCard: FC<UserCardProps> = ({ name, email, address, phoneNumber, website, company }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Card
      onPress={() => {
        setCollapsed(!collapsed);
      }}
    >
      <View>
        <Text>{name}</Text>
        <View style={{ marginVertical: 8 }}>
          {company.name && <Text>{company.name}</Text>}
          {company?.catchphrase && <Text>{company.catchphrase}</Text>}
          {company.bs && <Text>{company.bs}</Text>}
        </View>
        {collapsed ? (
          <></>
        ) : (
          <>
            <View style={{ padding: 4 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <Text>Email:</Text>
                <Text>{email}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <Text>Phone:</Text>
                <Text>{phoneNumber}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <Text>Url:</Text>
                <Text
                  onLongPress={() => {
                    console.log("Copy to clipboard");
                  }}
                >
                  {website}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                marginTop: 8,
                padding: 4,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <Text>Address:</Text>
                <Text>{address.street}</Text>
              </View>
              <Text>{address.suite}</Text>
              <Text>{address.city}</Text>
              <Text>{address.zipcode}</Text>
              <Text>{address.geo?.lat + " " + address.geo?.lng}</Text>
            </View>
          </>
        )}
      </View>
    </Card>
  );
};
