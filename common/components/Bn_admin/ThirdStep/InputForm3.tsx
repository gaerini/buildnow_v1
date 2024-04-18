import { NoItem } from "../../Icon/svgs";
import InputStyleBtn from "../../InputForm/InputStyleBtn";

interface InputFieldProps {
  index: number;
  item: any;
  checkboxState: any;
  handleCheckboxChange: (key: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  index,
  item,
  checkboxState,
  handleCheckboxChange,
}) => {
  return (
    <div className="inline-flex items-center gap-4">
      <div className="flex flex-col gap-2 justify-start">
        <div className="inline-flex items-center">
          <p className="w-[64px] flex whitespace-nowrap">년도</p>
          <div className="mx-2 w-[250px]">
            <InputStyleBtn value={"2023년도"} isButton={false} />
          </div>
        </div>
        <div className="inline-flex items-center">
          <p className="w-[64px] flex whitespace-nowrap">시평액</p>
          <div className="mx-2 w-[250px]">
            <InputStyleBtn value={item.totalCapacityValue} isButton={false} />
          </div>
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          className={`form-checkbox w-5 h-5 border-gray-300 focus:ring-0 rounded text-green-500 ${
            checkboxState ? "bg-green-500" : "bg-white"
          }`}
          onChange={() => handleCheckboxChange(`시평액유효성${index}`)}
        />
      </div>
    </div>
  );
};

export default InputField;
