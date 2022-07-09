import { getAllSlugs, getPostData } from '../../lib/posts'

export default function BlogPost(props) {
  return <div>This is blog post page.</div>
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