import { MediaTitle, SimulcastScheduleItem, ContinueWatchingItem, SensoryMood } from '../types/streaming';

// Sample royalty-free cinematic / anime trailer clips for realistic interactive video playback
const SAMPLE_VIDEOS = {
  cinemaSciFi: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  cinemaAction: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  animeSakuga: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  cyberpunk: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
};

export const MOCK_TITLES: MediaTitle[] = [
  {
    id: 'chrono-dynasty',
    title: 'Chrono Dynasty: Infinite Veil',
    kicker: 'SPBR PRESTIGE ORIGINAL • WORLD PREMIERE',
    category: 'movie',
    genre: ['Sci-Fi', 'Space Epic', 'Mystery'],
    rating: 9.9,
    criticScore: 99,
    matchPercentage: 99,
    specs: ['IMAX ENHANCED', '4K UHD', 'DOLBY VISION', 'ATMOS 9.1.4', '2H 48M', 'PG-13'],
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV2w7btT5gZOHsgbOQUfT7Oq9CyFpflAISkvoJptztjo9JiL96gY2x0XTwujESuMwuO5IPP-BOSSvN8yr6bYTqZybK8bU0Q5gljMXi1Z39Ls6PDd_-DinnoLiz_N6N8QimTpa7DJNK4OTvOahMjKH3MDwOoCeCq55Arjs8F8AAeERb5R2KXiTz2neTK2i9iR4AdVZmDqeSrb4bxy0xQ8FMFdbp8YhFmXF5vOSDhaaDoYQq8yoOrsHZ',
    backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzbe6eYIbPKNL3E9R_DFd3GpRchwiQErYKp0DunVD8THVWQPgEq-qQZ_GooMkXBQT2u_ydvoEQKJadke5mgZ1Fz9SYPper4ugS7NCJmEpK2LEjv7irDODwzaWfdHrJgoomsD_bDqI6VvSg0lXFHKrTsQz6vQF9M43hKUIk3VAMHtdyOSLmTtxPo8NOlJ8drYqJzr8Jrhxh2fHyE0MSSUkl-LgT2R5wVmIkPNHhEq1LFczQ-KEFgDW4',
    videoUrl: SAMPLE_VIDEOS.cinemaSciFi,
    synopsis: "When humanity's quantum singularity collides with a dormant celestial nexus, Captain Ronald Vance must navigate a shattering continuum of shattered timelines before the void devours the Sol cluster. Directed by visionary academy-honored directors in native 65mm IMAX.",
    duration: '2h 48m',
    contentRating: 'PG-13',
    studio: 'SPBR Studios Hollywood',
    releaseYear: 2025,
    moodTag: 'Mind-Bending',
    episodes: [
      {
        id: 'cd-pt1',
        episodeNumber: 1,
        title: 'Prologue: The Singularity Threshold',
        duration: '42m',
        thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzbe6eYIbPKNL3E9R_DFd3GpRchwiQErYKp0DunVD8THVWQPgEq-qQZ_GooMkXBQT2u_ydvoEQKJadke5mgZ1Fz9SYPper4ugS7NCJmEpK2LEjv7irDODwzaWfdHrJgoomsD_bDqI6VvSg0lXFHKrTsQz6vQF9M43hKUIk3VAMHtdyOSLmTtxPo8NOlJ8drYqJzr8Jrhxh2fHyE0MSSUkl-LgT2R5wVmIkPNHhEq1LFczQ-KEFgDW4',
        airDate: 'Oct 2025',
        synopsis: 'The deep-space probe Prometheus detects non-linear gravimetric distortions at the rim of the solar system.'
      },
      {
        id: 'cd-pt2',
        episodeNumber: 2,
        title: 'Act I: Shards of Obsidian',
        duration: '1h 05m',
        thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSGcs8gnqBJ7OCY-o_lgz-Ln8ycVc7uHfwdR8ARnV9fCajzX-8hHTGrMRxrht_7FfFfLssKc5RKLvOWgfHg7Vke1VhbNm_l34c6JanT-JPNhB43Jb0C-MLF3r4NPh_rhvsICTC6GhfIbgiuKmptcZE2f28PZjSpzGcBG_C9BQr4xRWlW9Xr47K2HAEfjo1NAOOHSNPIpivXDsPhnZTU9my_2cF6I9SB5aFLSn9EpDLiMW2d_efjMk3',
        airDate: 'Oct 2025',
        synopsis: 'Captain Vance enters the event horizon and experiences parallel memories from unlived lives.'
      }
    ]
  },
  {
    id: 'blade-celestial-gods',
    title: 'Blade of the Celestial Gods',
    kicker: 'SPBR EXCLUSIVE SIMULCAST • UFOTABLE & MAPPA COLLAB',
    category: 'anime',
    genre: ['Shonen', 'Dark Fantasy', 'Sakuga Action'],
    rating: 9.48,
    criticScore: 98,
    matchPercentage: 99,
    specs: ['DAY-AND-DATE TOKYO', '4K 60FPS SAKUGA', 'JAPANESE & DUAL DUB', 'EPISODE 14 PREMIERE'],
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4SGhR-QShMG5uZfpxjpONmtD3KGKRbP_6aw3240iNCBZQOrMG7JuH78H5UtQeoP2ipMfS2VhtpPkJbAEKrLjPXZpKDXwHN5RaGW8kdCsUO_nBbNsX4yHnlOIWLOd6FvmmrefjQGaj5iMMpV1n8btrdtmRsyNBPI0zar9o_wh0mdG8yxp-O7BwI-vmQMJCg9l6Ug4iL87nmsw24ZMOK69SqgyYX_b4i_NMoANhGgFt8ofUc0dKnN-8',
    backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0WJRpmJRnt4AxU-NHx50nFlprRCoz3hVyu1Lg6tfPOiuQ4j1tawb3LFcjWTcHweiDXcTvpnUPaZBSquC81Cm7cMCSdV2DXAxqJ_c-4xnoZXDkjmdwh-K88ljOUbgiQ5DK2WNcoC_fS3xwLWsgvtOyR39-6-ELjDFePPYpvORPeVB3mATQ5fI2Jy7Cv7hjQQcchl82Kw8fkeUfMmWghu-nj7-gsQ-7TFDqNKFr6S7F8tRTQ9d0nQ9x',
    videoUrl: SAMPLE_VIDEOS.animeSakuga,
    synopsis: 'Ren Takahashi unlocks the eleventh stance of the astral katana as the six dark deities descend upon Neo-Kyoto. Featuring an original spatial score by Kevin Penkin and Hiroyuki Sawano in master uncompressed 24-bit audio.',
    duration: '24m per ep',
    contentRating: 'TV-14',
    studio: 'Ufotable x MAPPA',
    releaseYear: 2025,
    isSimulcast: true,
    simulcastEpisode: 'Episode 14',
    broadcastTime: '23:30 JST • TOKYO MX',
    moodTag: 'Adrenaline Overload',
    episodes: [
      {
        id: 'bcg-ep12',
        episodeNumber: 12,
        title: 'The Crimson Torii Gate',
        duration: '24m',
        thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4SGhR-QShMG5uZfpxjpONmtD3KGKRbP_6aw3240iNCBZQOrMG7JuH78H5UtQeoP2ipMfS2VhtpPkJbAEKrLjPXZpKDXwHN5RaGW8kdCsUO_nBbNsX4yHnlOIWLOd6FvmmrefjQGaj5iMMpV1n8btrdtmRsyNBPI0zar9o_wh0mdG8yxp-O7BwI-vmQMJCg9l6Ug4iL87nmsw24ZMOK69SqgyYX_b4i_NMoANhGgFt8ofUc0dKnN-8',
        airDate: 'Oct 14, 2025',
        synopsis: 'Ren confronts the First General at the shrine gates as thunder rains down.'
      },
      {
        id: 'bcg-ep13',
        episodeNumber: 13,
        title: 'Astral Resonance',
        duration: '24m',
        thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF_t0Qlx13jeCXWSRD9ebf36QpOa3bw2e7XqULtAOzq0py0HWmfvzK-KWCMLuW62-c9VoUuNXvJNUzaxKvRLUmfjyDr6oSBaGXmiJG-H_QyTOsXBurBIalkUfAKh1Nkzq9I3mLi5KWj3xBlXqQ148iUsh-oi3b6DBlx3i9hwU40VpnjAGblWQfHk7w4pDMToVdzDHCf0vE-8oW6cdjrU-DBEb08QQDCANkBy7_0lqZz-nJ90mgBsIa',
        airDate: 'Oct 21, 2025',
        synopsis: 'The katana connects to the spirit ley lines, shattering the surrounding barrier.'
      },
      {
        id: 'bcg-ep14',
        episodeNumber: 14,
        title: 'Eleventh Stance: Cosmic Severance',
        duration: '26m',
        thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0WJRpmJRnt4AxU-NHx50nFlprRCoz3hVyu1Lg6tfPOiuQ4j1tawb3LFcjWTcHweiDXcTvpnUPaZBSquC81Cm7cMCSdV2DXAxqJ_c-4xnoZXDkjmdwh-K88ljOUbgiQ5DK2WNcoC_fS3xwLWsgvtOyR39-6-ELjDFePPYpvORPeVB3mATQ5fI2Jy7Cv7hjQQcchl82Kw8fkeUfMmWghu-nj7-gsQ-7TFDqNKFr6S7F8tRTQ9d0nQ9x',
        airDate: 'Oct 28, 2025',
        synopsis: 'World Premiere simulcast: Ren awakens the ultimate technique against Malakor.'
      }
    ]
  },
  {
    id: 'vortex-protocol',
    title: 'Vortex Protocol: Zero',
    category: 'movie',
    genre: ['Cyberpunk', 'Mystery', 'Tech Thriller'],
    rating: 9.3,
    criticScore: 95,
    matchPercentage: 97,
    specs: ['4K MASTER', 'ATMOS 9.1', 'HDR10+', '1H 58M'],
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaOgniveCkigAEWd0tgny_xNih_xLsSug9GkwI4LKuGoVTJB_oI7nI307Nd-N5D9wepA33OMUK9jfhsRMe8t113elKe421L8DD5HYHawaXWvZ21H_8AxhGwXkR2zdv7rdAjk-yj2_O5wbIp41tBlAaf9W9AsTQeXS6mo3PhI0BOq2w5iyjFQnL63Q7evd34AucalWrVf5vHmjMwwFO0JVyhQ8iSYJV910iKu67GooNLJF440qU6OCy',
    backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaOgniveCkigAEWd0tgny_xNih_xLsSug9GkwI4LKuGoVTJB_oI7nI307Nd-N5D9wepA33OMUK9jfhsRMe8t113elKe421L8DD5HYHawaXWvZ21H_8AxhGwXkR2zdv7rdAjk-yj2_O5wbIp41tBlAaf9W9AsTQeXS6mo3PhI0BOq2w5iyjFQnL63Q7evd34AucalWrVf5vHmjMwwFO0JVyhQ8iSYJV910iKu67GooNLJF440qU6OCy',
    videoUrl: SAMPLE_VIDEOS.cyberpunk,
    synopsis: 'High-stakes cyber thriller inside a glass penthouse overlooking a dark rain-soaked skyscraper district with holographic data streams and biometric espionage.',
    duration: '1h 58m',
    contentRating: 'R',
    studio: 'SPBR Neo Noir Unit',
    releaseYear: 2024,
    moodTag: 'Late Night Thriller'
  },
  {
    id: 'shadow-sovereign',
    title: 'Shadow Sovereign: Ascension',
    category: 'anime',
    genre: ['Dark Fantasy', 'Action', 'Supernatural'],
    rating: 9.14,
    criticScore: 94,
    matchPercentage: 98,
    specs: ['UFOTABLE', 'DOLBY ATMOS', 'HDR10+', '4K SAKUGA'],
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMrBBfqC8rJiE_U04j3Qa7FhdY0IVTZkoFYUH-16uzUL41E-0x6-pIbqVXtN2wKn0R0UX53uuB5vux8DXtFDlGdXByxqIbvNOr7F0zgrJ_udJe5wFTz-9X_5oUJ8Ll-vLdFwZXPNrrs9p71_PhAqMDtYU0apjyWdIwl1RHcSTONNamgVcwV0utadRYq0ngekCAj9vyU026JkM46Gmqmqre0va4PaWNyvqCnjGAMs5rRLs2IUvGDhUK',
    backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMrBBfqC8rJiE_U04j3Qa7FhdY0IVTZkoFYUH-16uzUL41E-0x6-pIbqVXtN2wKn0R0UX53uuB5vux8DXtFDlGdXByxqIbvNOr7F0zgrJ_udJe5wFTz-9X_5oUJ8Ll-vLdFwZXPNrrs9p71_PhAqMDtYU0apjyWdIwl1RHcSTONNamgVcwV0utadRYq0ngekCAj9vyU026JkM46Gmqmqre0va4PaWNyvqCnjGAMs5rRLs2IUvGDhUK',
    videoUrl: SAMPLE_VIDEOS.animeSakuga,
    synopsis: 'A resurrected shadow monarch with luminescent dual purple blades reclaims the ruined floating citadels in the celestial realm.',
    duration: '24m per ep',
    contentRating: 'TV-MA',
    studio: 'Ufotable',
    releaseYear: 2025,
    isSimulcast: true,
    simulcastEpisode: 'Ep 12 Finale',
    moodTag: 'Adrenaline Overload'
  },
  {
    id: 'neo-shinjuku-2099',
    title: 'Neo-Shinjuku 2099',
    category: 'anime',
    genre: ['Cyberpunk', 'Mecha', 'Sci-Fi'],
    rating: 8.92,
    criticScore: 92,
    matchPercentage: 96,
    specs: ['TRIGGER', 'AV1 60FPS', 'SPATIAL 3D', 'ATMOS'],
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn1XMw6nvlptjMEnDvr2a6V_ihTtJ_K4n_9e4I4krQh0MPjyP59WT9Vy8ctDPJDc_HnKsfxNrEiqmxsyfGowX98Cqbnngz2nx1bSmb56rmcPWitKl_pFfYRT9WqKUyUMt2JOUlWQv0Pdy2Whu1gBVt3q_rLd0n8eO6OjGZhIg6WQkxV5OcwXBBCJQIzPeCrjZNhIguqy53hP-tQEQDApzA9m8ndJXSPqUQzu7O8EuY81JLaZizAsC2',
    backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn1XMw6nvlptjMEnDvr2a6V_ihTtJ_K4n_9e4I4krQh0MPjyP59WT9Vy8ctDPJDc_HnKsfxNrEiqmxsyfGowX98Cqbnngz2nx1bSmb56rmcPWitKl_pFfYRT9WqKUyUMt2JOUlWQv0Pdy2Whu1gBVt3q_rLd0n8eO6OjGZhIg6WQkxV5OcwXBBCJQIzPeCrjZNhIguqy53hP-tQEQDApzA9m8ndJXSPqUQzu7O8EuY81JLaZizAsC2',
    videoUrl: SAMPLE_VIDEOS.cyberpunk,
    synopsis: 'A rogue neural hacker infiltrates the autonomous drone grid across rainy Tokyo sky-lanes while battling augmented corporate enforcers.',
    duration: '24m per ep',
    contentRating: 'TV-14',
    studio: 'Studio TRIGGER',
    releaseYear: 2025,
    isSimulcast: true,
    simulcastEpisode: 'Simulcast Premiere',
    moodTag: 'Neon Dystopia'
  },
  {
    id: 'whispers-in-the-void',
    title: 'Whispers in the Void',
    category: 'movie',
    genre: ['Psychological Noir', 'Horror', 'Mystery'],
    rating: 9.7,
    criticScore: 97,
    matchPercentage: 98,
    specs: ['IMAX 4K', 'DOLBY VISION', 'DCI-P3 MASTER', '2H 02M'],
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3g80cdEPV5GfNamjY1ynRSDfWTOacjCt6OI76CdR6D7ng3I33UxUIGDhmidOC7erRRL8I1jeZZvsn_IuBJnXmPtzmoUtxad-rBE2oFhOcbTN30N0O_WkXb5eOowpMn2gM1iMB0qhh_wLHFsvajnG6jFazRB-EBH--ySjcqKJ5KOn2mgTj4KWQMCsHEV0Bt_nbBe3YncIuDYdaEum95UkWddnVcP8cQBnw4TJqEkBwFK5XtvmzpQMn',
    backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJivZaV-eJSw-ZBbeoBV0_rz76OWnLcCN3-HOweb613BZcP5JQLkrrIXQ2FIiPEht_N41BlsrdPRHPXF5VWRR1C2WwvKNejQjllBhuiSGVMJ_aCS8LNn5VVmE2YdBxbJCv7bo2nIm1zYQlMo4oP5Hgpsn3TMdq7UhXXeH-_INrn0FqDxC7ZLYxzxiH__BCS4kC5ecPY0f641B6DcbzFXpMiEEkW9H7ERE9fBnHra_V-t_sryMI9Ax_',
    videoUrl: SAMPLE_VIDEOS.cinemaSciFi,
    synopsis: 'In an isolated Victorian research station, shadows bend toward an antique dark mirror that broadcasts thoughts of anyone standing nearby.',
    duration: '2h 02m',
    contentRating: 'R',
    studio: 'SPBR Dark Horizon',
    releaseYear: 2024,
    moodTag: 'Late Night Thriller'
  },
  {
    id: 'apex-dragon-rebirth',
    title: 'Apex Dragon: Rebirth',
    category: 'anime',
    genre: ['Action Shonen', 'Fantasy', 'Supernatural'],
    rating: 8.65,
    criticScore: 91,
    matchPercentage: 94,
    specs: ['BONES', '4K 60FPS', 'DOLBY ATMOS', 'UNRATED'],
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAobnWUgryLPGlBpBRgd1wta3ex3i4wjiz7OUSmXEYUxP-319g0-xmzf_ZLRzE2Ihzq4eeL7lOytooEyUJdDbPx8__qnRQtDyliBHmKLn65vTWxkDokkfG01oVahpGN31Y9_IZIisOVVpGilxbPx0p7YgZPvMeaiDL8fhhPzgO0M4xBvvIv1tt1BcRLjIgbGqEGe_u_eo3JHWj6dj6zwBBUPo7xcfuvWPLWHUOJnDhpYqt5pMmYbUaQ',
    backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAobnWUgryLPGlBpBRgd1wta3ex3i4wjiz7OUSmXEYUxP-319g0-xmzf_ZLRzE2Ihzq4eeL7lOytooEyUJdDbPx8__qnRQtDyliBHmKLn65vTWxkDokkfG01oVahpGN31Y9_IZIisOVVpGilxbPx0p7YgZPvMeaiDL8fhhPzgO0M4xBvvIv1tt1BcRLjIgbGqEGe_u_eo3JHWj6dj6zwBBUPo7xcfuvWPLWHUOJnDhpYqt5pMmYbUaQ',
    videoUrl: SAMPLE_VIDEOS.animeSakuga,
    synopsis: 'A fiery martial artist unleashes shockwaves through crystalline subterranean caverns as two primordial dragon deities awaken.',
    duration: '23m per ep',
    contentRating: 'TV-14',
    studio: 'Studio BONES',
    releaseYear: 2025,
    isSimulcast: true,
    simulcastEpisode: 'Battle Sakuga Arc',
    moodTag: 'Adrenaline Overload'
  },
  {
    id: 'arcana-grimoire-zero',
    title: 'Arcana: Grimoire Zero',
    category: 'anime',
    genre: ['Dark Fantasy', 'Magic', 'Adventure'],
    rating: 8.78,
    criticScore: 89,
    matchPercentage: 93,
    specs: ['WIT STUDIO', 'DARK FANTASY', '4K MASTER', 'UNCENSORED'],
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkLZBz7-F7mEALy9tOuji64FKzLsGoDes1vOvODBkFEXp8AGuFbquybimH4NLR-3w-7vkOd2mb_WHn1LdZSdjSVj--cvO9HIid2I0CrfPQqZoOF8dB_CjWYjPx-2bcYAsrUr7VaxKxFK3wWgL5cTiBh51zyIRRx1-DVBjO4jiVb8qXMLv3ozurvQVq37qAkULEbhx2xpRj4LRBSiq7UGj26-OAfxgLFptLZqizJ9hKDxAV2lFdIIbj',
    backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkLZBz7-F7mEALy9tOuji64FKzLsGoDes1vOvODBkFEXp8AGuFbquybimH4NLR-3w-7vkOd2mb_WHn1LdZSdjSVj--cvO9HIid2I0CrfPQqZoOF8dB_CjWYjPx-2bcYAsrUr7VaxKxFK3wWgL5cTiBh51zyIRRx1-DVBjO4jiVb8qXMLv3ozurvQVq37qAkULEbhx2xpRj4LRBSiq7UGj26-OAfxgLFptLZqizJ9hKDxAV2lFdIIbj',
    videoUrl: SAMPLE_VIDEOS.animeSakuga,
    synopsis: 'An archmage apprentice discovers forbidden celestial parchment inscribed in the blood of ancient gods.',
    duration: '25m per ep',
    contentRating: 'TV-MA',
    studio: 'WIT Studio',
    releaseYear: 2025,
    isSimulcast: true,
    simulcastEpisode: 'Ep 11 Uncensored',
    moodTag: 'Epic Worldbuilders'
  },
  {
    id: 'the-geneva-cipher',
    title: 'The Geneva Cipher',
    category: 'movie',
    genre: ['Psychological Noir', 'Espionage', 'Drama'],
    rating: 9.5,
    criticScore: 97,
    matchPercentage: 96,
    specs: ['DIRECTORS CUT', '4K MASTER', 'ATMOS 9.1', '2H 14M'],
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJivZaV-eJSw-ZBbeoBV0_rz76OWnLcCN3-HOweb613BZcP5JQLkrrIXQ2FIiPEht_N41BlsrdPRHPXF5VWRR1C2WwvKNejQjllBhuiSGVMJ_aCS8LNn5VVmE2YdBxbJCv7bo2nIm1zYQlMo4oP5Hgpsn3TMdq7UhXXeH-_INrn0FqDxC7ZLYxzxiH__BCS4kC5ecPY0f641B6DcbzFXpMiEEkW9H7ERE9fBnHra_V-t_sryMI9Ax_',
    backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJivZaV-eJSw-ZBbeoBV0_rz76OWnLcCN3-HOweb613BZcP5JQLkrrIXQ2FIiPEht_N41BlsrdPRHPXF5VWRR1C2WwvKNejQjllBhuiSGVMJ_aCS8LNn5VVmE2YdBxbJCv7bo2nIm1zYQlMo4oP5Hgpsn3TMdq7UhXXeH-_INrn0FqDxC7ZLYxzxiH__BCS4kC5ecPY0f641B6DcbzFXpMiEEkW9H7ERE9fBnHra_V-t_sryMI9Ax_',
    videoUrl: SAMPLE_VIDEOS.cinemaAction,
    synopsis: 'Dark psychological neo-noir thriller inside an antique luxury salon lit by amber lamplight where an international diplomat plays high-stakes chess for global security keys.',
    duration: '2h 14m',
    contentRating: 'R',
    studio: 'SPBR Prestige Films',
    releaseYear: 2024,
    moodTag: 'Late Night Thriller'
  },
  {
    id: 'aether-event-horizon',
    title: 'Aether: Beyond Event Horizon',
    category: 'movie',
    genre: ['Sci-Fi', 'Speculative', 'Adventure'],
    rating: 9.8,
    criticScore: 99,
    matchPercentage: 99,
    specs: ['IMAX MASTER', 'DOLBY VISION', 'ATMOS 9.1.4', '2H 31M'],
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSGcs8gnqBJ7OCY-o_lgz-Ln8ycVc7uHfwdR8ARnV9fCajzX-8hHTGrMRxrht_7FfFfLssKc5RKLvOWgfHg7Vke1VhbNm_l34c6JanT-JPNhB43Jb0C-MLF3r4NPh_rhvsICTC6GhfIbgiuKmptcZE2f28PZjSpzGcBG_C9BQr4xRWlW9Xr47K2HAEfjo1NAOOHSNPIpivXDsPhnZTU9my_2cF6I9SB5aFLSn9EpDLiMW2d_efjMk3',
    backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSGcs8gnqBJ7OCY-o_lgz-Ln8ycVc7uHfwdR8ARnV9fCajzX-8hHTGrMRxrht_7FfFfLssKc5RKLvOWgfHg7Vke1VhbNm_l34c6JanT-JPNhB43Jb0C-MLF3r4NPh_rhvsICTC6GhfIbgiuKmptcZE2f28PZjSpzGcBG_C9BQr4xRWlW9Xr47K2HAEfjo1NAOOHSNPIpivXDsPhnZTU9my_2cF6I9SB5aFLSn9EpDLiMW2d_efjMk3',
    videoUrl: SAMPLE_VIDEOS.cinemaSciFi,
    synopsis: 'A deep-space exploratory crew encounters a sentient crystalline gravity anomaly that mirrors human consciousness and unearths dormant memories.',
    duration: '2h 31m',
    contentRating: 'PG-13',
    studio: 'Paramount x SPBR',
    releaseYear: 2025,
    moodTag: 'Epic Worldbuilders'
  },
  {
    id: 'the-prague-syndicate',
    title: 'The Prague Syndicate',
    category: 'movie',
    genre: ['Psychological Noir', 'Crime', 'Thriller'],
    rating: 9.4,
    criticScore: 94,
    matchPercentage: 95,
    specs: ['DOLBY VISION', '4K UHD', 'ATMOS 9.1', '1H 54M'],
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpyn-HznAwwCGHxxpdof-trzY4DBwm4HZeuComoUM2b-tsUK0GD0r8wAoH654ER4zkUTBtDakQq0TNI56lvMR5x8fIw-8yd_9pj2uthnmCKUCt4T6Ehhh60waNAWhZREM3wvQbG3a2h2IlIrsEZBsWKHaX5JS9Yp-5X5amRyKoLjHOYpDwtnZXpJr8_AhgZJTKWro15ZUFie37O_a_m7ZSAH_M7RjGbk8RHOi45fnkq2rMMVyaD0SC',
    backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpyn-HznAwwCGHxxpdof-trzY4DBwm4HZeuComoUM2b-tsUK0GD0r8wAoH654ER4zkUTBtDakQq0TNI56lvMR5x8fIw-8yd_9pj2uthnmCKUCt4T6Ehhh60waNAWhZREM3wvQbG3a2h2IlIrsEZBsWKHaX5JS9Yp-5X5amRyKoLjHOYpDwtnZXpJr8_AhgZJTKWro15ZUFie37O_a_m7ZSAH_M7RjGbk8RHOi45fnkq2rMMVyaD0SC',
    videoUrl: SAMPLE_VIDEOS.cinemaAction,
    synopsis: 'A master cryptographic heist turns into an existential manhunt across the underbelly of Eastern Europe through cobblestone alleys lit by amber gaslamps.',
    duration: '1h 54m',
    contentRating: 'R',
    studio: 'Studio Canal & SPBR',
    releaseYear: 2024,
    moodTag: 'Late Night Thriller'
  },
  {
    id: 'velocity-ridge-ghosts',
    title: 'Velocity: Ridge of Ghosts',
    category: 'movie',
    genre: ['High-Octane Action', 'Racing', 'Drama'],
    rating: 9.6,
    criticScore: 96,
    matchPercentage: 97,
    specs: ['ATMOS 9.1', 'IMAX 65MM', '60 FPS', '2H 10M'],
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACp_u1xUB_56GlLhojKSqs05BSe6cwbZ2qEXCwXAAci4EUd7DSBRc-VR-1xubEbVeEVWuvOdSPguxxSU3TmNjWxJnFT6fbtbGBRQAmKWgoLxJytCPE7N3E9Yz0PoDwc9P4s8lVswJrk4YlG3W4a9EvpUwB0ponkNQTzAnEjSzokvfqoKN-wxCZwyTJ8yXO5bHQXQ8CRvwmUKN3o3RWU167Z4FTEf12_kz_LIvIqJOCN8sjEpekxcjc',
    backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACp_u1xUB_56GlLhojKSqs05BSe6cwbZ2qEXCwXAAci4EUd7DSBRc-VR-1xubEbVeEVWuvOdSPguxxSU3TmNjWxJnFT6fbtbGBRQAmKWgoLxJytCPE7N3E9Yz0PoDwc9P4s8lVswJrk4YlG3W4a9EvpUwB0ponkNQTzAnEjSzokvfqoKN-wxCZwyTJ8yXO5bHQXQ8CRvwmUKN3o3RWU167Z4FTEf12_kz_LIvIqJOCN8sjEpekxcjc',
    videoUrl: SAMPLE_VIDEOS.cinemaAction,
    synopsis: 'Underground prototype racers wager their lives in the worlds most perilous unmapped mountain circuit as twin hypercars drift cliff edges at sunset.',
    duration: '2h 10m',
    contentRating: 'PG-13',
    studio: 'Legendary x SPBR',
    releaseYear: 2025,
    moodTag: 'Adrenaline Overload'
  },
  {
    id: 'the-iron-ronin',
    title: 'The Iron Ronin',
    category: 'movie',
    genre: ['Epic Drama', 'Martial Arts', 'Historical'],
    rating: 9.8,
    criticScore: 98,
    matchPercentage: 99,
    specs: ['SPBR EXCLUSIVE', '4K UHD', 'DIRECTORS CUT', '2H 22M'],
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTXlKjVkzr1zCs0cBmflHIg330kGxfBHHf6ItR8wbDphIYxEhc0Zflr5BHg6xufbj-V8X1Tkq-7BJmm1XPDQmdXYCsTB3sM9a98wK0C2vhKrfVC_8hcRL_TDM0sBbo9FDMOcMlGm8ro6f5JQdP-GG1_osrM6SfqQAka7XLAoVmeLFS6Tivg0UGa8ZUtC3ty9G_Yw3R2N9CROG5_VMML1Y_y2y40vc8S8LgbtTiWQ5UDIcZsz8mjUs0',
    backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTXlKjVkzr1zCs0cBmflHIg330kGxfBHHf6ItR8wbDphIYxEhc0Zflr5BHg6xufbj-V8X1Tkq-7BJmm1XPDQmdXYCsTB3sM9a98wK0C2vhKrfVC_8hcRL_TDM0sBbo9FDMOcMlGm8ro6f5JQdP-GG1_osrM6SfqQAka7XLAoVmeLFS6Tivg0UGa8ZUtC3ty9G_Yw3R2N9CROG5_VMML1Y_y2y40vc8S8LgbtTiWQ5UDIcZsz8mjUs0',
    videoUrl: SAMPLE_VIDEOS.cinemaAction,
    synopsis: 'The tragic chronicle of Lord Jin Sakai defending the mountain fortress during the brutal winter of 1603 amid burning bamboo forests and floating embers.',
    duration: '2h 22m',
    contentRating: 'R',
    studio: 'Toho x SPBR',
    releaseYear: 2024,
    moodTag: 'Emotional Rollercoaster'
  }
];

export const CONTINUE_WATCHING_DATA: ContinueWatchingItem[] = [
  {
    id: 'cw-1',
    titleId: 'vortex-protocol',
    title: 'Vortex Protocol: Zero',
    subtitle: 'S1 : E8 • The Quantum Vault',
    progressPercent: 68,
    remainingTime: '42m left',
    badge: '4K MASTER',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaOgniveCkigAEWd0tgny_xNih_xLsSug9GkwI4LKuGoVTJB_oI7nI307Nd-N5D9wepA33OMUK9jfhsRMe8t113elKe421L8DD5HYHawaXWvZ21H_8AxhGwXkR2zdv7rdAjk-yj2_O5wbIp41tBlAaf9W9AsTQeXS6mo3PhI0BOq2w5iyjFQnL63Q7evd34AucalWrVf5vHmjMwwFO0JVyhQ8iSYJV910iKu67GooNLJF440qU6OCy',
    videoUrl: SAMPLE_VIDEOS.cyberpunk,
    category: 'movie'
  },
  {
    id: 'cw-2',
    titleId: 'shadow-sovereign',
    title: 'Shadow Sovereign: Ascension',
    subtitle: 'S2 : E4 • Domain of the Monolith',
    progressPercent: 82,
    remainingTime: '12m left',
    badge: 'ANIME SIMULCAST',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMrBBfqC8rJiE_U04j3Qa7FhdY0IVTZkoFYUH-16uzUL41E-0x6-pIbqVXtN2wKn0R0UX53uuB5vux8DXtFDlGdXByxqIbvNOr7F0zgrJ_udJe5wFTz-9X_5oUJ8Ll-vLdFwZXPNrrs9p71_PhAqMDtYU0apjyWdIwl1RHcSTONNamgVcwV0utadRYq0ngekCAj9vyU026JkM46Gmqmqre0va4PaWNyvqCnjGAMs5rRLs2IUvGDhUK',
    videoUrl: SAMPLE_VIDEOS.animeSakuga,
    category: 'anime'
  },
  {
    id: 'cw-3',
    titleId: 'the-geneva-cipher',
    title: 'The Geneva Cipher',
    subtitle: 'Feature Film • SPBR Master Cut',
    progressPercent: 45,
    remainingTime: '1h 14m left',
    badge: 'DIRECTORS CUT',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJivZaV-eJSw-ZBbeoBV0_rz76OWnLcCN3-HOweb613BZcP5JQLkrrIXQ2FIiPEht_N41BlsrdPRHPXF5VWRR1C2WwvKNejQjllBhuiSGVMJ_aCS8LNn5VVmE2YdBxbJCv7bo2nIm1zYQlMo4oP5Hgpsn3TMdq7UhXXeH-_INrn0FqDxC7ZLYxzxiH__BCS4kC5ecPY0f641B6DcbzFXpMiEEkW9H7ERE9fBnHra_V-t_sryMI9Ax_',
    videoUrl: SAMPLE_VIDEOS.cinemaAction,
    category: 'movie'
  }
];

export const SCHEDULE_DATA: SimulcastScheduleItem[] = [
  {
    id: 'sch-fri-1',
    day: 'FRI',
    timeJST: '23:30 JST',
    network: 'TOKYO MX',
    title: 'Blade of Celestial Gods',
    episode: 'Episode 14 • Sub & Dub',
    specs: '4K 60FPS • Dolby Atmos',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF_t0Qlx13jeCXWSRD9ebf36QpOa3bw2e7XqULtAOzq0py0HWmfvzK-KWCMLuW62-c9VoUuNXvJNUzaxKvRLUmfjyDr6oSBaGXmiJG-H_QyTOsXBurBIalkUfAKh1Nkzq9I3mLi5KWj3xBlXqQ148iUsh-oi3b6DBlx3i9hwU40VpnjAGblWQfHk7w4pDMToVdzDHCf0vE-8oW6cdjrU-DBEb08QQDCANkBy7_0lqZz-nJ90mgBsIa',
    isLive: true
  },
  {
    id: 'sch-fri-2',
    day: 'FRI',
    timeJST: '00:15 JST',
    network: 'BS11',
    title: 'Mecha Re:Genesis X',
    episode: 'Episode 7 • 4K 60FPS',
    specs: 'HDR10+ • Lossless 24-bit',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqsfGfqwcBUvXl4pE9VTE_093fzh5AZcc9uu6Rsybdfb5kqP-iBObkkNIH0h3fEi6TkGBs8lGAdiVS9JTkdCmQs7y40PIXaJssV_02Mr4afH0yvtjy2FLM5S7kxF-VXiowDsBgjsbpyh5qJyLkvYZ-R4rpxUxu9j19jC3VSuuJnFdoEP76-lUrUI9bLzemPfcu7pVi49VuhU9EYsOr3KKfOkrRednMwfLqUUXY5-dlcaqaVR7WLxB6',
    isLive: false
  },
  {
    id: 'sch-fri-3',
    day: 'FRI',
    timeJST: '01:00 JST',
    network: 'TV TOKYO',
    title: 'Arcana: Grimoire Zero',
    episode: 'Episode 11 • Uncensored Master',
    specs: 'Dark Fantasy • 4K Master',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkLZBz7-F7mEALy9tOuji64FKzLsGoDes1vOvODBkFEXp8AGuFbquybimH4NLR-3w-7vkOd2mb_WHn1LdZSdjSVj--cvO9HIid2I0CrfPQqZoOF8dB_CjWYjPx-2bcYAsrUr7VaxKxFK3wWgL5cTiBh51zyIRRx1-DVBjO4jiVb8qXMLv3ozurvQVq37qAkULEbhx2xpRj4LRBSiq7UGj26-OAfxgLFptLZqizJ9hKDxAV2lFdIIbj',
    isLive: false
  },
  // Monday
  {
    id: 'sch-mon-1',
    day: 'MON',
    timeJST: '22:00 JST',
    network: 'AT-X',
    title: 'Chronos Valkyrie',
    episode: 'Episode 4 • Uncut',
    specs: '4K Sakuga',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0WJRpmJRnt4AxU-NHx50nFlprRCoz3hVyu1Lg6tfPOiuQ4j1tawb3LFcjWTcHweiDXcTvpnUPaZBSquC81Cm7cMCSdV2DXAxqJ_c-4xnoZXDkjmdwh-K88ljOUbgiQ5DK2WNcoC_fS3xwLWsgvtOyR39-6-ELjDFePPYpvORPeVB3mATQ5fI2Jy7Cv7hjQQcchl82Kw8fkeUfMmWghu-nj7-gsQ-7TFDqNKFr6S7F8tRTQ9d0nQ9x'
  },
  // Saturday
  {
    id: 'sch-sat-1',
    day: 'SAT',
    timeJST: '23:00 JST',
    network: 'TOKYO MX',
    title: 'Apex Dragon: Rebirth',
    episode: 'Episode 15 • Climax Duel',
    specs: '60FPS • Dolby 9.1',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAobnWUgryLPGlBpBRgd1wta3ex3i4wjiz7OUSmXEYUxP-319g0-xmzf_ZLRzE2Ihzq4eeL7lOytooEyUJdDbPx8__qnRQtDyliBHmKLn65vTWxkDokkfG01oVahpGN31Y9_IZIisOVVpGilxbPx0p7YgZPvMeaiDL8fhhPzgO0M4xBvvIv1tt1BcRLjIgbGqEGe_u_eo3JHWj6dj6zwBBUPo7xcfuvWPLWHUOJnDhpYqt5pMmYbUaQ'
  },
  // Sunday
  {
    id: 'sch-sun-1',
    day: 'SUN',
    timeJST: '17:30 JST',
    network: 'MBS',
    title: 'Solar Sentinel: Core',
    episode: 'Episode 8 • Orbital Strike',
    specs: 'IMAX Enhanced 4K',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaOgniveCkigAEWd0tgny_xNih_xLsSug9GkwI4LKuGoVTJB_oI7nI307Nd-N5D9wepA33OMUK9jfhsRMe8t113elKe421L8DD5HYHawaXWvZ21H_8AxhGwXkR2zdv7rdAjk-yj2_O5wbIp41tBlAaf9W9AsTQeXS6mo3PhI0BOq2w5iyjFQnL63Q7evd34AucalWrVf5vHmjMwwFO0JVyhQ8iSYJV910iKu67GooNLJF440qU6OCy'
  }
];

export const SENSORY_MOODS: SensoryMood[] = [
  {
    id: 'mood-adrenaline',
    name: 'Adrenaline Overload / Sakuga Battles',
    badge: '140+ BPM KINETIC',
    iconName: 'bolt',
    description: 'Pure combat choreography, blistering orbital dogfights, and relentless sakuga showdowns.',
    titleCount: 184,
    soundCalib: '9.1.4 Surround Calibrated',
    accentColor: '#e50914',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQj-ELn2A7B7gyPG56cezOgn7MhiXC-aGi4LDhwOY0o4HKdNjHxgHaKGmVh-Pp7eJ-GEwNTmJQtoOEp_dGKmt-VBwKkwJ63kXL1LZDPG5o8oGsNGE2cfTd381aZFWyOUeCVfU1h3_83dh6zLpP0eAWtJdu3DlWj8FSV41ah_A7exfMhZ2HTcGOjSAsX0Pl2w6FYDRxkex6ER7UrAMtkONwkWzIJyks1kNW-fG4-3GSieP0HiSjSUxb'
  },
  {
    id: 'mood-thriller',
    name: 'Late Night Heart Racers & Thrillers',
    badge: 'TENSION PULSE',
    iconName: 'visibility',
    description: 'Claustrophobic psychological cat-and-mouse thrillers designed for zero-distraction dark rooms.',
    titleCount: 112,
    soundCalib: 'OLED True Black Master',
    accentColor: '#6807ba',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoS7gyT8-0b2p-zzAsM_DBJ09zlr_-LG3MdN8W99ExlQ48LAs0ibQoUuksmwvzqA9d4fNFB0qT8zJDIPmg5v-7IHDeL_ZVKQrhx1WL5wxw0_szsrGZSPM0KISS6MY1YtIXngvgMhVIAxSkOrIay8vq84rN-cuycokzOk7MBVX1nQpszAh2AGQlU71DMReE9sgNIlTKcfP50ikofbprp0cvFMyWbNNPi5mRAuQqN3Lxz5sOuOflBB65'
  },
  {
    id: 'mood-cyberpunk',
    name: 'Neon Dystopia / Cyberpunk & Noir',
    badge: 'CYBER SYNTH',
    iconName: 'terminal',
    description: 'Android consciousness, corporate syndicates, analog synthwave scores, and wet obsidian streets.',
    titleCount: 95,
    soundCalib: 'Lossless 24-bit Audio',
    accentColor: '#dbb8ff',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvM_vjYmz35ZH7SCsmApLp-xsTesoZS5WcHdRyWQcMV78TOsTqVXof_AvpRGqhjm9f3BSts_H9e64unwtbvQ4aR2Wcy0LmNXzxlhq8zIEupQKXqREsdFmpinCRKpONGCQmb6oYVkfIB5FfZUNbOuIV1Ktg9uEjWZkltDMXhVukhERPWR8TfNJSGa8A9UrTc5qSGnthhWP4CPa09nRyqNdc5gXry9pT0V5moKFMqqChSnEJVbSgHLm_'
  },
  {
    id: 'mood-melancholy',
    name: 'Emotional Rollercoaster & Melancholy',
    badge: 'CATHARTIC PEAK',
    iconName: 'favorite',
    description: 'Heart-wrenching narratives, orchestral crescendo moments, and unforgettable parting memories.',
    titleCount: 88,
    soundCalib: 'Acoustic Orchestral',
    accentColor: '#e30744',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhglPDPnYpejZh7bpk1dmrLEZIBVSCJgdPnNZVz7n8Zf4vy2nU6VrHsrnEgT4K2AcJ1-qa60oCvkAYybf-IaCEaZpoe1wcL19NXN5Uy-f3ZTIXvDLkVH1keR10v_ORUtnBqrJ_qMxXILoNWwl0_2cArD2zm0ZR2GJDpSAI9sa1UXlrH5TUn1FRUd3zfKHHdgVYEclumg1MBBiHy3MMAY1RBBWfJdesLnwqfYjZMNwfNyenjU96Yq7p'
  },
  {
    id: 'mood-chill',
    name: 'Wholesome & Chill / Slice-of-Life',
    badge: 'REST & RECHARGE',
    iconName: 'spa',
    description: 'Low stakes warmth, comedic high school clubs, comforting cuisine, and therapeutic pacing.',
    titleCount: 146,
    soundCalib: 'Cozy Lo-Fi Master',
    accentColor: '#ffb4aa',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmPg3686iABZrAadPHpXXGmwtuBR6hcp-HK1SyUujnDzP9oVZOTrFSaE_hWHEEOsRVb7B4wswEfCYTKIPz7Qa0GBUgciEoX0Kk4nLgm8T83UipNNuuupMgbKwtWKg6uYwzdFvgoM6QjF_b5agaUWsfHXlfyVGEKubN2MmErISHDSXMEB0HwJ6EuxvmPbspBlixyMnhG-P14KWFO4XbsVjvVhtUDDVvujcltt1YghavZfEmYUgySUIx'
  },
  {
    id: 'mood-lore',
    name: 'Epic Worldbuilders & Cosmic Lore',
    badge: 'DEEP LORE',
    iconName: 'public',
    description: 'Immense fictional mythologies, galactic diplomacy, generational warfare, and forgotten empires.',
    titleCount: 130,
    soundCalib: '4K IMAX Immersion',
    accentColor: '#6807ba',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS6TFB10yOJAegLlYjNLN7BGrvG2fD2WOrcCXWCY1Aj1xoageq6wplN0QkhjovvTo9VQG92kPnzmeLM5A_FeSqre5nrqLW6M6SjWkMs7XHvrGCAnu1TDOdyF4k0s8HoPve3guj21roUyEElZWjlEEliTFGyUZC1qH_OMAQOzfgvOwzAz-NBUXl8xO3_DFVhOn-T13-1zHPK2nP-bM0mKksi0YJUcZF-Q20moIo_uSK9PYdBsClvy4D'
  }
];

// Helper to simulate network latency with high fidelity
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const streamingApi = {
  // Get all titles
  async getAllTitles(): Promise<MediaTitle[]> {
    await delay(120);
    return MOCK_TITLES;
  },

  // Get continue watching list
  async getContinueWatching(): Promise<ContinueWatchingItem[]> {
    await delay(100);
    return CONTINUE_WATCHING_DATA;
  },

  // Get Top 10 global streams
  async getTop10Global(): Promise<MediaTitle[]> {
    await delay(150);
    return MOCK_TITLES.slice(0, 5);
  },

  // Get Tokyo top 10 trending anime
  async getTokyoTop10Anime(genre?: string): Promise<MediaTitle[]> {
    await delay(140);
    const anime = MOCK_TITLES.filter(t => t.category === 'anime');
    if (!genre || genre === 'ALL') return anime;
    return anime.filter(t => t.genre.some(g => g.toLowerCase().includes(genre.toLowerCase())));
  },

  // Get Cinema Vault (movies)
  async getCinemaVault(genre?: string): Promise<MediaTitle[]> {
    await delay(130);
    const movies = MOCK_TITLES.filter(t => t.category === 'movie');
    if (!genre || genre === 'ALL CINEMA') return movies;
    return movies.filter(m => m.genre.some(g => genre.toLowerCase().includes(g.toLowerCase())));
  },

  // Get simulcast schedule by day
  async getSimulcastSchedule(day: string): Promise<SimulcastScheduleItem[]> {
    await delay(110);
    return SCHEDULE_DATA.filter(item => item.day === day || day === 'ALL' || (!['MON','TUE','WED','THU','FRI','SAT','SUN'].includes(day) && item.day === 'FRI'));
  },

  // Get sensory moods
  async getSensoryMoods(): Promise<SensoryMood[]> {
    await delay(90);
    return SENSORY_MOODS;
  },

  // Search titles with caching
  async searchTitles(query: string, category?: string): Promise<MediaTitle[]> {
    await delay(150);
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return [];

    return MOCK_TITLES.filter(title => {
      const matchesCategory = !category || category === 'all' || title.category === category;
      const matchesSearch =
        title.title.toLowerCase().includes(cleanQuery) ||
        title.genre.some(g => g.toLowerCase().includes(cleanQuery)) ||
        title.synopsis.toLowerCase().includes(cleanQuery) ||
        (title.studio && title.studio.toLowerCase().includes(cleanQuery));
      return matchesCategory && matchesSearch;
    });
  },

  // Get title by ID
  async getTitleById(id: string): Promise<MediaTitle> {
    await delay(100);
    const found = MOCK_TITLES.find(t => t.id === id);
    if (!found) {
      throw new Error(`Media with ID "${id}" was not found in SPBR Vault.`);
    }
    return found;
  }
};
