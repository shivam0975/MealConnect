import React from "react";

const Blog = () => {
  return (
    <div>
      <h1>Blog</h1>
      <section className="articles">
        <article>
          <h2>How to Reduce Food Waste in Restaurants</h2>
          <p>A brief intro to the article...</p>
          <button>Read More</button>
        </article>
        <article>
          <h2>Interview with a Local NGO</h2>
          <p>A brief intro to the interview...</p>
          <button>Read More</button>
        </article>
      </section>
    </div>
  );
};

export default Blog;
