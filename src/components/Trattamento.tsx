type PropsItem = {
  item: string;
};

export default function Trattamento({ item }: PropsItem) {
  return (
    <>
      <div className="flex mt-[12px]">
        <div className="text-start">{item}</div>
        <span className="line"></span>
      </div>
    </>
  );
}
