import SanityClient from "@/sanity/client"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const response = await request.text()
  await SanityClient.patch('00675708-865c-4187-88dd-de3bce751590').set({
    title: `${response}`,
  }).commit()
  return NextResponse.json({ message: 'Hello world!' })
}