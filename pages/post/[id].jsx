import Link from 'next/link';

export default function Post({ post }) {
	return (
		<div className='container'>
			<h1 className='display-1'>
				{post.id}-{post.title}
			</h1>
			<p>{post.body}</p>
			<Link href='/'>
				<button className='btn btn-primary'>Back to home</button>
			</Link>
		</div>
	);
}

export async function getStaticProps(context) {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${context.params.id}`
	);
	const data = await response.json();

	return {
		props: {
			post: data,
		},
	};
}

export async function getStaticPaths() {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const datas = await response.json();
	const ids = datas.map((data) => data.id);
	const paths = ids.map((id) => ({ params: { id: id.toString() } }));

	return {
		paths: paths,
		fallback: false,
	};
}
