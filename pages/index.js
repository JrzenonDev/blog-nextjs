import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getAllPosts } from '../lib/posts'

export default function Home() {

  const posts = getAllPosts()

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
          <BlogPostPreview key={post.id} data={post} />
        })}
      </div>
    </div>
  )
}

const BlogPostPreview = (props) => {

  const { data } = props

  return (
    <div style={{maxWidth: '400px'}}>
      <img 
        src='./images/chicken-soup-cover.jpg' 
        alt='Chicken soup' 
        style={{maxWidth: '100%'}}
      />
      <h2>Tasty chicken soup recipe</h2>
      <div>30.06.2021</div>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima incidunt, necessitatibus beatae molestias possimus provident cumque. Libero animi maxime officiis nulla non numquam repudiandae dolore. Expedita natus voluptatem reprehenderit doloremque?
      </p>
      <div style={{fontWeight: 'bold'}}>By José Roberto</div>
    </div>
  )
}