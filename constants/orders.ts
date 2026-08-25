import { Order } from '@/types';

export const ordersSummary = {
  totalSales: '$1,248,000.00',
  pendingOrders: 8,
  fulfillmentRate: '98.2%',
};

export const orders: Order[] = [
  {
    id: '#LX-9902',
    customer: { name: 'Elena Vance', email: 'elena.v@example.com' },
    product: {
      name: 'Alpine Solitude - Metallic Print',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBC8pUyj7yVyWl6GWW9psQsKY28tMFl4n4FHunjo8ozeX-N-wfk9g1K2yr0I7NoKmDmO4Hr5aVGduS9l-e9qyfiJYAbNlA4KjZKczOYkmjCd7FZmexhyvl3YSBXKPiqj_JU0eBlsNAbgkXMu8CXoThXjqsJRU7HOejWQrDhCAzg-tlfK59jRyeD3k4GAqYiteVjDpbgnX7hKnYaysaLIwzTJZgPB8RU2fo28L5p1ajTf3W9ex5mKoy',
    },
    date: 'Oct 24, 2024',
    total: 450.0,
    status: 'Pending',
    action: 'View Details',
  },
  {
    id: '#LX-9887',
    customer: { name: 'Marcus Sterling', email: 'm.sterling@agency.com' },
    product: {
      name: 'Concrete Geometry - A3 Framed',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDt9uv706zJCa3waMY5y7A57y0Be8RypNgUIU-wYAY_NiiIOVw21Y9pxL1A5wkFlfVoDaftjob_m9A732OROXTLBYGNrLGYSsqCL7ddQtxcrs4_0WBOfnjCDZFEkwWyyCooXuVb41iogUycGi-eXWvtJb8NUuDLFNSpfNuoNKhHwb66zTxhlrVp4Wel8YTNHYpNUAph7b7_sk-4qdspWVtW3sas1aA-bejzBWrjga8p19vPZ9d_xaE0',
    },
    date: 'Oct 23, 2024',
    total: 1200.0,
    status: 'Shipped',
    action: 'Track',
  },
  {
    id: '#LX-9854',
    customer: { name: 'Sarah Connor', email: 'sconnor@resistance.net' },
    product: {
      name: 'Desert Bloom #4 - Canvas',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrLwiUj-CYnBsP48Pn_2rUEFSG389wPHQM-NehCN8xMHCBRd_Cxdyg_8bnbDq5Mlhj82Ew0TBT2dp_nJskqODFNz-JSl0EmxntD0jioktNMDMmKsTU9luMHles24rwXIqusaKu4V_2xWo2sf5BaKMBvCt02BPzT-lQiDeCLbOfuyK_haXitgbuzqPBw6V5HvnN39Z_LEkdHddmYcCCN4jTKbNfmXuNZanTzBnU_6Yunl14gy8T-d2o',
    },
    date: 'Oct 21, 2024',
    total: 890.0,
    status: 'Delivered',
    action: 'Reorder',
  },
  {
    id: '#LX-9840',
    customer: { name: 'David Miller', email: 'david.m@design.co' },
    product: {
      name: 'Midnight Tides - Acrylic Glass',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7wt-ZLrhf-CO-jelYHncXrXhAokCNRVqHIlPrXHfudcqQ95yTiM4cUQhPw5TRS1_C9bpXxc7UWMphxQNHpwQp3cGnvV221MFvwou_rcG6_wkHKodarcMy2q_zEDHMN2nq5VLpf2HQDJ9dxdB6rur98ruzf8_7hFm_-h4SrRPji_2ogfj2GAlYqOFIb7vUbfVYcjeSDW8c9EIe7vcpfaV1oCsJpgeQtpvGYCVEkHR6f8tFSVrISQi8',
    },
    date: 'Oct 20, 2024',
    total: 1550.0,
    status: 'Delivered',
    action: 'Reorder',
  },
  {
    id: '#LX-9812',
    customer: { name: 'Priya Kapoor', email: 'priya.k@artcollective.io' },
    product: {
      name: 'Urban Reflections - Canvas',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPs4LmoIbvxk-dRurP0fg8ozD0_b5_SSH8mgSB9XS2q7Nh90zUDfohDsl3gn0YjXYtdrwS46Kri9el-l2PO0izT1-4vz9O39LsTQpERUuYPm9NSEMWZzzqTq0YtNklUyPH7105upSmsQcjynuFn6ZsX4aggGOAnoiA7BICXZVyw1ZF8Bi-U2dXZi42P2Ude16D5mtHQM9P7zNL4myNUOJkviCu5BFgWMP0Dz9F-GhiWzLqRJqjkwBo',
    },
    date: 'Oct 18, 2024',
    total: 675.0,
    status: 'Pending',
    action: 'View Details',
  },
  {
    id: '#LX-9789',
    customer: { name: 'James Whitfield', email: 'james.w@whitfield.photo' },
    product: {
      name: 'Golden Hour Dunes - Metal Print',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8ozMzAwxgjkqODPgwewxPa7s7ICE0yXdxrIvVD8bKBr6h8TXLFaxFJU3RhDVdWeCkB89aud_nydR2MsmlMt0IXmdFSBw5uGYo8Fy8eAlv-PTIV_RFKoBWAogVVU4vieEvw4psVaM2FkFW0RhG2C2MXLFZN7JT-UembE2-LDX4TSZFkyNiztmonZGYKPM4XjfVLvYd2xiVmKdkv9K22MZC4IyXGKLQgDMOgnjGihTXSfA80P8BlcDC',
    },
    date: 'Oct 15, 2024',
    total: 1100.0,
    status: 'Shipped',
    action: 'Track',
  },
  {
    id: '#LX-9745',
    customer: { name: 'Lena Oxton', email: 'lena.o@overwatch.gg' },
    product: {
      name: 'Cherry Blossom Study #2 - Washi',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtzuEbgh2GzSLCPFdh7P2itzAM_gZQ4IibL4PaKHqPE00mZS6ybum-TLqLC_7wibQz6kcD9Ei2o0m0YhrTQxi-Xjw_nEdoBiEJj7SFiS1idn87UnCUydcnK2-01wuUKxuLtZl47oWmlo0zLi-NGz_aAth5EdtJxWfzBwovKNsVSa9JH0ys68Eqvxe2x_vMyqq2Bk2WGwYadFyBroteRkdLwjyRDfb_HO8AzVG-KnxAFk5q13WoFkjs',
    },
    date: 'Oct 12, 2024',
    total: 340.0,
    status: 'Delivered',
    action: 'Reorder',
  },
  {
    id: '#LX-9701',
    customer: { name: 'Robert Chen', email: 'robert.c@chenstudio.com' },
    product: {
      name: 'Abstract Topography #7 - Acrylic',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCykuIeJjhppswSTcriLtfurI6vOIbh5LbFmtdYhwYQs2dTK96BtBPhQARrJk9ALbNcE5KPDfMfOMbC-B35tLgh56LYc2kumIYC_HF6NuS1mjjtsH9944YmftAPFicu1KqcfpN4jHbfbSy8rCqD5rgsVSMRgIN1M-AeI5gzI2I6Ftq6q4tAGKnCHjEXy6oHEzvL9vjSHS1v3YDaMr46WiLOoJQqWgDFV14gYgF3WB4dDC9wuvyb5akp',
    },
    date: 'Oct 8, 2024',
    total: 2200.0,
    status: 'Pending',
    action: 'View Details',
  },
];
