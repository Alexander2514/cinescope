// ─── Translations (migrated from nodes.js) ───────────────────
export const translations = {
  'en-US': {
  title:             'CineScope',
  trending:          'Trending',
  seeMore:           'See More',
  categories:        'Categories',
  likedMovies:       'Favorite Movies',
  movieSimilar:      'Similar Movies',
  tvSimilar:         'Similar Series',
  cast:              'Main Cast',                        // ← añadir
  noFavorites:       'No saved movies!',                 // ← añadir
  noFavoritesDesc:   'Start building your collection.', // ← añadir
  exploreTrends:     'Explore Trending',                 // ← añadir
  searchPlaceholder: 'Search movies & series...',
  votes: 'votes',
  navHome: 'Home', navSearch: 'Search', navTrending: 'Trending',
  noResults: 'No results for', noResultsHint: 'Try a different title, actor or series name'  
},
'es-ES': {
  title:             'CineScope',
  trending:          'Tendencias',
  seeMore:           'Ver más',
  categories:        'Categorías',
  likedMovies:       'Películas favoritas',
  movieSimilar:      'Películas similares',
  tvSimilar:         'Series similares',
  cast:              'Reparto principal',
  noFavorites:       '¡No hay películas guardadas!',
  noFavoritesDesc:   'Empieza a crear tu colección agregando tus favoritas.',
  exploreTrends:     'Explorar tendencias',
  searchPlaceholder: 'Buscar películas y series...',
  votes: 'votos',
  navHome: 'Inicio', navSearch: 'Buscar', navTrending: 'Tendencias',
  noResults: 'Sin resultados para', noResultsHint: 'Intenta con otro título, actor o nombre de serie'
},
'fr-FR': {
  title:             'CineScope',
  trending:          'Tendances',
  seeMore:           'Voir plus',
  categories:        'Catégories',
  likedMovies:       'Films favoris',
  movieSimilar:      'Films similaires',
  tvSimilar:         'Séries similaires',
  cast:              'Distribution principale',
  noFavorites:       'Aucun film sauvegardé !',
  noFavoritesDesc:   'Commencez à créer votre collection.',
  exploreTrends:     'Explorer les tendances',
  searchPlaceholder: 'Rechercher des films...',
  votes: 'votes',
  navHome: 'Accueil', navSearch: 'Rechercher', navTrending: 'Tendances',
  noResults: 'Aucun résultat pour', noResultsHint: 'Essayez un autre titre, acteur ou nom de série'
},
'pt-BR': {
  title:             'CineScope',
  trending:          'Tendências',
  seeMore:           'Ver mais',
  categories:        'Categorias',
  likedMovies:       'Filmes favoritos',
  movieSimilar:      'Filmes semelhantes',
  tvSimilar:         'Séries semelhantes',
  cast:              'Elenco principal',
  noFavorites:       'Nenhum filme salvo!',
  noFavoritesDesc:   'Comece a criar sua coleção.',
  exploreTrends:     'Explorar tendências',
  searchPlaceholder: 'Pesquisar filmes...',
  votes: 'votos',
  navHome: 'Início', navSearch: 'Buscar', navTrending: 'Tendências',
  noResults: 'Sem resultados para', noResultsHint: 'Tente outro título, ator ou nome de série'
},
'zh-CN': {
  title:             'CineScope',
  trending:          '趋势',
  seeMore:           '查看更多',
  categories:        '类别',
  likedMovies:       '最喜欢的电影',
  movieSimilar:      '类似的电影',
  tvSimilar:         '类似的系列',
  cast:              '主要演员',
  noFavorites:       '没有保存的电影！',
  noFavoritesDesc:   '开始建立您的收藏。',
  exploreTrends:     '探索趋势',
  searchPlaceholder: '搜索电影...',
  votes: '票',
  navHome: '首页', navSearch: '搜索', navTrending: '趋势',
  noResults: '没有结果', noResultsHint: '尝试不同的标题、演员或剧集名称'
},
'de-DE': {
  title:             'CineScope',
  trending:          'Trends',
  seeMore:           'Mehr sehen',
  categories:        'Kategorien',
  likedMovies:       'Lieblingsfilme',
  movieSimilar:      'Ähnliche Filme',
  tvSimilar:         'Ähnliche Serien',
  cast:              'Hauptbesetzung',
  noFavorites:       'Keine gespeicherten Filme!',
  noFavoritesDesc:   'Beginne deine Sammlung aufzubauen.',
  exploreTrends:     'Trends erkunden',
  searchPlaceholder: 'Filme suchen...',
  votes: 'Stimmen',
  navHome: 'Start', navSearch: 'Suchen', navTrending: 'Trends',
  noResults: 'Keine Ergebnisse für', noResultsHint: 'Versuche einen anderen Titel, Schauspieler oder Seriennamen'
},
'it-IT': {
  title:             'CineScope',
  trending:          'Tendenze',
  seeMore:           'Vedi di più',
  categories:        'Categorie',
  likedMovies:       'Film preferiti',
  movieSimilar:      'Film simili',
  tvSimilar:         'Serie simili',
  cast:              'Cast principale',
  noFavorites:       'Nessun film salvato!',
  noFavoritesDesc:   'Inizia a costruire la tua collezione.',
  exploreTrends:     'Esplora i trend',
  searchPlaceholder: 'Cerca film...',
  votes: 'voti',
  navHome: 'Home', navSearch: 'Cerca', navTrending: 'Tendenze',
  noResults: 'Nessun risultato per', noResultsHint: 'Prova un titolo, attore o nome serie diverso'
},
} as const

export type LangCode = keyof typeof translations
export type TranslationKeys = keyof typeof translations['en-US']

export function t(lang: LangCode, key: TranslationKeys): string {
  return translations[lang]?.[key] ?? translations['en-US'][key]
}
