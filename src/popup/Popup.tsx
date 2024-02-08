import { useState, useEffect } from 'react'

import './Popup.css'
import BlueCheckMark from './IconBlueCheckMark'
import IconURL from './IconURL'
import IconHashtag from './IconHashtag'
import IconMention from './IconMention'
import IconRefresh from './IconRefresh'

// async function getCurrentTab() {
//   let queryOptions = { active: true, lastFocusedWindow: true }
//   let [tab] = await chrome.tabs.query(queryOptions)
//   return tab
// }
const percent = (partialValue: number, totalValue: number) =>
  Math.round((100 * partialValue) / totalValue)

export const Popup = () => {
  const [total, setTotal] = useState(0)
  const [blue, setBlue] = useState(0)
  const [urlsTweets, setUrlsTweets] = useState(0)
  const [urlsTotal, setUrlsTotal] = useState(0)
  const [hashtagsTweets, setHashtagsTweets] = useState(0)
  const [hashtagsTotal, setHashtagsTotal] = useState(0)
  const [mentionsTotal, setMentionsTotal] = useState(0)
  const [mentionsTweets, setMentionsTweets] = useState(0)

  const refresh = () => {
    chrome.storage.local.get(null, (result) => {
      const allTweets = Object.values(result)
      setTotal(allTweets.length)
      const allBlue = allTweets.filter((tweet) => tweet.isBlue).length
      setBlue(allBlue)
      const allUrlsTweets = allTweets.filter((tweet) => tweet.urls > 0).length
      const allUrlsTotal = allTweets.reduce((acc, tweet) => tweet.urls + acc, 0)
      setUrlsTweets(allUrlsTweets)
      setUrlsTotal(allUrlsTotal)
      const allHashtagsTweets = allTweets.filter((tweet) => tweet.hashtags > 0).length
      const allHashtagsTotal = allTweets.reduce((acc, tweet) => tweet.hashtags + acc, 0)
      setHashtagsTweets(allHashtagsTweets)
      setHashtagsTotal(allHashtagsTotal)
      const allMentionsTweets = allTweets.filter((tweet) => tweet.mentions > 0).length
      const allMentionsTotal = allTweets.reduce((acc, tweet) => tweet.mentions + acc, 0)
      setMentionsTweets(allMentionsTweets)
      setMentionsTotal(allMentionsTotal)
    })
  }

  useEffect(() => {
    refresh()
  })

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>
              <img src="./img/logo-34.png" width={24} height={24} />
            </th>
            <th>Metric</th>
            <th>Percentage</th>
            <th>Presence</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <BlueCheckMark />
            </td>
            <td>Blue</td>
            <td>{percent(blue, total)}%</td>
            <td>{blue}</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>
              <IconURL />
            </td>
            <td>Links</td>
            <td>{percent(urlsTweets, total)}%</td>
            <td>{urlsTweets}</td>
            <td>{urlsTotal}</td>
          </tr>
          <tr>
            <td>
              <IconHashtag />
            </td>
            <td>Hashtags</td>
            <td>{percent(hashtagsTweets, total)}%</td>
            <td>{hashtagsTweets}</td>
            <td>{hashtagsTotal}</td>
          </tr>
          <tr>
            <td>
              <IconMention />
            </td>
            <td>Mentions</td>
            <td>{percent(mentionsTweets, total)}%</td>
            <td>{mentionsTweets}</td>
            <td>{mentionsTotal}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>
              <button onClick={refresh}>
                <IconRefresh />
              </button>
            </th>
            <th colSpan={2}>Total: {total}</th>
            <th colSpan={2}>
              Made by <a href="https://twitter.com/viktorplaga">@viktorplaga</a>
            </th>
          </tr>
        </tfoot>
      </table>
    </main>
  )
}

export default Popup
