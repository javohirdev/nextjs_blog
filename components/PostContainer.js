import Link from "next/link";
import styles from '../styles/Home.module.css'

export default function PostContainer({title, slug, featured_image, alt, date, summary, author}) {
    const publishedDate = new Date(date);
    
    return (
        <div className={styles.card}>
            <img className={styles.image} src={featured_image} alt={alt} /> <br />
            <div className={styles.detailHead}>
                <Link href={`/posts/${slug}`}>
                    <a className={styles.theme}>{title}</a>
                </Link>
                <p className={styles.desc}>{summary}</p>
            </div>

            <div className={styles.detailBody}>
                <span>✍️ {author.first_name} {author.last_name}</span>
                <span className={styles.date}>{publishedDate.toDateString()}</span>
            </div>
        </div>
    )
}