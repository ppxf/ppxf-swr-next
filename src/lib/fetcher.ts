export const postFetcher = ({
  url,
  body,
}: {
  url: string
  body: Record<string | number | symbol, unknown>
  key?: string
}) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => res.json())
