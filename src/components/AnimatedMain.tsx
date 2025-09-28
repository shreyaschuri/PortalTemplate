
"use client"

import {motion} from "framer-motion";
import { ReactNode } from "react";

export default function AnimatedMain( {children}: {children: ReactNode}){
    return(

<motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 min-h-screen"
        >
          {children}
</motion.main>

    );
}

