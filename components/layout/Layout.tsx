import Image from "next/image";
import PhotoViewer from "../photoViewer/PhotoViewer";
import Logo from "@/public/Logo.png";
import { ReactNode } from "react";
import { FileItem } from "@/types/file";
import logo from "../../public/Logo.png";
type LayoutData = {
  logos?: string | null;
  logoPlacement?: 0 | 1;
  bannerImages?: FileItem[];
  fontColor?: string;
  bgColor?: string;
  buttonColor?: string;
  fontFamily?: string;
};

type LayoutProps = {
  children: ReactNode;
  data: LayoutData;
};

export default function Layout({ children, data }: LayoutProps) {
  return (
    <>
      <div
        className={`min-h-screen flex flex-col mx-auto`}
        style={
          {
            "--color-typography-basic": data?.fontColor ?? undefined,
            "--color-button-dark": data?.buttonColor ?? undefined,
            backgroundColor: data?.bgColor ?? undefined,
            color: data?.fontColor ?? undefined,
            fontFamily: data?.fontFamily ?? undefined,
          } as React.CSSProperties
        }
      >
        <div
          className={`flex items-center p-4 ${
            data?.logoPlacement === 0 ? "flex-row" : "flex-row-reverse"
          } justify-between`}
        >
          <Image
            src={data?.logos ?? logo}
            width={160}
            height={80}
            alt="Business Logo"
            className="object-contain"
          />
        </div>
        {data?.bannerImages && data?.bannerImages.length > 0 && (
          <div className="w-full">
            <PhotoViewer
              images={data.bannerImages.map((im) => im.url)}
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
