"use client";
import Icon from "../Icon/Icon";

interface ErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => {
  return (
    <div className="flex items-center justify-start mt-1 text-caption textColor-danger">
      {/* 여기에 Icon 컴포넌트 또는 오류 아이콘 SVG/이미지를 사용 */}
      <Icon name="Error" width={12} height={12} />
      <span className="ml-2">{errorMessage}</span>
    </div>
  );
};

export default ErrorMessage;
