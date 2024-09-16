const TrHead = ({ className, children }) => {
    return (
        <tr className={`bg-primary-75 text-white text-bold text-center rounded-t-md ${className}`}>
            {children}
        </tr>
    )
}


export default TrHead;