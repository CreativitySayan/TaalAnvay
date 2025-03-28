const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// At the top of the file, add this console log to verify the API URL
console.log("API URL:", API_BASE_URL)
/**
 * API Service for communicating with the RaagAI backend
 */

export interface RaagGenerationResponse {
  name: string
  arohana: string[]
  avarohana: string[]
  description: string
}

export interface CustomRaagParams {
  mood: string
  time_of_day: string
  user_notes?: string[]
  thaat?: string
  num_notes?: number
  vakra?: boolean
  taal?: string
  bandish_prompt?: string
}

export interface CustomRaagResponse extends RaagGenerationResponse {
  thaat: string
  time: string
  mood: string
  pakad: string[]
  sargam: string[]
  bandish: {
    lyrics: string
    notations: string[]
  }
  alaap: string[]
  taal: {
    beats: number
    structure: string
  }
}

export interface ImprovisationResponse {
  raag: string
  thaat: string
  sequence: Array<{
    note: string
    duration: number
  }>
  description: string
}

/**
 * Generate a raag from an uploaded file
 */
export async function generateRaag(file: File, fileType: "audio" | "midi" | "text"): Promise<RaagGenerationResponse> {
  try {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("file_type", fileType)

    const response = await fetch(`${API_BASE_URL}/generate-raag`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to generate raag")
    }

    return await response.json()
  } catch (error) {
    console.error("Error generating raag:", error)
    // For demo purposes, return mock data if the API fails
    return getMockRaagGeneration()
  }
}

/**
 * Create a custom raag based on user preferences
 */
export async function createCustomRaag(params: CustomRaagParams): Promise<CustomRaagResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/custom-raag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to create custom raag")
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating custom raag:", error)
    // For demo purposes, return mock data if the API fails
    return getMockCustomRaag()
  }
}

/**
 * Generate an improvised response to audio input
 */
export async function generateImprovisation(audioData: string): Promise<ImprovisationResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/improvise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ audio_data: audioData }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to generate improvisation")
    }

    return await response.json()
  } catch (error) {
    console.error("Error generating improvisation:", error)
    // For demo purposes, return mock data if the API fails
    return getMockImprovisation()
  }
}

// Mock data for development and fallback purposes
function getMockRaagGeneration(): RaagGenerationResponse {
  return {
    name: "Pratah Kalyan",
    arohana: ["S", "R", "G", "M#", "P", "D", "N"],
    avarohana: ["N", "D", "P", "M#", "G", "R", "S"],
    description:
      "A serene morning raag that evokes the peaceful ambiance of dawn. It combines elements of Bhairav with a touch of tranquility, perfect for meditation and starting the day with calm reflection.",
  }
}

function getMockCustomRaag(): CustomRaagResponse {
  return {
    name: "Sanjh Malhar",
    arohana: ["S", "R", "G", "M#", "P", "D", "N"],
    avarohana: ["N", "D", "P", "M#", "G", "R", "S"],
    thaat: "Kalyan",
    time: "Evening",
    mood: "romantic",
    pakad: ["S", "R", "G", "S"],
    sargam: ["S", "R", "G", "M#", "P", "|", "P", "D", "N", "S'", "|", "S'", "N", "D", "P"],
    bandish: {
      lyrics: "Shyam Bina\nNahi Chain\nMuraliya Baja\nShyam Bina\nNahi Chain",
      notations: ["Shyam (S)", "Bina (R)", "Nahi (G)", "Chain (M#)", "Muraliya (P)", "Baja (D)"],
    },
    alaap: ["S-", "R", "G-", "M#", "|", "P", "D-", "N", "S'"],
    taal: {
      beats: 16,
      structure: "Dha Dhin Dhin Dha | Dha Dhin Dhin Dha | Dha Tin Tin Ta | Ta Dhin Dhin Dha",
    },
    description:
      "A melodious evening raag that captures the essence of twilight. With its romantic and slightly melancholic mood, it paints a musical picture of sunset clouds and the gentle transition from day to night.",
  }
}

function getMockImprovisation(): ImprovisationResponse {
  return {
    raag: "Yaman",
    thaat: "Kalyan",
    sequence: [
      { note: "S", duration: 1 },
      { note: "R", duration: 0.5 },
      { note: "G", duration: 1.5 },
      { note: "M#", duration: 1 },
      { note: "P", duration: 2 },
      { note: "D", duration: 1 },
      { note: "N", duration: 0.5 },
      { note: "S'", duration: 2 },
    ],
    description:
      "A responsive improvisation in Raag Yaman, following the traditional structure while adding creative embellishments. The phrases build gradually, starting with a gentle exploration of the lower octave before ascending to the middle and upper registers with increasing intensity.",
  }
}

