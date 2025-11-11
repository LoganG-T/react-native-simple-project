import HomeScreen from '@/app/(tabs)'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {act, renderRouter} from "expo-router/testing-library";
import {beforeEach} from "node:test";
import * as axiosClient from "@/constants/axiosClient";
import {AxiosInstance} from "axios";

jest.mock('@/constants/axiosClient')

const renderHomeScreen = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                gcTime: Infinity
            }
        }
    });
    const screen = renderRouter({
        index: jest.fn(() => <QueryClientProvider client={queryClient}><HomeScreen/></QueryClientProvider>)
    })
    return screen;
}
const clientSpy = jest.spyOn(axiosClient, 'axiosClient');

describe("Screen: HomeScreen", () => {

    beforeAll(() => {
        clientSpy.mockImplementation(() => {
            console.log("Create call")
            return {
                get: () => {
                    return Promise.resolve({data: {"Some": "Data"}})
                }
            } as unknown as AxiosInstance
        })
    })

    beforeEach(() => {
        console.log("Before each")
        //
        // axiosClient.axiosClient.mockImplementation(() => {
        //     console.log("Create call")
        //     return () => ({
        //         get: () => {
        //             return Promise.resolve({data: {"Some": "Data"}})
        //         }
        //     })
        // })
    })

    it("should", async () => {
        const x = axiosClient.axiosClient();
        console.log(JSON.stringify(x))
        await x.get('foo')
        expect(clientSpy).toHaveBeenCalledTimes(1);
    })

    it("Should render the welcome text", () => {
        const {getByText} = renderHomeScreen()

        getByText("Welcome!");
    })

    it("Should wait for network call", async () => {
        const {getByText, findByText} = renderHomeScreen()

        getByText("Loading");

        await findByText(/Some/u, undefined, {timeout: 3000})
    })

    it.only("Should handle error state for user query", async () => {
        clientSpy.mockImplementation(() => {
            return {
                get: () => {
                    return Promise.reject(new Error("Network error"))
                }
            } as unknown as AxiosInstance
        })
        const {getByText, findByText} = renderHomeScreen()

        getByText("Loading");

        await findByText(/Handle error/u, undefined, {timeout: 3000})
    })
})