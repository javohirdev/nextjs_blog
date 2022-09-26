import Head from "next/head";
import Link from "next/link";
import Butter from "buttercms";
import styles from './Post.module.css'
const butter = Butter(process.env.BUTTER_CMS_API_TOKEN);

function Posts({ post }) {
    return (
        <>
            <Head>
                <title key={post.title}>{post.title}</title>
            </Head>
            <div className="content">
                <Link href={`/`}>
                    <a className={styles.routing}>🏠 Home</a>
                </Link>
                <div>
                    <main dangerouslySetInnerHTML={{ __html: post.body }} />
                </div>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const allPosts = await butter.post.list({ page: 1, page_size: 10 });
    const paths = allPosts.data.data.map((post) => ({
        params: { slug: post.slug },
    }));
    return {
        paths,
        fallback: false,
    };
}
export async function getStaticProps({ params }) {
    const response = await butter.post.retrieve(params.slug);
    const post = await response.data;

    return {
        props: {
            post: post.data,
        },
    };
}

export default Posts;