export const WORD_TYPE = {
  NOUN: { code: 0, value: 'Noun', key: 'NOUN' } ,
  VERB: { code: 1, value: 'Verb', key: 'VERB' },
  ADJECTIVE: { code: 2, value: 'Adjective', key: 'ADJECTIVE' },
  NOUN_VERB: { code: 6, value: 'Noun_Verb', key: 'NOUN_VERB' },
  ADVERB: { code: '3', value: 'Adverb', key: 'ADVERB' },
  PREPOSITION: { code: 4, value: 'Preposition', key: 'PREPOSITION' },  // giới từ
  CONJUNCTION: { code: 5, value: 'Conjunction', key: 'CONJUNCTION' },  // liên từ
  PHRASE: { code: 7, value: 'Phrase', key: 'PHRASE' },  // cụm từ
  UNDEFINED: { code: 8, value: 'Undefined', key: 'UNDEFINED' },
}

export const FORM_MODE = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  VIEW: 'VIEW'
}

export const COMMAND = {
  EDIT: 'EDIT',
  VIEW: 'VIEW',
  DELETE: 'DELETE'
}