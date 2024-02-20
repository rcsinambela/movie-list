const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
};

const containerStarStyle = {
    display: "flex",
};

const textStyle = {
    lineHeight: "1",
    margin: "0",
};

const star = {
    width: "48px",
    height: "48px",
    display: "block",
    cursor: "pointer",
};

export default function StarRating({ max }) {
    return (
        <div style={containerStyle}>
            <div style={containerStarStyle}>
                {Array.from({ length: max }, (_, i) => (
                    // <span>{`Star${i + 1}`}</span>
                    <span>{"⭐"}</span>
                ))}
            </div>
            <p style={textStyle}>{`${max}`}</p>
        </div>
    );
}
