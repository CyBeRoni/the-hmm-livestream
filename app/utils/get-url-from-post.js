function getURLfromPost(posts) {
  const URLmatch = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+")
  const URLs = []

  function ignore(url){
    let u = new URL(url);

    const ignoredomains = [
      "cdn.betterttv.net"
    ];

    return ignoredomains.some(domain => {
      if (u.host.indexOf(domain) !== -1)
        return true;
    });
  }

  posts.map(post => {
    return post.value.match(URLmatch)
  }).filter(item => {
    if (item !== null && !ignore(item[0])) {
      URLs.push(item[0])
    }
  })

  return URLs
}

module.exports = getURLfromPost
