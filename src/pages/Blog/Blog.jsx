import { useState } from "react";
import PageHeader from "../../common/components/PageHeader";
import EmptyState from "../../common/components/EmptyState";
import blogImage1 from "../../assets/images/blogImage1.webp";
import blogImage2 from "../../assets/images/blogImage2.webp";
import blogImage3 from "../../assets/images/blogImage3.webp";
import "./Blog.css";

const POSTS = [
  {
    id: 1,
    title: "How to Reduce Food Waste at Home",
    date: "October 15, 2024",
    category: "Food Waste Tips",
    excerpt:
      "Discover practical ways to minimize food waste in your daily life, save money, and help the planet!",
    body: "Most household waste is decided before anything reaches the bin — at the shop, and in how food is stored when it gets home. Plan meals around what needs eating first, keep a shelf for items nearing their date, and learn what your fridge drawers are actually for. Freezing bread, herbs and cooked portions buys weeks rather than days. None of this is dramatic, but across a year it removes a startling amount of food from the waste stream.",
    image: blogImage1,
  },
  {
    id: 2,
    title: "The Impact of Food Waste on Our Planet",
    date: "November 2, 2024",
    category: "Environmental Impact",
    excerpt:
      "Explore the environmental consequences of food waste and what we can do to reduce our carbon footprint.",
    body: "Wasted food carries the full cost of everything that produced it: the water, the land, the fuel, the labour. When it decomposes in landfill it releases methane, a greenhouse gas considerably more potent than carbon dioxide over the short term. That is why redistribution beats disposal even when disposal is composting — the emissions have already been spent, and the only way to get value back is for someone to eat the food.",
    image: blogImage2,
  },
  {
    id: 3,
    title: "Community Efforts to Fight Hunger",
    date: "December 1, 2024",
    category: "Community Stories",
    excerpt:
      "Learn about inspiring initiatives where communities are coming together to tackle hunger and food insecurity.",
    body: "The most effective food programmes we work with are almost always hyper-local. A shelter that knows its neighbourhood can tell you what will be eaten and what will be politely declined. A restaurant three streets away can time its surplus to that. Our job is mostly to remove the friction between those two facts, and then get out of the way.",
    image: blogImage3,
  },
];

const CATEGORIES = [
  "All",
  ...Array.from(new Set(POSTS.map((post) => post.category))),
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const visiblePosts =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((post) => post.category === activeCategory);

  const handleSubscribe = (event) => {
    // Without this the form did a native submit and reloaded the whole page.
    event.preventDefault();
    setSubscribed(true);
    setEmail("");
  };

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Our Blog"
        description="Insights and stories on food waste reduction, sustainable practices, and community impact."
      />

      <div className="blog">
        <div className="container">
          <section className="blog-section">
            <h2 className="blog-section__title">Categories</h2>
            <div className="categories-list">
              {CATEGORIES.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={`category ${
                    activeCategory === category ? "is-active" : ""
                  }`}
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          <section className="blog-section">
            <h2 className="blog-section__title">Featured Posts</h2>

            {visiblePosts.length === 0 ? (
              <EmptyState
                title="No posts in this category yet"
                description="Try another category — more writing is on the way."
              />
            ) : (
              <div className="card-grid">
                {visiblePosts.map((post) => {
                  const isExpanded = expandedId === post.id;
                  return (
                    <article key={post.id} className="post-card">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="post-image"
                        loading="lazy"
                      />
                      <div className="post-content">
                        <h3>{post.title}</h3>
                        <p className="post-date">
                          {post.date} &middot; {post.category}
                        </p>
                        <p>{post.excerpt}</p>
                        {isExpanded && <p className="post-body">{post.body}</p>}
                        {/* Was a dead button; now it actually reveals the post. */}
                        <button
                          type="button"
                          className="btn btn--sm btn--primary"
                          aria-expanded={isExpanded}
                          onClick={() =>
                            setExpandedId(isExpanded ? null : post.id)
                          }
                        >
                          {isExpanded ? "Show Less" : "Read More"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          <section className="newsletter">
            <h2>Subscribe to Our Newsletter</h2>
            <p>
              Stay updated with the latest stories and tips on food waste
              reduction and community support.
            </p>

            {subscribed && (
              <p className="form-status form-status--success" role="status">
                Thanks! Newsletter delivery is not connected yet, so nothing will
                arrive just yet — we will import these addresses when it is.
              </p>
            )}

            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <label className="visually-hidden" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                className="field__control"
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setSubscribed(false);
                }}
                required
              />
              <button type="submit" className="btn btn--primary">
                Subscribe
              </button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default Blog;
