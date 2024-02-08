import COLORS from './colors'
export const IconMention = () => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4" stroke={COLORS.TWITTER_BLUE} stroke-width="2" />
      <path
        d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C14.2516 22 16.3295 21.2558 18.001 20"
        stroke={COLORS.TWITTER_BLUE}
        stroke-width="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 8V12C16 13 16.6 15 19 15C21.4 15 22 13 22 12"
        stroke={COLORS.TWITTER_BLUE}
        stroke-width="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default IconMention
