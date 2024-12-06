// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function page({ params: { id } }: { params: { id: string } }) {
  return (
    <div className="min-h-[calc(100vh-88px)] pt-[calc(72px+4rem)] pb-[4rem] flex flex-col items-center justify-center">
      {id}
    </div>
  );
}
