import { handlers } from "@/auth" // Referring to your src/auth.ts
export const runtime = "edge";
export const { GET, POST } = handlers