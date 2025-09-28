import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './ResultDisplay.css';

const ResultDisplay = ({ isLoading, result }) => {
  if (isLoading) {
    return (
      <div className="result-display-container centered">
        <div className="spinner-large"></div>
        <p>Simulation läuft...</p>
      </div>
    );
  }

  if (result === null) {
    return (
      <div className="result-display-container centered">
        {/* Intentionally left blank when no result yet */}
      </div>
    );
  }

  const probability = result;
  const data = [
    { name: 'Ereignis trat ein', value: probability },
    { name: 'Ereignis trat nicht ein', value: 100 - probability },
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className="result-display-container">
      <h2>Ergebnis der Simulation</h2>
      <div className="probability-text">
        <strong className="percentage">{probability.toFixed(2)}%</strong>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius="60%" /* thicker donut, fills more */
              outerRadius="95%" /* use most of the box */
              fill="#8884d8"
              paddingAngle={4}
              dataKey="value"
              animationDuration={600}
              animationEasing="ease-out"
              animationBegin={0}
              isUpdateAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResultDisplay;
