import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
export const runtime = "edge";

export async function GET() {
  try {
    const galleryPath = path.join(process.cwd(), "public/images/gallery");
    
    // Ensure folder exists to prevent crashing
    if (!fs.existsSync(galleryPath)) {
      console.warn("⚠️ Gallery folder not found at:", galleryPath);
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(galleryPath);
    
    // filter for images and map to clean data
    const images = files
      .filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file))
      .map(file => {
        // Create a pretty caption from filename
        const caption = file
          .replace(/\.[^/.]+$/, "") 
          .replace(/[_-]/g, " ")     
          .replace(/\b\w/g, l => l.toUpperCase()); 
          
        return {
          src: `/images/gallery/${file}`,
          caption: caption
        };
      });

    return NextResponse.json(images);
  } catch (error) {
    // FIX: Logging the error satisfies the linter and helps with debugging
    console.error("Critical Gallery API Error:", error);
    return NextResponse.json(
      { error: "Failed to scan gallery directory" }, 
      { status: 500 }
    );
  }
}