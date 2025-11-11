import {Image} from 'expo-image';
import {Button, StyleSheet, Text} from 'react-native';

import {HelloWave} from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import {ThemedText} from '@/components/themed-text';
import {ThemedView} from '@/components/themed-view';
import {useQuery} from "@tanstack/react-query";
import {axiosClient} from '@/constants/axiosClient';
import {UserCard} from "@/components/ui/UserCard";

export default function HomeScreen() {
    const exampleQuery = useQuery({
        queryKey: ["example"], queryFn: async _ => {

            const result = await axiosClient().get("https://jsonplaceholder.typicode.com/users", {});
            await new Promise(res => setTimeout(() => res(true), 1500));
            // Note: Would handle network typings in a better way
            return result.data as {
                name: string;
                email: string;
                address: {
                    street?: string;
                    suite?: string;
                    city?: string;
                    zipcode?: string;
                    geo?: {
                        lat: number;
                        lng: number;
                    };
                };
                phone: string;
                website: string;
                company: {
                    name: string;
                    catchphrase: string;
                    bs: string;
                };
            }[];
        }
    })

    console.log(exampleQuery.isError + " " + exampleQuery.data)

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={"https://northernlifemagazine.co.uk/wp-content/uploads/bb-plugin/cache/Skipton-8-landscape-b4f757e8377bd79fcfa6f906475908bf-bnfey68k2qgz.jpg"}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Welcome!</ThemedText>
                <HelloWave/>
            </ThemedView>
            <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                textDecorationLine: 'underline',
                textDecorationColor: '#0062a8',
                textDecorationStyle: 'solid',
            }}>Users</Text>
            {/*<Button onPress={() => {*/}
            {/*}}*/}
            {/*        title={exampleQuery.isLoading ? "Loading" : exampleQuery?.data ? JSON.stringify(exampleQuery.data[0]) : "No data"}/>*/}

            {exampleQuery.isError || exampleQuery.data === undefined ? <>
                    <Text>Handle error</Text>
                </> :
                exampleQuery.data.map(user => {
                    return <UserCard name={user.name} email={user.email}
                                     address={user.address} phoneNumber={user.phone}
                                     website={user.website} company={user.company}/>
                })
            }
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: "100%",
        width: "100%",
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
