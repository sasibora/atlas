"use client"

import { motion, MotionProps } from "framer-motion"

interface MotionDivProps extends MotionProps {
    children?: React.ReactNode
    className?: string
}

export const MotionDiv = ({ children, className, ...props }: MotionDivProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}
