import SanityClient from "@/sanity/client"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  await SanityClient.patch('00675708-865c-4187-88dd-de3bce751590').set({
    title: `${request.body}`,
  }).commit()
  .then((res: any) => res)
  .catch((err: any) => err)
  return NextResponse.json({ message: 'Hello world!' })
}