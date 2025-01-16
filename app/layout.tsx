import { ReactNode } from "react";
import "@/styles/tailwind.css";

type Props = {
    children: ReactNode;
  };

export default function RootLayout({children}: Props) {
    return children;
  }