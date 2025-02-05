// import { useLoaderData, Link } from "react-router-dom";
// import { getStoryblokApi, storyblokEditable } from "@storyblok/react";

// export async function loader() {
//   const storyblokApi = getStoryblokApi();
//   const { data } = await storyblokApi.get('cdn/stories', {
//     content_type: 'product',
//     version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
//   });
  
//   return data.stories;
// }

// type ProductsProps = {
//   blok: {
//     _uid: string;
//     body: any[];
//   };
// };

// export default function ProductList({ blok }: ProductsProps) {
//   const products = useLoaderData<typeof loader>();

//   return (
//     <main {...storyblokEditable(blok)} key={blok._uid} > 
//         {products.map((product: any) => (
//           <Link 
//             to={`/products/${product.slug}`} 
//             key={product.uuid}  
//           >
//             {product.content.name}
//           </Link>
//         ))}
//     </main>
//   );
// }
