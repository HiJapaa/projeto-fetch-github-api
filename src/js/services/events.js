import { baseUrl, eventsQuantity, sort } from "../variables.js";

async function getEvents(userName) {
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${eventsQuantity}&sort=${sort}`)
    return await response.json()
}

export { getEvents }