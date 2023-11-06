export const SolidButton = ({ children, onClick, type, disabled }: any) => {
  return (
    <button
      className="font-sora font-semibold text-[13px] md:text-[16px] text-[white] py-2 md:py-4 px-3 md:px-6 rounded-[8px] md:rounded-[12px] flex items-center justify-center bg-gradient-to-r from-primary1 to-primary2 shadow-[-4px_-4px_4px_0px_#0000001A_inset]  cursor-pointer"
      type={type}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
};

export const OutlinedButton = ({ children, onClick, type, disabled }: any) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className="font-sora font-semibold text-[13px] md:text-[16px] text-textGray py-2 md:py-4 px-3 md:px-6 rounded-[8px] md:rounded-[12px] flex items-center justify-center bg-transparent border-[2px] border-solid border-textGray cursor-pointer">
      {children}
    </button>
  );
};

export const SolidGrayButton = ({ children, onClick, type, disabled }: any) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className="font-sora font-semibold text-[13px] md:text-[16px] text-[white] py-2 md:py-4 px-3 md:px-6 rounded-[8px] md:rounded-[12px] flex items-center justify-center bg-textGray shadow-[-4px_-4px_4px_0px_#0000001A_inset]  cursor-pointer">
      {children}
    </button>
  );
};

export const SolidPurpleGradientButton = ({
  children,
  onClick,
  type,
  disabled,
  width,
}: any) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`font-sora font-semibold text-[13px] md:text-[16px] text-[white] py-2 md:py-4 px-3 md:px-6 rounded-[8px] md:rounded-[12px] flex items-center justify-center bg-gradient-to-tl from-[#A01AEC] via-[#CB527D] to-[#DF9361] shadow-[-4px_-4px_4px_0px_#0000001A_inset]  w-[${
        width ? width : "fit"
      }]`}
      style={{ width: width ? width : "fit-content" }}>
      {children}
    </button>
  );
};

export const SolidOrangeButton = ({
  children,
  onClick,
  type,
  disabled,
}: any) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className="font-sora font-semibold text-[13px] md:text-[16px] text-[white] py-2 md:py-4 px-3 md:px-6 rounded-[8px] md:rounded-[12px] flex items-center justify-center bg-[#ec4352] shadow-[-4px_-4px_4px_0px_#0000001A_inset]  cursor-pointer">
      {children}
    </button>
  );
};

export const SolidYellowButton = ({
  children,
  onClick,
  type,
  disabled,
}: any) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className="font-sora font-semibold text-[13px] md:text-[16px] text-[white] py-2 md:py-4 px-3 md:px-6 rounded-[8px] md:rounded-[12px] flex items-center justify-center bg-[#f2a148] shadow-[-4px_-4px_4px_0px_#0000001A_inset]  cursor-pointer">
      {children}
    </button>
  );
};
