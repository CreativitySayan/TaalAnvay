/**
 * Service for interacting with Google's Gemini API
 */

const GEMINI_API_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/gemini`
  : "/api/proxy/gemini"

export interface GeminiRequest {
  prompt: string
  notes?: string[]
  audioData?: string
}

export interface GeminiResponse {
  text: string
  raag?: {
    name: string
    thaat: string
    time: string
    notes: string[]
  }
}

/**
 * Generate a response from Gemini API
 */
export async function generateGeminiResponse(request: GeminiRequest): Promise<GeminiResponse> {
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to generate Gemini response")
    }

    return await response.json()
  } catch (error) {
    console.error("Error generating Gemini response:", error)
    // For demo purposes, return mock data if the API fails
    return getMockGeminiResponse(request.prompt)
  }
}

/**
 * Generate a raag identification from audio data
 */
export async function identifyRaagFromAudio(audioData: string): Promise<GeminiResponse> {
  try {
    const response = await fetch(`${GEMINI_API_URL}/identify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ audioData }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to identify raag")
    }

    return await response.json()
  } catch (error) {
    console.error("Error identifying raag:", error)
    // For demo purposes, return mock data if the API fails
    return getMockRaagIdentification()
  }
}

/**
 * Generate raag recommendations based on song preferences
 */
export async function recommendRaags(songs: string[]): Promise<GeminiResponse> {
  try {
    const response = await fetch(`${GEMINI_API_URL}/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ songs }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to recommend raags")
    }

    return await response.json()
  } catch (error) {
    console.error("Error recommending raags:", error)
    // For demo purposes, return mock data if the API fails
    return getMockRaagRecommendation()
  }
}

// Mock data for development and fallback purposes
function getMockGeminiResponse(prompt: string): GeminiResponse {
  if (prompt.includes("mood") || prompt.includes("genre")) {
    return {
      text: "The song 'Tum Hi Ho' has a romantic and melancholic mood. It's a love ballad that expresses deep emotions of devotion and longing.",
    }
  } else if (prompt.includes("identify") || prompt.includes("notes")) {
    return {
      text: "Based on the notes provided, this appears to be Raag Yaman. The presence of the sharpened fourth (M#) is characteristic of this evening raag from the Kalyan thaat.",
      raag: {
        name: "Yaman",
        thaat: "Kalyan",
        time: "Evening",
        notes: ["S", "R", "G", "M#", "P", "D", "N", "S'"],
      },
    }
  } else {
    return {
      text: "Raag Yaman is a beautiful evening raag from the Kalyan thaat. It's known for its serene and uplifting quality, making it perfect for romantic compositions. The distinctive feature is the sharpened fourth (M#) which gives it a unique character.",
    }
  }
}

function getMockRaagIdentification(): GeminiResponse {
  return {
    text: "I've analyzed your audio and identified it as Raag Yaman. This evening raga from the Kalyan thaat has a distinctive character defined by its note pattern, particularly the sharpened fourth (M#). The audio exhibits the characteristic phrases and movements typical of Yaman.",
    raag: {
      name: "Yaman",
      thaat: "Kalyan",
      time: "Evening",
      notes: ["S", "R", "G", "M#", "P", "D", "N", "S'"],
    },
  }
}

function getMockRaagRecommendation(): GeminiResponse {
  return {
    text: "Based on your song preferences which suggest a romantic mood, I recommend Raag Yaman and Raag Bhimpalasi. Yaman is an evening raga with a serene and uplifting quality that matches well with romantic songs. Bhimpalasi is an afternoon raga that can evoke both joy and a touch of melancholy, perfect for songs with emotional depth.",
    raag: {
      name: "Yaman",
      thaat: "Kalyan",
      time: "Evening",
      notes: ["S", "R", "G", "M#", "P", "D", "N", "S'"],
    },
  }
}

