// map each language code to its BibleGateway version code
const VERSION_MAP = {
  eng: 'NIV',
  kor: 'KLB',
  // add more as you go
};

// English book names → per-language translations
const BOOK_TRANSLATIONS = {
  Genesis:       { kor: '창세기' },
  Exodus:        { kor: '출애굽기' },
  Leviticus:     { kor: '레위기' },
  Numbers:       { kor: '민수기' },
  Deuteronomy:   { kor: '신명기' },
  Joshua:        { kor: '여호수아' },
  Judges:        { kor: '사사기' },
  Ruth:          { kor: '룻기' },
  '1 Samuel':    { kor: '사무엘상' },
  '2 Samuel':    { kor: '사무엘하' },
  '1 Kings':     { kor: '열왕기상' },
  '2 Kings':     { kor: '열왕기하' },
  '1 Chronicles':{ kor: '역대상' },
  '2 Chronicles':{ kor: '역대하' },
  Ezra:          { kor: '에스라' },
  Nehemiah:      { kor: '느헤미야' },
  Esther:        { kor: '에스더' },
  Job:           { kor: '욥기' },
  Psalm:         { kor: '시편' },
  Proverbs:      { kor: '잠언' },
  Ecclesiastes:  { kor: '전도서' },
  'Song of Solomon': { kor: '아가' },
  Isaiah:        { kor: '이사야' },
  Jeremiah:      { kor: '예레미야' },
  Lamentations:  { kor: '예레미야애가' },
  Ezekiel:       { kor: '에스겔' },
  Daniel:        { kor: '다니엘' },
  Hosea:         { kor: '호세아' },
  Joel:          { kor: '요엘' },
  Amos:          { kor: '아모스' },
  Obadiah:       { kor: '오바댜' },
  Jonah:         { kor: '요나' },
  Micah:         { kor: '미가' },
  Nahum:         { kor: '나훔' },
  Habakkuk:      { kor: '하박국' },
  Zephaniah:     { kor: '스바냐' },
  Haggai:        { kor: '학개' },
  Zechariah:     { kor: '스가랴' },
  Malachi:       { kor: '말라기' },
  Matthew:       { kor: '마태복음' },
  Mark:          { kor: '마가복음' },
  Luke:          { kor: '누가복음' },
  John:          { kor: '요한복음' },
  Acts:          { kor: '사도행전' },
  Romans:        { kor: '로마서' },
  '1 Corinthians': { kor: '고린도전서' },
  '2 Corinthians': { kor: '고린도후서' },
  Galatians:     { kor: '갈라디아서' },
  Ephesians:     { kor: '에베소서' },
  Philippians:   { kor: '빌립보서' },
  Colossians:    { kor: '골로새서' },
  '1 Thessalonians': { kor: '데살로니가전서' },
  '2 Thessalonians': { kor: '데살로니가후서' },
  '1 Timothy':      { kor: '디모데전서' },
  '2 Timothy':      { kor: '디모데후서' },
  Titus:          { kor: '디도서' },
  Philemon:       { kor: '빌레몬서' },
  Hebrews:        { kor: '히브리서' },
  James:          { kor: '야고보서' },
  '1 Peter':      { kor: '베드로전서' },
  '2 Peter':      { kor: '베드로후서' },
  '1 John':       { kor: '요한일서' },
  '2 John':       { kor: '요한이서' },
  '3 John':       { kor: '요한삼서' },
  Jude:           { kor: '유다서' },
  Revelation:     { kor: '요한계시록' },
};

const REF_SPLIT = /^(.+?)\s+([\d].*)$/;

export function formatReferences(refs, currentLang = 'eng') {
  if (!Array.isArray(refs) || refs.length === 0) return '';

  const version = VERSION_MAP[currentLang] || VERSION_MAP.eng;

  const items = refs.map(engTextRaw => {
    const engText = engTextRaw.trim();
    let displayText = engText;

    if (currentLang !== 'eng') {
      const m = REF_SPLIT.exec(engText);
      if (m) {
        const [ , book, remainder ] = m;
        const trans = BOOK_TRANSLATIONS[book] && BOOK_TRANSLATIONS[book][currentLang];
        if (trans) {
          displayText = `${trans} ${remainder}`;
        }
      }
    }

    const url =
      `https://www.biblegateway.com/passage/?` +
      `search=${encodeURIComponent(engText)}` +
      `&version=${version}`;

    return `<li><a href="${url}" target="_blank">${displayText}</a></li>`;
  });

  return `<ul>${items.join('')}</ul>`;
}