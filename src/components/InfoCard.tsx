import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const InfoCard = ({ icon, title, children, ...data }: Props) => {
  return (
    <Card className="rounded-2xl shadow-lg shadow-green-100/50 border-green-50 bg-white" {...data}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-3 text-gray-800">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            {icon}
          </div>
          <div className="font-bold text-xl">{title}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default InfoCard;
