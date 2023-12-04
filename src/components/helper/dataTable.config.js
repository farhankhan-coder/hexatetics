const DataTableCustomStyles = {
    rows: {
        style: {
            minHeight: '50px', // override the row height
        },
    },
    headCells: {
        style: {
            background: "#113699",
            color: "#ffffff",
            fontSize: "15px",
        },
    },
    cells: {
        style: {
            fontSize: "13px",
        },
    },
    // pagination: {
    //     style: {
    //         background: "transparent",
    //         color: "#ffffff",
    //     }
    // }
};

const ManageAccessCustomStyles = {
    rows: {
        style: {
            minHeight: '50px', // override the row height
        },
    },
    headCells: {
        style: {
            color: "#667085",
            fontSize: "12px",
        },
    },
    cells: {
        style: {
            fontSize: "14px",
            color:"#101828",
            fontweight: "bold",
        },
    },
    // pagination: {
    //     style: {
    //         background: "transparent",
    //         color: "#ffffff",
    //     }
    // }
};

export { DataTableCustomStyles , ManageAccessCustomStyles};