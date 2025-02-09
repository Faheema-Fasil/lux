const redirects = [
  {
    source: "/",
    has: [
      {
        type: "host",
        value: "admin.timehouse.store",
      },
    ],
    destination: "https://timehouse.store",
    permanent: true,
  },
  {
    source: "/home",
    destination: "/",
    permanent: true,
  },
];

export default redirects;
