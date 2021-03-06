module.exports = {
  siteMetadata: {
    title: 'Front-end developer',
    author: 'Dan Cormier',
    description: 'Front-end developer working for TED from Florida.',
    location: 'Florida',
    siteUrl: 'https://dancormier.com/',
    social: [
      {
        type: 'twitter',
        url: 'https://twitter.com/dancormier',
        name: 'dancormier',
      },
      {
        type: 'github',
        url: 'https://github.com/dancormier',
        name: 'dancormier',
      },
      {
        type: 'linkedin',
        url: 'https://linkedin.com/in/dancormier',
        name: 'dancormier',
      },
      {
        type: 'resume',
        url:
          'https://docs.google.com/document/d/1XcjhIYcCvxCqTJQaYUWsokPwOX4lrHoD9FEq519urXM/edit?usp=sharing',
        name: "Dan Cormier's resume",
      },
      {
        type: 'email',
        url: 'mailto:dancormierall@gmail.com',
        name: 'dancormierall@gmail.com',
      },
    ],
    workplace: {
      name: 'TED',
      url: 'https://ted.com/',
    },
  },
  plugins: [
    'gatsby-plugin-fontawesome-css',
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-sharp',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          components: 'src/components',
        },
        extensions: [],
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$|\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-15028625-1',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gatsby Starter Blog',
        short_name: 'GatsbyJS',
        start_url: '/',
        icon: 'content/assets/avatar.jpg',
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Inter:400,400i,700', 'Fredoka One'],
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: 'gatsby-theme-style-guide',
      options: {
        basePath: '/design-system',
      },
    },
  ],
}
