import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getAllPosts } from '../lib/posts'
import Image from 'next/image'
import Link from 'next/link'
import { request } from '../lib/datocms'

const HOMEPAGE_QUERY = `
  query MyQuery {
    allArticles {
      title
      content {
        value
      }
      coverImage {
        url
      }
      excerpt
      id
      createdAt
      slug
    }
    author {
      name
    }
  }
`;

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 10 }
  });
  return {
    props: { data }
  };
}

export default function Home(props) {

  const { data } = props
  console.log('data: ', data)
  const posts = data.allArticles

  return (
    <div className={styles.container}>
      <Head>
        <title>Cooking Blog</title>
      </Head>
      <div>
        <h1>Cooking</h1>
      </div>
      <div>
        {posts.map(post => {
          return (
            <BlogPostPreview key={post.id} data={post} />
          )
        })}
      </div>
    </div>
  )
}

const BlogPostPreview = (props) => {

  const { data } = props

  return (
    <div style={{maxWidth: '400px', marginBottom: '50px'}}>
      <div style={{width: '100px', height: '100px', position: 'relative'}}>
        <Image 
          src={data.coverImage.url} 
          alt={data.title} 
          layout='fill'
        />
      </div>
      <h2>
        <Link href={`/blog/${data.slug}`}>
          <a>{data.title}</a>
        </Link>
      </h2>
      <div>{data.publishDate}</div>
      <p>
        {data.excerpt}
      </p>
      <div style={{fontWeight: 'bold'}}>{data.author}</div>
    </div>
  )
}