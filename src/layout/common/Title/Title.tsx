export interface TitleProps {
  title: string;
  description: string;
}

export const Title = ({ title, description }: TitleProps) => {
  return (
    <div className="flex flex-col items-start gap-3 self-stretch bg-gray-100 px-[120px] py-10">
      <span className="text-24/heading/l text-gray-950">{title}</span>
      <span className="text-16/body/l text-gray-600">{description}</span>
    </div>
  );
};
