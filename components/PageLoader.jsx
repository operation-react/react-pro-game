export default function PageLoader(props) {
    return (
        <div className="page-loader">
            <svg className="loader" viewBox="0 0 340 340">
                <circle cx="170" cy="170" r="160" stroke="#CD5C5C" />
                <circle cx="170" cy="170" r="135" stroke="#87CEFA" />
                <circle cx="170" cy="170" r="110" stroke="#CD5C5C" />
                <circle cx="170" cy="170" r="85" stroke="#87CEFA" />
            </svg>
            { props.children }
        </div>
    );
}
