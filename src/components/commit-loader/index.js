import React from 'react';
import ContentLoader from 'react-content-loader';

const CommitLoader = (props) => {
  return (
    <div style={{ width: '50%', margin: '-60px auto' }}>
      <ContentLoader 
        height={160}
        width={200}
        speed={2}
        primaryColor="#e4e4e4"
        secondaryColor="#efefef"
        {...props}
      >
        <rect x="0" y="14" rx="2" ry="2" width="150" height="3" /> 
        <rect x="0" y="23" rx="2" ry="2" width="52" height="3" />

        <rect x="0" y="46" rx="2" ry="2" width="150" height="3" /> 
        <rect x="0" y="57" rx="2" ry="2" width="52" height="3" />

        <rect x="0" y="76" rx="2" ry="2" width="150" height="3" /> 
        <rect x="0" y="87" rx="2" ry="2" width="52" height="3" />
      </ContentLoader>
    </div>
  );
}

export default CommitLoader;
