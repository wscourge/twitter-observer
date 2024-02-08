type Tweet = {
  id: string
  isBlue: boolean
  urls: number
  hashtags: number
  mentions: number
  time: string
}

chrome.tabs.onUpdated.addListener((_id, _change, tab) => {
  const tabId = tab.id as number
  console.info('TAB ID:', tabId)

  setInterval(() => {
    chrome.scripting
      .executeScript({
        target: { tabId, allFrames: true },
        func: () => {
          const showns: Array<Tweet> = []
          const tweets = document.querySelectorAll(
            'div[aria-label="Timeline: Your Home Timeline"] div[data-testid="cellInnerDiv"]',
          )
          Array.from(tweets).forEach((tweet) => {
            const id = tweet
              .querySelector('article[role="article"]')
              ?.getAttribute('aria-labelledby') as string
            const time = tweet.querySelector('time[datetime]')?.getAttribute('datetime')
            const isBlue = tweet.innerHTML.includes('aria-label="Verified account"')
            let urls = 0
            let hashtags = 0
            let mentions = 0
            const text = tweet.querySelector('div[data-testid="tweetText"]')
            const links = text?.querySelectorAll('a[role="link"]')
            links?.forEach((link) => {
              if (link.getAttribute('href')?.startsWith('/hashtag/')) {
                hashtags += 1
              } else if (link.getAttribute('href')?.startsWith('https://')) {
                urls += 1
                // @ts-expect-error
              } else if (link?.innerText?.startsWith('@')) {
                mentions += 1
              }
            })
            if (time)
              showns.push({
                id,
                isBlue,
                urls,
                hashtags,
                mentions,
                time,
                // hash: base64(`${id}${time}`)
              })
          })

          return showns
        },
      })
      .then((injectionResults) => {
        const [{ result }] = injectionResults
        result?.forEach(({ id, ...record }) => {
          chrome.storage.local.set({ [id]: record })
        })
      })
  }, 1000)
})
