export function channelsPieChartDataUser(theme: any) {

    const data: any = {
        width: 300,
        type: "donut",
        options: {
            theme: {
                mode: theme,
                palette: 'palette6'
            },
            chart: {
                id: 'type-pie-chart',
                sparkline: {enabled: true},
                background: 'transparent'
            },
            labels: ["Banglalink", "Grameenphone", "Airtel", "Teletalk", "Robi"],
            tooltip: {
                theme: true
            },
            dataLabels: {
                enabled: true,
                formatter: function (val: any) {
                    return val + "%"
                },
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                        }
                    }
                }
            }
        },
        series: [30, 15, 23, 20, 12]
    };

    return data;

}