import React from "react"

import "../styles/components/loading-overlay.scss"

const LoadingOverlay = ({isLoading}) => (
    <div className={`loading-overlay ${isLoading && "loading-overlay--active"}`}>
        <div class="loading-overlay--spinner"><div></div><div></div><div></div><div></div></div>
    </div>
)


export default LoadingOverlay;