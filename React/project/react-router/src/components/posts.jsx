import React from "react";
import { useParams, useLocation } from 'react-router-dom';
import queryString from 'query-string' // 解析query string（ps，解析出来的都是字符串）

const Posts = () => {
  const { year, month } = useParams()
  const { search } = useLocation()
  const parsed = queryString.parse(search)
  console.log('parsed', parsed)
  return (
    <div>
      <h1>Posts</h1>
      Year: {year}, Month:{month}
    </div>
  );
};

export default Posts;
