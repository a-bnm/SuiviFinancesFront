const TrHead = ({ className, children }) => {
    return (
        <tr className={`bg-[#4D35D6] text-white text-bold text-center rounded-t-md ${className}`}>
            {children}
        </tr>
    )
}


export default TrHead;