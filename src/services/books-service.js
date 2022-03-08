const KEY = "AIzaSyDLGWr8QxRhT2MRpVrceFzgmHPCEuNl6vI";

export const list = async (query, page = 1, pageSize = 12) => {
    const params = [`q=${encodeURIComponent(query)}`, `maxResults=${pageSize}`, `key=${KEY}`]

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${params.join("&")}`)

    if (!response.ok) throw new Error("Something went wrong")

    return await response.json()
}

export default {
    list
}