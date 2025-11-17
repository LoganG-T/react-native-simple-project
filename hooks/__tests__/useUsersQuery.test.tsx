import * as axiosClient from "@/constants/axiosClient";
import { useUsersQuery } from "@/hooks/useUsersQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { waitFor } from "@testing-library/react-native";
import { AxiosInstance } from "axios";
import { renderHook } from "expo-router/testing-library";
import { ReactElement } from "react";

jest.mock("@/constants/axiosClient");

// Note: Update general network testing through axios to handle scenarios better - could use a library like `msw`
// Note: Refactor tests to remove duplication
// Note: Mock setTimeout so tests don't take real time

const wrapper = ({ children }: { children: ReactElement }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
    },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe("Hook: useUsersQuery", () => {
  it("should return data when return data is a valid type", async () => {
    const clientSpy = jest.spyOn(axiosClient, "axiosClient");
    clientSpy.mockImplementation(() => {
      return {
        get: () => {
          return Promise.resolve({ data: { Some: "Data" } });
        },
      } as unknown as AxiosInstance;
    });
    const { result } = renderHook(() => useUsersQuery(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toEqual(false), { timeout: 2000 });
    expect(result.current.data).toEqual({ Some: "Data" });
  });

  it("should return isLoading as true, then after some time isLoading as false when the request has loaded", async () => {
    const clientSpy = jest.spyOn(axiosClient, "axiosClient");
    clientSpy.mockImplementation(() => {
      return {
        get: () => {
          return Promise.resolve({ data: { Some: "Data" } });
        },
      } as unknown as AxiosInstance;
    });
    const { result } = renderHook(() => useUsersQuery(), {
      wrapper,
    });

    expect(result.current.isLoading).toEqual(true);

    await waitFor(() => expect(result.current.isLoading).toEqual(false), { timeout: 2000 });
    expect(result.current.data).toEqual({ Some: "Data" });
  });

  it("should return isError as false when network request returns data", async () => {
    const clientSpy = jest.spyOn(axiosClient, "axiosClient");
    clientSpy.mockImplementation(() => {
      return {
        get: () => {
          return Promise.resolve({ data: "content" });
        },
      } as unknown as AxiosInstance;
    });
    const { result } = renderHook(() => useUsersQuery(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toEqual(false), { timeout: 2000 });
    expect(result.current.isError).toEqual(false);
    expect(result.current.data).toEqual("content");
  });

  it("should return isError as true when network request returns data as undefined", async () => {
    const clientSpy = jest.spyOn(axiosClient, "axiosClient");
    clientSpy.mockImplementation(() => {
      return {
        get: () => {
          return Promise.resolve({ data: undefined });
        },
      } as unknown as AxiosInstance;
    });
    const { result } = renderHook(() => useUsersQuery(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toEqual(false), { timeout: 2000 });
    expect(result.current.isError).toEqual(true);
    expect(result.current.data).toEqual(undefined);
  });

  it("should return isError as true when the request returns with invalid data", async () => {
    const clientSpy = jest.spyOn(axiosClient, "axiosClient");
    clientSpy.mockImplementation(() => {
      return {
        get: () => {
          return Promise.reject({ status: 400, data: "Content" });
        },
      } as unknown as AxiosInstance;
    });
    const { result } = renderHook(() => useUsersQuery(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toEqual(false), { timeout: 2000 });
    expect(result.current.isError).toEqual(true);
    expect(result.current.data).toEqual(undefined);
  });
});
