import React from 'react';
import { storiesOf } from '@storybook/react';
import { LinkPreview } from './LinkPreview';

const customFetcher = async (url: string) => {
  const response = await fetch(`http://localhost:3000/parse-link?url=${url}`);
  const json = await response.json();
  return {
    title: json.title,
    description: json.description,
    image: json.image,
    cardType: json.image_x === json.image_y ? 'square' : 'rectangle',
    siteName: json.site_name,
    hostname: (new URL(url)).hostname,
  };
};

storiesOf('LinkPreview', module)
  .add('Default', () => <LinkPreview url='https://barcauniversal.com' fetcher={customFetcher} />)
  .add('Article', () => (
    <LinkPreview url='https://barcauniversal.com/predicted-barcelona-lineup-against-eibar/' fetcher={customFetcher} />
  ))
  .add('Text align right', () => (
    <LinkPreview
      url='https://barcauniversal.com/predicted-barcelona-lineup-against-eibar/'
      textAlign='right'
      fetcher={customFetcher}
    />
  ))
  .add('Custom image height', () => (
    <LinkPreview
      url='https://barcauniversal.com/predicted-barcelona-lineup-against-eibar/'
      imageHeight='50vh'
      fetcher={customFetcher}
    />
  ))
  .add('YouTube link', () => (
    <LinkPreview url='https://www.youtube.com/watch?v=JKJdGNHW1xk' fetcher={customFetcher} />
  ))
  .add('Twitter link', () => (
    <LinkPreview url='https://twitter.com/BarcaUniversal/status/1396232440314830856' fetcher={customFetcher} />
  ))
  .add('Reddit link', () => (
    <LinkPreview
      url='https://www.reddit.com/r/LifeProTips/comments/nivqb3/lpt_if_your_your_largest_hex_key_is_to_small_you/'
      descriptionLength={100}
      fetcher={customFetcher}
    />
  ))
  .add('Fallback', () => <LinkPreview url='https://webzy.dev' fallback={<div>Fallback</div>} fetcher={customFetcher} />)
  .add('Colors', () => (
    <LinkPreview
      url='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      backgroundColor='black'
      primaryTextColor='white'
      secondaryTextColor='#ccc'
      borderColor='red'
      margin='30px auto'
      fetcher={customFetcher}
    />
  ))
  .add('Fallback image', () => (
    <LinkPreview
      url='https://google.com'
      fallbackImageSrc='https://www.aljazeera.com/wp-content/uploads/2021/08/2019-12-07T000000Z_879038429_RC2LQD9L67FQ_RTRMADP_3_SOCCER-SPAIN-FCB-RCD-REPORT.jpg?resize=770%2C513'
      fetcher={customFetcher}
    />
  ))
  .add('Using custom fetcher', () => (
    <LinkPreview url='https://www.brianfriel.xyz/learning-how-to-build-on-solana/' fetcher={customFetcher} fallback={<div>Fallback</div>} />
  ))
  .add('Image onError', () => (
    <LinkPreview url='https://www.brianfriel.xyz/learning-how-to-build-on-solana/' fetcher={customFetcher} />
  ))
  .add('Explicit image', () => (
    <LinkPreview
      url='https://barcauniversal.com/predicted-barcelona-lineup-against-eibar/'
      explicitImageSrc='https://barcauniversal.com/wp-content/uploads/2021/05/1002622558-2048x1365.jpg'
      fetcher={customFetcher}
    />
  ))
  .add('Explicit no image in case of no image in metadata', () => (
    <LinkPreview url='https://barcauniversal.com' showPlaceholderIfNoImage={false} fetcher={customFetcher} />
  ))
  .add('Square Card Type', () => (
    <LinkPreview url='https://danromero.org/books/' fetcher={customFetcher} />
  ));

