import Card from "@/app/components/bento/CardTemplate";
import Link from "@/components/ui/Link";
import { FaGithub } from "react-icons/fa";
import Halo from "@/components/ui/Halo";

export default function Instagram() {
  return (
    <Halo className="col-span-1 row-span-1">
      <Card className="col-span-1 flex aspect-square flex-col gap-1.5 p-4 md:p-6">
        <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-bl from-[#000000] via-[#000000] to-[#000000]">
          <FaGithub className="text-2xl text-white" />
        </div>
        <p className="text-secondary">GitHub</p>
        <p className="line-clamp-2">@krasnokutskiy</p>
        <Link
          className="mt-auto flex w-fit items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm no-underline hover:bg-tertiary"
          href="https://github.com/qakrasnokutskyi"
        >
          <span className="font-medium text-primary">Follow</span>
          <span className="text-tertiary">9</span>
        </Link>
      </Card>
    </Halo>
  );
}