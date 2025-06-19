import Image from "next/image";

export default function Home() {
  // Redirect to /[business-code] (for example, to /demo)
  if (typeof window !== "undefined") {
    window.location.replace("/demo"); // Change 'demo' to your default business code
    return null;
  }
  return null;
}
