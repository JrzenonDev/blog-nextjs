import Image from 'next/image';
import Link from 'next/link';
import { getAllSlugs, getPostData } from '../../lib/posts'
import styles from '../../styles/BlogPost.module.css'

export default function BlogPost(props) {
  const { postData } = props;
  return (
    <div className={styles.container}>
      <div style={{width: '100px', height: '100px', position: 'relative'}}>
        <Image 
          src={postData.coverImage} 
          alt={postData.title} 
          layout='fill'
        />
      </div>
      <div>
        <h1>{postData.title}</h1>
        <p>{postData.author}/{postData.publishDate}</p>
        <p>{postData.content}</p>
      </div>
      <div>
        <Link href='/'>
          <a>-- Back to home page</a>
        </Link>
      </div>
    </div>
  )
}

export const getStaticPaths = () => {
  const paths = getAllSlugs();
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = ({ params }) => {
  const postData = getPostData(params.slug);
  return {
    props: {
      postData
    }
  }
}