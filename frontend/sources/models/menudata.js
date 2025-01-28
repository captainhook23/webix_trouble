export const menudata = [
    {
        id: 'newBooking',
        icon: 'mdi mdi-shape-square-rounded-plus',
        value: 'Neue Buchung',
    },
    {
        id: 'faq',
        icon: 'mdi mdi-frequently-asked-questions',
        value: 'FAQ',
    },
    {
        id: 'administration',
        icon: 'mdi mdi-table',
        value: 'Verwaltung',
        data: [
            { id: 'dashboard', value: 'Dashboard', icon: 'mdi mdi-view-dashboard' },
            { id: 'tables2', value: 'TreeTable' },
            { id: 'tables3', value: 'Pivot' },
        ],
    },
];
