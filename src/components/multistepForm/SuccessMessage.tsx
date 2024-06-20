import Image from "next/image";
import { motion } from "framer-motion";
import { LuRefreshCcw } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import successIcon from "@/public/img/success.png";

const successVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "backIn",
      duration: 0.6,
    },
  },
};

const SuccessMessage = () => {
  const refresh = () => window.location.reload();
  return (
    <motion.section
      className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-2 text-center"
      variants={successVariants}
      initial="hidden"
      animate="visible"
    >
      <Image
        src={successIcon}
        width="150"
        height="150"
        alt="Success Icon"
        className="md:mb-4"
      />
      <h4 className="text-2xl font-semibold md:text-3xl">
        Property Added!
      </h4>
      <div className="flex items-center mt-6">
        <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
          <Button
            onClick={refresh}
            variant="secondary"
          >
            <LuRefreshCcw className="mr-2 h-4 w-4" /> Add another property
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default SuccessMessage;
