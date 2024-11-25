import { ReactNode } from "react";

interface IWrap {
    additional?: string;
    children?: ReactNode;
}

export const Wrapper: React.FC<IWrap> = ({ additional, children }) => {
    return (
        <div className={`flex flex-wrap mx-auto w-full h-fit ${additional}`}>
            {children}
        </div>
    )
}