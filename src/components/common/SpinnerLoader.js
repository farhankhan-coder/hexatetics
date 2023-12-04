import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function SpinnerLoader() {
  return (
    <div className="card">
      <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration="1s" />
    </div>
  );
}