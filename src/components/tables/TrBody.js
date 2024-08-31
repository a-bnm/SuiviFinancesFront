const TrBody = ({ className, children }) => {
    return (
        <tr className={`text-center ${className}`} >
            {children}
        </tr>
    )
}
export default TrBody