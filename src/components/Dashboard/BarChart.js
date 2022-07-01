import React from 'react';
// @Chartjs
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
// @MUI
import {Grid, Paper, Typography, Pagination} from '@mui/material';
// style
import '../../App.css';
import PropTypes from "prop-types";

BarChart.propTypes = {
    title: PropTypes.string.isRequired,
    labels: PropTypes.array.isRequired,
    datas: PropTypes.array.isRequired,
    borderColor: PropTypes.array.isRequired,
    backgroundColor: PropTypes.array.isRequired
}

export default function BarChart({title, labels, datas, borderColor, backgroundColor}) {

    const data={ 
        labels,
        datasets: [
          {
            label: 'Quantité',
            data: datas,
            borderColor: borderColor,
            backgroundColor: backgroundColor,
          },
        ],
    };
    const options={
        indexAxis: 'y',
        elements: {
        bar: {
            borderWidth: 2,
        },
        },
        responsive: true,
        plugins: {
        legend: {
            position: 'bottom',
            },
        title: {
            display: false,
            text: 'Horizontal bar chart',
            },
        },
    }

    return (         
        <Paper elevation={0} style={{borderRadius: 10, padding: 10}}>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item xs={2} m={1}>
                    <Typography className="title">{title}</Typography>
                </Grid>
                <Grid item xs={8} m={1}>
                    <Bar data={data} options={options} width={400} height={170}/>
                </Grid>
            </Grid>
        </Paper>
    );
}