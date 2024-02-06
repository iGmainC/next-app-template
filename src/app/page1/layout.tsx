

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <p>PageLayout</p>
        <div>{children}</div>
      </div>
  );
}
