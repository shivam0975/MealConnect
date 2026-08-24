import React from 'react';
import './Blog.css'; // CSS file for styling
import blogImage1 from './blogImage1.webp'; // Example blog images
import blogImage2 from './blogImage2.webp';
import blogImage3 from './blogImage3.webp';

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: "How to Reduce Food Waste at Home",
            date: "October 15, 2024",
            excerpt: "Discover practical ways to minimize food waste in your daily life, save money, and help the planet!",
            image: blogImage1,
        },
        {
            id: 2,
            title: "The Impact of Food Waste on Our Planet",
            date: "November 2, 2024",
            excerpt: "Explore the environmental consequences of food waste and what we can do to reduce our carbon footprint.",
            image: blogImage2,
        },
        {
            id: 3,
            title: "Community Efforts to Fight Hunger",
            date: "December 1, 2024",
            excerpt: "Learn about inspiring initiatives where communities are coming together to tackle hunger and food insecurity.",
            image: blogImage3,
        },
    ];

    return (
        <div className="blog">
            <header className="blog-header">
                <h1>Our Blog</h1>
                <p>Insights and stories on food waste reduction, sustainable practices, and community impact.</p>
            </header>

            <section className="featured-posts">
                <h2>Featured Posts</h2>
                <div className="posts-container">
                    {posts.map((post) => (
                        <div key={post.id} className="post-card">
                            <img src={post.image} alt={post.title} className="post-image" />
                            <div className="post-content">
                                <h3>{post.title}</h3>
                                <p className="post-date">{post.date}</p>
                                <p>{post.excerpt}</p>
                                <button className="read-more">Read More</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="blog-categories">
                <h2>Categories</h2>
                <div className="categories-list">
                    <span className="category">Food Waste Tips</span>
                    <span className="category">Environmental Impact</span>
                    <span className="category">Community Stories</span>
                    <span className="category">Sustainability</span>
                    <span className="category">NGO Spotlight</span>
                    <span className="category">Restaurant Partnerships</span>
                </div>
            </section>

            <section className="newsletter">
                <h2>Subscribe to Our Newsletter</h2>
                <p>Stay updated with the latest stories and tips on food waste reduction and community support.</p>
                <form className="newsletter-form">
                    <input type="email" placeholder="Enter your email" />
                    <button type="submit">Subscribe</button>
                </form>
            </section>
        </div>
    );
};

export default Blog;
