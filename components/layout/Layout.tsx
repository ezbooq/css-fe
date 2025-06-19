import Image from "next/image";
import PhotoViewer from "../photoViewer/PhotoViewer";
import Logo from "@/public/Logo.png";
const data = {
  logoUrl:
    "data:image/png;base64,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",
  logoPlace: "left",
  heroImages: [
    {
      name: "hero1.jpg",
      key: "hero1",
      contentType: "image/jpeg",
      size: 123456,
      url: "https://t3.ftcdn.net/jpg/05/98/53/78/360_F_598537894_u2At4hyQomwUvrgBsGq1wwbjJmdl6nQg.jpg",
    },
    {
      name: "hero2.png",
      key: "hero2",
      contentType: "image/png",
      size: 654321,
      url: "https://img.freepik.com/free-photo/car-wash-detailing-station_1303-22307.jpg?semt=ais_hybrid&w=740",
    },
    {
      name: "hero2.png",
      key: "hero2",
      contentType: "image/png",
      size: 654321,
      url: "https://www.constantcontact.com/blog/wp-content/uploads/2021/01/Social-1-14.jpg",
    },
  ],
};
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="min-h-screen flex flex-col mx-auto">
        <div
          className={`flex items-center p-4 ${
            data.logoPlace === "left" ? "flex-row" : "flex-row-reverse"
          } justify-between`}
        >
          <Image
            src={data.logoUrl}
            width={0}
            height={80}
            alt="Picture of the author"
            style={{ width: "auto", height: "80px" }}
          />
        </div>
        {data.heroImages.length > 0 && (
          <div className="w-full">
            <PhotoViewer
              images={data.heroImages.map((im) => im.url)}
              aspectRatio="1440 / 560"
            />
          </div>
        )}
        <main>{children}</main>
        <footer className="mt-auto flex items-center gap-2 p-4">
          <span className="text-[10px]">Powered By</span>
          <Image
            src={Logo}
            width={0}
            height={50}
            alt="Picture of the author"
            style={{ width: "auto", height: "50px" }}
          />
        </footer>
      </div>
    </>
  );
}
