// import { NextSeo } from 'next-seo';
// import Layout from '@app/common/Layout';
// import { Text, Flex } from '@design/components';
// import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
// import getCommonSiteData from '@helpers/api/get-common-site-data';

// export async function getStaticProps({
//   preview,
// }: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> {
//   const commonSiteData: any = await getCommonSiteData({ preview });

//   return {
//     props: {
//     //   menu: commonSiteData.menu,
//     },
//     revalidate: 60 * 60, // In seconds
//   };
// }
export default function NotFound(): JSX.Element {
  return (
    // We need to assume and return a 404 when the current slug does not match a category in the CMS
    // since we are using a broad url rewrite this could either a category or other page request
    <>
      <h1>Houston we have a 404</h1>
    </>
  );
}

// NotFound.Layout = Layout;
