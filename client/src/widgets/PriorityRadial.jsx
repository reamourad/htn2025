function PriorityRadial({ value }) {
    // Pick color based on percentage
    let colorClass = "bg-success text-white border-success"; // default green

    if (value < 40) {
        colorClass = "bg-error text-white border-error"; // red
    } else if (value < 70) {
        colorClass = "bg-warning text-black border-warning"; // yellow
    }

    return (
        <div className="flex flex-col items-center mb-6">
            <div
                className={`radial-progress ${colorClass}`}
                style={{ "--value": value }}
                aria-valuenow={value}
                role="progressbar"
            >
                {value}%
            </div>
        </div>
    );
}