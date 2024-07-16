import { IoIosAdd } from "react-icons/io";

export const AddTaskButton = () => {
  return (
    <button className="rounded-full size-20 flex items-center justify-center bg-grey-primary absolute -bottom-[4rem] left-1/2 -translate-x-1/2">
      <IoIosAdd className="text-red size-14" />
    </button>
  );
};
