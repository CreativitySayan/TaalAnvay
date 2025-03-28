import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.BACKEND_API_URL || "http://localhost:5000/api"

export async function POST(request: NextRequest) {
  try {
    const { endpoint, data } = await request.json()

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("API proxy error:", error)
    return NextResponse.json({ error: "Failed to communicate with backend API" }, { status: 500 })
  }
}

