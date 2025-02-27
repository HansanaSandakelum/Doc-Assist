const icons = {
    campaign_list: <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-clipboard-data"
                        width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                        strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"/>
        <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"/>
        <path d="M9 17v-4"/>
        <path d="M12 17v-1"/>
        <path d="M15 17v-2"/>
        <path d="M12 17v-1"/>
    </svg>,
}

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const reports = {
    id: 'Reports',
    title: 'reports',
    type: 'group',
    role: [1],
    children: [
        {
            id: '/reports/campaign-list',
            title: 'Campaign List',
            type: 'item',
            url: '/reports/campaign-list',
            icon: icons.campaign_list,
            role: [1],
            breadcrumbs: false
        },
    ]
};

export default reports;
