import {Card} from "@/components/ui/Card";
import {FC} from "react";
import {Text, View} from "react-native";

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

export const UserCard: FC<UserCardProps> = ({name, email, address, phoneNumber, website, company}) => {
    return <Card>
        <View>
            <Text>{name}</Text>
            <Text>{email}</Text>
            <Text>{address.street + " " + address.suite + " " + address.city + " " + address.zipcode + " " + address.geo?.lat + " " + address.geo?.lng}</Text>
            <Text>{phoneNumber}</Text>
            <Text>{website}</Text>
            <Text>{company.name + " " + company.catchphrase + " " + company.bs}</Text>

        </View>
    </Card>
}