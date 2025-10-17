// server/api/flights/list.post.ts
import { defineEventHandler, readBody, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const res = await $fetch('https://marcopro.co/api/flights/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body,
            // timeout: 20000, // در صورت نیاز
        })
        return res
    } catch (err: any) {
        const status = err?.response?.status || 500
        setResponseStatus(event, status)
        return {
            success: false,
            message: err?.response?._data || err?.data || err?.message || 'Request failed'
        }
    }
})