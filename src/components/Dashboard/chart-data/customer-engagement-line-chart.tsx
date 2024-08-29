import {series} from "./campaigns-data";

function chartData(theme: any) {

    const data: any = {
        height: 350,
        type: "line",
        options: {
            theme: {
                mode: theme,
            },
            chart: {
                id: 'campaigns-line-chart',
                type: 'line',
                background: 'transparent'
            },
            annotations: {
                points: [
                    {
                        x: new Date('02 Feb 2023').getTime(),
                        y: 45,
                        marker: {
                            size: 6,
                            fillColor: '#fff',
                            strokeColor: 'red',
                            radius: 2,
                        },
                        label: {
                            text: 'Data feature',
                            borderColor: '#FF4560',
                            offsetY: 0,
                            style: {
                                color: '#fff',
                                background: '#FF4560',
                            },
                        },
                    },
                ],
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            grid: {
                padding: {
                    right: 30,
                    left: 20,
                },
            },
            title: {
                text: 'Impressions',
                align: 'left',
            },
            labels: series.monthDataSeries1.dates,
            xaxis: {
                type: 'datetime',
            },
        },
        series: [
            {
                name: 'total impressions',
                data: series.monthDataSeries1.prices,
            },
            {
                name: 'submissions',
                data: series.monthDataSeries2.prices,
            },
        ],
    };

    return data;

}

export default chartData;