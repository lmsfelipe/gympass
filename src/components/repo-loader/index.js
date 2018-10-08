import React from 'react';
import ContentLoader from 'react-content-loader';

const RepoLoader = (props) => {
  return (
    <div style={{ width: '100%' }}>
      <ContentLoader 
        height={160}
        width={400}
        speed={2}
        primaryColor="#e4e4e4"
        secondaryColor="#efefef"
        {...props}
      >
        <rect x="4.5" y="8" rx="2" ry="2" width="120" height="40" /> 
        <rect x="140" y="8" rx="2" ry="2" width="120" height="40" />
        <rect x="280" y="8" rx="2" ry="2" width="120" height="40" />

        <rect x="4.5" y="68" rx="2" ry="2" width="120" height="40" /> 
        <rect x="140" y="68" rx="2" ry="2" width="120" height="40" />
        <rect x="280" y="68" rx="2" ry="2" width="120" height="40" />

        <rect x="4.5" y="128" rx="2" ry="2" width="120" height="40" /> 
        <rect x="140" y="128" rx="2" ry="2" width="120" height="40" />
        <rect x="280" y="128" rx="2" ry="2" width="120" height="40" />
      </ContentLoader>
    </div>
  );
}

export default RepoLoader;
