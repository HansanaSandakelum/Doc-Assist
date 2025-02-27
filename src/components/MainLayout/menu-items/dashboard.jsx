const icons = {
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dashboard"
                    width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                    fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
        <path d="M13.45 11.55l2.05 -2.05"></path>
        <path d="M6.4 20a9 9 0 1 1 11.2 0z"></path>
    </svg>
}

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    role: [0,1],
    children: [
        {
            id: '/dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.dashboard,
            role: [0,1],
            breadcrumbs: false
        }
    ]
};

export default dashboard;
