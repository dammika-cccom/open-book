import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  // Requirement #4: Cloudflare-compatible Gallery List
  // Since we cannot scan 'fs' on the edge, we list the filenames here.
  const images = [
    { src: "/images/gallery/home2.jpg", caption: "Dr. S. P. de Silva home at Kandy" },
    { src: "/images/gallery/home3.jpg", caption: "Dr. S. P. de Silva home at Kandy" },
    { src: "/images/gallery/home4.jpg", caption: "Dr. S. P. de Silva home at Kandy" },
    { src: "/images/gallery/home5.jpg", caption: "Dr. S. P. de Silva home at Kandy" },
    { src: "/images/gallery/home6.jpg", caption: "Dr. S. P. de Silva home at Kandy" },
    { src: "/images/gallery/home7.jpg", caption: "Dr. S. P. de Silva home at Kandy" },
    { src: "/images/gallery/home8.jpg", caption: "Dr. S. P. de Silva home at Kandy" },
    { src: "/images/gallery/home9.jpg", caption: "Dr. S. P. de Silva home at Kandy" },
    { src: "/images/gallery/the open book.jpg", caption: "The Open Book" }
  ];

  return NextResponse.json(images);
}