import React from 'react';
import ContentLoader from 'react-content-loader';

const CommitLoader = (props) => {
  return (
    <div style={{ width: '420px', margin: '-40px auto' }}>
      <ContentLoader 
        height={160}
        width={200}
        speed={2}
        primaryColor="#e4e4e4"
        secondaryColor="#efefef"
        {...props}
      >
        <circle cx="10" cy="10" r="10" />
        <rect x="0" y="24" rx="2" ry="2" width="150" height="3" /> 
        <rect x="0" y="33" rx="2" ry="2" width="52" height="3" />

        <circle cx="10" cy="52" r="10" />
        <rect x="0" y="66" rx="2" ry="2" width="150" height="3" /> 
        <rect x="0" y="77" rx="2" ry="2" width="52" height="3" />

        <circle cx="10" cy="102" r="10" />
        <rect x="0" y="117" rx="2" ry="2" width="150" height="3" /> 
        <rect x="0" y="128" rx="2" ry="2" width="52" height="3" />
      </ContentLoader>
    </div>
  );
}

export default CommitLoader;
