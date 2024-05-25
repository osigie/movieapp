import { CustomComponentProps } from "../interfaces";
import { mergeClassName } from "../utils";
import { Image } from "./image";

interface Props extends CustomComponentProps {
  imageSrc?: string;
  title?: string;
  onClick?: () => void;
}

export const Card = (props: Props) => {
  return (
    <>
      <div
        onClick={props.onClick}
        className={mergeClassName(
          "group mx-3 my-1.5 max-w-[150px]",
          props.className
        )}
      >
        <div
          className="
          h-[200px]
          relative
          rounded-lg overflow-hidden
      "
        >
          <Image src={props?.imageSrc}></Image>
        </div>
        <p className="mt-2 line-clamp-2 text-center text-sm">{props.title}</p>
        {props.children}
      </div>
    </>
  );
};
