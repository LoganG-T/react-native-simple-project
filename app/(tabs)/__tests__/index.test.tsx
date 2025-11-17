import HomeScreen from "@/app/(tabs)";
import * as axiosClient from "@/constants/axiosClient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { userEvent } from "@testing-library/react-native";
import { AxiosInstance } from "axios";
import { renderRouter } from "expo-router/testing-library";

jest.mock("@/constants/axiosClient");

const renderHomeScreen = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
    },
  });
  const screen = renderRouter({
    index: jest.fn(() => (
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>
    )),
  });
  return screen;
};
const clientSpy = jest.spyOn(axiosClient, "axiosClient");

// Note: No tests written for post comments

describe("Screen: HomeScreen", () => {
  beforeAll(() => {
    clientSpy.mockImplementation(() => {
      return {
        get: (url: string) => {
          if (url.includes("/users")) {
            return Promise.resolve({
              data: [
                {
                  id: 1,
                  name: "Leanne Graham",
                  username: "Bret",
                  email: "Sincere@april.biz",
                  address: {
                    street: "Kulas Light",
                    suite: "Apt. 556",
                    city: "Gwenborough",
                    zipcode: "92998-3874",
                    geo: {
                      lat: "-37.3159",
                      lng: "81.1496",
                    },
                  },
                  phone: "1-770-736-8031 x56442",
                  website: "hildegard.org",
                  company: {
                    name: "Romaguera-Crona",
                    catchPhrase: "Multi-layered client-server neural-net",
                    bs: "harness real-time e-markets",
                  },
                },
              ],
            });
          }
          if (url.includes("/posts")) {
            return Promise.resolve({
              data: [
                {
                  userId: 1,
                  id: 1,
                  title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                  body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
                },
              ],
            });
          }
        },
      } as unknown as AxiosInstance;
    });
  });

  it("Should wait for network call", async () => {
    const { getByText, findByText } = renderHomeScreen();

    getByText("Display loading component");

    await findByText(/Leanne Graham/u, undefined, { timeout: 3000 });
  });

  it("Should render the users button", async () => {
    const { getByText, findByText } = renderHomeScreen();

    getByText("Display loading component");
    await findByText(/Leanne Graham/u, undefined, { timeout: 3000 });

    getByText("Users");
  });

  it("Should render the posts button", async () => {
    const { getByText, findByText } = renderHomeScreen();

    getByText("Display loading component");
    await findByText(/Leanne Graham/u, undefined, { timeout: 3000 });

    getByText("Posts");
  });

  it("Should display the user details after pressing a user card", async () => {
    const { getByText, findByText, queryByText } = renderHomeScreen();

    getByText("Display loading component");
    await findByText(/Leanne Graham/u, undefined, { timeout: 3000 });
    expect(queryByText("Sincere@april.biz")).toBeNull();

    const userCard = getByText(/Leanne Graham/u);

    await userEvent.press(userCard);

    await findByText("Sincere@april.biz");
  });

  it("Should display the posts after pressing the posts button", async () => {
    const { getByText, findByText, queryByText } = renderHomeScreen();

    getByText("Display loading component");
    await findByText(/Leanne Graham/u, undefined, { timeout: 3000 });
    getByText(/Romaguera-Crona/u);
    expect(queryByText(/sunt aut facere repellat/u)).toBeNull();

    const postButton = getByText(/Posts/u);

    await userEvent.press(postButton);

    await findByText(/sunt aut facere repellat/u);
    expect(queryByText("Romaguera-Crona")).toBeNull();
  });

  it("Should handle error state for user query", async () => {
    clientSpy.mockImplementation(() => {
      return {
        get: () => {
          return Promise.reject(new Error("Network error"));
        },
      } as unknown as AxiosInstance;
    });
    const { getByText, findByText } = renderHomeScreen();

    getByText("Display loading component");

    await findByText(/Handle error/u, undefined, { timeout: 3000 });
  });
});
