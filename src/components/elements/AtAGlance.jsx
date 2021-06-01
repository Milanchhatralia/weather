const AtAGlance = (props) => {
    const {iconSrc, children} = props;
    return(
        
        <div className="weather-item">
            <img src={iconSrc} alt="" /> <span>{children}</span>
        </div>
    )
}

export default AtAGlance;