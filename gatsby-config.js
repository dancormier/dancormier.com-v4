module.exports = {
  siteMetadata: {
    // edit below
    title: `Dan Cormier: Front-end Developer`,
    author: `Dan Cormier`,
    description: `Front-end developer working for TED from Florida.`,
    location: 'Florida',
    siteUrl: `https://dancormier.com/`,
    social: [
      {
        type: 'github',
        url: 'https://github.com/dancormier',
        name: 'dancormier',
      },
      {
        type: 'twitter',
        url: 'https://twitter.com/dancormier',
        name: 'dancormier',
      },
      {
        type: 'linkedin',
        url: 'https://linkedin.com/in/dancormier',
        name: 'dancormier',
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
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    {
      resolve: `gatsby-plugin-alias-imports`,
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
        background_color: '#ffffff',
        theme_color: '#222222',
        display: 'minimal-ui',
        icon: 'content/assets/avatar.jpg',
      },
    },
    {
      resolve: 'gatsby-plugin-theme-ui',
      options: {
        prismPreset: 'night-owl',
        preset: '@theme-ui/preset-funk',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
  ],
}
