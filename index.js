const { get } = require('got');

module.exports = async (req, res) => {
  // Grab the README.md from https://github.com/kilimchoi/engineering-blogs
  const { body = '' } = await get(
    'https://raw.githubusercontent.com/kilimchoi/engineering-blogs/master/README.md',
  );

  // Extract just the blog links. It's not perfect, but it'll do.
  const blogs = body.match(/http(.*)\/$/gm) || [
    'https://github.com/kilimchoi/engineering-blogs',
  ];

  // Select a random blog from the list.
  const blog = blogs[Math.floor(Math.random() * blogs.length - 1)];

  // Go to there.
  res.writeHead(307, { Location: blog });
  res.end(`Redirecting to <a href="${blog}">${blog}</a>...`);
};
