import Image from 'next/image';
import Link from 'next/link';
import { getAllSlugs, getPostData } from '../../lib/posts'
import styles from '../../styles/BlogPost.module.css'
import { request } from '../../lib/datocms'

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

const PATHS_QUERY = `
  query MyQuery {
    allArticles {
      slug
    }
  }
`

export const getStaticPaths = async () => {
  const slugQuery = await request({
    query: PATHS_QUERY,
  })

  let paths = [];
  slugQuery.allArticles.map((p) => paths.push(`/blog/${p.slug}`))

  return {
    paths,
    fallback: false
  }
}

const ARTICLE_QUERY = `
  query MyQuery($slug: String) {
    article(filter: {slug: {eq: $slug}}) {
      author {
        name
      }
      content {
        value
      }
      coverImage {
        responsiveImage {
          alt
          aspectRatio
          base64
          bgColor
          height
          sizes
          src
          srcSet
          title
          webpSrcSet
          width
        }
      }
      id
      publishDate
      slug
      title
    }
  }
`

export const getStaticProps = async ({ params }) => {
  const post = await request({
    query: ARTICLE_QUERY,
    variables: { slug: params.slug }
  })

  return {
    props: {
      postData: post.article
    }
  }
}