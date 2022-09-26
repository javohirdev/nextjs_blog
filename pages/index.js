import Head from "next/head";
import Butter from "buttercms";
import PostContainer from "../components/PostContainer";
import styles from '../styles/Home.module.css'

// Butter API token
const butter = Butter(process.env.BUTTER_CMS_API_TOKEN);
 
export default function Home({ posts }) {
  return (
    <div className="home">
      <Head>
        <title>NextJS Blog with Butter CMS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>👋 NextJS Blog with ButterCMS</h1>
      <div className={styles.cardsArea}>
        {posts.data.map((post) => (
          <PostContainer
            className={styles.container}
            key={post.slug}
            title={post.title}
            featured_image={post.featured_image}
            alt={post.featured_image_alt}
            slug={post.slug}
            summary={post.summary}
            author={post.author}
            date={post.published}
          />
        ))}
      </div>
    </div>
  );
}
 
export async function getStaticProps() {
  const response = await butter.post.list({ page: 1, page_size: 10 });
  const posts = await response.data;
  console.log(response)
 
  return {
    props: {
      posts,
    },
  };
}