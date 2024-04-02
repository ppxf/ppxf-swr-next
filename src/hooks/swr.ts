"use client"

import { useCallback } from "react"
import useSWR from "swr"
import useSWRInfinite from "swr/infinite"
import useSWRMutation from "swr/mutation"

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const postFetcher = ({
  url,
  body,
}: {
  url: string
  body: Record<string | number | symbol, unknown>
}) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => res.json())

export const mutationFetcher = async (
  url: string,
  {
    arg,
  }: {
    arg: Record<string | number | symbol, unknown>
  }
) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => res.json())

export const useFetch = (url: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    fetcher,
    {
      // treat movie results as immutable
      keepPreviousData: true,
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 24 * 60 * 1000,
    }
  )

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export const useInfiniteFetch = (
  url: string,
  body: Record<string | number | symbol, unknown>
) => {
  const getKey = useCallback(
    (
      pageIndex: number,
      previousPageData: {
        data: Array<Record<string | number | symbol, unknown>>
      }
    ) => {
      if (previousPageData && !previousPageData.data) return null

      const mergeOptions = Object.assign(body!, {
        pageSize: pageIndex + 1,
      })

      return {
        url,
        body: mergeOptions,
      }
    },
    []
  )

  const {
    data: searchResults,
    error,
    size: pageSize,
    setSize: setPageSize,
    isLoading,
    isValidating,
  } = useSWRInfinite(getKey, postFetcher, {
    // treat movie results as immutable
    keepPreviousData: true,
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 24 * 60 * 1000,
  })

  return {
    searchResults,
    error,
    pageSize,
    setPageSize,
    isLoading,
    isValidating,
  }
}

export const useMutationFetch = (url: string) => {
  const { trigger, isMutating } = useSWRMutation(url, mutationFetcher)

  return {
    isMutating,
    trigger,
  }
}
