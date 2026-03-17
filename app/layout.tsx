import '@/app/ui/global.css';
import { shadowsIntoLightTwo, gluten, lusitana } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${shadowsIntoLightTwo.variable} ${gluten.variable} ${lusitana.variable} antialiased`}>{children}</body>
    </html>
  );
}
