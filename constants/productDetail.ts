import { ProductDetail } from '@/types';

export function getProductById(id: string): ProductDetail | undefined {
  return productDetail.id === Number(id) ? productDetail : undefined;
}

export const productDetail: ProductDetail = {
  id: 1,
  title: 'Aurora Wireless Headphones Pro',
  subtitle: 'Flagship over-ear headphones',
  artist: 'Essentials Audio',
  artistAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBw7MGGM7qPFfQcI5T6b-w5JzHamPbqtbzBiF9r3XVTqyWzKU9QcQS5mqRFzdsNgKeqGsdMuQHl-HNTPtqxqhv2GuQd8V3Mzu-AbGB-9o-Pxx1-NjEDa7AQymgb6_oTudDICmDhlMNBnYErQMyIg9kMz6XUYOin_Qc7LSOCFOmaIfX89zZC8hjYQ73i9GwOpMVK6MMCNMEVwWOuURzpEFVyCRXdhIU2Q3WR8IU6S1A2OJvvkLTjvWdS',
  edition: 'Model 2026 · Charcoal',
  rating: 4.9,
  reviewCount: 124,
  location: 'In stock, ships in 24h',
  price: 349,
  images: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBZAn_5B-gzs1fwZlSUB0kIg3ZWfkGPlXyk1rmJ4Lf1FGol3hbfiZLI4gVq8wjCTl9hn7P_uYHjwadm74Ex0jDfYcrf5N18d7cyHzzmpwxaOIoVXdMJE9hl9f7iVeFXQejqVuAZVlk1yj0SucNOL7Q2Cl5W7CR6hGltI_OS5el52MRAzyCJxD2G_J5xSw0qn4Hvu-SBaypEuallhpmXhCK2Vc3TAE7soBETMFX1RZIAp-1dxkUl9Kot',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDxU8QREM_DZQsQ5Lg5lxhuUT6VODuIt7E5etnII2NbNR7FhjyeoBGSNx6U6M3ffJmVzsIXia9SbV4Lgb1SUT17aOuB7xwsbfyV2CKpCH5ilG0wDb4qEDXDx4CC11lbDFlOWkWDyQqvb1QRgQvp1CFSkJregJlXf1tFMB18PGboHP7Vo9KO9UOIArNQ-z1T49BKKfaEhWGpa5WuUxPmEP7Hx4h_pKBQh5G9qpB1b1aLXeO8D42rFhVF',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCdYoj51IZl2CwD4ZyZmeqIPUQn-37orpAW979zTlh0qIlcgFl1lkEoYSZMxKtXifpIdx6VBwGY_f65o-zqJDQ0qQ9g32_v_uOXo-qYDf7-DcvU1JpINixyHROP59OfxOpkdx_zSYyAIyEEQeRYtr4i-jacEphuFTnLQPnw7Z9DDMZ_RCntFXEOGPQfaQ4PdkbbGB1XTW5C4nrh3GWg2OMBXDEO_tnqqLVJCaw8JZld2eeoRTfxsZQc',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCgNuIpf_2II0hQSB4t3xXIJNNaIcAxBDUE2BaSnDgjJTGqkO4jL9Zobi-8b5sWsPwuR14alq0c8WPczGXkNlabMbdwyFb7Yk3dRBn-jUyFpzjLVmMuCm4XIMRyCnapa2kTlVJhHqspRh7Qpe3LYSqFTv7XsF60kLFRmbAyq_dWNwxoXJFgNs6rmD8hds835Ai_c1g_K439jpTyJsgcjX_AXbFV9VDYs-K6sdsRU295yYmcmswu4yX8',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBi17ZuQc2ZFoynFMCUVEBZNKuhJqv5xto-Px2MSqEEHhfvTMCbSDAGalDpmikQhvvka1yFUbnKT0UT1GA6CwviGD7TdKREKJvhrtNLqyYvuK6uYMMGnQ_HD_z6AMKGoTbvmit8BRriqXuXraoHSmT48FnEHny3JabVeuPf1F1JvhIVIhDC2piI4BsTYLn3QtNy2h7cg8HNHhYj1u2hDBSze9JwvdbNi21Y9LMUodiIhuMQ8_xGtgnU',
  ],
  features: [
    {
      icon: 'brush',
      title: 'Premium Build',
      description: 'Aluminium ear cups and memory-foam cushions for all-day comfort.',
    },
    {
      icon: 'workspace_premium',
      title: '2-Year Warranty',
      description: 'Every unit is covered by our bench-tested two-year limited warranty.',
    },
    {
      icon: 'local_shipping',
      title: 'Free Express Shipping',
      description: 'Ships within 24 hours in a protective case, with free 30-day returns.',
    },
  ],
  description:
    'The Aurora Wireless Headphones Pro pair studio-grade 40mm dynamic drivers with adaptive hybrid noise cancelling and lossless Bluetooth audio. A 40-hour battery keeps them running across the longest sessions, and the plush memory-foam fit makes them easy to forget — until the music starts.',
  specs: [
    { label: 'Dimensions', value: '18.5 x 16.9 x 8.3 cm' },
    { label: 'Weight', value: '250 g' },
  ],
  shipping: 0,
  serviceFee: 0,
  sizes: ['Charcoal', 'Silver', 'Midnight'],
};
