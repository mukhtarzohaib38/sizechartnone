
export const SpacingBetween = ({ children }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "10px",
            }}
        >
            {children}
        </div>
    );
};

export const AppFooter = () => {
    return (
        <div className="app-footer"><span className="app-releasit-copyright">© AI-Powered Gift Finder 2025</span></div>
    );
};
